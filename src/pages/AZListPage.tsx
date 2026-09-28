import React, { useState } from 'react';
import { useAZList } from '../hooks/useApi';
import { AnimeCard } from '../components/anime/AnimeCard';
import { CardSkeletonGrid } from '../components/ui/Skeleton';
import { ErrorState, EmptyState } from '../components/ui/States';
import { List } from 'lucide-react';
import { motion } from 'framer-motion';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');

export const AZListPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useAZList();
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const items = data?.data || [];

  const filtered = activeLetter
    ? items.filter((a) => {
        const first = a.judul.trim()[0]?.toUpperCase();
        if (activeLetter === '#') return !first || !/[A-Z]/.test(first);
        return first === activeLetter;
      })
    : items;

  // Available letters in data
  const availableLetters = new Set(
    items.map((a) => {
      const first = a.judul.trim()[0]?.toUpperCase();
      if (!first || !/[A-Z]/.test(first)) return '#';
      return first;
    })
  );

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="skeleton rounded-card h-10 w-48 mb-8" />
        <CardSkeletonGrid count={12} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <ErrorState message="Gagal memuat daftar A-Z." onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-outfit font-800 text-2xl md:text-3xl text-[var(--text)] mb-2">Daftar A–Z</h1>
        <p className="text-sm text-[var(--text-2)] font-jakarta mb-6">{items.length} anime tersedia</p>

        {/* Alphabet filter */}
        <div className="flex flex-wrap gap-1.5 mb-8" role="group" aria-label="Filter alfabet">
          <button
            onClick={() => setActiveLetter(null)}
            aria-pressed={activeLetter === null}
            className={`px-3 py-1.5 rounded-pill text-sm font-outfit font-600 btn-press focus-ring transition-all ${
              activeLetter === null ? 'text-white' : 'glass-1 glass-base text-[var(--text-2)] hover:text-[var(--text)]'
            }`}
            style={activeLetter === null ? { background: 'var(--accent-grad)' } : {}}
          >
            Semua
          </button>
          {ALPHABET.map((letter) => {
            const available = availableLetters.has(letter);
            const isActive = activeLetter === letter;
            return (
              <button
                key={letter}
                onClick={() => available && setActiveLetter(letter)}
                aria-pressed={isActive}
                disabled={!available}
                className={`w-9 h-9 rounded-pill text-sm font-outfit font-600 btn-press focus-ring transition-all ${
                  isActive
                    ? 'text-white'
                    : available
                    ? 'glass-1 glass-base text-[var(--text-2)] hover:text-[var(--text)]'
                    : 'text-[var(--text-3)] cursor-not-allowed opacity-40'
                }`}
                style={isActive ? { background: 'var(--accent-grad)' } : {}}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map((anime) => (
              <AnimeCard key={anime.slug} anime={anime} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={`Tidak ada anime dengan huruf "${activeLetter}"`}
            icon={<List size={20} className="text-[var(--text-3)]" />}
          />
        )}
      </motion.div>
    </div>
  );
};
