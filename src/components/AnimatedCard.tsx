'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  delay?: number;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ title, description, icon, path, delay = 0, className }) => {
  const router = useRouter();
  const delayClass = `animate-delay-${delay}`;

  return (
    <div
      className={cn(
        'opacity-0 animate-fade-up',
        delayClass,
        'group cursor-pointer rounded-2xl p-6 transition-all duration-300',
        'bg-white border border-border hover:border-primary/20',
        'shadow-sm hover:shadow-md',
        className,
      )}
      onClick={() => router.push(path)}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 flex justify-between items-start">
          <div className="p-3 rounded-xl bg-accent text-primary">{icon}</div>
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transform group-hover:translate-x-0.5 transition-transform duration-300"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="mt-auto">
          <div className="h-1.5 w-12 rounded-full bg-secondary group-hover:bg-primary transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;
