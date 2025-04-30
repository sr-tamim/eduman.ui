'use client';

import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { PageContainer, SectionTitle, PillBadge } from '@/components/GlassPanels';
import { Calendar, Users, MapPin, Clock, User, Search, Filter, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: string;
  imageUrl: string;
  attendees: number;
}

interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
  meetingSchedule: string;
  imageUrl: string;
}

const eventsData = {
  events: [
    {
      id: 'evt1',
      title: 'Campus Music Festival',
      description: 'Join us for a day of live music from student performers and local bands.',
      date: 'May 15, 2024',
      time: '4:00 PM - 10:00 PM',
      location: 'Main Quad',
      organizer: 'Student Activities Board',
      category: 'Entertainment',
      imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&h=250&auto=format&fit=crop',
      attendees: 278,
    },
    {
      id: 'evt2',
      title: 'Career Fair',
      description: 'Connect with employers from various industries looking to hire students and recent graduates.',
      date: 'April 23, 2024',
      time: '10:00 AM - 3:00 PM',
      location: 'Student Center Ballroom',
      organizer: 'Career Services',
      category: 'Professional',
      imageUrl: 'https://images.unsplash.com/photo-1559135197-8a45ea74d367?q=80&w=400&h=250&auto=format&fit=crop',
      attendees: 156,
    },
    {
      id: 'evt3',
      title: 'Student Research Symposium',
      description: 'A showcase of undergraduate and graduate research projects across all disciplines.',
      date: 'May 5, 2024',
      time: '9:00 AM - 4:00 PM',
      location: 'Science Center Atrium',
      organizer: 'Office of Research',
      category: 'Academic',
      imageUrl: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?q=80&w=400&h=250&auto=format&fit=crop',
      attendees: 92,
    },
    {
      id: 'evt4',
      title: 'Wellness Workshop',
      description: 'Learn stress management techniques and mindfulness practices to improve your wellbeing.',
      date: 'April 18, 2024',
      time: '1:00 PM - 3:00 PM',
      location: 'Health Center Room 202',
      organizer: 'Student Health Services',
      category: 'Health',
      imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&h=250&auto=format&fit=crop',
      attendees: 45,
    },
  ],
  clubs: [
    {
      id: 'club1',
      name: 'Robotics Club',
      description: 'Design, build, and program robots for competitions and demonstrations.',
      category: 'Technology',
      members: 42,
      meetingSchedule: 'Thursdays at 6:00 PM',
      imageUrl: 'https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?q=80&w=400&h=250&auto=format&fit=crop',
    },
    {
      id: 'club2',
      name: 'Environmental Action',
      description: 'Promoting sustainability and environmental awareness through campus initiatives.',
      category: 'Service',
      members: 65,
      meetingSchedule: 'Tuesdays at 5:30 PM',
      imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=400&h=250&auto=format&fit=crop',
    },
    {
      id: 'club3',
      name: 'Debate Team',
      description: 'Competitive debate team participating in regional and national tournaments.',
      category: 'Academic',
      members: 28,
      meetingSchedule: 'Mondays and Wednesdays at 7:00 PM',
      imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=400&h=250&auto=format&fit=crop',
    },
  ],
  categories: ['All', 'Academic', 'Entertainment', 'Professional', 'Health', 'Service', 'Technology'],
};

interface CreateClubDialogProps {
  trigger: React.ReactNode;
  departments: { value: string; label: string }[];
  categories: { value: string; label: string }[];
  onSubmit: (data: { name: string; description: string; department: string; category: string; tags: string[] }) => void;
}

