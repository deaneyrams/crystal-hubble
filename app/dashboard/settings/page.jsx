import React from 'react';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';

const SettingsPage = () => {
  const settingsSections = [
    {
      id: 'personal',
      title: 'Personal Information',
      items: [
        { label: 'Full Name', value: 'Kwame Anokye' },
        { label: 'Email Address', value: 'k.anokye@domain.com' },
        { label: 'Phone Number', value: '+233 53 110 2292' }
      ]
    },
    {
      id: 'security',
      title: 'Security & Access',
      items: [
        { label: 'Sovereign PIN', value: '••••' },
        { label: 'Two-Factor Auth', value: 'WhatsApp Active' }
      ]
    },
    {
      id: 'mortgage',
      title: 'Mortgage Preferences',
      items: [
        { label: 'Preferred Bank', value: 'Ecobank Ghana' },
        { label: 'Repayment Date', value: '25th of month' }
      ]
    },
    {
      id: 'vault',
      title: 'Document Vault',
      items: [
        { label: 'Stored Documents', value: '4 Files' },
        { label: 'Next Expiry', value: 'Ghana Card (2028)' }
      ]
    }
  ];

  return (
    <div className="bg-[#F8F1E3] min-h-screen text-[#003300] font-sans">
      <GlobalHeader />

      <main className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Account Settings</h1>
          <p className="opacity-60 text-sm">Manage your sovereign credentials and mortgage preferences.</p>
        </header>

        {/* Profile Card */}
        <div className="bg-white border border-[#D4AF37]/20 p-8 rounded-3xl shadow-sm mb-12 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#003300] text-[#D4AF37] rounded-full flex items-center justify-center text-xl font-bold">
              KA
            </div>
            <div>
              <h3 className="text-xl font-bold">Kwame Anokye</h3>
              <p className="text-xs opacity-40 font-bold uppercase tracking-widest">Sovereign Tier II User</p>
            </div>
          </div>
          <button className="text-[#00BFFF] text-xs font-bold uppercase tracking-widest hover:underline">
            Edit Profile
          </button>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {settingsSections.map((section) => (
            <div key={section.id} className="bg-white border border-[#D4AF37]/10 p-8 rounded-2xl shadow-sm">
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#D4AF37] mb-6">{section.title}</h4>
              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-[#003300]/5 pb-3 last:border-0 last:pb-0">
                    <span className="opacity-40">{item.label}</span>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Linked Accounts */}
        <div className="bg-white border border-[#D4AF37]/10 p-8 rounded-2xl shadow-sm mb-12">
          <h4 className="font-bold text-sm uppercase tracking-widest text-[#D4AF37] mb-6">Linked Financial Accounts</h4>
          <div className="flex items-center justify-between p-4 bg-[#F8F1E3]/50 rounded-xl border border-[#003300]/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">🏦</div>
              <div>
                <p className="font-bold text-sm">Ecobank Ghana</p>
                <p className="text-[10px] opacity-40">Primary Salary Account</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#1D9E75] uppercase">Connected</span>
          </div>
        </div>

        {/* Support & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <a href="https://wa.me/233531102292" className="bg-[#003300] text-[#F8F1E3] p-6 rounded-2xl font-bold flex items-center justify-between hover:scale-[1.02] transition-all">
            <span>Contact Support</span>
            <span className="text-[#D4AF37]">↗</span>
          </a>
          <button className="border border-[#003300]/10 p-6 rounded-2xl font-bold text-[#003300] hover:bg-[#F8F1E3] transition-all text-left">
            Frequently Asked Questions
          </button>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-[#003300]/10 pt-8">
          <button className="text-red-600 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            Delete Sovereign Account
          </button>
          <p className="text-[10px] opacity-40 mt-2">All verified credentials and 8-layer audits will be permanently removed.</p>
        </div>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default SettingsPage;
