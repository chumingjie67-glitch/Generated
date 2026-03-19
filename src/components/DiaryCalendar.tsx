import React, { useState, useMemo } from 'react';
import { DiaryEntry } from '../types';
import { shareEntry } from '../utils/share';

interface DiaryCalendarProps {
  entries: DiaryEntry[];
  onToggleFavorite: (id: string) => void;
  showToast: (msg: string) => void;
}

export default function DiaryCalendar({ entries, onToggleFavorite, showToast }: DiaryCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Helpers
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Parse entries to map by date string (YYYY-MM-DD)
  const entriesByDate = useMemo(() => {
    const map: Record<string, DiaryEntry[]> = {};
    entries.forEach(entry => {
      let d: Date;
      if (entry.isoDate) {
        d = new Date(entry.isoDate);
      } else {
        const match = entry.date.match(/(\d+)年(\d+)月(\d+)日/);
        if (match) {
          d = new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
        } else {
          d = new Date(parseInt(entry.id));
        }
      }
      const dateStr = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      if (!map[dateStr]) map[dateStr] = [];
      map[dateStr].push(entry);
    });
    return map;
  }, [entries]);

  const renderDays = () => {
    const days = [];
    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${month + 1}-${d}`;
      const dayEntries = entriesByDate[dateStr] || [];
      const isSelected = selectedDate?.getFullYear() === year && selectedDate?.getMonth() === month && selectedDate?.getDate() === d;
      const isToday = new Date().getFullYear() === year && new Date().getMonth() === new Date().getMonth() && new Date().getDate() === d;

      days.push(
        <button
          key={d}
          onClick={() => setSelectedDate(new Date(year, month, d))}
          className={`h-10 w-10 mx-auto flex flex-col items-center justify-center rounded-full relative transition-colors ${
            isSelected ? 'bg-primary text-white shadow-md' : 
            isToday ? 'bg-primary-container/30 text-primary font-bold' : 'text-on-surface hover:bg-surface-container'
          }`}
        >
          <span className="text-sm">{d}</span>
          {dayEntries.length > 0 && (
            <div className="absolute bottom-1 flex gap-0.5">
              {dayEntries.slice(0, 3).map((_, i) => (
                <div key={i} className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-error-container'}`}></div>
              ))}
            </div>
          )}
        </button>
      );
    }
    return days;
  };

  const selectedDateStr = selectedDate ? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}` : '';
  const selectedEntries = selectedDateStr ? (entriesByDate[selectedDateStr] || []) : [];

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

  return (
    <div className="space-y-6">
      <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-sm border border-white/60">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h3 className="font-headline font-bold text-lg">{year}年 {month + 1}月</h3>
          <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
          {['日', '一', '二', '三', '四', '五', '六'].map(day => (
            <div key={day} className="text-xs font-bold text-outline-variant">{day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-y-2">
          {renderDays()}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-bold text-on-surface px-1">
          {selectedDate ? `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日 的日记` : '请选择日期'}
        </h4>
        
        {selectedEntries.length === 0 ? (
          <div className="text-center py-10 text-outline-variant text-sm bg-surface-container-low rounded-3xl border border-white/40">
            这一天没有写日记哦~
          </div>
        ) : (
          selectedEntries.map(entry => {
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
          })
        )}
      </div>
    </div>
  );
}
