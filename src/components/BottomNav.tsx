import React from 'react';

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: 'home' | 'diary' | 'add-diary' | 'album') => void;
}

export default function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-panel rounded-full shadow-lg flex justify-around items-center px-2 py-2 z-50 border border-white/50">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center px-5 py-2 transition-all rounded-full ${currentView === 'home' ? 'bg-primary-container/30 text-primary' : 'text-outline hover:text-primary'}`}
        >
            <span className={`material-symbols-outlined text-xl ${currentView === 'home' ? 'icon-filled' : ''}`}>home</span>
            <span className="text-[10px] font-bold mt-0.5">首页</span>
        </button>
        
        <button 
          onClick={() => onNavigate('diary')}
          className={`flex flex-col items-center justify-center px-4 py-2 transition-colors rounded-full ${currentView === 'diary' ? 'bg-primary-container/30 text-primary' : 'text-outline hover:text-primary'}`}
        >
            <span className={`material-symbols-outlined text-xl ${currentView === 'diary' ? 'icon-filled' : ''}`}>auto_stories</span>
            <span className="text-[10px] font-medium mt-0.5">日记</span>
        </button>
        
        <div className="relative -top-6">
            <button 
              onClick={() => onNavigate('add-diary')}
              className="w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all border-4 border-[#fbf9f5]"
            >
                <span className="material-symbols-outlined text-3xl">add</span>
            </button>
        </div>
        
        <button 
          onClick={() => onNavigate('album')}
          className={`flex flex-col items-center justify-center px-4 py-2 transition-colors rounded-full ${currentView === 'album' ? 'bg-primary-container/30 text-primary' : 'text-outline hover:text-primary'}`}
        >
            <span className={`material-symbols-outlined text-xl ${currentView === 'album' ? 'icon-filled' : ''}`}>photo_library</span>
            <span className="text-[10px] font-medium mt-0.5">相册</span>
        </button>
        
        <button className="flex flex-col items-center justify-center text-outline hover:text-primary px-4 py-2 transition-colors">
            <span className="material-symbols-outlined text-xl">person</span>
            <span className="text-[10px] font-medium mt-0.5">我的</span>
        </button>
    </nav>
  );
}
