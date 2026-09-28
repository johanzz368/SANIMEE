import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

import { EmptyState } from '../components/ui/States';
import { Button } from '../components/ui/glass/Button';
import { AnimeCard } from '../components/anime/AnimeCard';
import { getBookmarks } from '../lib/storage';

export const BookmarkPage: React.FC = () => {
  const [bookmarks, setBookmarks] = useState(() => getBookmarks());

  const handleBookmarkChange = () => {
    setBookmarks(getBookmarks());
  };

  const items = bookmarks.map((b) => ({
    judul: b.judul,
    slug: b.slug,
    poster: b.poster,
    episodeTerbaru: '',
    status: b.status || '',
    rating: b.rating || '',
    genre: [],
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-outfit font-800 text-2xl md:text-3xl text-[var(--text)] mb-1">Bookmark</h1>
          <p className="text-sm text-[var(--text-2)] font-jakarta">{bookmarks.length} anime tersimpan</p>
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <EmptyState
          icon={<Bookmark size={20} className="text-[var(--text-3)]" />}
          title="Belum ada bookmark"
          description="Simpan anime favoritmu di sini supaya gampang ditemukan lagi."
          action={<Link to="/"><Button variant="primary" size="sm">Jelajahi Anime</Button></Link>}
        />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {items.map((anime) => (
            <motion.div
              key={anime.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AnimeCard anime={anime} onBookmarkChange={handleBookmarkChange} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
