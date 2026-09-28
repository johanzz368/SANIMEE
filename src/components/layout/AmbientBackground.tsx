import React from 'react';

// Animated ambient orbs — fixed behind all content, provides color for glass to show through
export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10" aria-hidden="true">
      {/* Base background */}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg)' }} />

      {/* Orb pink */}
      <div
        className="absolute rounded-full animate-orb-1"
        style={{
          width: '60vmax',
          height: '60vmax',
          top: '-20vmax',
          left: '-15vmax',
          background: 'radial-gradient(circle, var(--orb-pink) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.18,
        }}
      />

      {/* Orb violet */}
      <div
        className="absolute rounded-full animate-orb-2"
        style={{
          width: '50vmax',
          height: '50vmax',
          top: '30vh',
          right: '-10vmax',
          background: 'radial-gradient(circle, var(--orb-violet) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.16,
        }}
      />

      {/* Orb cyan */}
      <div
        className="absolute rounded-full animate-orb-3"
        style={{
          width: '45vmax',
          height: '45vmax',
          bottom: '-10vmax',
          left: '30vw',
          background: 'radial-gradient(circle, var(--orb-cyan) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.12,
        }}
      />

      {/* Noise layer */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
};
