import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGenres, useGenreAnime } from '../hooks/useApi';
import { AnimeCard } from '../components/anime/AnimeCard';
import { CardSkeletonGrid } from '../components/ui/Skeleton';
import { ErrorState, EmptyState } from '../components/ui/States';

// Genre list page (no slug)
const GenreListPage: React.FC = () => {
  const { data, isLoading, error, refetch } = useGenres();

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="skeleton rounded-pill h-9 w-24" />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message="Gagal memuat daftar genre." onRetry={() => refetch()} />;
  }

  const genres = data?.data || [];

  return (
    <div className="flex flex-wrap gap-3">
      {genres.map((g) => (
        <motion.div
          key={g.slug}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to={`/genre/${g.slug}`}
            className="glass-1 glass-base px-5 py-2.5 rounded-pill font-outfit font-600 text-sm text-[var(--text-2)] hover:text-[var(--text)] btn-press focus-ring transition-colors flex items-center gap-2"
          >
            <Tag size={12} aria-hidden="true" />
            {g.name}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

// Genre detail page (with slug)
const GenreDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { data: genreData } = useGenres();
  const { data, isLoading, error, refetch } = useGenreAnime(slug);

  const genreName = genreData?.data.find((g) => g.slug === slug)?.name || slug;
  const items = data?.data || [];

  if (isLoading) {
    return <CardSkeletonGrid count={12} />;
  }

  if (error) {
    return <ErrorState message={`Gagal memuat anime genre ${genreName}.`} onRetry={() => refetch()} />;
  }

  if (!items.length) {
    return (
      <EmptyState
        title="Tidak ada anime"
        description={`Tidak ada anime dengan genre "${genreName}" saat ini.`}
        icon={<Tag size={20} className="text-[var(--text-3)]" />}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {items.map((anime) => (
        <AnimeCard key={anime.slug} anime={anime} />
      ))}
    </div>
  );
};

// Main export — handles both list and detail
export const GenrePage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Breadcrumb */}
        <nav aria-label="Navigasi roti remah" className="flex items-center gap-2 text-sm font-jakarta text-[var(--text-3)] mb-2">
          <Link to="/genre" className="hover:text-[var(--text)] transition-colors focus-ring rounded-sm">Genre</Link>
          {slug && (
            <>
              <span>/</span>
              <span className="text-[var(--text)]">{slug}</span>
            </>
          )}
        </nav>

        <h1 className="font-outfit font-800 text-2xl md:text-3xl text-[var(--text)] mb-6">
          {slug ? `Genre: ${slug}` : 'Semua Genre'}
        </h1>

        {slug ? <GenreDetailPage slug={slug} /> : <GenreListPage />}
      </motion.div>
    </div>
  );
};
