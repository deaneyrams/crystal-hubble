// Syntry Core: VaultSync.js
// Handles real-time connection from the Escrow Demo to Supabase.

// Required: Supabase JS Client (must be loaded via CDN or NPM before this script runs)
// Example CDN: <script src="https://unpkg.com/@supabase/supabase-js@2"></script>

class VaultSync {
  constructor(supabaseUrl, supabaseAnonKey) {
    if (!window.supabase) {
        console.error("Supabase client not loaded. Ensure @supabase/supabase-js is included.");
        return;
    }
    
    this.supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
    this.currentTransactionId = null; 
    console.log("VaultSync: Initialized connection to Supabase");
  }

  // --- 1. Total Vault Volume (Founder Dashboard) ---
  
  /**
   * Fetches the total USD volume of all active (pending/verified) vaults.
   */
  async getActiveEscrowVolume() {
    try {
      // Sum all escrow amounts where status is not 'released' or 'cancelled'
      const { data, error } = await this.supabase
        .from('vault_transactions')
        .select('escrow_amount')
        .in('escrow_status', ['pending', 'verified']);

      if (error) throw error;

      if (!data || data.length === 0) return 0;

      const totalVolume = data.reduce((sum, row) => sum + Number(row.escrow_amount), 0);
      return totalVolume;
    } catch (err) {
      console.error("VaultSync Error fetching volume:", err.message);
      return 0;
    }
  }

  // --- 2. Live Escrow Verification & Oracle Updates ---

  /**
   * Sets the transaction ID for the current Trust-Card demo.
   */
  setTransactionId(id) {
    this.currentTransactionId = id;
  }

  /**
   * Simulates the Oracle firing and updating the 3 Truth-Signals.
   * Supabase DB Trigger will auto-flip the status to 'verified' if all are true.
   */
  async triggerOracleVerification() {
    if (!this.currentTransactionId) {
        console.warn("VaultSync: No transaction ID set for verification.");
        return false;
    }

    try {
      const { error } = await this.supabase
        .from('vault_transactions')
        .update({ 
            lidar_hash: '0x' + Math.random().toString(16).substr(2, 64),
            deed_check_passed: true,
            gps_boundary_verified: true,
        })
        .eq('id', this.currentTransactionId);

      if (error) throw error;
      console.log("VaultSync: Oracles triggered on DB successfully.");
      return true;
    } catch (err) {
      console.error("VaultSync Update Error:", err.message);
      return false;
    }
  }

  // --- 3. Real-time Subscription ---

  /**
   * Subscribes to real-time changes on the current transaction.
   * Callback fired when status changes (e.g. pending -> verified)
   */
  subscribeToUpdates(callback) {
     if (!this.currentTransactionId) return;

     const channel = this.supabase
      .channel('vault_status_updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'vault_transactions',
          filter: `id=eq.${this.currentTransactionId}`
        },
        (payload) => {
          console.log("VaultSync Real-time Update Received:", payload.new);
          callback(payload.new);
        }
      )
      .subscribe();
      
      return channel;
  }
}

// Export to window for use in vanilla HTML demos
window.VaultSync = VaultSync;
