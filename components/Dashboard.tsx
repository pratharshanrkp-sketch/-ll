
import React from 'react';
import { Eye, Share2, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { ARLens } from '../types';

const MOCK_LENSES: ARLens[] = [
  {
    id: '1',
    name: 'Neon Cyberpunk',
    category: 'Face',
    previewUrl: 'https://picsum.photos/seed/cyber/400/300',
    description: 'High-contrast glowing futuristic face mask.',
    stats: { views: 12400, shares: 890 },
    createdAt: '2 days ago'
  },
  {
    id: '2',
    name: 'Golden Hour Aura',
    category: 'World',
    previewUrl: 'https://picsum.photos/seed/gold/400/300',
    description: 'Warm, hazy golden lighting with floating dust particles.',
    stats: { views: 45000, shares: 3200 },
    createdAt: '1 week ago'
  },
  {
    id: '3',
    name: 'Glitch Portal',
    category: 'Portal',
    previewUrl: 'https://picsum.photos/seed/portal/400/300',
    description: 'A reality-bending doorway to a digital dimension.',
    stats: { views: 8200, shares: 410 },
    createdAt: '3 days ago'
  }
];

const Dashboard: React.FC<{ onCreateClick: () => void }> = ({ onCreateClick }) => {
  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Creative Hub</h1>
          <p className="text-zinc-400">Welcome back, Designer. Your lenses are performing 12% better this week.</p>
        </div>
        <button 
          onClick={onCreateClick}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-full flex items-center gap-2 font-semibold transition-all shadow-lg shadow-violet-900/20"
        >
          <Plus size={20} />
          Create New Lens
        </button>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { label: 'Total Views', value: '128.4K', icon: Eye, color: 'text-blue-400' },
          { label: 'Total Shares', value: '14.2K', icon: Share2, color: 'text-emerald-400' },
          { label: 'Engagement Rate', value: '8.4%', icon: TrendingUp, color: 'text-violet-400' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-3xl border-white/5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-zinc-400 text-sm font-medium">{stat.label}</span>
              <stat.icon className={`${stat.color} w-5 h-5`} />
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-xs text-zinc-500 mt-2 font-medium">+4.2% from last month</div>
          </div>
        ))}
      </div>

      {/* Lenses Grid */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Sparkles className="text-violet-400" />
        Recent Lenses
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_LENSES.map((lens) => (
          <div key={lens.id} className="group glass rounded-3xl overflow-hidden hover:border-violet-500/40 transition-all">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img 
                src={lens.previewUrl} 
                alt={lens.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/60 backdrop-blur-md text-xs font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest text-violet-400">
                  {lens.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-xl">{lens.name}</h3>
                <span className="text-zinc-500 text-sm">{lens.createdAt}</span>
              </div>
              <p className="text-zinc-400 text-sm line-clamp-2 mb-6">
                {lens.description}
              </p>
              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                  <Eye size={16} />
                  {lens.stats.views.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                  <Share2 size={16} />
                  {lens.stats.shares.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
