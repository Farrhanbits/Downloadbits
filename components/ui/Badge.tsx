'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  iconDot?: boolean;
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  iconDot = true,
  arrow = false,
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0c0c10]/90 px-3.5 py-1.5 text-xs font-medium tracking-wide text-zinc-300 backdrop-blur-md transition-all hover:border-violet-500/40 hover:bg-[#141319] hover:text-white ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {iconDot && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500"></span>
        </span>
      )}
      <span>{children}</span>
      {arrow && <ArrowRight className="h-3.5 w-3.5 text-violet-400" />}
    </div>
  );
};
