-- Syntry-Vault: Escrow Transactions Schema
-- Defines the core table for managing the "Trust Layer" release logic

CREATE TYPE escrow_status AS ENUM ('pending', 'verified', 'released', 'cancelled');

CREATE TABLE IF NOT EXISTS public.vault_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL, -- Reference to the property being sold
    buyer_id UUID NOT NULL REFERENCES auth.users(id),
    seller_id UUID NOT NULL REFERENCES auth.users(id),
    
    -- Escrow Data
    escrow_amount DECIMAL(12, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    escrow_status escrow_status DEFAULT 'pending',
    
    -- Truth Signals (The Oracle Locks)
    lidar_hash TEXT, -- Stored hash of the 3D Point Cloud Ground-Truth scan
    deed_check_passed BOOLEAN DEFAULT false,
    gps_boundary_verified BOOLEAN DEFAULT false,
    
    -- Audit Trail
    created_at TIMESTAMPTZ DEFAULT NOW(),
    verified_at TIMESTAMPTZ,
    released_at TIMESTAMPTZ
);

-- Row Level Security (RLS)
ALTER TABLE public.vault_transactions ENABLE ROW LEVEL SECURITY;

-- Buyers can only see their own transactions
CREATE POLICY "Buyers view own transactions" 
ON public.vault_transactions FOR SELECT 
USING (auth.uid() = buyer_id);

-- Sellers can only see their own transactions
CREATE POLICY "Sellers view own transactions" 
ON public.vault_transactions FOR SELECT 
USING (auth.uid() = seller_id);

-- Admins (or the Syntry backend service role) handle updates (verification / release)
CREATE POLICY "Service roles manage transactions" 
ON public.vault_transactions FOR ALL 
USING (auth.jwt() ->> 'role' = 'service_role');

-- Trigger to auto-update `verified_at` when all 3 Truth-Signals are met
CREATE OR REPLACE FUNCTION check_escrow_release()
RETURNS TRIGGER AS $$
BEGIN
    -- If all signals become TRUE, and it's currently pending, move to verified
    IF NEW.lidar_hash IS NOT NULL 
       AND NEW.deed_check_passed = true 
       AND NEW.gps_boundary_verified = true 
       AND OLD.escrow_status = 'pending' THEN
       
       NEW.escrow_status = 'verified';
       NEW.verified_at = NOW();
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_escrow_release
BEFORE UPDATE ON public.vault_transactions
FOR EACH ROW
EXECUTE FUNCTION check_escrow_release();
