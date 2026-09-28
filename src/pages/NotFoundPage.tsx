import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Glass } from '../components/ui/glass/Glass';
import { Button } from '../components/ui/glass/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-full max-w-lg text-center"
      >
        <Glass level={2} radius="panel" noise className="p-10 md:p-14" style={{ borderRadius: '36px' }}>
          {/* 404 number */}
          <div className="font-outfit font-800 leading-none mb-4" style={{ fontSize: 'clamp(5rem, 20vw, 9rem)' }}>
            <span className="text-accent">4</span>
            <span style={{ color: 'var(--text-3)' }}>0</span>
            <span className="text-accent">4</span>
          </div>

          <h1 className="font-outfit font-700 text-xl text-[var(--text)] mb-3">Halaman Tidak Ditemukan</h1>
          <p className="text-sm text-[var(--text-2)] font-jakarta leading-relaxed mb-8 max-w-sm mx-auto">
            Seperti ending anime yang terlalu cepat — halaman ini tidak ada. Mungkin link-nya salah, atau kontennya sudah pergi ke dunia lain.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="primary" size="md">
                <Home size={15} />
                Kembali ke Beranda
              </Button>
            </Link>
            <Link to="/cari">
              <Button variant="glass" size="md">
                <Search size={15} />
                Cari Anime
              </Button>
            </Link>
          </div>
        </Glass>
      </motion.div>
    </div>
  );
};
