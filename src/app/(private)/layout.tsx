'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useAuthStatus } from '@/lib/auth/auth.hooks';
import { cn } from '@/lib/utils';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data: isAuthenticated, isLoading } = useAuthStatus();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Authentication check using secure cookies
  useEffect(() => {
    if (!isLoading && isAuthenticated === false) {
      // Set redirecting state for overlay message and fade-out animation
      setIsRedirecting(true);

      // Wait for animation to complete before redirecting
      const redirectTimer = setTimeout(() => {
        router.push('/login');
      }, 500); // Match this with the CSS transition duration

      return () => clearTimeout(redirectTimer);
    }
  }, [isAuthenticated, isLoading, router]);

  // Show the primary layout with an overlay for loading/redirecting states
  return (
    <div className="min-h-screen bg-background relative">
      <Header />

      {/* Main content with fade out animation when redirecting */}
      <main className={cn('pt-20 pb-16 transition-opacity duration-500 ease-in-out', isRedirecting && 'opacity-30')}>
        {children}
      </main>

      {/* Overlay for loading or redirecting states */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center bg-background backdrop-blur-sm z-50 transition-all duration-300 ease-in-out ${isLoading || isRedirecting ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="w-16 h-16 relative mb-6">
          <div className="w-16 h-16 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
          <div
            className={cn(
              'absolute inset-0 rounded-full border-t-2 border-primary animate-ping',
              'opacity-75 transition-opacity duration-1000 ease-in-out',
            )}
          ></div>
        </div>
        <p className="text-lg font-medium animate-pulse">
          {isRedirecting ? 'Redirecting to login...' : 'Checking authentication...'}
        </p>
      </div>

      <footer className="text-center pb-6">
        <div className="opacity-0 animate-fade-up animate-delay-300">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EduMan · Developed by SR Tamim</p>
        </div>
      </footer>
    </div>
  );
}
