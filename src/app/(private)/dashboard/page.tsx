'use client';

import React from 'react';
import AnimatedCard from '@/components/AnimatedCard';
import { PageContainer, PillBadge } from '@/components/GlassPanels';
import { Calendar, Bus, Coffee, Map, Users } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-64 -right-64 w-[40rem] h-[40rem] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-64 w-[30rem] h-[30rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-64 left-1/2 w-[35rem] h-[35rem] rounded-full bg-secondary/80 blur-3xl" />
      </div>

      <PageContainer className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <PillBadge className="opacity-0 animate-fade-in text-3xl">Welcome to Your Campus Companion</PillBadge>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatedCard
              title="Cafeteria & Meals"
              description="Browse menus, check meal schedules, and find dietary information across all campus dining facilities."
              icon={<Coffee size={24} />}
              path="/cafeteria"
              delay={100}
            />
            <AnimatedCard
              title="Campus Transportation"
              description="View bus routes, track arrivals in real-time, and never miss a ride with detailed schedules."
              icon={<Bus size={24} />}
              path="/transportation"
              delay={200}
            />
            <AnimatedCard
              title="Class Schedule"
              description="Manage your personal class schedule and access faculty contact information all in one place."
              icon={<Calendar size={24} />}
              path="/schedule"
              delay={300}
            />
            <AnimatedCard
              title="Events & Clubs"
              description="Discover campus events, join clubs, and manage your social calendar with ease."
              icon={<Users size={24} />}
              path="/events"
              delay={400}
            />
            <AnimatedCard
              title="Campus Navigation"
              description="Find your way around campus with interactive maps and AR navigation assistance."
              icon={<Map size={24} />}
              path="/navigation"
              delay={500}
              className="md:col-span-2 lg:col-span-1"
            />
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
