import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`skeleton rounded-card ${className}`} aria-hidden="true" />
);

export const CardSkeleton: React.FC = () => (
  <div className="w-36 sm:w-40 md:w-44 flex-shrink-0">
    <Skeleton className="aspect-poster w-full mb-2" />
    <Skeleton className="h-4 w-4/5 mb-1" />
    <Skeleton className="h-3 w-3/5" />
  </div>
);

export const CardSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i}>
        <Skeleton className="aspect-poster w-full mb-2" />
        <Skeleton className="h-4 w-4/5 mb-1" />
        <Skeleton className="h-3 w-3/5" />
      </div>
    ))}
  </div>
);

export const CardSkeletonRow: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="flex gap-3 overflow-hidden">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const HeroSkeleton: React.FC = () => (
  <div className="w-full rounded-panel" style={{ height: '70vh' }} aria-hidden="true">
    <Skeleton className="w-full h-full" />
  </div>
);

export const DetailSkeleton: React.FC = () => (
  <div className="grid md:grid-cols-[280px_1fr] gap-8">
    <div>
      <Skeleton className="aspect-poster w-full mb-4" />
      <Skeleton className="h-12 w-full mb-3" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);
