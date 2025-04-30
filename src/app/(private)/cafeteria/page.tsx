'use client';

import React, { useState } from 'react';
import { PageContainer, SectionTitle, GlassPanel, PillBadge } from '@/components/GlassPanels';
import { Coffee, Clock, Search, Filter, Info } from 'lucide-react';

const cafeteriaData = {
  cafeterias: [
    { id: 'main', name: 'Main Dining Hall', hours: '7:00 AM - 9:00 PM' },
    { id: 'west', name: 'West Campus Café', hours: '8:00 AM - 7:00 PM' },
    { id: 'north', name: 'North Commons', hours: '7:30 AM - 8:00 PM' },
  ],
  mealTypes: ['Breakfast', 'Lunch', 'Dinner', 'Snacks'],
  dietaryOptions: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'],
  menuItems: [
    {
      id: 1,
      name: 'Paratha with vaji',
      description: 'Green vegetables and Masoor daal with Paratha made with flour',
      price: 299,
      cafeteria: 'main',
      mealType: 'Breakfast',
      dietaryOptions: ['Vegetarian'],
      image: 'https://images.unsplash.com/photo-1642689690565-bf0afb7eb41e?q=80&w=400&h=300&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Quinoa Bowl',
      description: 'Mixed grain bowl with roasted vegetables, chickpeas, and tahini dressing',
      price: 399,
      cafeteria: 'west',
      mealType: 'Lunch',
      dietaryOptions: ['Vegan', 'Gluten-Free'],
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&h=300&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Grilled Salmon',
      description: 'Fresh salmon with lemon herb butter, wild rice, and seasonal vegetables',
      price: 999,
      cafeteria: 'main',
      mealType: 'Dinner',
      dietaryOptions: ['Gluten-Free', 'Dairy-Free'],
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=400&h=300&auto=format&fit=crop',
    },
    {
      id: 4,
      name: 'Fruit Parfait',
      description: 'Layered yogurt with fresh berries, granola, and honey',
      price: 499,
      cafeteria: 'north',
      mealType: 'Breakfast',
      dietaryOptions: ['Vegetarian'],
      image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=400&h=300&auto=format&fit=crop',
    },
    {
      id: 5,
      name: 'Vegetable Stir Fry',
      description: 'Fresh vegetables stir-fried with tofu in a ginger soy sauce',
      price: 199,
      cafeteria: 'west',
      mealType: 'Dinner',
      dietaryOptions: ['Vegan', 'Gluten-Free'],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&h=300&auto=format&fit=crop',
    },
    {
      id: 6,
      name: 'Classic Burger',
      description: 'Angus beef patty with lettuce, tomato, onion, and special sauce',
      price: 499,
      cafeteria: 'main',
      mealType: 'Lunch',
      dietaryOptions: [],
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=300&auto=format&fit=crop',
    },
  ],
};

export default function CafeteriaPage() {
  const [selectedCafeteria, setSelectedCafeteria] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = cafeteriaData.menuItems.filter((item) => {
    if (selectedCafeteria && item.cafeteria !== selectedCafeteria) return false;
    if (selectedMealType && item.mealType !== selectedMealType) return false;
    if (selectedDietary.length > 0 && !selectedDietary.some((diet) => item.dietaryOptions.includes(diet))) return false;
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleDietaryOption = (option: string) => {
    if (selectedDietary.includes(option)) {
      setSelectedDietary(selectedDietary.filter((diet) => diet !== option));
    } else {
      setSelectedDietary([...selectedDietary, option]);
    }
  };

  return (
    <PageContainer>
      <SectionTitle eyebrow="Dining Options" title="Campus Cafeteria & Meal Information" />

      {/* Cafeteria Hours */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 opacity-0 animate-fade-up">
        {cafeteriaData.cafeterias.map((cafeteria) => (
          <GlassPanel
            key={cafeteria.id}
            className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
            onClick={() => setSelectedCafeteria(selectedCafeteria === cafeteria.id ? null : cafeteria.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-accent text-primary">
                <Coffee size={20} />
              </div>
              {selectedCafeteria === cafeteria.id && (
                <PillBadge className="bg-primary/10 text-primary">Selected</PillBadge>
              )}
            </div>
            <h3 className="text-lg font-medium mb-2">{cafeteria.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock size={16} className="mr-1" />
              <span>{cafeteria.hours}</span>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Search and Filters */}
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
                  placeholder="Search for menu items..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {cafeteriaData.mealTypes.map((mealType) => (
                <button
                  key={mealType}
                  onClick={() => setSelectedMealType(selectedMealType === mealType ? null : mealType)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                    selectedMealType === mealType
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-muted-foreground border-input hover:border-primary/50'
                  }`}
                >
                  {mealType}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center text-sm mb-2">
              <Filter size={16} className="mr-1" />
              <span className="font-medium">Dietary Preferences</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cafeteriaData.dietaryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleDietaryOption(option)}
                  className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                    selectedDietary.includes(option)
                      ? 'bg-accent text-primary border-accent'
                      : 'bg-white text-muted-foreground border-input hover:border-primary/50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="opacity-0 animate-fade-up animate-delay-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <span className="font-medium text-primary">৳ {item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.dietaryOptions.map((option) => (
                      <PillBadge key={option} className="bg-accent/50 text-primary text-xs">
                        {option}
                      </PillBadge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs text-muted-foreground mt-3">
                    <span>{cafeteriaData.cafeterias.find((c) => c.id === item.cafeteria)?.name}</span>
                    <span>{item.mealType}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <Info size={32} className="text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No menu items found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
