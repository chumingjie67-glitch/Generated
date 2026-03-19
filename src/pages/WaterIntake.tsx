import React, { useState } from 'react';

interface WaterIntakeProps {
  onBack: () => void;
}

export default function WaterIntake({ onBack }: WaterIntakeProps) {
  const [intake, setIntake] = useState(1500);
  const goal = 2000;
  const percentage = Math.min(100, (intake / goal) * 100);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col absolute inset-0 z-50">
      <header className="flex justify-between items-center w-full px-6 py-4 bg-surface/80 backdrop-blur-md sticky top-0 z-30">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors active:scale-90">
          <span className="material-symbols-outlined text-on-surface">arrow_back</span>
        </button>
        <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">添加饮水</h1>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors active:scale-90">
          <span className="material-symbols-outlined text-on-surface">history</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative w-full max-w-[280px] flex justify-center items-end py-12">
          <div className="absolute -left-4 top-24 z-20">
            <div className="bg-surface-container-lowest/90 backdrop-blur-xl p-4 rounded-lg shadow-[0_24px_48px_rgba(0,0,0,0.06)] flex items-center gap-3 border border-white/20">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">local_drink</span>
              </div>
              <div>
                <p className="text-[11px] font-bold text-outline uppercase tracking-wider">最近添加</p>
                <p className="font-headline font-bold text-on-surface">果汁 250ml</p>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-12 bottom-12 flex flex-col justify-between items-start pointer-events-none z-10">
            {[2000, 1500, 1000, 500, 250].map((val) => (
              <div key={val} className="flex items-center gap-2">
                <div className={`h-[1px] ${val % 1000 === 0 ? 'w-6 bg-outline-variant' : 'w-4 bg-outline-variant/50'}`}></div>
                <span className={`font-label text-xs font-medium ${val % 1000 === 0 ? 'text-outline' : 'text-outline-variant'}`}>{val}ml</span>
              </div>
            ))}
          </div>

          <div className="relative w-48 h-[420px] bg-surface-container-low rounded-t-[3rem] rounded-b-xl border-[6px] border-surface-container-highest shadow-inner overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 w-full bg-primary-container transition-all duration-700"
              style={{ height: `${percentage}%` }}
            >
              <div className="absolute -top-2 left-0 w-[200%] h-5 bg-white/30 rounded-[40%] -translate-x-1/4"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
            </div>
            <div className="absolute top-8 left-6 w-3 h-32 bg-white/40 rounded-full blur-sm"></div>
            <div className="absolute bottom-12 right-6 w-1 h-20 bg-white/20 rounded-full blur-[1px]"></div>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-headline text-[56px] font-extrabold text-on-primary-container leading-none">{intake}</span>
            <span className="font-label text-lg font-bold text-on-primary-container/60">ml</span>
            <div className="mt-4 bg-error-container text-on-error-container px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              剩余 {Math.max(0, goal - intake)}ml
            </div>
          </div>
        </div>
      </main>

      <section className="bg-surface-container-lowest rounded-t-[3rem] px-8 pt-10 pb-12 shadow-[0_-12px_40px_rgba(0,0,0,0.03)] border-t border-white/10">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-8">
            <span className="font-headline text-lg font-bold text-on-surface">选择分量</span>
            <span className="font-headline text-2xl font-black text-primary">250 <small className="text-sm font-bold text-outline">ml</small></span>
          </div>

          <div className="relative h-12 flex items-center mb-10">
            <div className="absolute w-full h-2 bg-surface-container rounded-full"></div>
            <div className="absolute w-1/3 h-2 bg-primary rounded-full"></div>
            <div className="absolute left-1/3 -translate-x-1/2 w-8 h-8 bg-surface-container-lowest border-4 border-primary rounded-full shadow-lg cursor-pointer transition-transform active:scale-110"></div>
            <div className="absolute w-full flex justify-between px-1 top-8">
              <span className="text-[10px] font-bold text-outline-variant">100</span>
              <span className="text-[10px] font-bold text-primary">250</span>
              <span className="text-[10px] font-bold text-outline-variant">500</span>
              <span className="text-[10px] font-bold text-outline-variant">750</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { icon: 'coffee', label: '咖啡', color: 'text-primary', bg: 'bg-surface-container' },
              { icon: 'water_full', label: '纯水', color: 'text-on-secondary-container', bg: 'bg-secondary-container' },
              { icon: 'local_bar', label: '果汁', color: 'text-primary', bg: 'bg-surface-container' },
              { icon: 'restaurant', label: '汤羹', color: 'text-primary', bg: 'bg-surface-container' },
            ].map((item, idx) => (
              <button key={idx} className={`aspect-square rounded-2xl ${item.bg} flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform`}>
                <span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span>
                <span className={`text-[10px] font-bold ${item.color === 'text-primary' ? 'text-outline' : item.color}`}>{item.label}</span>
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIntake(prev => prev + 250)}
            className="w-full h-16 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg flex items-center justify-center gap-3 shadow-[0_16px_32px_rgba(45,101,131,0.2)] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined icon-filled">check_circle</span>
            确认饮水
          </button>
        </div>
      </section>
    </div>
  );
}
