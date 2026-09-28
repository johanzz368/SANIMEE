import { useQuery, useMutation } from '@tanstack/react-query';
import {
  fetchOngoing,
  fetchCompleted,
  fetchSchedule,
  fetchGenres,
  fetchGenreAnime,
  fetchSearch,
  fetchAnimeDetail,
  fetchEpisodeDetail,
  fetchAZList,
  discoverRoutes,
} from '../services/api';

// Query keys
export const qk = {
  ongoing: (page: number) => ['ongoing', page] as const,
  completed: (page: number) => ['completed', page] as const,
  schedule: () => ['schedule'] as const,
  genres: () => ['genres'] as const,
  genreAnime: (slug: string, page: number) => ['genreAnime', slug, page] as const,
  search: (q: string) => ['search', q] as const,
  animeDetail: (slug: string) => ['animeDetail', slug] as const,
  episode: (slug: string) => ['episode', slug] as const,
  azList: () => ['azList'] as const,
  routes: () => ['routes'] as const,
};

export function useRoutes() {
  return useQuery({
    queryKey: qk.routes(),
    queryFn: discoverRoutes,
    staleTime: Infinity,
  });
}

export function useOngoing(page = 1) {
  return useQuery({
    queryKey: qk.ongoing(page),
    queryFn: () => fetchOngoing(page),
    retry: 2,
    staleTime: 3 * 60 * 1000,
  });
}

export function useCompleted(page = 1) {
  return useQuery({
    queryKey: qk.completed(page),
    queryFn: () => fetchCompleted(page),
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSchedule() {
  return useQuery({
    queryKey: qk.schedule(),
    queryFn: fetchSchedule,
    retry: 2,
    staleTime: 10 * 60 * 1000,
  });
}

export function useGenres() {
  return useQuery({
    queryKey: qk.genres(),
    queryFn: fetchGenres,
    retry: 2,
    staleTime: 30 * 60 * 1000,
  });
}

export function useGenreAnime(slug: string, page = 1) {
  return useQuery({
    queryKey: qk.genreAnime(slug, page),
    queryFn: () => fetchGenreAnime(slug, page),
    enabled: !!slug,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: qk.search(query),
    queryFn: () => fetchSearch(query),
    enabled: query.trim().length >= 2,
    retry: 1,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAnimeDetail(slug: string) {
  return useQuery({
    queryKey: qk.animeDetail(slug),
    queryFn: () => fetchAnimeDetail(slug),
    enabled: !!slug,
    retry: 2,
    staleTime: 10 * 60 * 1000,
  });
}

export function useEpisode(slug: string) {
  return useQuery({
    queryKey: qk.episode(slug),
    queryFn: () => fetchEpisodeDetail(slug),
    enabled: !!slug,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAZList() {
  return useQuery({
    queryKey: qk.azList(),
    queryFn: fetchAZList,
    retry: 2,
    staleTime: 30 * 60 * 1000,
  });
}

// Re-export mutation helper for TanStack compat
export { useMutation };
