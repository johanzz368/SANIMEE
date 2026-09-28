import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../hooks/useApi';
import { Glass } from '../components/ui/glass/Glass';
import { AnimeCard } from '../components/anime/AnimeCard';
import { CardSkeletonGrid } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/States';
import { debounce } from '../lib/utils';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [input, setInput] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isFetching } = useSearch(query);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const updateQuery = debounce((val: string) => {
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() });
    } else {
      setSearchParams({});
    }
  }, 400) as (val: string) => void;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    updateQuery(e.target.value);
  };

  const handleClear = () => {
    setInput('');
    setQuery('');
    setSearchParams({});
    inputRef.current?.focus();
  };

  const results = data?.data || [];
  const loading = isLoading || isFetching;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="max-w-xl mx-auto mb-8">
        <h1 className="font-outfit font-800 text-2xl md:text-3xl text-[var(--text)] mb-5 text-center">
          Cari Anime
        </h1>

        {/* Search input */}
        <Glass level={2} radius="pill" className="flex items-center gap-3 px-5 py-3">
          <Search size={18} className="text-[var(--text-3)] flex-shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={input}
            onChange={handleInput}
            placeholder="Cari judul anime..."
            aria-label="Cari anime"
            className="flex-1 bg-transparent text-base text-[var(--text)] placeholder:text-[var(--text-3)] outline-none font-jakarta"
          />
          {input && (
            <button
              onClick={handleClear}
              aria-label="Hapus pencarian"
              className="flex-shrink-0 p-1 rounded-pill focus-ring hover:bg-white/10 transition-colors btn-press"
            >
              <X size={14} className="text-[var(--text-3)]" />
            </button>
          )}
        </Glass>

        {/* Hint */}
        {!query && (
          <p className="text-center text-xs text-[var(--text-3)] font-jakarta mt-3">
            Ketik minimal 2 karakter untuk mencari
          </p>
        )}
      </div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {loading && query.length >= 2 ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CardSkeletonGrid count={12} />
          </motion.div>
        ) : results.length > 0 ? (
          <motion.div
            key={`results-${query}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-[var(--text-3)] font-jakarta mb-4">
              {results.length} hasil untuk "<span className="text-[var(--text)]">{query}</span>"
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {results.map((anime) => (
                <AnimeCard key={anime.slug} anime={anime} />
              ))}
            </div>
          </motion.div>
        ) : query.length >= 2 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <EmptyState
              title="Tidak ada hasil"
              description={`Anime "${query}" tidak ditemukan. Coba kata kunci lain.`}
              icon={<Search size={20} className="text-[var(--text-3)]" />}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