const CreateClubDialog = ({ trigger, departments, categories, onSubmit }: CreateClubDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [category, setCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!name || !department || !category) return alert('Please fill in all required fields!');
    onSubmit({
      name,
      description,
      department: department.value,
      category: category.value,
      tags,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Club</DialogTitle>
          <DialogDescription>Fill in the details to create a new club.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start w-full gap-3">
            <Label htmlFor="name" className="cursor-pointer">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Enter club name"
            />
          </div>
          <div className="flex flex-col items-start w-full gap-3">
            <Label htmlFor="description" className="cursor-pointer">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Enter club description"
            />
          </div>
          <div className="flex items-start w-full gap-3">
            <Select
              onValueChange={(value) =>
                setDepartment({
                  value,
                  label: value.toLowerCase(),
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.value} value={department.value}>
                    {department.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setCategory({
                  value,
                  label: value.toLowerCase(),
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-start w-full gap-3">
            <Label htmlFor="tags" className="cursor-pointer">
              Tags
            </Label>
            <Combobox value={tags} onChange={setTags} placeholder="Enter tags" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create Club</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface CreateEventDialogProps {
  trigger: React.ReactNode;
  clubs: { value: string; label: string }[];
  categories: { value: string; label: string }[];
  onSubmit: (eventData: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    club: string;
    category: string;
  }) => void;
}

const CreateEventDialog = ({ trigger, clubs, categories, onSubmit }: CreateEventDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [club, setClub] = useState<{ value: string; label: string } | null>(null);
  const [category, setCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const handleSubmit = () => {
    if (!name || !description || !startDate || !endDate || !club || !category) {
      alert('Please fill in all required fields!');
      return;
    }
    onSubmit({
      name,
      description,
      startDate,
      endDate,
      club: club.value,
      category: category.value,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>Fill in the details to create a new event.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Name */}
          <div className="flex flex-col items-start w-full gap-3">
            <Label htmlFor="name" className="cursor-pointer">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
              placeholder="Enter event name"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col items-start w-full gap-3">
            <Label htmlFor="description" className="cursor-pointer">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Enter event description"
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col items-start w-full gap-3">
            <Label htmlFor="startDate" className="cursor-pointer">
              Start Date
            </Label>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              className="col-span-3"
              placeholderText="Select start date"
              showTimeSelect
              dateFormat="Pp"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col items-start w-full gap-3">
            <Label htmlFor="endDate" className="cursor-pointer">
              End Date
            </Label>
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              className="col-span-3"
              placeholderText="Select end date"
              showTimeSelect
              dateFormat="Pp"
            />
          </div>

          {/* Club Selection */}
          <div className="flex items-start w-full gap-3">
            <Select
              onValueChange={(value) =>
                setClub({
                  value,
                  label: value.toLowerCase(),
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a club" />
              </SelectTrigger>
              <SelectContent>
                {clubs.map((club) => (
                  <SelectItem key={club.value} value={club.value}>
                    {club.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) =>
                setCategory({
                  value,
                  label: value.toLowerCase(),
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Create Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function EventsPage() {
  const [categories] = useState([
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
  ]);
  const [clubs] = useState([
    { value: 'computer-programming', label: 'Computer Programming' },
    { value: 'social', label: 'Social' },
  ]);
  const [departments] = useState([
    {
      value: 'cs',
      label: 'Computer Science',
    },
    {
      value: 'ee',
      label: 'Electrical Engineering',
    },
  ]);
  const [activeTab, setActiveTab] = useState<'events' | 'clubs'>('events');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = eventsData.events.filter((event) => {
    if (selectedCategory !== 'All' && event.category !== selectedCategory) return false;
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredClubs = eventsData.clubs.filter((club) => {
    if (selectedCategory !== 'All' && club.category !== selectedCategory) return false;
    if (searchQuery && !club.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <PageContainer>
      <SectionTitle eyebrow="EduMan" title="Events & Club Management" />

      {/* Tab navigation */}
      <div className="flex border-b border-border mb-6 opacity-0 animate-fade-up">
        <button
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'events'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('events')}
        >
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>Events</span>
          </div>
        </button>
        <button
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'clubs'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setActiveTab('clubs')}
        >
          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>Clubs</span>
          </div>
        </button>
      </div>

      {/* Search and filters */}
      <div className="mb-8 opacity-0 animate-fade-up animate-delay-100">
        <div className="bg-white border border-border rounded-xl p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'events' ? 'events' : 'clubs'}...`}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {activeTab === 'clubs' ? (
                <CreateClubDialog
                  trigger={
                    <Button>
                      <Plus size={16} />
                      <span>Create Club</span>
                    </Button>
                  }
                  departments={departments}
                  categories={categories}
                  onSubmit={(data) => console.log(data)}
                />
              ) : (
                <CreateEventDialog
                  trigger={
                    <Button>
                      <Plus size={16} />
                      <span>Create Event</span>
                    </Button>
                  }
                  clubs={clubs}
                  categories={categories}
                  onSubmit={(data) => console.log(data)}
                />
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center text-sm mb-2">
              <Filter size={16} className="mr-1" />
              <span className="font-medium">Categories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {eventsData.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                    selectedCategory === category
                      ? 'bg-accent text-primary border-accent'
                      : 'bg-white text-muted-foreground border-input hover:border-primary/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events/Clubs Content */}
      <div className="opacity-0 animate-fade-up animate-delay-200">
        {activeTab === 'events' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <PillBadge className="mb-2">{event.category}</PillBadge>
                    <h3 className="text-lg font-medium mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <User size={14} className="mr-1" />
                        <span>{event.organizer}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="px-3 py-1 text-xs rounded-full bg-primary text-white">RSVP</button>
                        <span className="text-xs text-muted-foreground">{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">No events found matching your criteria</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredClubs.length > 0 ? (
              filteredClubs.map((club) => (
                <div
                  key={club.id}
                  className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={club.imageUrl}
                      alt={club.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <PillBadge>{club.category}</PillBadge>
                      <span className="text-xs text-muted-foreground">{club.members} members</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{club.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{club.description}</p>

                    <div className="flex items-center text-sm">
                      <Calendar size={14} className="mr-2 text-muted-foreground" />
                      <span>Meets: {club.meetingSchedule}</span>
                    </div>

                    <button className="mt-4 w-full py-2 rounded-lg bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors">
                      View Club Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">No clubs found matching your criteria</p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
