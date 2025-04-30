'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const router = useRouter();

  // Check authentication and redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 p-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to <span className="text-primary">EduMan</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">Your complete campus management solution</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
