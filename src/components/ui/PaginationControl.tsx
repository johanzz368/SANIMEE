import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Pagination } from '../../types';

interface PaginationControlProps {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
  pagination,
  onPageChange,
}) => {
  const { prevPage, currentPage, nextPage, totalPages } = pagination;

  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Navigasi halaman" className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => prevPage && onPageChange(prevPage)}
        disabled={!prevPage}
        aria-label="Halaman sebelumnya"
        className="glass-1 glass-base rounded-pill px-4 py-2 text-sm font-outfit font-600 
          disabled:opacity-40 disabled:cursor-not-allowed btn-press focus-ring
          flex items-center gap-1.5 text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
      >
        <ChevronLeft size={14} />
        Sebelumnya
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1.5">
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`dot-${i}`} className="px-2 text-[var(--text-3)] text-sm">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              aria-label={`Halaman ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`
                w-9 h-9 rounded-pill text-sm font-outfit font-600 btn-press focus-ring transition-all
                ${page === currentPage
                  ? 'text-white'
                  : 'glass-1 glass-base text-[var(--text-2)] hover:text-[var(--text)]'
                }
              `}
              style={page === currentPage ? { background: 'var(--accent-grad)' } : {}}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => nextPage && onPageChange(nextPage)}
        disabled={!nextPage}
        aria-label="Halaman berikutnya"
        className="glass-1 glass-base rounded-pill px-4 py-2 text-sm font-outfit font-600
          disabled:opacity-40 disabled:cursor-not-allowed btn-press focus-ring
          flex items-center gap-1.5 text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
      >
        Berikutnya
        <ChevronRight size={14} />
      </button>
    </nav>
  );
};

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push('...');
  pages.push(total);

  return pages;
}
