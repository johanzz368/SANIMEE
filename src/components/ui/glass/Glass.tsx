import React, { useRef, useCallback } from 'react';
import { clamp } from '../../lib/utils';

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3;
  radius?: 'card' | 'panel' | 'pill' | 'none';
  noise?: boolean;
  as?: React.ElementType;
  children?: React.ReactNode;
}

const radiusMap = {
  card: 'rounded-card',
  panel: 'rounded-panel',
  pill: 'rounded-pill',
  none: 'rounded-none',
};

export const Glass = React.forwardRef<HTMLDivElement, GlassProps>(
  ({ level = 2, radius = 'card', noise = false, as: Tag = 'div', className = '', children, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const combinedRef = (ref || innerRef) as React.RefObject<HTMLDivElement>;

    const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
      const el = combinedRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const mx = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
      const my = clamp(((e.clientY - rect.top) / rect.height) * 100, 0, 100);
      el.style.setProperty('--mx', String(mx));
      el.style.setProperty('--my', String(my));
    }, [combinedRef]);

    const glassClass = `glass-${level} glass-base${noise ? ' glass-noise' : ''}`;
    const rClass = radiusMap[radius];

    return (
      <Tag
        ref={combinedRef}
        className={`${glassClass} ${rClass} ${className}`}
        onPointerMove={handlePointerMove}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Glass.displayName = 'Glass';
