import React from 'react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  seeAllHref?: string;
  seeAllLabel?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  seeAllHref,
  seeAllLabel = 'Lihat Semua',
}) => {
  return (
    <div className="flex items-end justify-between mb-5 gap-4">
      <div>
        <h2 className="font-outfit text-xl md:text-2xl font-700 text-[var(--text)]">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[var(--text-2)] mt-0.5 font-jakarta">{subtitle}</p>
        )}
      </div>
      {seeAllHref && (
        <Link
          to={seeAllHref}
          className="glass-1 glass-base px-4 py-2 rounded-pill text-sm font-outfit font-600 text-[var(--text-2)] hover:text-[var(--text)] btn-press focus-ring whitespace-nowrap transition-colors flex-shrink-0"
        >
          {seeAllLabel}
        </Link>
      )}
    </div>
  );
};
