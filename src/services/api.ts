import type {
  ApiResponse,
  AnimeListItem,
  AnimeDetail,
  EpisodeDetail,
  Genre,
  ScheduleItem,
  ApiRouteMap,
} from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const TIMEOUT_MS = 15000;
const MAX_RETRIES = 2;

// Discovered route map from API root (populated on first call)
let routeMap: ApiRouteMap | null = null;

async function fetchWithTimeout(url: string, retries = MAX_RETRIES): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    if (retries > 0 && (err instanceof TypeError || (err instanceof DOMException && err.name === 'AbortError'))) {
      await new Promise((r) => setTimeout(r, 800));
      return fetchWithTimeout(url, retries - 1);
    }
    throw err;
  }
}

async function apiFetch<T>(path: string): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${path}`;
  let res: Response;

  try {
    res = await fetchWithTimeout(url);
  } catch (err) {
    const message = err instanceof DOMException && err.name === 'AbortError'
      ? 'Permintaan habis waktu. Periksa koneksi API.'
      : 'Tidak dapat terhubung ke server. Pastikan API sudah berjalan.';
    throw new Error(message);
  }

  if (!res.ok) {
    throw new Error(`Server merespons dengan ${res.status}. Coba lagi nanti.`);
  }

  const json = await res.json();
  return json as ApiResponse<T>;
}

// Normalize anime list items for consistency
function normalizeAnimeItem(item: Record<string, unknown>): AnimeListItem {
  return {
    judul: (item.judul as string) || (item.title as string) || 'Judul tidak tersedia',
    slug: (item.slug as string) || '',
    poster: (item.poster as string) || (item.image as string) || '',
    episodeTerbaru: (item.episodeTerbaru as string | number) || (item.episode as string | number) || '',
    hariRilis: (item.hariRilis as string) || (item.day as string) || '',
    tanggalRilisTerbaru: (item.tanggalRilisTerbaru as string) || (item.date as string) || '',
    otakudesuUrl: (item.otakudesuUrl as string) || (item.url as string) || '',
    status: (item.status as string) || '',
    rating: (item.rating as string) || '',
    genre: (item.genre as string[]) || [],
  };
}

// Discover available routes from API root
export async function discoverRoutes(): Promise<ApiRouteMap> {
  if (routeMap) return routeMap;

  try {
    const res = await apiFetch<Record<string, unknown>>('/otakudesu');
    const data = res.data || {};
    const dataStr = JSON.stringify(data).toLowerCase();

    routeMap = {
      ongoing: dataStr.includes('ongoing'),
      completed: dataStr.includes('completed') || dataStr.includes('complete'),
      schedule: dataStr.includes('schedule') || dataStr.includes('jadwal'),
      genres: dataStr.includes('genre'),
      search: dataStr.includes('search') || dataStr.includes('cari'),
      detail: dataStr.includes('detail') || dataStr.includes('anime'),
      episode: dataStr.includes('episode'),
      azList: dataStr.includes('a-z') || dataStr.includes('az') || dataStr.includes('list'),
    };
  } catch {
    // Default to common routes if discovery fails
    routeMap = {
      ongoing: true,
      completed: true,
      schedule: true,
      genres: true,
      search: true,
      detail: true,
      episode: true,
      azList: false,
    };
  }

  return routeMap;
}

// Ongoing anime
export async function fetchOngoing(page = 1): Promise<ApiResponse<AnimeListItem[]>> {
  const res = await apiFetch<unknown[]>(`/otakudesu/ongoing?page=${page}`);
  return {
    ...res,
    data: (res.data || []).map((item) => normalizeAnimeItem(item as Record<string, unknown>)),
  };
}

// Completed anime
export async function fetchCompleted(page = 1): Promise<ApiResponse<AnimeListItem[]>> {
  const res = await apiFetch<unknown[]>(`/otakudesu/complete?page=${page}`);
  return {
    ...res,
    data: (res.data || []).map((item) => normalizeAnimeItem(item as Record<string, unknown>)),
  };
}

// Schedule
export async function fetchSchedule(): Promise<ApiResponse<ScheduleItem[]>> {
  const res = await apiFetch<unknown>('/otakudesu/schedule');
  // Normalize schedule data shape
  let scheduleData: ScheduleItem[] = [];
  if (Array.isArray(res.data)) {
    scheduleData = (res.data as Record<string, unknown>[]).map((item) => ({
      hari: (item.hari as string) || (item.day as string) || '',
      animeList: ((item.animeList || item.anime || []) as Record<string, unknown>[]).map(normalizeAnimeItem),
    }));
  }
  return { ...res, data: scheduleData };
}

// Genre list
export async function fetchGenres(): Promise<ApiResponse<Genre[]>> {
  const res = await apiFetch<unknown>('/otakudesu/genres');
  const data = Array.isArray(res.data) ? res.data : [];
  const genres = (data as Record<string, unknown>[]).map((g) => ({
    name: (g.name as string) || (g.genre as string) || (g.judul as string) || '',
    slug: (g.slug as string) || '',
    otakudesuUrl: (g.otakudesuUrl as string) || '',
  }));
  return { ...res, data: genres };
}

// Anime by genre
export async function fetchGenreAnime(slug: string, page = 1): Promise<ApiResponse<AnimeListItem[]>> {
  const res = await apiFetch<unknown[]>(`/otakudesu/genres/${slug}?page=${page}`);
  return {
    ...res,
    data: (res.data || []).map((item) => normalizeAnimeItem(item as Record<string, unknown>)),
  };
}

// Search
export async function fetchSearch(query: string): Promise<ApiResponse<AnimeListItem[]>> {
  const encoded = encodeURIComponent(query);
  const res = await apiFetch<unknown>(`/otakudesu/search?q=${encoded}`);
  let data: AnimeListItem[] = [];
  if (Array.isArray(res.data)) {
    data = (res.data as Record<string, unknown>[]).map(normalizeAnimeItem);
  } else if (res.data && typeof res.data === 'object') {
    const d = res.data as Record<string, unknown>;
    const list = d.animeList || d.results || d.data || [];
    data = (list as Record<string, unknown>[]).map(normalizeAnimeItem);
  }
  return { ...res, data };
}

// Anime detail
export async function fetchAnimeDetail(slug: string): Promise<ApiResponse<AnimeDetail>> {
  const res = await apiFetch<Record<string, unknown>>(`/otakudesu/anime/${slug}`);
  const d = res.data || {};
  const detail: AnimeDetail = {
    judul: (d.judul as string) || (d.title as string) || '',
    slug: (d.slug as string) || slug,
    poster: (d.poster as string) || (d.image as string) || '',
    synopsis: (d.synopsis as string) || (d.sinopsis as string) || '',
    sinopsis: (d.sinopsis as string) || (d.synopsis as string) || '',
    status: (d.status as string) || '',
    studio: (d.studio as string) || '',
    tipe: (d.tipe as string) || (d.type as string) || '',
    totalEpisode: (d.totalEpisode as string | number) || (d.jumlahEpisode as string | number) || '',
    durasi: (d.durasi as string) || (d.duration as string) || '',
    tanggalRilis: (d.tanggalRilis as string) || (d.released as string) || '',
    rating: (d.rating as string) || (d.score as string) || '',
    score: (d.score as string) || (d.rating as string) || '',
    genre: (d.genre as Genre[] | string[]) || [],
    episodeList: ((d.episodeList || d.episodis || d.episodes || []) as Record<string, unknown>[]).map((e) => ({
      episode: (e.episode as string | number) || (e.eps as string | number) || '',
      slug: (e.slug as string) || '',
      otakudesuUrl: (e.otakudesuUrl as string) || '',
    })),
  };
  return { ...res, data: detail };
}

// Episode detail
export async function fetchEpisodeDetail(slug: string): Promise<ApiResponse<EpisodeDetail>> {
  const res = await apiFetch<Record<string, unknown>>(`/otakudesu/episode/${slug}`);
  const d = res.data || {};
  const episode: EpisodeDetail = {
    judul: (d.judul as string) || (d.title as string) || '',
    anime: (d.anime as string) || (d.animeJudul as string) || '',
    episode: (d.episode as string | number) || '',
    slug: (d.slug as string) || slug,
    streamUrl: (d.streamUrl as string) || (d.stream as string) || '',
    embedUrl: (d.embedUrl as string) || (d.embed as string) || (d.iframeUrl as string) || '',
    iframeUrl: (d.iframeUrl as string) || (d.embed as string) || (d.embedUrl as string) || '',
    downloadUrl: (d.downloadUrl as { resolution: string; url: string; size?: string }[]) || [],
    server: (d.server as { name: string; url: string }[]) || [],
    prevEpisode: (d.prevEpisode as { slug: string; episode: string | number } | null) || null,
    nextEpisode: (d.nextEpisode as { slug: string; episode: string | number } | null) || null,
  };
  return { ...res, data: episode };
}

// A-Z list
export async function fetchAZList(): Promise<ApiResponse<AnimeListItem[]>> {
  const res = await apiFetch<unknown[]>('/otakudesu/a-z');
  return {
    ...res,
    data: (res.data || []).map((item) => normalizeAnimeItem(item as Record<string, unknown>)),
  };
}
