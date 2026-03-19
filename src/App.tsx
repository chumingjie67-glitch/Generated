/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Home from './pages/Home';
import DiaryList from './pages/DiaryList';
import AddDiary from './pages/AddDiary';
import PhotoAlbum from './pages/PhotoAlbum';
import WaterIntake from './pages/WaterIntake';
import LoveDecider from './pages/LoveDecider';
import AddWish from './pages/AddWish';
import CoupleChallenges from './pages/CoupleChallenges';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';
import { useIndexedDB } from './hooks/useIndexedDB';
import { DiaryEntry, Photo } from './types';

export type View = 'home' | 'diary' | 'add-diary' | 'album' | 'water' | 'decider' | 'wish' | 'challenges';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [entries, setEntries, isEntriesLoaded] = useIndexedDB<DiaryEntry[]>('sweet-moments-diary', []);
  const [photos, setPhotos, isPhotosLoaded] = useIndexedDB<Photo[]>('sweet-moments-photos', []);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddEntry = (entry: DiaryEntry) => {
    setEntries([entry, ...entries]);
    setCurrentView('diary');
  };

  const handleToggleFavorite = (id: string) => {
    setEntries(entries.map(e => e.id === id ? { ...e, isFavorite: !e.isFavorite } : e));
  };

  const handleAddPhoto = (photo: Photo) => {
    setPhotos([photo, ...photos]);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const isLoaded = isEntriesLoaded && isPhotosLoaded;

  // Don't show top/bottom nav on these full-screen pages
  const isFullScreenView = ['water', 'decider', 'wish', 'challenges'].includes(currentView);

  return (
    <div className="text-on-surface min-h-screen pb-28 relative max-w-md mx-auto bg-white sm:bg-background sm:shadow-2xl sm:border-x border-surface-container overflow-x-hidden">
      {!isFullScreenView && <TopBar currentView={currentView} onBack={() => setCurrentView('diary')} />}
      
      <main className={`${isFullScreenView ? '' : 'px-5 space-y-8 pt-4'}`}>
        {!isLoaded ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {currentView === 'home' && <Home onNavigate={setCurrentView} entries={entries} onToggleFavorite={handleToggleFavorite} showToast={showToast} />}
            {currentView === 'diary' && <DiaryList entries={entries} onAdd={() => setCurrentView('add-diary')} onToggleFavorite={handleToggleFavorite} showToast={showToast} />}
            {currentView === 'add-diary' && <AddDiary onSave={handleAddEntry} onCancel={() => setCurrentView('diary')} />}
            {currentView === 'album' && <PhotoAlbum photos={photos} onAddPhoto={handleAddPhoto} onDeletePhoto={handleDeletePhoto} showToast={showToast} />}
            {currentView === 'water' && <WaterIntake onBack={() => setCurrentView('home')} />}
            {currentView === 'decider' && <LoveDecider onBack={() => setCurrentView('home')} />}
            {currentView === 'wish' && <AddWish onBack={() => setCurrentView('home')} />}
            {currentView === 'challenges' && <CoupleChallenges onBack={() => setCurrentView('home')} />}
          </>
        )}
      </main>

      {!isFullScreenView && <BottomNav currentView={currentView} onNavigate={setCurrentView} />}

      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-full text-sm shadow-lg z-50 animate-in fade-in slide-in-from-bottom-4">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
