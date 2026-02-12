
import React from 'react';
import { LayoutDashboard, Camera, UserCircle, Settings, HelpCircle, Layers } from 'lucide-react';
import { AppState } from '../types';

interface SidebarProps {
  activeState: AppState;
  onNavigate: (state: AppState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeState, onNavigate }) => {
  const navItems = [
    { id: AppState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppState.STUDIO, label: 'AR Studio', icon: Camera },
    { id: AppState.ACCOUNT, label: 'Account', icon: UserCircle },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 glass border-r flex flex-col items-center md:items-stretch py-8 z-50">
      <div className="px-6 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center neon-glow">
          <Layers className="text-white w-6 h-6" />
        </div>
        <span className="hidden md:block font-bold text-xl tracking-tight">LensFlow</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeState === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-violet-600/20 text-violet-400 border border-violet-500/30' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={24} />
              <span className="hidden md:block font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 mt-auto space-y-2">
        <button className="w-full flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white transition-colors">
          <Settings size={24} />
          <span className="hidden md:block font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center gap-4 px-4 py-3 text-zinc-400 hover:text-white transition-colors">
          <HelpCircle size={24} />
          <span className="hidden md:block font-medium">Help Center</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
