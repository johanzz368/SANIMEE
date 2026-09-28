import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, Server, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEpisode } from '../hooks/useApi';
import { Glass } from '../components/ui/glass/Glass';
import { Button } from '../components/ui/glass/Button';
import { ErrorState } from '../components/ui/States';

import { addToHistory } from '../lib/storage';

export const WatchPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();

  const { data, isLoading, error, refetch } = useEpisode(slug);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);

  const episode = data?.data;

  // Determine embed URL
  const embedUrl = selectedServer || episode?.embedUrl || episode?.iframeUrl || episode?.streamUrl;

  // Save to history
  useEffect(() => {
    if (!episode) return;
    addToHistory({
      animeSlug: episode.anime || slug,
      animeJudul: episode.anime || episode.judul || 'Anime',
      animePoster: '',
      episodeSlug: slug,
      episode: episode.episode || '',
    });
  }, [episode, slug]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        <div className="skeleton rounded-panel" style={{ aspectRatio: '16/9', width: '100%' }} />
        <div className="skeleton rounded-card h-12 w-64" />
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <ErrorState message="Gagal memuat episode. Coba server lain atau periksa koneksi." onRetry={() => refetch()} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-5"
      >
        {/* Player wrapper */}
        <Glass level={2} radius="panel" className="overflow-hidden player-glow">
          {embedUrl ? (
            <div className="relative" style={{ aspectRatio: '16/9' }}>
              <iframe
                src={embedUrl}
                title={`${episode.anime} - Episode ${episode.episode}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-4"
              style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #0f0f1a, #1a1a2e)' }}
            >
              <Server size={40} className="text-[var(--text-3)]" />
              <p className="text-[var(--text-2)] font-jakarta text-sm text-center px-4">
                Tidak ada link streaming. Pilih server di bawah atau periksa API.
              </p>
            </div>
          )}
        </Glass>

        {/* Episode info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-outfit font-700 text-lg md:text-xl text-[var(--text)] text-shadow">
              {episode.anime || episode.judul}
            </h1>
            <p className="text-sm text-[var(--text-2)] font-jakarta">
              Episode {episode.episode}
            </p>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {episode.prevEpisode && (
              <Link to={`/episode/${episode.prevEpisode.slug}`}>
                <Button variant="glass" size="sm">
                  <ChevronLeft size={14} />
                  Eps {episode.prevEpisode.episode}
                </Button>
              </Link>
            )}
            {episode.nextEpisode && (
              <Link to={`/episode/${episode.nextEpisode.slug}`}>
                <Button variant="primary" size="sm">
                  Eps {episode.nextEpisode.episode}
                  <ChevronRight size={14} />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Servers */}
        {episode.server && episode.server.length > 0 && (
          <Glass level={1} radius="card" className="p-4">
            <h2 className="font-outfit font-700 text-sm text-[var(--text-3)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Server size={13} /> Server
            </h2>
            <div className="flex flex-wrap gap-2">
              {episode.server.map((srv) => (
                <button
                  key={srv.url}
                  onClick={() => setSelectedServer(srv.url)}
                  aria-pressed={selectedServer === srv.url}
                  className={`px-4 py-2 rounded-pill text-sm font-outfit font-600 btn-press focus-ring transition-all ${
                    selectedServer === srv.url
                      ? 'text-white'
                      : 'glass-1 glass-base text-[var(--text-2)] hover:text-[var(--text)]'
                  }`}
                  style={selectedServer === srv.url ? { background: 'var(--accent-grad)' } : {}}
                >
                  {srv.name}
                </button>
              ))}
            </div>
          </Glass>
        )}

        {/* Downloads */}
        {episode.downloadUrl && episode.downloadUrl.length > 0 && (
          <Glass level={1} radius="card" className="p-4">
            <h2 className="font-outfit font-700 text-sm text-[var(--text-3)] uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Download size={13} /> Unduhan
            </h2>
            <div className="flex flex-wrap gap-2">
              {episode.downloadUrl.map((dl) => (
                <a
                  key={dl.url}
                  href={dl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-1 glass-base px-4 py-2 rounded-pill text-sm font-outfit font-600 text-[var(--text-2)] hover:text-[var(--text)] btn-press focus-ring transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink size={12} />
                  {dl.resolution} {dl.size ? `(${dl.size})` : ''}
                </a>
              ))}
            </div>
          </Glass>
        )}

        {/* Disclaimer */}
        <Glass level={1} radius="card" className="p-4">
          <p className="text-xs text-[var(--text-3)] font-jakarta leading-relaxed">
            SANIME tidak menyimpan atau meng-host file video. Seluruh konten streaming berasal dari server pihak ketiga.
          </p>
        </Glass>
      </motion.div>
    </div>
  );
};
