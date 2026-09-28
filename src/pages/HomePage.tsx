import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, TrendingUp } from 'lucide-react';
import { useOngoing, useCompleted, useGenres } from '../hooks/useApi';
import { HeroCarousel } from '../components/anime/HeroCarousel';
import { AnimeCarousel } from '../components/anime/AnimeCarousel';
import { SectionHeader } from '../components/anime/SectionHeader';
import { AnimeCard } from '../components/anime/AnimeCard';
import { Glass } from '../components/ui/glass/Glass';
import { SakuraCanvas } from '../components/ui/SakuraCanvas';
import { CardSkeletonRow, HeroSkeleton } from '../components/ui/Skeleton';
import { ErrorState } from '../components/ui/States';
import { getHistory } from '../lib/storage';
import { getWIBDay } from '../lib/utils';

const PhilosophySection: React.FC = () => {
  const cards = [
    { icon: <Heart size={20} style={{ color: 'var(--orb-pink)' }} />, title: 'Dibuat dengan Cinta', desc: 'Setiap detail dirancang dengan penuh perhatian untuk pengalaman menonton terbaik.' },
    { icon: <Sparkles size={20} style={{ color: 'var(--orb-violet)' }} />, title: 'Untuk Sesama Penikmat Anime', desc: 'Komunitas yang saling berbagi kecintaan terhadap dunia animasi Jepang.' },
    { icon: <TrendingUp size={20} style={{ color: 'var(--orb-cyan)' }} />, title: 'Terus Berkembang', desc: 'Fitur baru hadir berdasarkan masukan nyata dari para penonton setia.' },
  ];

  return (
    <section aria-labelledby="philosophy-heading" className="relative py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <Glass level={2} radius="panel" noise className="p-8 md:p-12 relative overflow-hidden" style={{ borderRadius: '36px' }}>
            <SakuraCanvas />

            <div className="relative z-10">
              {/* Label */}
              <p className="text-xs font-outfit font-600 tracking-widest text-[var(--text-3)] uppercase mb-3">
                Filosofi Kami
              </p>

              {/* Title */}
              <h2 id="philosophy-heading" className="font-outfit font-800 text-[clamp(1.5rem,4vw,2.5rem)] text-[var(--text)] mb-6 leading-tight">
                Kenapa Namanya SANIME?
              </h2>

              {/* Wordmark */}
              <div className="mb-2">
                <span className="font-outfit font-800 text-[clamp(3rem,10vw,6rem)] leading-none tracking-tight">
                  <span className="text-accent">S</span>
                  <span className="text-accent" style={{ background: 'var(--accent-grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>A</span>
                  <span className="text-[var(--text)]">NIME</span>
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 mb-8 font-jakarta text-sm text-[var(--text-2)]">
                <span><span className="text-accent font-600">S</span> = Sayang</span>
                <span><span className="text-[var(--orb-violet)] font-600">A</span> = Anime</span>
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 font-jakarta text-[var(--text-2)] leading-relaxed text-sm md:text-base max-w-2xl">
                {[
                  'SANIME lahir dari dua kata sederhana: Sayang Anime. Bukan sekadar singkatan, tapi perasaan.',
                  'Perasaan yang muncul saat opening favorit diputar, saat karakter kesayangan berjuang sampai akhir, dan saat episode terakhir selesai lalu kita masih diam sebentar di depan layar.',
                  'Website ini dibuat oleh seseorang yang menyayangi anime, untuk semua orang yang merasakan hal yang sama.',
                  'Karena menonton anime bukan cuma hiburan, tapi cara kita merasakan dunia lain.',
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              {/* Cards */}
              <div className="grid sm:grid-cols-3 gap-4 mt-10">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.12 }}
                  >
                    <Glass level={1} radius="card" className="p-4">
                      <div className="mb-3">{card.icon}</div>
                      <p className="font-outfit font-700 text-sm text-[var(--text)] mb-1">{card.title}</p>
                      <p className="text-xs text-[var(--text-2)] font-jakarta leading-relaxed">{card.desc}</p>
                    </Glass>
                  </motion.div>
                ))}
              </div>
            </div>
          </Glass>
        </motion.div>
      </div>
    </section>
  );
};

