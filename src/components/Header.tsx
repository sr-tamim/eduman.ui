'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Calendar, Bus, Coffee, Map, Users, PowerCircle, BotMessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const navItems = [
    { name: 'Cafeteria', path: '/cafeteria', icon: Coffee },
    { name: 'Transportation', path: '/transportation', icon: Bus },
    { name: 'Schedule', path: '/schedule', icon: Calendar },
    { name: 'Events', path: '/events', icon: Users },
    { name: 'Navigation', path: '/navigation', icon: Map },
    { name: 'Chatbot', path: '/chat', icon: BotMessageSquare },
    {
      name: 'Log out',
      path: '/dashboard',
      icon: PowerCircle,
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 lg:px-10',
        scrolled ? 'py-3 bg-background/80 backdrop-blur-lg border-b border-border/50' : 'py-5',
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          className="flex items-center gap-2"
          onClick={() => {
            router.push('/dashboard');
            setMobileMenuOpen(false);
          }}
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent-foreground flex items-center justify-center">
            <span className="absolute text-white font-semibold">C</span>
          </div>
          <span className="font-semibold text-lg">Campus Life</span>
        </button>

        {isMobile ? (
          <>
            <button
              className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span
                className={cn(
                  'w-5 h-0.5 bg-foreground transition-all duration-300',
                  mobileMenuOpen && 'transform translate-y-2 rotate-45',
                )}
              />
              <span
                className={cn('w-5 h-0.5 bg-foreground transition-all duration-300', mobileMenuOpen && 'opacity-0')}
              />
              <span
                className={cn(
                  'w-5 h-0.5 bg-foreground transition-all duration-300',
                  mobileMenuOpen && 'transform -translate-y-2 -rotate-45',
                )}
              />
            </button>

            <div
              className={cn(
                'fixed inset-0 bg-background flex flex-col items-center justify-center transition-all duration-500 ease-in-out',
                mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
              )}
            >
              <nav className="flex flex-col items-center gap-6">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      if (item.name === 'Log out') {
                        handleLogout();
                      } else {
                        router.push(item.path);
                      }
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      'flex items-center gap-2 px-4 py-3 rounded-lg text-lg transition-all',
                      pathname === item.path
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </>
        ) : (
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  if (item.name === 'Log out') {
                    handleLogout();
                  } else {
                    router.push(item.path);
                  }
                }}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all',
                  pathname === item.path
                    ? 'text-primary bg-accent/50'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                )}
              >
                <item.icon size={16} />
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
