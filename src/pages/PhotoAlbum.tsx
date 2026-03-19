import React, { useState } from 'react';
import { Photo } from '../types';
import { compressImage } from '../utils/image';

interface PhotoAlbumProps {
  photos: Photo[];
  onAddPhoto: (photo: Photo) => void;
  onDeletePhoto: (id: string) => void;
  showToast: (msg: string) => void;
}

export default function PhotoAlbum({ photos, onAddPhoto, onDeletePhoto, showToast }: PhotoAlbumProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (!files.length) return;

    setIsUploading(true);

    try {
      for (const file of files) {
        const compressedDataUrl = await compressImage(file);
        const newPhoto: Photo = {
          id: Date.now().toString() + Math.random().toString(36).substring(7),
          url: compressedDataUrl,
          date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
          uploadedBy: '我' // In a real app, this would be the current user's name
        };
        onAddPhoto(newPhoto);
      }
      showToast('照片上传成功！');
    } catch (error) {
      console.error('Error compressing image', error);
      showToast('照片上传失败');
    } finally {
      setIsUploading(false);
    }
  };

  if (selectedPhoto) {
    return (
      <div className="bg-background text-on-surface font-body min-h-screen flex flex-col items-center absolute inset-0 z-50 overflow-y-auto">
        <header className="fixed top-0 w-full z-50 bg-white/20 backdrop-blur-xl flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedPhoto(null)} className="text-blue-400 hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-200">
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <h1 className="font-headline font-semibold text-lg text-blue-500">心动瞬间</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => {
                if (window.confirm('确定要删除这张照片吗？')) {
                  onDeletePhoto(selectedPhoto.id);
                  setSelectedPhoto(null);
                  showToast('照片已删除');
                }
              }}>
              <span className="material-symbols-outlined text-slate-500">delete</span>
            </button>
          </div>
        </header>

        <main className="w-full max-w-lg mx-auto pt-20 pb-32 px-4 flex flex-col items-center">
          <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-[0_24px_48px_rgba(0,0,0,0.06)] group">
            <img src={selectedPhoto.url} alt="fullscreen" className="w-full h-full object-cover" />
            
            <div className="absolute bottom-6 left-4 right-4 bg-secondary-container/80 backdrop-blur-2xl rounded-xl p-6 shadow-xl border border-white/30">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary-container">person</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-label text-on-secondary-container opacity-60">由</p>
                    <p className="text-sm font-semibold text-on-secondary-container">{selectedPhoto.uploadedBy} 上传</p>
                  </div>
                </div>
                <div className="bg-white/40 px-3 py-1 rounded-full">
                  <p className="text-[11px] font-label text-on-secondary-container font-medium">{selectedPhoto.date}</p>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-on-secondary-container text-base leading-relaxed tracking-wide">
                  {selectedPhoto.description || '美好的瞬间，值得被记录。'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 bg-error-container/20 px-4 py-2 rounded-full active:scale-90 transition-all duration-300">
                    <span className="material-symbols-outlined text-error text-xl icon-filled">favorite</span>
                    <span className="text-xs font-bold text-on-error-container">1</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-10 space-y-4">
            <h2 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2">
              <span className="w-2 h-6 bg-primary-fixed rounded-full"></span>
              更多美好
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {photos.filter(p => p.id !== selectedPhoto.id).slice(0, 2).map(photo => (
                <div key={photo.id} className="aspect-square bg-tertiary-container rounded-lg overflow-hidden relative cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
                  <img src={photo.url} alt="album" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div className="mb-8">
        <h2 className="font-headline text-2xl font-bold text-on-surface tracking-tight">心动瞬间相册</h2>
        <p className="text-on-surface-variant text-sm mt-1">记录我们每一次心跳加速的瞬间</p>
      </div>

      {photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-5xl text-outline-variant">photo_library</span>
          </div>
          <p className="text-on-surface-variant font-medium">相册还是空的哦，<br/>快来上传你们的甜蜜合照吧！</p>
        </div>
      ) : (
        <div className="columns-2 gap-5 space-y-5">
          {photos.map(photo => (
            <div 
              key={photo.id} 
              className="break-inside-avoid bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.03)] group cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative">
                <img src={photo.url} alt="album" className="w-full h-auto" />
                <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-error-container text-[16px] icon-filled">favorite</span>
                  <span className="text-[11px] font-bold text-on-surface">1</span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary-container overflow-hidden flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-on-primary-container">person</span>
                  </div>
                  <span className="text-[11px] font-semibold text-on-surface-variant">由 {photo.uploadedBy} 上传</span>
                </div>
                <p className="text-sm text-on-surface leading-snug">{photo.description || '美好的瞬间，值得被记录。'}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <label className="fixed bottom-28 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-90 transition-all duration-300 z-40 cursor-pointer">
        <span className="material-symbols-outlined text-2xl">add_photo_alternate</span>
        <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={isUploading} />
      </label>
    </div>
  );
}
