import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Glass } from '../ui/glass/Glass';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-2xl',
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className={`relative w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
          >
            <Glass level={3} radius="panel" className="p-6">
              {/* Header */}
              {title && (
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-outfit font-700 text-lg text-[var(--text)]">{title}</h2>
                  <button
                    ref={closeRef}
                    onClick={onClose}
                    aria-label="Tutup"
                    className="glass-1 glass-base rounded-pill w-8 h-8 flex items-center justify-center btn-press focus-ring"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              {!title && (
                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Tutup"
                  className="absolute top-4 right-4 glass-1 glass-base rounded-pill w-8 h-8 flex items-center justify-center btn-press focus-ring z-10"
                >
                  <X size={14} />
                </button>
              )}
              {children}
            </Glass>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
