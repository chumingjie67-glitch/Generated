import React from 'react';

interface TopBarProps {
  currentView: string;
  onBack: () => void;
}

export default function TopBar({ currentView, onBack }: TopBarProps) {
  if (currentView === 'home') {
    return (
      <header className="sticky top-0 z-50 glass-panel px-5 py-3 flex justify-between items-center rounded-b-3xl mb-4">
          <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-primary-container z-10 shadow-sm">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKJ4HA057qlClFP_KHnYhLatneGfkJ0i4aMAGAuTbFfasTqzGBa56CKgyzSecVu_y5KYuAWnivnFV6wMqbgVT27EalAWr9qKWQmGomiVJXxNyIhZCJZ_FBijKtpivSY6121KUY0J_nK3BzfQp4JKRFcjSCnaR9HjF9baD9YNvFv34NEV9pZ3zXkJg68q_45DHZFob8jRhlmurIEVY1Ri7rI_RX8mKQdltKs9z2f0ZiULu3MHD-secr0Zy6OxleAWUUIblTw9uYuWE" alt="Boy" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-secondary-container z-0 shadow-sm">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt5Gi0oVNWIuIW5eZK3oFOfEktRQ87H02uore_McotLvLCN2vA3RbXLCG_7xYroPg-LJGc8ghqgr6uYalKPBlHL3dl7_3u2N_xraP3QYTkkjH3ZVRceoAt4RY9xl6pBivrV_15TqogGbKhAETcfDV27uN7i0NL8l8FLYgZQAcWUWBkM1gc9yl_jR7oKNnDdRyHOsEqL1TaSZuwzRQh17LK_tu0iJPj27Ya9zfLI-_RuV0dX4JOrWfsoBUQNlyw3TJEep1rAvVGhR4" alt="Girl" className="w-full h-full object-cover" />
                  </div>
              </div>
              <div className="flex flex-col">
                  <h1 className="font-headline text-lg font-extrabold tracking-tight text-primary">Sweet Moments</h1>
                  <span className="text-[10px] text-outline font-medium">5月20日 · 星期一</span>
              </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error-container rounded-full border border-white"></span>
          </button>
      </header>
    );
  }

  const getTitle = () => {
    switch (currentView) {
      case 'diary': return '恋爱日记';
      case 'add-diary': return '写日记';
      case 'album': return '甜蜜相册';
      default: return '';
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel px-5 py-4 flex items-center justify-between rounded-b-3xl mb-4">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="text-primary hover:opacity-80 transition-opacity active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h1 className="font-headline font-semibold text-lg text-primary">
          {getTitle()}
        </h1>
      </div>
      <div className="w-8"></div>
    </header>
  );
}
