import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Moon, Sun, Bookmark, Clock, X } from 'lucide-react';
import { Glass } from '../ui/glass/Glass';
import { getTheme, setTheme, type Theme } from '../../lib/storage';
import { debounce } from '../../lib/utils';

const NAV_LINKS = [
  { to: '/', label: 'Beranda', exact: true },
  { to: '/jadwal', label: 'Jadwal', exact: false },
  { to: '/genre', label: 'Genre', exact: false },
  { to: '/daftar', label: 'Daftar A-Z', exact: false },
];

interface NavbarProps {
  onSearch?: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setThemeState] = useState<Theme>(() => getTheme());
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // "/" shortcut focuses search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setThemeState(next);
  };

  const handleSearch = debounce((val: string) => {
    if (val.trim().length >= 2) {
      navigate(`/cari?q=${encodeURIComponent(val.trim())}`);
    }
  }, 400) as (val: string) => void;

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim().length >= 2) {
      navigate(`/cari?q=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Desktop / floating pill navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-5xl hidden md:block">
        <Glass
          level={2}
          radius="pill"
          className={`px-4 py-2 flex items-center gap-4 transition-all duration-300 ${
            scrolled ? 'py-1.5' : ''
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 flex-shrink-0 focus-ring rounded-pill px-1" aria-label="SANIME beranda">
            <SakuraIcon />
            <span className="font-outfit font-800 text-lg leading-none">
              <span className="text-accent">S</span>
              <span className="text-[var(--text)]">ANIME</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1 flex-1 justify-center" aria-label="Menu utama">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.exact}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-pill text-sm font-jakarta font-500 transition-all focus-ring ${
                    isActive
                      ? 'text-[var(--text)]'
                      : 'text-[var(--text-2)] hover:text-[var(--text)] hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-pill"
                        style={{ background: 'var(--accent-grad)', opacity: 0.15 }}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buka pencarian (tekan /)"
              title="Cari anime (tekan /)"
              className="glass-1 glass-base rounded-pill px-3 py-1.5 text-sm font-jakarta text-[var(--text-3)] flex items-center gap-2 btn-press focus-ring hover:text-[var(--text-2)] transition-colors"
            >
              <Search size={14} />
              <span>Cari...</span>
              <kbd className="text-xs opacity-50 font-outfit">/</kbd>
            </button>
            <Link
              to="/bookmark"
              aria-label="Bookmark"
              className="glass-1 glass-base rounded-pill w-9 h-9 flex items-center justify-center btn-press focus-ring hover:text-[var(--text)] text-[var(--text-2)] transition-colors"
            >
              <Bookmark size={14} />
            </Link>
            <Link
              to="/riwayat"
              aria-label="Riwayat"
              className="glass-1 glass-base rounded-pill w-9 h-9 flex items-center justify-center btn-press focus-ring hover:text-[var(--text)] text-[var(--text-2)] transition-colors"
            >
              <Clock size={14} />
            </Link>
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
              className="glass-1 glass-base rounded-pill w-9 h-9 flex items-center justify-center btn-press focus-ring hover:text-[var(--text)] text-[var(--text-2)] transition-colors"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </Glass>
      </header>

      {/* Mobile top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 md:hidden">
        <Glass level={2} radius="none" className="px-4 py-3 flex items-center justify-between border-x-0 border-t-0">
          <Link to="/" className="flex items-center gap-1.5 focus-ring rounded-pill px-1" aria-label="SANIME beranda">
            <SakuraIcon />
            <span className="font-outfit font-800 text-base leading-none">
              <span className="text-accent">S</span>
              <span className="text-[var(--text)]">ANIME</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Cari anime"
              className="glass-1 glass-base rounded-pill w-9 h-9 flex items-center justify-center btn-press focus-ring"
            >
              <Search size={14} />
            </button>
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Mode terang' : 'Mode gelap'}
              className="glass-1 glass-base rounded-pill w-9 h-9 flex items-center justify-center btn-press focus-ring"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </Glass>
      </header>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-xl">
            <Glass level={3} radius="panel" className="p-2">
              <form onSubmit={handleSearchSubmit} role="search">
                <div className="flex items-center gap-3 px-3 py-2">
                  <Search size={18} className="text-[var(--text-3)] flex-shrink-0" aria-hidden="true" />
                  <input
                    autoFocus
                    type="search"
                    value={searchVal}
                    onChange={handleSearchInput}
                    placeholder="Cari anime..."
                    aria-label="Cari anime"
                    className="flex-1 bg-transparent text-base text-[var(--text)] placeholder:text-[var(--text-3)] outline-none font-jakarta"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    aria-label="Tutup pencarian"
                    className="flex-shrink-0 p-1 rounded-pill focus-ring hover:bg-white/10 transition-colors"
                  >
                    <X size={16} className="text-[var(--text-3)]" />
                  </button>
                </div>
              </form>
            </Glass>
          </div>
        </div>
      )}
    </>
  );
};

// Sakura icon inline SVG
const SakuraIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2C10.5 5 8 6.5 5 7c2 1.5 3 3.5 3 6 1.5-1.5 3.5-2 6-1.5C13.5 9 14 7 12 2z" fill="url(#sp)" />
    <path d="M22 12c-3-1.5-4.5-4-5-7-1.5 2-3.5 3-6 3 1.5 1.5 2 3.5 1.5 6C15 13 17 12.5 22 12z" fill="url(#sp)" opacity="0.8" />
    <path d="M12 22c1.5-3 4-4.5 7-5-2-1.5-3-3.5-3-6-1.5 1.5-3.5 2-6 1.5C10.5 15 10 17 12 22z" fill="url(#sp)" opacity="0.7" />
    <path d="M2 12c3 1.5 4.5 4 5 7 1.5-2 3.5-3 6-3-1.5-1.5-2-3.5-1.5-6C9 11 7 11.5 2 12z" fill="url(#sp)" opacity="0.6" />
    <path d="M7 2c.5 3 2.5 5 5 6C10.5 5.5 9 3.5 7 2z" fill="url(#sp)" opacity="0.5" />
    <defs>
      <linearGradient id="sp" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF4D8D" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
  </svg>
);
