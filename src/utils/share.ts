import { DiaryEntry } from '../types';

export const shareEntry = async (
  entry: DiaryEntry,
  onSuccess: () => void,
  onError: (err: string) => void
) => {
  const shareText = `【${entry.date}】${entry.title}\n\n${entry.content}\n\n心情: ${entry.mood}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: entry.title,
        text: shareText,
      });
      onSuccess();
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        fallbackCopy(shareText, onSuccess, onError);
      }
    }
  } else {
    fallbackCopy(shareText, onSuccess, onError);
  }
};

const fallbackCopy = (
  text: string,
  onSuccess: () => void,
  onError: (err: string) => void
) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text)
      .then(onSuccess)
      .catch(() => onError('复制失败，请重试'));
  } else {
    onError('当前浏览器不支持分享或复制');
  }
};
