import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { Glass } from '../ui/glass/Glass';

interface ApiStatusBannerProps {
  show: boolean;
  onDismiss: () => void;
}

export const ApiStatusBanner: React.FC<ApiStatusBannerProps> = ({ show, onDismiss }) => {
  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-lg px-4">
      <Glass level={3} radius="panel" className="px-5 py-3 flex items-center gap-3">
        <AlertTriangle size={16} style={{ color: 'var(--orb-pink)', flexShrink: 0 }} />
        <p className="text-sm font-jakarta font-500 text-[var(--text)] flex-1">
          Server data sedang bermasalah. Periksa koneksi API.
        </p>
        <button
          onClick={onDismiss}
          aria-label="Tutup peringatan"
          className="flex-shrink-0 p-1 rounded-pill focus-ring hover:bg-white/10 transition-colors"
        >
          <X size={12} className="text-[var(--text-3)]" />
        </button>
      </Glass>
    </div>
  );
};
