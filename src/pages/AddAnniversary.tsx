import React, { useState } from 'react';
import { Anniversary } from '../types';

interface AddAnniversaryProps {
  onSave: (anniversary: Anniversary) => void;
  onCancel: () => void;
}

export default function AddAnniversary({ onSave, onCancel }: AddAnniversaryProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [reminderDaysBefore, setReminderDaysBefore] = useState<number | undefined>(undefined);

  const handleSave = () => {
    if (!title || !date) return;

    const newAnniversary: Anniversary = {
      id: Date.now().toString(),
      title,
      date,
      notes: notes || undefined,
      reminderDaysBefore
    };

    onSave(newAnniversary);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-on-surface">添加纪念日</h2>
        <button 
          onClick={onCancel}
          className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            纪念日名称
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例如：相识纪念日"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            日期
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            提醒设置
          </label>
          <select
            value={reminderDaysBefore === undefined ? '' : reminderDaysBefore}
            onChange={(e) => setReminderDaysBefore(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
          >
            <option value="">不提醒</option>
            <option value="0">当天提醒</option>
            <option value="1">提前1天提醒</option>
            <option value="3">提前3天提醒</option>
            <option value="7">提前7天提醒</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            备注 (选填)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="写点什么..."
            rows={4}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-2xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!title || !date}
          className="w-full bg-primary text-on-primary py-4 rounded-2xl font-medium shadow-md hover:shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
        >
          保存
        </button>
      </div>
    </div>
  );
}
