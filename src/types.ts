export interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  isoDate?: string;
  content: string;
  mood: string;
  images?: string[];
  isFavorite?: boolean;
}

export interface Anniversary {
  id: string;
  title: string;
  date: string; // ISO date string YYYY-MM-DD
  notes?: string;
  reminderDaysBefore?: number; // e.g., 0, 1, 3, 7
}

export interface Photo {
  id: string;
  url: string;
  date: string;
  description?: string;
  uploadedBy?: string;
}
