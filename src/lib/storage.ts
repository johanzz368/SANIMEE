import type { HistoryItem, BookmarkItem } from '../types';

const SCHEMA_VERSION = 1;
const HISTORY_KEY = `sanime_history_v${SCHEMA_VERSION}`;
const BOOKMARK_KEY = `sanime_bookmarks_v${SCHEMA_VERSION}`;
const THEME_KEY = 'sanime_theme';
const MAX_HISTORY = 50;

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

// Watch history
export function getHistory(): HistoryItem[] {
  return safeGet<HistoryItem[]>(HISTORY_KEY, []);
}

export function addToHistory(item: Omit<HistoryItem, 'watchedAt'>): void {
  const history = getHistory();
  const filtered = history.filter(
    (h) => h.episodeSlug !== item.episodeSlug
  );
  const next: HistoryItem = { ...item, watchedAt: Date.now() };
  const trimmed = [next, ...filtered].slice(0, MAX_HISTORY);
  safeSet(HISTORY_KEY, trimmed);
}

export function clearHistory(): void {
  safeSet(HISTORY_KEY, []);
}

// Bookmarks
export function getBookmarks(): BookmarkItem[] {
  return safeGet<BookmarkItem[]>(BOOKMARK_KEY, []);
}

export function addBookmark(item: Omit<BookmarkItem, 'addedAt'>): void {
  const bookmarks = getBookmarks();
  if (bookmarks.some((b) => b.slug === item.slug)) return;
  safeSet(BOOKMARK_KEY, [{ ...item, addedAt: Date.now() }, ...bookmarks]);
}

export function removeBookmark(slug: string): void {
  const bookmarks = getBookmarks().filter((b) => b.slug !== slug);
  safeSet(BOOKMARK_KEY, bookmarks);
}

export function isBookmarked(slug: string): boolean {
  return getBookmarks().some((b) => b.slug === slug);
}

export function toggleBookmark(item: Omit<BookmarkItem, 'addedAt'>): boolean {
  if (isBookmarked(item.slug)) {
    removeBookmark(item.slug);
    return false;
  }
  addBookmark(item);
  return true;
}

// Theme
export type Theme = 'dark' | 'light';

export function getTheme(): Theme {
  const stored = safeGet<Theme | null>(THEME_KEY, null);
  if (stored) return stored;
  // System preference fallback
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function setTheme(theme: Theme): void {
  safeSet(THEME_KEY, theme);
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
}
