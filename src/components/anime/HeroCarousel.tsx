import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Glass } from '../ui/glass/Glass';
import { Button } from '../ui/glass/Button';
import type { AnimeListItem } from '../../types';

interface HeroCarouselProps {
  items: AnimeListItem[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);

  const total = Math.min(items.length, 5);
  const slides = items.slice(0, total);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    if (paused || total === 0) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next, total]);

  if (!slides.length) return null;

  const slide = slides[current];

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    }
  };

  return (
    <section
      aria-label="Anime pilihan"
      className="relative w-full overflow-hidden rounded-none md:rounded-panel"
      style={{ height: 'min(70vh, 520px)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background image */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={slide.slug + '-bg'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          {slide.poster && (
            <img
              src={slide.poster}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-110"
              style={{ filter: 'blur(50px)', transform: 'scale(1.15)' }}
            />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,7,13,0.85) 0%, rgba(7,7,13,0.3) 100%)' }} />
          <div className="absolute inset-x-0 bottom-0 h-2/3 gradient-bottom" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full max-w-6xl mx-auto px-4 sm:px-6 flex items-end md:items-center pb-16 md:pb-0">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end md:items-center w-full">
          {/* Info panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.slug + '-info'}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Glass level={2} radius="panel" className="p-5 md:p-8 max-w-lg">
                {/* Episode badge */}
                {slide.episodeTerbaru && (
                  <span
                    className="inline-block px-3 py-1 rounded-pill text-xs font-outfit font-600 text-white mb-3"
                    style={{ background: 'var(--accent-grad)' }}
                  >
                    Episode {slide.episodeTerbaru}
                  </span>
                )}

                {/* Title */}
                <h1 className="font-outfit font-800 text-xl md:text-3xl text-[var(--text)] line-clamp-2 text-shadow mb-2">
                  {slide.judul}
                </h1>

                {/* Day release */}
                {slide.hariRilis && (
                  <p className="text-sm text-[var(--text-2)] font-jakarta mb-5">
                    Tayang setiap {slide.hariRilis}
                  </p>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Link to={`/anime/${slide.slug}`}>
                    <Button variant="primary" size="md">
                      <Play size={15} fill="currentColor" />
                      Tonton Sekarang
                    </Button>
                  </Link>
                  <Link to={`/anime/${slide.slug}`}>
                    <Button variant="glass" size="md">
                      Detail
                    </Button>
                  </Link>
                </div>
              </Glass>
            </motion.div>
          </AnimatePresence>

          {/* Poster (desktop only) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.slug + '-poster'}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="hidden md:block"
            >
              <div className="w-40 lg:w-48 aspect-poster rounded-card overflow-hidden shadow-2xl">
                {slide.poster ? (
                  <img
                    src={slide.poster}
                    alt={slide.judul}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }} />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Slide sebelumnya"
        className="absolute left-3 top-1/2 -translate-y-1/2 glass-2 glass-base rounded-pill w-10 h-10 flex items-center justify-center btn-press focus-ring opacity-60 hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        aria-label="Slide berikutnya"
        className="absolute right-3 top-1/2 -translate-y-1/2 glass-2 glass-base rounded-pill w-10 h-10 flex items-center justify-center btn-press focus-ring opacity-60 hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={18} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2" role="tablist" aria-label="Slide indicator">
        {slides.map((s, i) => (
          <button
            key={s.slug}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}: ${s.judul}`}
            onClick={() => setCurrent(i)}
            className={`rounded-pill btn-press focus-ring transition-all duration-300 ${
              i === current
                ? 'w-6 h-2'
                : 'w-2 h-2 opacity-50'
            }`}
            style={{ background: i === current ? 'var(--accent-from)' : 'var(--text-3)' }}
          />
        ))}
      </div>
    </section>
  );
};
