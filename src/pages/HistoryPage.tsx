import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Glass } from '../components/ui/glass/Glass';
import { EmptyState } from '../components/ui/States';
import { Button } from '../components/ui/glass/Button';
import { getHistory, clearHistory } from '../lib/storage';
import { formatRelativeTime } from '../lib/utils';

export const HistoryPage: React.FC = () => {
  const [history, setHistory] = React.useState(() => getHistory());

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="font-outfit font-800 text-2xl md:text-3xl text-[var(--text)] mb-1">Riwayat</h1>
          <p className="text-sm text-[var(--text-2)] font-jakarta">{history.length} episode ditonton</p>
        </div>
        {history.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClear}>
            <Trash2 size={14} />
            Hapus Semua
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <EmptyState
          icon={<Clock size={20} className="text-[var(--text-3)]" />}
          title="Belum ada riwayat"
          description="Tonton anime dulu, baru deh riwayatnya muncul di sini."
          action={<Link to="/"><Button variant="primary" size="sm">Mulai Nonton</Button></Link>}
        />
      ) : (
        <div className="space-y-3">
          {history.map((item, i) => (
            <motion.div
              key={item.episodeSlug}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link to={`/episode/${item.episodeSlug}`} className="block focus-ring rounded-card">
                <Glass level={1} radius="card" className="p-4 flex items-center gap-4 hover:scale-[1.01] transition-transform">
                  {/* Thumbnail */}
                  <div className="w-14 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    {item.animePoster ? (
                      <img src={item.animePoster} alt={item.animeJudul} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-outfit font-700 text-sm text-[var(--text)] line-clamp-1 mb-1">{item.animeJudul}</p>
                    <p className="text-xs text-[var(--text-2)] font-jakarta">Episode {item.episode}</p>
                    <p className="text-xs text-[var(--text-3)] font-jakarta mt-1">{formatRelativeTime(item.watchedAt)}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 glass-1 glass-base rounded-pill w-8 h-8 flex items-center justify-center text-[var(--text-3)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Glass>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
