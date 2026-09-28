import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Glass } from '../ui/glass/Glass';
import { formatEpisode } from '../../lib/utils';
import { toggleBookmark, isBookmarked } from '../../lib/storage';
import type { AnimeListItem } from '../../types';

interface AnimeCardProps {
  anime: AnimeListItem;
  onBookmarkChange?: () => void;
}

const PLACEHOLDER_GRADIENT = 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)';

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onBookmarkChange }) => {
  const [imgError, setImgError] = useState(false);
  const [bookmarked, setBookmarked] = useState(() => isBookmarked(anime.slug));

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleBookmark({
      slug: anime.slug,
      judul: anime.judul,
      poster: anime.poster,
      status: anime.status,
      rating: anime.rating,
    });
    setBookmarked(next);
    onBookmarkChange?.();
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative group"
    >
      <Link
        to={`/anime/${anime.slug}`}
        className="block focus-ring rounded-card"
        aria-label={`Tonton ${anime.judul}`}
      >
        <Glass
          level={1}
          radius="card"
          className="card-glow overflow-hidden"
          style={{ position: 'relative' }}
        >
          {/* Poster */}
          <div className="aspect-poster relative overflow-hidden">
            {!imgError && anime.poster ? (
              <img
                src={anime.poster}
                alt={anime.judul}
                loading="lazy"
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: PLACEHOLDER_GRADIENT }}
                aria-hidden="true"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </div>
            )}

            {/* Episode badge */}
            {anime.episodeTerbaru && (
              <div className="absolute top-2 left-2 z-10">
                <span className="glass-1 glass-base px-2 py-0.5 text-xs font-outfit font-600 text-white rounded-pill text-shadow">
                  {formatEpisode(anime.episodeTerbaru)}
                </span>
              </div>
            )}

            {/* Day badge */}
            {anime.hariRilis && (
              <div className="absolute top-2 right-2 z-10">
                <span className="glass-1 glass-base px-2 py-0.5 text-xs font-outfit font-500 text-[var(--text-2)] rounded-pill">
                  {anime.hariRilis}
                </span>
              </div>
            )}

            {/* Bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 gradient-bottom pointer-events-none" />
          </div>

          {/* Info */}
          <div className="p-3 relative z-10">
            <p className="font-outfit font-600 text-sm text-[var(--text)] line-clamp-2 leading-snug">
              {anime.judul}
            </p>
          </div>

          {/* Bookmark button — appears on hover */}
          <button
            onClick={handleBookmark}
            aria-label={bookmarked ? 'Hapus dari bookmark' : 'Tambah ke bookmark'}
            className={`
              absolute bottom-3 right-3 z-20 p-2 rounded-pill glass-1 glass-base
              opacity-0 group-hover:opacity-100 focus-visible:opacity-100
              transition-opacity duration-200 btn-press focus-ring
            `}
          >
            {bookmarked ? (
              <BookmarkCheck size={14} className="text-accent" style={{ color: 'var(--accent-from)' }} />
            ) : (
              <Bookmark size={14} className="text-[var(--text-2)]" />
            )}
          </button>
        </Glass>
      </Link>
    </motion.div>
  );
};
