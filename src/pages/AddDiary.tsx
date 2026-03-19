import React, { useState } from 'react';
import { DiaryEntry } from '../types';
import { compressImage } from '../utils/image';

interface AddDiaryProps {
  onSave: (entry: DiaryEntry) => void;
  onCancel: () => void;
}

export default function AddDiary({ onSave, onCancel }: AddDiaryProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('happy');
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (!files.length) return;

    setIsUploading(true);
    try {
      for (const file of files) {
        const compressedDataUrl = await compressImage(file);
        setImages(prev => [...prev, compressedDataUrl]);
      }
    } catch (error) {
      console.error('Error compressing image', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    
    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
      isoDate: new Date().toISOString(),
      mood,
      images
    };
    
    onSave(newEntry);
  };

  const moods = [
    { id: 'happy', icon: 'sentiment_satisfied', label: '开心', color: 'text-error-container', bg: 'bg-macaron-pink' },
    { id: 'loved', icon: 'favorite', label: '被爱', color: 'text-error', bg: 'bg-macaron-pink' },
    { id: 'calm', icon: 'self_improvement', label: '平静', color: 'text-primary', bg: 'bg-macaron-blue' },
    { id: 'excited', icon: 'celebration', label: '激动', color: 'text-secondary', bg: 'bg-macaron-yellow' },
    { id: 'sad', icon: 'sentiment_dissatisfied', label: '难过', color: 'text-outline', bg: 'bg-surface-container' },
  ];

  return (
    <div className="space-y-6 pb-10">
      <div className="space-y-2">
        <label className="text-sm font-bold text-on-surface-variant px-1">今天的心情</label>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {moods.map(m => (
            <button
              key={m.id}
              onClick={() => setMood(m.id)}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all ${mood === m.id ? `border-primary ${m.bg}` : 'border-transparent bg-surface-container-lowest'}`}
            >
              <span className={`material-symbols-outlined text-2xl ${mood === m.id ? 'icon-filled' : ''} ${m.color}`}>
                {m.icon}
              </span>
              <span className="text-[10px] font-bold text-on-surface-variant">{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-on-surface-variant px-1">标题</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="给今天起个名字吧..."
          className="w-full bg-surface-container-lowest border-none rounded-2xl px-5 py-4 text-lg font-headline placeholder:text-outline/40 focus:ring-2 focus:ring-primary/30 transition-shadow shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-on-surface-variant px-1">日记内容</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="记录下今天的点点滴滴..."
          rows={8}
          className="w-full bg-surface-container-lowest border-none rounded-2xl px-5 py-4 text-base placeholder:text-outline/40 focus:ring-2 focus:ring-primary/30 transition-shadow shadow-sm resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-on-surface-variant px-1">添加图片</label>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {images.map((img, idx) => (
            <div key={idx} className="relative flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm">
              <img src={img} alt="preview" className="w-full h-full object-cover" />
              <button 
                onClick={() => setImages(images.filter((_, i) => i !== idx))}
                className="absolute top-1 right-1 bg-black/40 backdrop-blur-md text-white rounded-full p-1 flex items-center justify-center hover:bg-black/60 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          ))}
          <label className="flex-shrink-0 w-24 h-24 rounded-2xl border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center text-outline-variant hover:bg-surface-container transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={!title.trim() || !content.trim() || isUploading}
        className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-sm active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100 mt-8"
      >
        {isUploading ? '正在处理图片...' : '保存日记'}
      </button>
    </div>
  );
}
