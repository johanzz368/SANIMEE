import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[var(--glass-border)] pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + Tagline */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="font-outfit font-800 text-xl">
                <span className="text-accent">S</span>
                <span className="text-[var(--text)]">ANIME</span>
              </span>
            </div>
            <p className="text-sm text-[var(--text-3)] font-jakarta max-w-xs leading-relaxed">
              Dari seseorang yang menyayangi anime, untuk semua yang merasakan hal yang sama.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Tautan footer" className="flex flex-wrap gap-x-8 gap-y-3">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-outfit font-600 text-[var(--text-3)] uppercase tracking-wide">Jelajahi</span>
              <Link to="/" className="text-sm text-[var(--text-2)] hover:text-[var(--text)] transition-colors font-jakarta focus-ring rounded-sm">Beranda</Link>
              <Link to="/jadwal" className="text-sm text-[var(--text-2)] hover:text-[var(--text)] transition-colors font-jakarta focus-ring rounded-sm">Jadwal Rilis</Link>
              <Link to="/genre" className="text-sm text-[var(--text-2)] hover:text-[var(--text)] transition-colors font-jakarta focus-ring rounded-sm">Genre</Link>
              <Link to="/daftar" className="text-sm text-[var(--text-2)] hover:text-[var(--text)] transition-colors font-jakarta focus-ring rounded-sm">Daftar A-Z</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-outfit font-600 text-[var(--text-3)] uppercase tracking-wide">Akun</span>
              <Link to="/bookmark" className="text-sm text-[var(--text-2)] hover:text-[var(--text)] transition-colors font-jakarta focus-ring rounded-sm">Bookmark</Link>
              <Link to="/riwayat" className="text-sm text-[var(--text-2)] hover:text-[var(--text)] transition-colors font-jakarta focus-ring rounded-sm">Riwayat</Link>
            </div>
          </nav>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-5 border-t border-[var(--glass-border)]">
          <p className="text-xs text-[var(--text-3)] font-jakarta leading-relaxed max-w-2xl">
            SANIME tidak menyimpan file video apa pun. Seluruh konten berasal dari pihak ketiga dan tersedia secara publik. Sumber data dari otakudesu melalui Wajik Anime API.
          </p>
        </div>
      </div>
    </footer>
  );
};
