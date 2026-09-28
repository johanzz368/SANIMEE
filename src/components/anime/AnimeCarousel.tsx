import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimeCard } from '../anime/AnimeCard';
import { SectionHeader } from '../anime/SectionHeader';
import type { AnimeListItem } from '../../types';

interface AnimeCarouselProps {
  title: string;
  subtitle?: string;
  seeAllHref?: string;
  items: AnimeListItem[];
}

export const AnimeCarousel: React.FC<AnimeCarouselProps> = ({
  title,
  subtitle,
  seeAllHref,
  items,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  if (!items.length) return null;

  return (
    <section aria-label={title}>
      <SectionHeader title={title} subtitle={subtitle} seeAllHref={seeAllHref} />
      <div className="relative group/carousel">
        {/* Arrow left */}
        <button
          onClick={() => scroll('left')}
          aria-label="Geser ke kiri"
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20
            glass-2 glass-base rounded-pill w-10 h-10 items-center justify-center
            opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100
            transition-opacity btn-press focus-ring"
        >
          <ChevronLeft size={18} />
        </button>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-snap-x pb-2 -mx-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          aria-label={`Daftar ${title}`}
        >
          {items.map((anime) => (
            <div
              key={anime.slug}
              className="snap-start flex-shrink-0 w-36 sm:w-40 md:w-44"
            >
              <AnimeCard anime={anime} />
            </div>
          ))}
        </div>

        {/* Arrow right */}
        <button
          onClick={() => scroll('right')}
          aria-label="Geser ke kanan"
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20
            glass-2 glass-base rounded-pill w-10 h-10 items-center justify-center
            opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100
            transition-opacity btn-press focus-ring"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
};
