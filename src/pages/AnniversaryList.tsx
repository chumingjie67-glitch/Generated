import React, { useState } from 'react';
import { Anniversary } from '../types';

interface AnniversaryListProps {
  anniversaries: Anniversary[];
  onAdd: () => void;
  onDelete: (id: string) => void;
}

export default function AnniversaryList({ anniversaries, onAdd, onDelete }: AnniversaryListProps) {
  const calculateDays = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(dateStr);
    targetDate.setHours(0, 0, 0, 0);
    
    // Calculate days since
    const diffTime = today.getTime() - targetDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate next anniversary
    const nextAnniversary = new Date(targetDate);
    nextAnniversary.setFullYear(today.getFullYear());
    
    if (nextAnniversary.getTime() < today.getTime()) {
      nextAnniversary.setFullYear(today.getFullYear() + 1);
    }
    
    const nextDiffTime = nextAnniversary.getTime() - today.getTime();
    const nextDiffDays = Math.ceil(nextDiffTime / (1000 * 60 * 60 * 24));
    
    return {
      daysSince: diffDays >= 0 ? diffDays : 0,
      daysUntilNext: nextDiffDays,
      isFuture: diffDays < 0
    };
  };

  // Sort by days until next anniversary
  const sortedAnniversaries = [...anniversaries].sort((a, b) => {
    const daysA = calculateDays(a.date).daysUntilNext;
    const daysB = calculateDays(b.date).daysUntilNext;
    return daysA - daysB;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-on-surface">纪念日</h2>
        <button 
          onClick={onAdd}
          className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      {sortedAnniversaries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-outline">event</span>
          </div>
          <p className="text-outline font-medium">还没有添加纪念日</p>
          <p className="text-sm text-outline-variant">记录下你们的重要时刻吧</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedAnniversaries.map(anniversary => {
            const { daysSince, daysUntilNext, isFuture } = calculateDays(anniversary.date);
            
            return (
              <div key={anniversary.id} className="bg-surface-container-lowest p-5 rounded-3xl shadow-sm border border-white/60 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
                
                <button 
                  onClick={() => onDelete(anniversary.id)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-error/10 text-error opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-on-surface mb-1">{anniversary.title}</h3>
                    <p className="text-sm text-outline">{anniversary.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-primary font-medium mb-1">
                      {daysUntilNext === 0 ? '就是今天！' : `还有 ${daysUntilNext} 天`}
                    </div>
                    {!isFuture && (
                      <div className="text-sm text-outline-variant">
                        已经 <span className="text-primary font-bold text-lg">{daysSince}</span> 天
                      </div>
                    )}
                  </div>
                </div>

                {anniversary.notes && (
                  <div className="bg-surface-container/30 p-3 rounded-2xl text-sm text-on-surface-variant">
                    {anniversary.notes}
                  </div>
                )}
                
                {anniversary.reminderDaysBefore !== undefined && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-outline-variant">
                    <span className="material-symbols-outlined text-[14px]">notifications</span>
                    提前 {anniversary.reminderDaysBefore} 天提醒
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
