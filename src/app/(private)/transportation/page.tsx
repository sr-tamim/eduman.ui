'use client';

import React, { useState } from 'react';
import { PageContainer, SectionTitle, GlassPanel, PillBadge } from '@/components/GlassPanels';
import { Bus, ArrowRight, Clock, Info, MapIcon } from 'lucide-react';

// Sample transportation data
const transportationData = {
  routes: [
    {
      id: 'route1',
      name: 'Campus Loop',
      color: '#4CAF50',
      stops: ['stop1', 'stop2', 'stop3', 'stop4', 'stop1'],
      estimatedArrival: '5-10 min',
      schedule: {
        weekday: ['7:00 AM', '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM'],
        weekend: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'],
      },
    },
    {
      id: 'route2',
      name: 'Downtown Express',
      color: '#2196F3',
      stops: ['stop1', 'stop5', 'stop6', 'stop7'],
      estimatedArrival: '15 min',
      schedule: {
        weekday: ['7:15 AM', '8:15 AM', '9:15 AM', '10:15 AM', '11:15 AM', '12:15 PM'],
        weekend: ['10:15 AM', '12:15 PM', '2:15 PM', '4:15 PM'],
      },
    },
    {
      id: 'route3',
      name: 'Residence Halls',
      color: '#FF9800',
      stops: ['stop1', 'stop8', 'stop9', 'stop10', 'stop1'],
      estimatedArrival: '3 min',
      schedule: {
        weekday: ['7:10 AM', '7:40 AM', '8:10 AM', '8:40 AM', '9:10 AM', '9:40 AM'],
        weekend: ['9:10 AM', '10:10 AM', '11:10 AM', '12:10 PM', '1:10 PM'],
      },
    },
  ],
  stops: [
    { id: 'stop1', name: 'Main Campus Center' },
    { id: 'stop2', name: 'Science Building' },
    { id: 'stop3', name: 'Engineering Complex' },
    { id: 'stop4', name: 'Library' },
    { id: 'stop5', name: 'Student Union' },
    { id: 'stop6', name: 'Downtown Station' },
    { id: 'stop7', name: 'Shopping Center' },
    { id: 'stop8', name: 'North Residence Hall' },
    { id: 'stop9', name: 'South Residence Hall' },
    { id: 'stop10', name: 'Athletic Center' },
  ],
};

export default function TransportationPage() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [scheduleView, setScheduleView] = useState<'weekday' | 'weekend'>('weekday');

  const getStopById = (id: string) => {
    return transportationData.stops.find((stop) => stop.id === id);
  };

  return (
    <PageContainer>
      <SectionTitle eyebrow="Campus Transportation" title="Bus Routes & Schedules" />

      {/* Route Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {transportationData.routes.map((route) => (
          <div
            key={route.id}
            className={`bg-white rounded-xl border overflow-hidden shadow-sm transition-all duration-300 ${
              selectedRoute === route.id ? 'ring-2 ring-primary scale-[1.02]' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: route.color }} />
                  <h3 className="font-medium">{route.name}</h3>
                </div>
                <PillBadge>
                  <Clock size={14} className="mr-1" />
                  {route.estimatedArrival}
                </PillBadge>
              </div>

              <div className="text-sm">
                <div className="flex items-center mb-2">
                  <Bus size={16} className="mr-2 text-muted-foreground" />
                  <span>
                    {getStopById(route.stops[0])?.name} <ArrowRight size={12} className="inline mx-1" />{' '}
                    {getStopById(route.stops[route.stops.length - 1])?.name}
                  </span>
                </div>

                <div className="flex items-center">
                  <MapIcon size={16} className="mr-2 text-muted-foreground" />
                  <span>{route.stops.length} stops</span>
                </div>
              </div>

              {selectedRoute === route.id && (
                <div className="mt-4 pt-4 border-t animate-fade-in">
                  <div className="flex gap-2 mb-3">
                    <button
                      className={`px-3 py-1 text-xs rounded-full ${
                        scheduleView === 'weekday' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setScheduleView('weekday');
                      }}
                    >
                      Weekday
                    </button>
                    <button
                      className={`px-3 py-1 text-xs rounded-full ${
                        scheduleView === 'weekend' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setScheduleView('weekend');
                      }}
                    >
                      Weekend
                    </button>
                  </div>

                  <div className="space-y-1">
                    {route.schedule[scheduleView].map((time, index) => (
                      <div key={index} className="text-xs py-1 px-2 bg-secondary/30 rounded">
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stops Information */}
      <GlassPanel className="p-6">
        <h2 className="text-xl font-medium mb-4 flex items-center">
          <Info size={20} className="mr-2" />
          Bus Stops Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {transportationData.stops.map((stop) => (
            <div key={stop.id} className="p-3 border rounded-lg hover:bg-secondary/10 transition-colors">
              <h3 className="font-medium">{stop.name}</h3>
              <div className="mt-2 text-xs text-muted-foreground">
                {transportationData.routes
                  .filter((route) => route.stops.includes(stop.id))
                  .map((route) => (
                    <span
                      key={route.id}
                      className="inline-block px-2 py-1 mr-1 mb-1 rounded-full text-white"
                      style={{ backgroundColor: route.color }}
                    >
                      {route.name.split(' ')[0]}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </PageContainer>
  );
}
