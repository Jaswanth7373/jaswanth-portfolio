'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) { return twMerge(clsx(inputs)); }

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

const movingMap: Record<Direction, string> = {
  TOP: 'radial-gradient(20.7% 50% at 50% 0%, rgba(200,255,0,0.9) 0%, rgba(200,255,0,0) 100%)',
  LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, rgba(200,255,0,0.9) 0%, rgba(200,255,0,0) 100%)',
  BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, rgba(200,255,0,0.9) 0%, rgba(200,255,0,0) 100%)',
  RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, rgba(200,255,0,0.9) 0%, rgba(200,255,0,0) 100%)',
};

const highlight = 'radial-gradient(75% 181.16% at 50% 50%, rgba(200,255,0,0.6) 0%, rgba(200,255,0,0) 100%)';

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = 'button',
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<{
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
} & React.HTMLAttributes<HTMLElement>>) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<Direction>('BOTTOM');

  const rotateDirection = (current: Direction): Direction => {
    const dirs: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];
    const idx = dirs.indexOf(current);
    const next = clockwise ? (idx - 1 + dirs.length) % dirs.length : (idx + 1) % dirs.length;
    return dirs[next];
  };

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => setDirection(p => rotateDirection(p)), duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration]);

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex h-min w-fit flex-nowrap items-center justify-center gap-2 overflow-visible rounded-full border border-[#c8ff00]/[0.2] bg-black/50 p-px backdrop-blur-sm transition duration-500',
        containerClassName
      )}
      {...props}
    >
      <div className={cn('z-10 w-auto rounded-[inherit] px-5 py-2.5', className)}>
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{ filter: 'blur(2px)', position: 'absolute', width: '100%', height: '100%' }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered ? [movingMap[direction], highlight] : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration: duration ?? 1 }}
      />
      <div className="absolute inset-0.5 z-[1] flex-none rounded-full bg-[#050505]" />
    </Element>
  );
}
