import React, { useState } from 'react';

interface AddWishProps {
  onBack: () => void;
}

export default function AddWish({ onBack }: AddWishProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('travel_explore');
  const [selectedColor, setSelectedColor] = useState('#a4d8fc');
  const [syncWithPartner, setSyncWithPartner] = useState(true);

  const icons = ['travel_explore', 'favorite', 'restaurant', 'movie', 'celebration', 'auto_stories'];
  const colors = ['#a4d8fc', '#f4e29b', '#fa746f', '#f2d2fe', '#d2f4d3'];

  return (
    <div className="bg-background font-body text-on-surface min-h-screen pb-32 absolute inset-0 z-50 overflow-y-auto">
      <header className="flex items-center justify-between px-6 h-16 w-full sticky top-0 bg-[#fbf9f5] z-50">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-[#a4d8fc] hover:opacity-80 transition-opacity scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 className="font-headline text-2xl font-semibold">添加愿望</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="pt-8 px-6 max-w-2xl mx-auto space-y-10">
        <section className="space-y-4">
          <label className="font-headline font-semibold text-lg px-2 block">你的愿望是什么？</label>
          <div className="relative group">
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container-lowest border-none rounded-xl px-6 py-5 text-xl font-headline placeholder:text-outline/40 focus:ring-4 focus:ring-primary-container/30 transition-all shadow-sm" 
              placeholder="去山里看星星..." 
              type="text"
            />
          </div>
        </section>

        <section className="space-y-4">
          <label className="font-headline font-semibold text-lg px-2 block">选择一个图标</label>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 px-1">
            {icons.map(icon => (
              <button 
                key={icon}
                onClick={() => setSelectedIcon(icon)}
                className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center scale-95 active:scale-90 transition-all ${
                  selectedIcon === icon 
                    ? 'bg-primary-container text-on-primary-container' 
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                <span className={`material-symbols-outlined text-2xl ${selectedIcon === icon ? 'icon-filled' : ''}`}>{icon}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <label className="font-headline font-semibold text-lg px-2 block">备注</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-surface-container-lowest border-none rounded-xl px-6 py-4 text-base placeholder:text-outline/40 focus:ring-4 focus:ring-primary-container/30 transition-all shadow-sm resize-none" 
            placeholder="也许我们可以等秋天叶子变黄的时候去..." 
            rows={4}
          ></textarea>
        </section>

        <section className="space-y-4">
          <label className="font-headline font-semibold text-lg px-2 block">卡片颜色</label>
          <div className="flex justify-between items-center bg-surface-container-low p-4 rounded-xl">
            {colors.map(color => (
              <button 
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full transition-transform ${
                  selectedColor === color ? 'ring-4 ring-white shadow-md scale-110' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-between bg-surface-container-lowest p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-error-container/20 flex items-center justify-center text-error">
              <span className="material-symbols-outlined icon-filled">favorite</span>
            </div>
            <div>
              <h3 className="font-headline font-bold">与伴侣同步</h3>
              <p className="text-sm text-outline">让TA也能看到这个愿望</p>
            </div>
          </div>
          <button 
            onClick={() => setSyncWithPartner(!syncWithPartner)}
            className={`w-14 h-8 rounded-full relative flex items-center px-1 transition-colors ${
              syncWithPartner ? 'bg-primary' : 'bg-surface-container-high'
            }`}
          >
            <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${
              syncWithPartner ? 'translate-x-6' : 'translate-x-0'
            }`}></div>
          </button>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/90 to-transparent pt-12 z-40">
        <button 
          onClick={onBack}
          disabled={!title.trim()}
          className="w-full bg-primary text-on-primary font-headline font-bold text-lg py-5 rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          创建愿望
        </button>
      </div>
    </div>
  );
}
