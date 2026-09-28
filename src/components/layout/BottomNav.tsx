import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Calendar, Bookmark, Clock } from 'lucide-react';
import { Glass } from '../ui/glass/Glass';

const TABS = [
  { to: '/', label: 'Beranda', icon: Home, exact: true },
  { to: '/cari', label: 'Cari', icon: Search, exact: false },
  { to: '/jadwal', label: 'Jadwal', icon: Calendar, exact: false },
  { to: '/bookmark', label: 'Bookmark', icon: Bookmark, exact: false },
  { to: '/riwayat', label: 'Riwayat', icon: Clock, exact: false },
];

export const BottomNav: React.FC = () => {
  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden w-[calc(100%-2rem)] max-w-sm"
    >
      <Glass level={2} radius="pill" className="px-2 py-2">
        <div className="flex items-center justify-around">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.exact}
              aria-label={tab.label}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-pill focus-ring transition-all min-w-[44px] min-h-[44px] justify-center"
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-pill transition-all duration-300"
                      style={{ background: 'var(--accent-grad)', opacity: 0.18 }}
                      aria-hidden="true"
                    />
                  )}
                  <tab.icon
                    size={18}
                    className={`relative z-10 transition-colors ${
                      isActive ? 'text-[var(--text)]' : 'text-[var(--text-3)]'
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`relative z-10 text-[10px] font-jakarta font-500 transition-colors ${
                      isActive ? 'text-[var(--text)]' : 'text-[var(--text-3)]'
                    }`}
                  >
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </Glass>
    </nav>
  );
};
