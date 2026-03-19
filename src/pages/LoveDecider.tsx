import React, { useState } from 'react';

interface LoveDeciderProps {
  onBack: () => void;
}

export default function LoveDecider({ onBack }: LoveDeciderProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const newRotation = rotation + 1440 + Math.random() * 360; // Spin at least 4 times
    setRotation(newRotation);
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen pb-32 absolute inset-0 z-50 overflow-y-auto">
      <header className="bg-[#fbf9f5] flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200">
            <span className="material-symbols-outlined text-gray-400">arrow_back</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden shadow-sm border-2 border-white flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">casino</span>
          </div>
          <h1 className="font-headline text-2xl font-bold tracking-tight text-[#a4d8fc]">Sweet Moments</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#fa746f] font-black italic text-xl">情侣决策器</span>
        </div>
      </header>

      <main className="px-6 pt-6 max-w-2xl mx-auto space-y-8">
        <section className="overflow-x-auto pb-2 -mx-6 px-6 hide-scrollbar">
          <div className="flex space-x-3 w-max">
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-xl shadow-sm active:scale-95 transition-transform">
              <span className="material-symbols-outlined text-lg">restaurant</span>
              <span className="font-semibold">吃什么？</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-secondary-container text-on-secondary-container rounded-xl hover:bg-secondary-container/80 transition-all">
              <span className="material-symbols-outlined text-lg">local_laundry_service</span>
              <span className="font-semibold">谁洗碗？</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-tertiary-container text-on-tertiary-container rounded-xl hover:bg-tertiary-container/80 transition-all">
              <span className="material-symbols-outlined text-lg">map</span>
              <span className="font-semibold">去哪玩？</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-error-container/20 text-error-dim rounded-xl hover:bg-error-container/30 transition-all">
              <span className="material-symbols-outlined text-lg">movie</span>
              <span className="font-semibold">看哪部？</span>
            </button>
          </div>
        </section>

        <section className="relative">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm text-center space-y-8 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-container/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-tertiary-container/20 rounded-full blur-3xl"></div>
            
            <div className="space-y-2 relative z-10">
              <h2 className="text-2xl font-bold font-headline text-on-surface">今天谁洗碗？</h2>
              <p className="text-on-surface-variant text-sm">解决每日小纠结，全靠命运之轮</p>
            </div>

            <div className="relative w-64 h-64 mx-auto z-10">
              <div 
                className="w-full h-full rounded-full border-8 border-white shadow-sm relative flex items-center justify-center overflow-hidden bg-gradient-to-tr from-primary-container via-surface-container to-secondary-container transition-transform duration-[3000ms] ease-out"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-1 bg-white/40 rotate-45"></div>
                  <div className="w-full h-1 bg-white/40 -rotate-45"></div>
                  <div className="w-full h-1 bg-white/40 rotate-90"></div>
                  <div className="w-full h-1 bg-white/40"></div>
                </div>
                <div className="z-10 bg-white rounded-full p-4 shadow-sm" style={{ transform: `rotate(${-rotation}deg)` }}>
                  <span className="material-symbols-outlined text-error text-3xl icon-filled">favorite</span>
                </div>
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
                <span className="material-symbols-outlined text-on-surface text-4xl leading-none">arrow_drop_down</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              <button 
                onClick={handleSpin}
                disabled={isSpinning}
                className="w-full py-5 bg-gradient-to-r from-primary to-primary-dim text-on-primary rounded-xl font-bold text-lg shadow-sm active:scale-95 transition-all disabled:opacity-50"
              >
                {isSpinning ? '命运转动中...' : '开始抽签'}
              </button>
              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-surface-container-high rounded-xl text-on-surface-variant font-semibold text-sm active:scale-95 transition-all">
                  编辑选项
                </button>
                <button className="flex-1 py-3 bg-surface-container-high rounded-xl text-on-surface-variant font-semibold text-sm active:scale-95 transition-all">
                  换个玩法
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-secondary-container/30 rounded-lg p-6 flex items-center justify-between shadow-sm overflow-hidden relative">
            <div className="space-y-1 z-10">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">Weekend Plan</span>
              <h3 className="text-xl font-bold text-on-secondary-container">周末去哪儿玩？</h3>
              <p className="text-xs text-on-secondary-container/70">已添加 8 个心动地点</p>
            </div>
            <div className="w-24 h-24 bg-white/40 rounded-full flex items-center justify-center -mr-4">
              <span className="material-symbols-outlined text-4xl text-secondary">explore</span>
            </div>
          </div>

          <div className="bg-tertiary-container/30 rounded-lg p-6 space-y-4 shadow-sm">
            <div className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary">casino</span>
            </div>
            <div>
              <h4 className="font-bold text-on-tertiary-container">掷骰子</h4>
              <p className="text-xs text-on-tertiary-container/60">比大小决定</p>
            </div>
          </div>

          <div className="bg-primary-container/30 rounded-lg p-6 space-y-4 shadow-sm">
            <div className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">style</span>
            </div>
            <div>
              <h4 className="font-bold text-on-primary-container">翻翻乐</h4>
              <p className="text-xs text-on-primary-container/60">随机翻开卡片</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold font-headline px-2">最近的纠结</h3>
          <div className="space-y-2">
            <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between group hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                  <span className="material-symbols-outlined text-xl">restaurant</span>
                </div>
                <div>
                  <p className="font-bold text-sm">晚餐吃火锅还是烤肉？</p>
                  <p className="text-xs text-on-surface-variant">3小时前 • 结果：烤肉</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">chevron_right</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between group hover:bg-surface-container-high transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-secondary shadow-sm">
                  <span className="material-symbols-outlined text-xl">shopping_bag</span>
                </div>
                <div>
                  <p className="font-bold text-sm">买这件裙子吗？</p>
                  <p className="text-xs text-on-surface-variant">昨天 • 结果：买买买</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant group-hover:text-secondary transition-colors">chevron_right</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
