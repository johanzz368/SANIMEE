import React, { useState } from 'react';
import { useOngoing } from '../hooks/useApi';
import { AnimeCard } from '../components/anime/AnimeCard';
import { CardSkeletonGrid } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/States';
import { PaginationControl } from '../components/ui/PaginationControl';
import { motion } from 'framer-motion';

export const OngoingPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, refetch } = useOngoing(page);

  const items = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-outfit font-800 text-2xl md:text-3xl text-[var(--text)] mb-2">Sedang Tayang</h1>
        <p className="text-sm text-[var(--text-2)] font-jakarta mb-6">Anime yang masih berjalan saat ini</p>

        {isLoading ? (
          <CardSkeletonGrid count={18} />
        ) : error ? (
          <ErrorState message="Gagal memuat anime. Periksa koneksi API." onRetry={() => refetch()} />
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {items.map((anime) => (
                <AnimeCard key={anime.slug} anime={anime} />
              ))}
            </div>
            {pagination && (
              <PaginationControl
                pagination={pagination}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};
