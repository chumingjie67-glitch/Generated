import React, { useState, useEffect, useRef } from 'react';
import { DiaryEntry } from '../types';
import { shareEntry } from '../utils/share';
import { View } from '../App';

interface HomeProps {
  onNavigate: (view: View) => void;
  entries: DiaryEntry[];
  onToggleFavorite: (id: string) => void;
  showToast: (msg: string) => void;
}

export default function Home({ onNavigate, entries, onToggleFavorite, showToast }: HomeProps) {
  const [memoryEntry, setMemoryEntry] = useState<DiaryEntry | null>(null);
  const [moodFilter, setMoodFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const initialized = useRef(false);

  const pickRandomMemory = (forceNew: boolean = false) => {
    if (!entries || entries.length === 0) {
      setMemoryEntry(null);
      return;
    }
    
    let availableEntries = entries;
    
    // Apply Filters
    if (moodFilter) {
      availableEntries = availableEntries.filter(e => e.mood === moodFilter);
    }
    
    if (dateFilter) {
      const now = new Date();
      availableEntries = availableEntries.filter(e => {
        const d = e.isoDate ? new Date(e.isoDate) : new Date(parseInt(e.id));
        const diffTime = Math.abs(now.getTime() - d.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (dateFilter === 'past-week') return diffDays <= 7;
        if (dateFilter === 'past-month') return diffDays <= 30;
        if (dateFilter === 'past-year') return diffDays <= 365;
        return true;
      });
    }

    if (availableEntries.length === 0) {
      setMemoryEntry(null);
      return;
    }

    const today = new Date().toLocaleDateString();
    const storedMemory = localStorage.getItem('sweet-moments-daily-memory');
    
    // Only use stored memory if no filters are active and not forcing new
    if (!forceNew && !moodFilter && !dateFilter && storedMemory) {
      try {
        const { date, entryId } = JSON.parse(storedMemory);
        if (date === today) {
          const found = availableEntries.find(e => e.id === entryId);
          if (found) {
            setMemoryEntry(found);
            return;
          }
        }
      } catch (e) {}
    }

    // If forcing new and we have more than 1 entry, don't pick the same one
    if (forceNew && availableEntries.length > 1 && memoryEntry) {
      availableEntries = availableEntries.filter(e => e.id !== memoryEntry.id);
    }
    
    const randomIndex = Math.floor(Math.random() * availableEntries.length);
    const selected = availableEntries[randomIndex];
    setMemoryEntry(selected);
    
    // Save for today only if no filters
    if (!moodFilter && !dateFilter) {
      localStorage.setItem('sweet-moments-daily-memory', JSON.stringify({
        date: today,
        entryId: selected.id
      }));
    }
  };

  // Re-run pick when filters change
  useEffect(() => {
    if (initialized.current) {
      pickRandomMemory(true);
    }
  }, [moodFilter, dateFilter]);

  // Keep memoryEntry in sync with entries (for favorite toggle) and initial load
  useEffect(() => {
    if (memoryEntry) {
      const updated = entries.find(e => e.id === memoryEntry.id);
      if (updated) {
        setMemoryEntry(updated);
      }
    } else if (!initialized.current) {
      pickRandomMemory();
      initialized.current = true;
    }
  }, [entries]);

  return (
    <div className="space-y-8">
      <section className="relative mt-2">
          <h2 className="text-2xl font-headline font-extrabold text-on-surface mb-4">
              早安，亲爱的！<br/>
              <span className="text-primary/80 text-xl font-semibold">今天也是充满爱的一天 ✨</span>
          </h2>

          <div className="relative group mt-6">
              <div className="absolute inset-0 bg-secondary-container/30 rounded-2xl blur-xl transform translate-y-3 scale-95"></div>
              <div className="relative bg-secondary-container/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm flex flex-col justify-between transform -rotate-2 hover:rotate-0 transition-transform duration-300 border border-white/50">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 backdrop-blur-md rotate-2 rounded-sm shadow-sm"></div>
                  
                  <div className="font-['Kaiti','STKaiti',serif] tracking-wide">
                      <p className="text-lg text-on-secondary-container leading-relaxed font-medium">
                          “今天降温啦，记得多穿件外套哦！晚上下班我去接你，一起去吃那家心心念念的火锅~ 爱你 ❤️”
                      </p>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                      <span className="text-xs font-bold text-on-secondary-container/60">FROM: 你的大猪蹄子</span>
                      <div className="flex gap-2">
                          <button className="bg-white/50 p-1.5 rounded-full hover:bg-white/80 transition-colors">
                              <span className="material-symbols-outlined text-on-secondary-container text-sm">edit</span>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-4 -mx-5 px-5">
              <button onClick={() => onNavigate('water')} className="flex-shrink-0 flex flex-col items-center gap-2 group active:scale-95 transition-transform">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-macaron-blue flex items-center justify-center shadow-sm border border-white group-hover:shadow-md transition-shadow">
                      <span className="material-symbols-outlined text-primary text-2xl icon-filled">water_drop</span>
                  </div>
                  <span className="text-[11px] font-semibold text-on-surface-variant">记饮水</span>
              </button>
              <button onClick={() => onNavigate('decider')} className="flex-shrink-0 flex flex-col items-center gap-2 group active:scale-95 transition-transform">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-macaron-purple flex items-center justify-center shadow-sm border border-white group-hover:shadow-md transition-shadow">
                      <span className="material-symbols-outlined text-tertiary text-2xl icon-filled">casino</span>
                  </div>
                  <span className="text-[11px] font-semibold text-on-surface-variant">决策器</span>
              </button>
              <button onClick={() => onNavigate('add-diary')} className="flex-shrink-0 flex flex-col items-center gap-2 group active:scale-95 transition-transform">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-macaron-pink flex items-center justify-center shadow-sm border border-white group-hover:shadow-md transition-shadow">
                      <span className="material-symbols-outlined text-error-container text-2xl icon-filled">mood</span>
                  </div>
                  <span className="text-[11px] font-semibold text-on-surface-variant">写日记</span>
              </button>
              <button onClick={() => onNavigate('challenges')} className="flex-shrink-0 flex flex-col items-center gap-2 group active:scale-95 transition-transform">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-macaron-yellow flex items-center justify-center shadow-sm border border-white group-hover:shadow-md transition-shadow">
                      <span className="material-symbols-outlined text-secondary text-2xl icon-filled">auto_awesome</span>
                  </div>
                  <span className="text-[11px] font-semibold text-on-surface-variant">双人挑战</span>
              </button>
              <button onClick={() => onNavigate('wish')} className="flex-shrink-0 flex flex-col items-center gap-2 group active:scale-95 transition-transform">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-macaron-green flex items-center justify-center shadow-sm border border-white group-hover:shadow-md transition-shadow">
                      <span className="material-symbols-outlined text-green-600 text-2xl icon-filled">redeem</span>
                  </div>
                  <span className="text-[11px] font-semibold text-on-surface-variant">许愿池</span>
              </button>
          </div>
      </section>

      <section>
          <div className="flex items-center justify-between mb-3">
              <h3 className="font-headline text-lg font-bold text-on-surface">今日概览</h3>
              <button className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">查看全部</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1 bg-macaron-blue/50 rounded-3xl p-5 flex flex-col justify-between aspect-square relative overflow-hidden shadow-sm border border-white/60 cursor-pointer hover:bg-macaron-blue/60 transition-colors" onClick={() => onNavigate('water')}>
                  <div className="flex justify-between items-start z-10">
                      <div className="bg-white/60 p-2 rounded-2xl backdrop-blur-sm">
                          <span className="material-symbols-outlined text-primary icon-filled">local_drink</span>
                      </div>
                      <button className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform">
                          <span className="material-symbols-outlined text-lg">add</span>
                      </button>
                  </div>
                  <div className="z-10 mt-auto">
                      <h4 className="font-bold text-on-surface text-lg">饮水打卡</h4>
                      <p className="text-xs text-on-surface-variant mb-2 font-medium">1200 / 2000 ml</p>
                      <div className="w-full bg-white/60 h-2.5 rounded-full overflow-hidden backdrop-blur-sm">
                          <div className="bg-primary h-full rounded-full relative" style={{ width: '60%' }}>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30"></div>
                          </div>
                      </div>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              </div>

              <div className="col-span-1 flex flex-col gap-3">
                  <div className="flex-1 bg-macaron-pink/50 rounded-3xl p-4 flex flex-col justify-center relative overflow-hidden shadow-sm border border-white/60">
                      <div className="flex items-center gap-3 z-10">
                          <div className="bg-white/60 p-2 rounded-2xl backdrop-blur-sm">
                              <span className="material-symbols-outlined text-error-container icon-filled">favorite</span>
                          </div>
                          <div>
                              <h4 className="font-bold text-on-surface text-sm">心情极佳</h4>
                              <p className="text-[10px] text-on-surface-variant">晴子很开心</p>
                          </div>
                      </div>
                      <div className="absolute -top-4 -right-4 w-16 h-16 bg-error-container/10 rounded-full blur-xl"></div>
                  </div>

                  <div className="flex-1 bg-macaron-yellow/50 rounded-3xl p-4 flex flex-col justify-center relative overflow-hidden shadow-sm border border-white/60">
                      <div className="flex items-center gap-3 z-10">
                          <div className="bg-white/60 p-2 rounded-2xl backdrop-blur-sm">
                              <span className="material-symbols-outlined text-secondary icon-filled">event</span>
                          </div>
                          <div>
                              <h4 className="font-bold text-on-surface text-sm">周末计划</h4>
                              <p className="text-[10px] text-on-surface-variant">自驾游摄影</p>
                          </div>
                      </div>
                      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/10 rounded-full blur-xl"></div>
                  </div>
              </div>
          </div>
      </section>

      <section className="bg-[#fde8e8] rounded-[2rem] p-6 shadow-sm relative overflow-hidden flex items-center justify-between border border-pink-100">
          <div className="flex-1">
              <h4 className="text-pink-600 font-bold text-sm mb-1">距离 <span className="text-pink-700">恋爱一周年</span> 还有</h4>
              <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-headline font-black text-pink-700">32</span>
                  <span className="text-lg font-bold text-pink-600/80">天</span>
              </div>
          </div>
          <div className="flex items-center justify-center bg-white/60 w-16 h-16 rounded-2xl shadow-sm rotate-3">
              <span className="material-symbols-outlined text-pink-500 text-4xl icon-filled">featured_seasonal</span>
          </div>
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-200/40 rounded-full blur-2xl"></div>
      </section>

      {/* Memory Lane Section */}
      {entries && entries.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
              <h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">history_toggle_off</span>
                  往日时光
              </h3>
              <div className="flex items-center gap-2">
                  <button 
                      onClick={() => setShowFilters(!showFilters)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${showFilters || moodFilter || dateFilter ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'}`}
                  >
                      <span className="material-symbols-outlined text-[16px]">filter_list</span>
                  </button>
                  <button 
                      onClick={() => pickRandomMemory(true)}
                      className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full flex items-center gap-1 active:scale-95 transition-transform"
                  >
                      <span className="material-symbols-outlined text-[14px]">refresh</span>
                      换一个
                  </button>
              </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
              <div className="mb-4 p-4 bg-surface-container-lowest rounded-2xl border border-white/60 shadow-sm space-y-3">
                  <div>
                      <p className="text-xs font-bold text-outline-variant mb-2">按心情筛选</p>
                      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                          <button onClick={() => setMoodFilter(null)} className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${!moodFilter ? 'bg-primary text-white border-primary' : 'bg-transparent text-on-surface-variant border-outline-variant/30'}`}>全部</button>
                          <button onClick={() => setMoodFilter('happy')} className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${moodFilter === 'happy' ? 'bg-macaron-pink text-error-container border-error-container/30' : 'bg-transparent text-on-surface-variant border-outline-variant/30'}`}>开心</button>
                          <button onClick={() => setMoodFilter('loved')} className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${moodFilter === 'loved' ? 'bg-macaron-pink text-error border-error/30' : 'bg-transparent text-on-surface-variant border-outline-variant/30'}`}>充满爱</button>
                          <button onClick={() => setMoodFilter('calm')} className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${moodFilter === 'calm' ? 'bg-macaron-blue text-primary border-primary/30' : 'bg-transparent text-on-surface-variant border-outline-variant/30'}`}>平静</button>
                          <button onClick={() => setMoodFilter('excited')} className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${moodFilter === 'excited' ? 'bg-macaron-yellow text-secondary border-secondary/30' : 'bg-transparent text-on-surface-variant border-outline-variant/30'}`}>激动</button>
                          <button onClick={() => setMoodFilter('sad')} className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${moodFilter === 'sad' ? 'bg-surface-container text-outline border-outline/30' : 'bg-transparent text-on-surface-variant border-outline-variant/30'}`}>难过</button>
                      </div>
                  </div>
                  <div>
                      <p className="text-xs font-bold text-outline-variant mb-2">按时间筛选</p>
                      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                          <button onClick={() => setDateFilter(null)} className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${!dateFilter ? 'bg-primary text-white border-primary' : 'bg-transparent text-on-surface-variant border-outline-variant/30'}`}>全部</button>
                          <button onClick={() => setDateFilter('past-week')} className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${dateFilter === 'past-week' ? 'bg-primary text-white border-primary' : 'bg-transparent text-on-surface-variant border-outline-variant/30'}`}>最近一周</button>
                          <button onClick={() => setDateFilter('past-month')} className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${dateFilter === 'past-month' ? 'bg-primary text-white border-primary' : 'bg-transparent text-on-surface-variant border-outline-variant/30'}`}>最近一月</button>
                          <button onClick={() => setDateFilter('past-year')} className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${dateFilter === 'past-year' ? 'bg-primary text-white border-primary' : 'bg-transparent text-on-surface-variant border-outline-variant/30'}`}>最近一年</button>
                      </div>
                  </div>
              </div>
          )}
          
          {memoryEntry ? (
              <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-sm border border-white/60 relative overflow-hidden group">
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                  
                  {/* Favorite Button */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                      <button 
                          onClick={() => shareEntry(memoryEntry, () => showToast('已分享'), (err) => showToast(err))}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                      >
                          <span className="material-symbols-outlined text-[18px] text-outline-variant">
                              share
                          </span>
                      </button>
                      <button 
                          onClick={() => onToggleFavorite(memoryEntry.id)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                      >
                          <span className={`material-symbols-outlined text-[18px] ${memoryEntry.isFavorite ? 'icon-filled text-error' : 'text-outline-variant'}`}>
                              favorite
                          </span>
                      </button>
                  </div>

                  <div className="flex justify-between items-start mb-3 relative z-10 pr-20">
                      <div>
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-md mb-2 inline-block">
                              那年今日 · {memoryEntry.date}
                          </span>
                          <h4 className="font-bold text-on-surface text-base leading-tight">{memoryEntry.title}</h4>
                      </div>
                      <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-sm text-on-surface-variant">
                              {memoryEntry.mood === 'happy' ? 'sentiment_satisfied' : 
                               memoryEntry.mood === 'loved' ? 'favorite' : 
                               memoryEntry.mood === 'calm' ? 'self_improvement' : 
                               memoryEntry.mood === 'excited' ? 'celebration' : 
                               memoryEntry.mood === 'sad' ? 'sentiment_dissatisfied' : 'mood'}
                          </span>
                      </div>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3 relative z-10 whitespace-pre-wrap">
                      {memoryEntry.content}
                  </p>
                  {memoryEntry.images && memoryEntry.images.length > 0 && (
                      <div className="mt-3 flex gap-2 overflow-x-auto hide-scrollbar relative z-10">
                          {memoryEntry.images.map((img, idx) => (
                              <img key={idx} src={img} alt="memory" className="w-16 h-16 object-cover rounded-lg flex-shrink-0 border border-outline-variant/20 shadow-sm" />
                          ))}
                      </div>
                  )}
              </div>
          ) : (
              <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-sm border border-white/60 text-center">
                  <p className="text-sm text-on-surface-variant">没有找到符合条件的回忆哦~</p>
              </div>
          )}
        </section>
      )}
    </div>
  );
}
