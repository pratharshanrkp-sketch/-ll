
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ARStudio from './components/ARStudio';
import AccountProfile from './components/AccountProfile';
import { AppState } from './types';

const App: React.FC = () => {
  const [activeState, setActiveState] = useState<AppState>(AppState.DASHBOARD);

  const renderContent = () => {
    switch (activeState) {
      case AppState.DASHBOARD:
        return <Dashboard onCreateClick={() => setActiveState(AppState.STUDIO)} />;
      case AppState.STUDIO:
        return <ARStudio />;
      case AppState.ACCOUNT:
        return <AccountProfile />;
      default:
        return <Dashboard onCreateClick={() => setActiveState(AppState.STUDIO)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      <Sidebar 
        activeState={activeState} 
        onNavigate={(state) => setActiveState(state)} 
      />

      <main className="flex-1 ml-20 md:ml-64 relative z-10 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto min-h-screen">
          {renderContent()}
        </div>
      </main>

      {/* Floating Action Button (Mobile Only) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setActiveState(AppState.STUDIO)}
          className="w-14 h-14 bg-violet-600 rounded-2xl shadow-2xl shadow-violet-900/40 flex items-center justify-center text-white active:scale-95 transition-transform"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>
    </div>
  );
};

export default App;
