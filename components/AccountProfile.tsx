
import React from 'react';
import { User, Mail, Globe, ShieldCheck, CreditCard, ExternalLink } from 'lucide-react';

const AccountProfile: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-right-8 duration-700">
      <header className="mb-12 flex items-center gap-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-violet-600/30">
            <img src="https://picsum.photos/seed/alex/256/256" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-violet-600 p-2 rounded-xl shadow-lg border border-white/10">
            <ShieldCheck size={20} className="text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">Alex Rivera</h1>
          <p className="text-zinc-400 flex items-center gap-2">
            <span className="bg-violet-500/10 text-violet-400 text-xs font-black uppercase px-2 py-1 rounded">Pro Creator</span>
            @arivera_ar • San Francisco, CA
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <section className="glass p-8 rounded-[2rem] space-y-6">
          <h2 className="text-xl font-bold border-b border-white/5 pb-4">Personal Info</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">Display Name</p>
                <p className="font-medium">Alex Rivera Studio</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">Email Address</p>
                <p className="font-medium">alex@lensflow.design</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400">
                <Globe size={20} />
              </div>
              <div>
                <p className="text-xs text-zinc-500 font-medium">Connected Account</p>
                <p className="font-medium flex items-center gap-2">Snapchat Creative Hub <ExternalLink size={14} className="text-zinc-600" /></p>
              </div>
            </div>
          </div>
          <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold transition-all">
            Update Profile
          </button>
        </section>

        <section className="glass p-8 rounded-[2rem] space-y-6">
          <h2 className="text-xl font-bold border-b border-white/5 pb-4">Billing & Plan</h2>
          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-6 rounded-2xl text-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Current Plan</p>
                <h3 className="text-2xl font-black">PRO STUDIO</h3>
              </div>
              <CreditCard size={24} className="text-white/40" />
            </div>
            <p className="text-sm font-medium mb-4">Unlimited AI Generations • 4K Exports • Priority Support</p>
            <div className="text-2xl font-bold">$29<span className="text-sm font-normal text-white/60">/mo</span></div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Next billing date</span>
              <span className="font-medium text-white">Oct 12, 2024</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-400">Payment Method</span>
              <span className="font-medium text-white">Visa •••• 4242</span>
            </div>
          </div>
          <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-sm font-bold transition-all text-zinc-300">
            Manage Subscription
          </button>
        </section>
      </div>

      <div className="glass p-8 rounded-[2rem]">
        <h2 className="text-xl font-bold mb-6">Security</h2>
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <div>
              <p className="font-bold text-sm">Two-Factor Authentication</p>
              <p className="text-xs text-zinc-500">Your account is protected with mobile verification.</p>
            </div>
          </div>
          <button className="text-violet-400 text-xs font-black uppercase tracking-widest px-4 py-2 hover:bg-violet-500/10 rounded-lg transition-all">
            Manage
          </button>
        </div>
        <button className="text-red-400/80 hover:text-red-400 text-sm font-bold flex items-center gap-2 mt-4 px-2">
          Deactivate LensFlow Account
        </button>
      </div>
    </div>
  );
};

export default AccountProfile;
