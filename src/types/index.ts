// Type definitions for Wajik Anime API responses

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  pagination?: Pagination;
  error?: string;
}

export interface Pagination {
  prevPage: number | null;
  currentPage: number;
  nextPage: number | null;
  totalPages: number;
}

// List item (ongoing, completed)
export interface AnimeListItem {
  judul: string;
  slug: string;
  poster: string;
  episodeTerbaru: string | number;
  hariRilis?: string;
  tanggalRilisTerbaru?: string;
  otakudesuUrl?: string;
  status?: string;
  rating?: string;
  genre?: string[];
}

// Schedule item
export interface ScheduleItem {
  hari: string;
  animeList: AnimeListItem[];
}

// Genre
export interface Genre {
  name: string;
  slug: string;
  otakudesuUrl?: string;
}

// Anime detail
export interface AnimeDetail {
  judul: string;
  slug: string;
  poster: string;
  synopsis?: string;
  sinopsis?: string;
  status: string;
  studio?: string;
  tipe?: string;
  totalEpisode?: string | number;
  durasi?: string;
  tanggalRilis?: string;
  rating?: string;
  score?: string;
  genre?: Genre[] | string[];
  episodeList?: EpisodeListItem[];
  episodis?: EpisodeListItem[];
}

// Episode list item
export interface EpisodeListItem {
  episode: string | number;
  slug: string;
  otakudesuUrl?: string;
}

// Episode detail / streaming
export interface EpisodeDetail {
  judul?: string;
  anime?: string;
  episode?: string | number;
  slug: string;
  streamUrl?: string;
  embedUrl?: string;
  iframeUrl?: string;
  downloadUrl?: DownloadItem[];
  server?: ServerItem[];
  prevEpisode?: { slug: string; episode: string | number } | null;
  nextEpisode?: { slug: string; episode: string | number } | null;
}

export interface DownloadItem {
  resolution: string;
  url: string;
  size?: string;
}

export interface ServerItem {
  name: string;
  url: string;
}

// Search result
export interface SearchResult {
  animeList: AnimeListItem[];
  totalResult?: number;
}

// Route map discovered from API root
export interface ApiRouteMap {
  ongoing: boolean;
  completed: boolean;
  schedule: boolean;
  genres: boolean;
  search: boolean;
  detail: boolean;
  episode: boolean;
  azList: boolean;
}

// Watch history item (local storage)
export interface HistoryItem {
  animeSlug: string;
  animeJudul: string;
  animePoster: string;
  episodeSlug: string;
  episode: string | number;
  watchedAt: number;
}

// Bookmark item (local storage)
export interface BookmarkItem {
  slug: string;
  judul: string;
  poster: string;
  status?: string;
  rating?: string;
  addedAt: number;
}
