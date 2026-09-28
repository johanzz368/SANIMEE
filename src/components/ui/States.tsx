import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Glass } from './glass/Glass';
import { Button } from './glass/Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Terjadi kesalahan saat memuat data.',
  onRetry,
}) => (
  <Glass level={1} radius="panel" className="p-8 text-center max-w-md mx-auto">
    <div className="w-14 h-14 rounded-pill glass-2 glass-base flex items-center justify-center mx-auto mb-4">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--orb-pink)" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    </div>
    <h3 className="font-outfit font-700 text-base text-[var(--text)] mb-2">Gagal memuat</h3>
    <p className="text-sm text-[var(--text-2)] mb-5 font-jakarta leading-relaxed">{message}</p>
    {onRetry && (
      <Button variant="glass" size="sm" onClick={onRetry}>
        <RefreshCw size={14} />
        Coba lagi
      </Button>
    )}
  </Glass>
);

export const EmptyState: React.FC<{
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}> = ({ icon, title, description, action }) => (
  <Glass level={1} radius="panel" className="p-10 text-center max-w-md mx-auto">
    {icon && (
      <div className="w-16 h-16 rounded-pill glass-2 glass-base flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
    )}
    <h3 className="font-outfit font-700 text-base text-[var(--text)] mb-2">{title}</h3>
    {description && (
      <p className="text-sm text-[var(--text-2)] mb-5 font-jakarta leading-relaxed">{description}</p>
    )}
    {action}
  </Glass>
);
