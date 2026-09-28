import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Bookmark, BookmarkCheck, Star, Clock, Tv, Calendar, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAnimeDetail } from '../hooks/useApi';
import { Glass } from '../components/ui/glass/Glass';
import { Button } from '../components/ui/glass/Button';
import { DetailSkeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/States';
import { toggleBookmark, isBookmarked } from '../lib/storage';
import { useToast } from '../hooks/useToast';
import type { EpisodeListItem } from '../types';

export const DetailPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { data, isLoading, error, refetch } = useAnimeDetail(slug);
  const { showToast } = useToast();
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(slug));
  const [imgError, setImgError] = useState(false);

  const handleBookmark = () => {
    if (!data?.data) return;
    const anime = data.data;
    const next = toggleBookmark({
      slug: anime.slug,
      judul: anime.judul,
      poster: anime.poster,
      status: anime.status,
      rating: anime.rating,
    });
    setBookmarked(next);
    showToast(next ? 'Ditambahkan ke bookmark' : 'Dihapus dari bookmark');
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <DetailSkeleton />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <ErrorState message="Gagal memuat detail anime. Periksa koneksi API." onRetry={() => refetch()} />
      </div>
    );
  }

  const anime = data.data;
  const episodes = (anime.episodeList || anime.episodis || []) as EpisodeListItem[];
  const genres = Array.isArray(anime.genre)
    ? anime.genre.map((g) => (typeof g === 'string' ? { name: g, slug: g } : g))
    : [];

  const firstEpisode = episodes[episodes.length - 1] || episodes[0];
  const lastEpisode = episodes[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Background blur from poster */}
      {anime.poster && !imgError && (
        <div className="fixed inset-0 -z-10 pointer-events-none opacity-20" aria-hidden="true">
          <img
            src={anime.poster}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(80px)', transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0 gradient-bottom" style={{ height: '100%' }} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="grid md:grid-cols-[260px_1fr] gap-6 lg:gap-10"
      >
        {/* Poster column */}
        <div className="flex flex-col gap-4">
          <div className="aspect-poster rounded-card overflow-hidden shadow-2xl player-glow">
            {!imgError && anime.poster ? (
              <img
                src={anime.poster}
                alt={anime.judul}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
                <Tv size={40} className="text-[var(--text-3)]" />
              </div>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3">
            {lastEpisode && (
              <Link to={`/episode/${lastEpisode.slug}`} className="block">
                <Button variant="primary" size="lg" className="w-full">
                  <Play size={16} fill="currentColor" />
                  Tonton Episode Terbaru
                </Button>
              </Link>
            )}
            {firstEpisode && lastEpisode && firstEpisode.slug !== lastEpisode.slug && (
              <Link to={`/episode/${firstEpisode.slug}`} className="block">
                <Button variant="glass" size="md" className="w-full">
                  <Play size={14} />
                  Mulai dari Awal
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="md" onClick={handleBookmark} className="w-full">
              {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
              {bookmarked ? 'Tersimpan' : 'Simpan ke Bookmark'}
            </Button>
          </div>

          {/* Meta stats */}
          <Glass level={1} radius="card" className="p-4 space-y-3">
            {[
              { icon: <Star size={13} style={{ color: 'var(--orb-violet)' }} />, label: 'Rating', value: anime.rating || anime.score || '—' },
              { icon: <Tv size={13} style={{ color: 'var(--orb-cyan)' }} />, label: 'Status', value: anime.status || '—' },
              { icon: <Clock size={13} style={{ color: 'var(--orb-pink)' }} />, label: 'Durasi', value: anime.durasi || '—' },
              { icon: <Calendar size={13} style={{ color: 'var(--orb-violet)' }} />, label: 'Rilis', value: anime.tanggalRilis || '—' },
              { icon: <Tag size={13} style={{ color: 'var(--text-3)' }} />, label: 'Studio', value: anime.studio || '—' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-1.5 text-[var(--text-3)] font-jakarta flex-shrink-0">
                  {icon}{label}
                </span>
                <span className="text-[var(--text-2)] font-jakarta text-right">{value}</span>
              </div>
            ))}
          </Glass>
        </div>

        {/* Info column */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h1 className="font-outfit font-800 text-2xl md:text-3xl lg:text-4xl text-[var(--text)] mb-2 text-shadow">
              {anime.judul}
            </h1>

            {/* Genres */}
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {genres.map((g) => (
                  <Link
                    key={typeof g === 'string' ? g : g.slug}
                    to={`/genre/${typeof g === 'string' ? g : g.slug}`}
                    className="glass-1 glass-base px-3 py-1 rounded-pill text-xs font-outfit font-600 text-[var(--text-2)] hover:text-[var(--text)] btn-press focus-ring transition-colors"
                  >
                    {typeof g === 'string' ? g : g.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Synopsis */}
          {(anime.synopsis || anime.sinopsis) && (
            <Glass level={1} radius="card" className="p-5">
              <h2 className="font-outfit font-700 text-sm text-[var(--text-3)] uppercase tracking-wide mb-3">Sinopsis</h2>
              <p className="text-sm md:text-base font-jakarta text-[var(--text-2)] leading-relaxed">
                {anime.synopsis || anime.sinopsis}
              </p>
            </Glass>
          )}

          {/* Episode list */}
          {episodes.length > 0 && (
            <div>
              <h2 className="font-outfit font-700 text-lg text-[var(--text)] mb-4">
                Daftar Episode
                <span className="ml-2 text-sm text-[var(--text-3)] font-jakarta font-400">
                  ({episodes.length} episode)
                </span>
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 max-h-80 overflow-y-auto pr-1">
                {episodes.map((ep) => (
                  <Link
                    key={ep.slug}
                    to={`/episode/${ep.slug}`}
                    aria-label={`Tonton episode ${ep.episode}`}
                    className="glass-1 glass-base rounded-card px-2 py-3 text-center text-sm font-outfit font-600 text-[var(--text-2)] hover:text-[var(--text)] btn-press focus-ring transition-all hover:scale-105"
                  >
                    {ep.episode}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
