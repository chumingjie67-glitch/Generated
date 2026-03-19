import React from 'react';

interface CoupleChallengesProps {
  onBack: () => void;
}

export default function CoupleChallenges({ onBack }: CoupleChallengesProps) {
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-32 absolute inset-0 z-50 overflow-y-auto">
      <header className="bg-[#fbf9f5] flex justify-between items-center px-6 py-4 w-full sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200">
            <span className="material-symbols-outlined text-gray-400">arrow_back</span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container">auto_awesome</span>
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight">Sweet Moments</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200">
            <span className="material-symbols-outlined text-gray-400">settings</span>
          </button>
        </div>
      </header>

      <main className="px-6 pt-4 max-w-2xl mx-auto space-y-8">
        <section className="space-y-2 pt-4">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-on-surface">双人挑战</h1>
          <p className="text-on-surface-variant text-base">通过这些温馨的小事，让感情悄悄升温 ✨</p>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-bold text-on-surface">进行中的挑战</h2>
            <span className="text-sm font-label text-primary font-semibold">查看全部 (3)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 bg-surface-container-lowest shadow-sm rounded-lg p-6 flex flex-col gap-4 border border-outline-variant/10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-secondary-container text-3xl icon-filled">sunny</span>
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg">30天早安问候</h3>
                    <p className="text-sm text-on-surface-variant">连续30天对TA说声早安</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-secondary-container/30 text-on-secondary-container rounded-full text-xs font-bold">DAY 18</span>
              </div>
              <div className="relative w-full h-8 bg-surface-container rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-secondary-container h-full rounded-full transition-all duration-700" style={{ width: '60%' }}>
                  <div className="w-full h-full bg-gradient-to-r from-transparent to-white/20"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-on-secondary-container">60% 完成</div>
              </div>
            </div>

            <div className="bg-surface-container-lowest shadow-sm rounded-lg p-5 flex flex-col justify-between gap-6 border border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-container icon-filled">movie</span>
                </div>
                <h3 className="font-headline font-bold leading-tight">看5部治愈电影</h3>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-label text-on-surface-variant mb-1">
                  <span>已观影 3/5</span>
                  <span>60%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest shadow-sm rounded-lg p-5 flex flex-col justify-between gap-6 border border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-tertiary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-tertiary-container icon-filled">restaurant</span>
                </div>
                <h3 className="font-headline font-bold leading-tight">解锁10家新餐厅</h3>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs font-label text-on-surface-variant mb-1">
                  <span>打卡 7/10</span>
                  <span>70%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="bg-tertiary-container h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-bold text-on-surface">成就勋章墙</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-label text-on-surface-variant">已解锁 12</span>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">emoji_events</span>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-8">
            <div className="grid grid-cols-3 gap-y-10 gap-x-4">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary-container opacity-20 scale-110"></div>
                  <span className="material-symbols-outlined text-primary text-3xl z-10 icon-filled">favorite</span>
                </div>
                <span className="text-[11px] font-bold text-center leading-tight">初见仪式感</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-secondary-container opacity-20 scale-110"></div>
                  <span className="material-symbols-outlined text-secondary text-3xl z-10 icon-filled">camera</span>
                </div>
                <span className="text-[11px] font-bold text-center leading-tight">光影捕捉者</span>
              </div>
              
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-error-container opacity-20 scale-110"></div>
                  <span className="material-symbols-outlined text-error text-3xl z-10 icon-filled">hiking</span>
                </div>
                <span className="text-[11px] font-bold text-center leading-tight">足迹开拓家</span>
              </div>
              
              <div className="flex flex-col items-center gap-3 opacity-30 grayscale">
                <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center border-2 border-dashed border-outline">
                  <span className="material-symbols-outlined text-outline text-2xl">lock</span>
                </div>
                <span className="text-[11px] font-bold text-center leading-tight">浪漫飞行</span>
              </div>
              
              <div className="flex flex-col items-center gap-3 opacity-30 grayscale">
                <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center border-2 border-dashed border-outline">
                  <span className="material-symbols-outlined text-outline text-2xl">lock</span>
                </div>
                <span className="text-[11px] font-bold text-center leading-tight">宅家大厨</span>
              </div>
              
              <div className="flex flex-col items-center gap-3 opacity-30 grayscale">
                <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center border-2 border-dashed border-outline">
                  <span className="material-symbols-outlined text-outline text-2xl">lock</span>
                </div>
                <span className="text-[11px] font-bold text-center leading-tight">晨间达人</span>
              </div>
            </div>
          </div>
        </section>

        <button className="w-full py-5 bg-primary text-on-primary rounded-xl font-headline font-bold text-lg shadow-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-95 duration-200">
          <span className="material-symbols-outlined">add</span>
          开启新挑战
        </button>
      </main>
    </div>
  );
}
