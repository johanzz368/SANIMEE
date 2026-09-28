import React, { createContext, useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Check, AlertCircle } from 'lucide-react';
import { Glass } from './glass/Glass';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextValue {
  showToast: (message: string, type?: Toast['type']) => void;
}

export const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
    const id = `toast-${++counter.current}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-xs px-4"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Glass level={3} radius="pill" className="px-4 py-3 flex items-center gap-3 shadow-2xl">
                <span className="flex-shrink-0">
                  {toast.type === 'success' && <Check size={16} style={{ color: 'var(--orb-cyan)' }} />}
                  {toast.type === 'error' && <AlertCircle size={16} style={{ color: 'var(--orb-pink)' }} />}
                  {toast.type === 'info' && <AlertCircle size={16} style={{ color: 'var(--orb-violet)' }} />}
                </span>
                <p className="text-sm font-jakarta font-500 text-[var(--text)] flex-1">{toast.message}</p>
                <button
                  onClick={() => dismiss(toast.id)}
                  aria-label="Tutup notifikasi"
                  className="flex-shrink-0 p-1 rounded-pill focus-ring hover:bg-white/10 transition-colors"
                >
                  <X size={12} className="text-[var(--text-3)]" />
                </button>
              </Glass>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
