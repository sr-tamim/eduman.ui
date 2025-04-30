'use client';

import React, { useState } from 'react';
import { PageContainer, SectionTitle, GlassPanel, PillBadge } from '@/components/GlassPanels';
import { Calendar, Clock, MapPin, Mail, Phone, User } from 'lucide-react';

const scheduleData = {
  courses: [
    {
      id: 'cs101',
      code: 'CS 101',
      name: 'Introduction to Computer Science',
      professor: 'prof1',
      location: 'Science Building 302',
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '9:00 AM - 10:15 AM',
      color: '#60a5fa',
    },
    {
      id: 'math201',
      code: 'MATH 201',
      name: 'Calculus II',
      professor: 'prof2',
      location: 'Mathematics Hall 105',
      days: ['Tuesday', 'Thursday'],
      time: '11:00 AM - 12:30 PM',
      color: '#4ade80',
    },
    {
      id: 'phys101',
      code: 'PHYS 101',
      name: 'Physics for Scientists',
      professor: 'prof3',
      location: 'Science Building 210',
      days: ['Monday', 'Wednesday'],
      time: '2:00 PM - 3:30 PM',
      color: '#f87171',
    },
    {
      id: 'eng215',
      code: 'ENG 215',
      name: 'Creative Writing',
      professor: 'prof4',
      location: 'Arts Building 122',
      days: ['Tuesday', 'Friday'],
      time: '1:00 PM - 2:15 PM',
      color: '#c084fc',
    },
  ],
  professors: [
    {
      id: 'prof1',
      name: 'Dr. Farzana Kabir',
      department: 'Computer Science',
      email: 'kabir@university.edu',
      phone: '(+880) 123-4567',
      officeLocation: 'Tech Building 402',
      officeHours: ['Monday 1:00 PM - 3:00 PM', 'Thursday 10:00 AM - 12:00 PM'],
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    },
    {
      id: 'prof2',
      name: 'Dr. Anwar Khan',
      department: 'Mathematics',
      email: 'anwar@university.edu',
      phone: '(+880) 234-5678',
      officeLocation: 'Mathematics Hall 302',
      officeHours: ['Tuesday 2:00 PM - 4:00 PM', 'Friday 9:00 AM - 11:00 AM'],
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    },
    {
      id: 'prof3',
      name: 'Dr. Maria Hasan',
      department: 'Physics',
      email: 'Maria@university.edu',
      phone: '(+880) 345-6789',
      officeLocation: 'Science Building 415',
      officeHours: ['Wednesday 11:00 AM - 1:00 PM', 'Friday 2:00 PM - 4:00 PM'],
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop',
    },
    {
      id: 'prof4',
      name: 'Dr. Sultan Badsha',
      department: 'English',
      email: 'sultan@university.edu',
      phone: '(+880) 456-7890',
      officeLocation: 'Arts Building 205',
      officeHours: ['Monday 10:00 AM - 12:00 PM', 'Wednesday 2:00 PM - 4:00 PM'],
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
    },
  ],
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
};

export default function SchedulePage() {
  const [selectedProfessor, setSelectedProfessor] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>('Monday');

  const filterCoursesByDay = (day: string) => {
    return scheduleData.courses.filter((course) => course.days.includes(day));
  };

  const getProfessorInfo = (profId: string) => {
    return scheduleData.professors.find((prof) => prof.id === profId);
  };

  return (
    <PageContainer>
      <SectionTitle eyebrow="Academic Planning" title="Class Schedules & Faculty Contacts" />

      {/* Day selector */}
      <div className="flex flex-wrap gap-2 mb-6 opacity-0 animate-fade-up">
        {scheduleData.days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              selectedDay === day
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-muted-foreground border-input hover:border-primary/50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Class schedule */}
      <div className="mb-10 opacity-0 animate-fade-up animate-delay-100">
        <GlassPanel className="p-6">
          <h2 className="text-xl font-medium mb-4 flex items-center">
            <Calendar size={20} className="mr-2" />
            {selectedDay}'s Schedule
          </h2>

          <div className="space-y-4">
            {filterCoursesByDay(selectedDay || 'Monday').length > 0 ? (
              filterCoursesByDay(selectedDay || 'Monday').map((course) => {
                const professor = getProfessorInfo(course.professor);
                return (
                  <div
                    key={course.id}
                    className="p-4 rounded-lg border border-border transition-all hover:shadow-md"
                    style={{ borderLeftWidth: '4px', borderLeftColor: course.color }}
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
                      <div>
                        <PillBadge className="mb-1">{course.code}</PillBadge>
                        <h3 className="font-medium">{course.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock size={14} className="mr-1" />
                          <span>{course.time}</span>
                          <span className="mx-1.5">•</span>
                          <MapPin size={14} className="mr-1" />
                          <span>{course.location}</span>
                        </div>
                      </div>

                      <button
                        className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors"
                        onClick={() =>
                          setSelectedProfessor(selectedProfessor === course.professor ? null : course.professor)
                        }
                      >
                        <User size={16} />
                        <span>{professor?.name}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No classes scheduled for this day</p>
              </div>
            )}
          </div>
        </GlassPanel>
      </div>

      {/* Professor details */}
      <div className="opacity-0 animate-fade-up animate-delay-200">
        <h2 className="text-xl font-medium mb-4">Faculty Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scheduleData.professors.map((professor) => (
            <div
              key={professor.id}
              className={`bg-white rounded-xl border overflow-hidden shadow-sm transition-all duration-300 ${
                selectedProfessor === professor.id ? 'ring-2 ring-primary scale-[1.02]' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedProfessor(selectedProfessor === professor.id ? null : professor.id)}
            >
              <div className="aspect-square overflow-hidden bg-secondary">
                <img src={professor.imageUrl} alt={professor.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{professor.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{professor.department}</p>

                {selectedProfessor === professor.id && (
                  <div className="mt-4 space-y-3 animate-fade-in">
                    <div className="flex items-start gap-2 text-sm">
                      <Mail size={14} className="mt-0.5 text-muted-foreground" />
                      <a
                        href={`mailto:${professor.email}`}
                        className="text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {professor.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Phone size={14} className="mt-0.5 text-muted-foreground" />
                      <span>{professor.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin size={14} className="mt-0.5 text-muted-foreground" />
                      <span>{professor.officeLocation}</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs font-medium mb-1">Office Hours:</p>
                      <ul className="text-xs space-y-1">
                        {professor.officeHours.map((hours, index) => (
                          <li key={index} className="bg-secondary/50 px-2 py-1 rounded">
                            {hours}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
