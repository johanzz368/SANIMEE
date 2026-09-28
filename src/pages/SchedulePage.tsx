import React from 'react';
import { useSchedule } from '../hooks/useApi';
import { Glass } from '../components/ui/glass/Glass';
import { AnimeCard } from '../components/anime/AnimeCard';
import { CardSkeletonGrid } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/States';
import { getWIBDay } from '../lib/utils';
import { motion } from 'framer-motion';

const HARI_ORDER = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export const SchedulePage: React.FC = () => {
  const { data, isLoading, error, refetch } = useSchedule();
  const today = getWIBDay();

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="skeleton rounded-card h-10 w-48 mb-8" />
        <CardSkeletonGrid count={12} />
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <ErrorState message="Gagal memuat jadwal. Periksa koneksi API." onRetry={() => refetch()} />
      </div>
    );
  }

  // Sort by day order, with today first
  const sorted = [...(data.data)].sort((a, b) => {
    const ai = HARI_ORDER.indexOf(a.hari);
    const bi = HARI_ORDER.indexOf(b.hari);
    const todayIdx = HARI_ORDER.indexOf(today);
    const relA = (ai - todayIdx + 7) % 7;
    const relB = (bi - todayIdx + 7) % 7;
    return relA - relB;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-outfit font-800 text-2xl md:text-3xl text-[var(--text)] mb-2">Jadwal Rilis</h1>
        <p className="text-sm text-[var(--text-2)] font-jakarta mb-8">Anime terbaru setiap hari. Sekarang: <span className="text-[var(--text)] font-500">{today}</span></p>

        <div className="space-y-10">
          {sorted.map((dayGroup) => (
            <section key={dayGroup.hari} aria-labelledby={`day-${dayGroup.hari}`}>
              {/* Day header */}
              <div className="flex items-center gap-3 mb-5">
                <Glass
                  level={2}
                  radius="pill"
                  className={`px-5 py-2 flex items-center gap-2 ${dayGroup.hari === today ? '' : ''}`}
                  style={dayGroup.hari === today ? { background: 'var(--accent-grad)' } : {}}
                >
                  <h2
                    id={`day-${dayGroup.hari}`}
                    className="font-outfit font-700 text-sm"
                    style={{ color: dayGroup.hari === today ? 'white' : 'var(--text)' }}
                  >
                    {dayGroup.hari}
                  </h2>
                  {dayGroup.hari === today && (
                    <span className="text-xs text-white/80 font-jakarta">(Hari ini)</span>
                  )}
                </Glass>
                <span className="text-xs text-[var(--text-3)] font-jakarta">
                  {dayGroup.animeList.length} anime
                </span>
              </div>

              {/* Anime grid */}
              {dayGroup.animeList.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {dayGroup.animeList.map((anime) => (
                    <AnimeCard key={anime.slug} anime={anime} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--text-3)] font-jakarta">Tidak ada jadwal untuk hari ini.</p>
              )}
            </section>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