export const HomePage: React.FC = () => {
  const { data: ongoingData, isLoading: loadingOngoing, error: errorOngoing, refetch: refetchOngoing } = useOngoing(1);
  const { data: completedData, isLoading: loadingCompleted } = useCompleted(1);
  const { data: genresData } = useGenres();

  const history = getHistory().slice(0, 8);
  const todayDay = getWIBDay();

  const ongoingItems = ongoingData?.data || [];
  const completedItems = completedData?.data || [];
  const genres = genresData?.data || [];

  // Today's schedule from ongoing (match day)
  const todayItems = ongoingItems.filter(
    (a) => a.hariRilis && a.hariRilis.toLowerCase() === todayDay.toLowerCase()
  ).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <div className="px-0 md:px-6 mb-10">
        {loadingOngoing ? (
          <HeroSkeleton />
        ) : errorOngoing ? (
          <ErrorState message="Tidak dapat memuat data anime terbaru." onRetry={() => refetchOngoing()} />
        ) : (
          <HeroCarousel items={ongoingItems} />
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Continue watching */}
        {history.length > 0 && (
          <section aria-labelledby="continue-heading">
            <SectionHeader
              title="Lanjutkan Menonton"
              seeAllHref="/riwayat"
            />
            <div className="flex gap-3 overflow-x-auto scroll-snap-x pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
              {history.map((h) => (
                <Link
                  key={h.episodeSlug}
                  to={`/episode/${h.episodeSlug}`}
                  className="snap-start flex-shrink-0 w-36 sm:w-40 focus-ring rounded-card"
                >
                  <Glass level={1} radius="card" className="overflow-hidden group">
                    <div className="aspect-poster relative overflow-hidden">
                      {h.animePoster && (
                        <img src={h.animePoster} alt={h.animeJudul} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 gradient-bottom" />
                    </div>
                    <div className="p-2">
                      <p className="font-outfit text-xs font-600 text-[var(--text)] line-clamp-1">{h.animeJudul}</p>
                      <p className="text-[10px] text-[var(--text-3)] font-jakarta">Episode {h.episode}</p>
                    </div>
                  </Glass>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sedang Tayang */}
        {loadingOngoing ? (
          <div>
            <div className="h-8 w-48 skeleton rounded-card mb-5" />
            <CardSkeletonRow />
          </div>
        ) : (
          <AnimeCarousel
            title="Sedang Tayang"
            subtitle="Anime yang sedang berjalan"
            seeAllHref="/ongoing"
            items={ongoingItems}
          />
        )}

        {/* Jadwal hari ini */}
        {todayItems.length > 0 && (
          <section aria-labelledby="today-heading">
            <SectionHeader
              title={`Tayang Hari Ini (${todayDay})`}
              seeAllHref="/jadwal"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {todayItems.map((anime) => (
                <AnimeCard key={anime.slug} anime={anime} />
              ))}
            </div>
          </section>
        )}

        {/* Anime Tamat */}
        {!loadingCompleted && completedItems.length > 0 && (
          <section aria-labelledby="completed-heading">
            <SectionHeader
              title="Anime Tamat"
              subtitle="Serial yang sudah selesai"
              seeAllHref="/completed"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {completedItems.slice(0, 12).map((anime) => (
                <AnimeCard key={anime.slug} anime={anime} />
              ))}
            </div>
          </section>
        )}

        {/* Genre cloud */}
        {genres.length > 0 && (
          <section aria-labelledby="genre-heading">
            <SectionHeader title="Jelajahi Genre" seeAllHref="/genre" />
            <div className="flex flex-wrap gap-2">
              {genres.slice(0, 24).map((g) => (
                <Link
                  key={g.slug}
                  to={`/genre/${g.slug}`}
                  className="glass-1 glass-base px-4 py-2 rounded-pill text-sm font-jakarta font-500 text-[var(--text-2)] hover:text-[var(--text)] btn-press focus-ring transition-colors"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Philosophy */}
      <PhilosophySection />
    </div>
  );
};
