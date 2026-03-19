import React, { useState, useMemo } from 'react';
import { DiaryEntry } from '../types';
import DiaryCalendar from '../components/DiaryCalendar';
import { shareEntry } from '../utils/share';

interface DiaryListProps {
  entries: DiaryEntry[];
  onAdd: () => void;
  onToggleFavorite: (id: string) => void;
  showToast: (msg: string) => void;
}

export default function DiaryList({ entries, onAdd, onToggleFavorite, showToast }: DiaryListProps) {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return { icon: 'sentiment_satisfied', color: 'text-error-container', bg: 'bg-macaron-pink' };
      case 'loved': return { icon: 'favorite', color: 'text-error', bg: 'bg-macaron-pink' };
      case 'calm': return { icon: 'self_improvement', color: 'text-primary', bg: 'bg-macaron-blue' };
      case 'excited': return { icon: 'celebration', color: 'text-secondary', bg: 'bg-macaron-yellow' };
      case 'sad': return { icon: 'sentiment_dissatisfied', color: 'text-outline', bg: 'bg-surface-container' };
      default: return { icon: 'mood', color: 'text-secondary', bg: 'bg-macaron-yellow' };
    }
  };

  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return entries;
    const query = searchQuery.toLowerCase();
    return entries.filter(entry => 
      entry.title.toLowerCase().includes(query) || 
      entry.content.toLowerCase().includes(query) ||
      entry.date.toLowerCase().includes(query)
    );
  }, [entries, searchQuery]);

  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-headline font-extrabold text-on-surface">我们的日记</h2>
        
        <div className="flex bg-surface-container-low rounded-full p-1 shadow-inner border border-outline-variant/10">
          <button 
            onClick={() => setViewMode('list')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-outline-variant hover:text-on-surface'}`}
          >
            列表
          </button>
          <button 
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${viewMode === 'calendar' ? 'bg-white text-primary shadow-sm' : 'text-outline-variant hover:text-on-surface'}`}
          >
            日历
          </button>
        </div>
      </div>

      {viewMode === 'list' && (
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">
            search
          </span>
          <input
            type="text"
            placeholder="搜索日记标题、内容或日期..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl pl-12 pr-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      )}

      {viewMode === 'calendar' ? (
        <DiaryCalendar entries={entries} onToggleFavorite={onToggleFavorite} showToast={showToast} />
      ) : filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-outline-variant">
              {searchQuery ? 'search_off' : 'auto_stories'}
            </span>
          </div>
          <p className="text-on-surface-variant font-medium">
            {searchQuery ? '没有找到相关的日记' : '还没有日记哦，\n快来记录你们的甜蜜瞬间吧！'}
          </p>
          {!searchQuery && (
            <button 
              onClick={onAdd}
              className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-bold shadow-sm active:scale-95 transition-transform"
            >
              写第一篇日记
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map(entry => {
            const moodStyle = getMoodIcon(entry.mood);
            return (
              <div key={entry.id} className="bg-surface-container-lowest p-5 rounded-3xl shadow-sm border border-white/60 relative overflow-hidden group">
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    <button 
                        onClick={() => shareEntry(entry, () => showToast('已分享'), (err) => showToast(err))}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                    >
                        <span className="material-symbols-outlined text-[18px] text-outline-variant">
                            share
                        </span>
                    </button>
                    <button 
                        onClick={() => onToggleFavorite(entry.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/50 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
                    >
                        <span className={`material-symbols-outlined text-[18px] ${entry.isFavorite ? 'icon-filled text-error' : 'text-outline-variant'}`}>
                            favorite
                        </span>
                    </button>
                </div>
                <div className="flex justify-between items-start mb-3 pr-20">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${moodStyle.bg}`}>
                      <span className={`material-symbols-outlined icon-filled ${moodStyle.color}`}>{moodStyle.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-lg leading-tight">{entry.title}</h3>
                      <span className="text-[11px] text-outline font-medium">{entry.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3 whitespace-pre-wrap">
                  {entry.content}
                </p>
                {entry.images && entry.images.length > 0 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                    {entry.images.map((img, idx) => (
                      <img key={idx} src={img} alt="diary attachment" className="w-20 h-20 object-cover rounded-xl flex-shrink-0 border border-outline-variant/20 shadow-sm" />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
