import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className, onClick }) => {
  return (
    <div
      className={cn(
        'bg-white/70 backdrop-blur-lg border border-white/20 shadow-glass rounded-xl',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface PillBadgeProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const PillBadge: React.FC<PillBadgeProps> = ({ children, className, style }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        'bg-secondary text-secondary-foreground',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  eyebrow,
  title,
  description,
  className,
  centered = false,
}) => {
  return (
    <div className={cn('mb-10', centered && 'text-center', className)}>
      {eyebrow && <PillBadge className="mb-3 animate-fade-in">{eyebrow}</PillBadge>}
      <h2 className={cn('text-3xl lg:text-4xl font-semibold tracking-tight', 'opacity-0 animate-fade-up')}>{title}</h2>
      {description && (
        <p
          className={cn(
            'mt-3 text-lg text-muted-foreground max-w-3xl',
            centered && 'mx-auto',
            'opacity-0 animate-fade-up animate-delay-100',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return <div className={cn('min-h-screen pt-24 pb-16 px-6 lg:px-10 max-w-7xl mx-auto', className)}>{children}</div>;
};
