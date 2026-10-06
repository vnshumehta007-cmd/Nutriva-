import React, { useState, useMemo } from 'react';
import { Filter, Search, X, SlidersHorizontal, Check, Star, Clock, Calendar, ArrowRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

export default function ServicesPage({
  services = [],
  onOpenBooking
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedAge, setSelectedAge] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedDetailService, setSelectedDetailService] = useState(null);

  const goalOptions = ['All', 'Weight Loss', 'Muscle Building', 'Gut Health', 'Longevity', 'Energy & Vitality'];
  const conditionOptions = ['All', 'General Wellness', 'Metabolic', 'Athletic', 'Digestive', 'Hormonal'];
  const ageOptions = ['All', 'Adults (18-60)', 'Seniors (60+)', 'All Ages'];

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchSearch = searchQuery === '' || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchGoal = selectedGoal === 'All' || service.goal === selectedGoal;
      const matchCondition = selectedCondition === 'All' || service.condition.toLowerCase().includes(selectedCondition.toLowerCase());
      const matchAge = selectedAge === 'All' || service.ageGroup.includes(selectedAge) || service.ageGroup === 'All Ages';
      const matchPrice = service.price <= maxPrice;

      return matchSearch && matchGoal && matchCondition && matchAge && matchPrice;
    });
  }, [services, searchQuery, selectedGoal, selectedCondition, selectedAge, maxPrice]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedGoal('All');
    setSelectedCondition('All');
    setSelectedAge('All');
    setMaxPrice(500);
  };

  const hasActiveFilters = searchQuery !== '' || selectedGoal !== 'All' || selectedCondition !== 'All' || selectedAge !== 'All' || maxPrice < 500;

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto py-12 space-y-12">
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
          Clinical Marketplace
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-primary tracking-tight">
          Expert Nutrition Services
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          Bespoke wellness programs tailored to your unique biology and lifestyle. Discover the perfect path to your high-performance life.
        </p>
      </section>

      {/* Filters & Search Control Bar */}
      <section className="bg-surface-container-low rounded-2xl p-6 shadow-ambient border border-outline-variant/60 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/40 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-secondary" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary font-heading">
              Refine Services
            </h2>
            <span className="text-xs text-on-surface-variant">({filteredServices.length} available)</span>
          </div>

          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-semibold text-secondary hover:text-primary transition-colors underline underline-offset-4"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Query */}
          <div>
            <label className="block text-[11px] font-semibold text-primary mb-1">Search Keywords</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Diet, Gut, Muscle..."
                className="w-full text-xs bg-surface-container-lowest border border-outline-variant rounded-xl pl-8 pr-3 py-2 text-on-surface focus:border-secondary outline-none"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-on-surface-variant" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-on-surface-variant hover:text-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Goal Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-primary mb-1">Primary Goal</label>
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full text-xs bg-surface-container-lowest border border-outline-variant rounded-xl p-2 text-on-surface focus:border-secondary outline-none"
            >
              {goalOptions.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Condition Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-primary mb-1">Health Focus</label>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="w-full text-xs bg-surface-container-lowest border border-outline-variant rounded-xl p-2 text-on-surface focus:border-secondary outline-none"
            >
              {conditionOptions.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-primary">Max Budget</label>
              <span className="text-xs font-bold text-secondary">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="150"
              max="500"
              step="25"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-secondary cursor-pointer h-1.5 bg-surface-container-high rounded-lg"
            />
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-outline-variant/30">
            <span className="text-[11px] text-on-surface-variant font-medium">Active:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-medium">
                Keyword: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedGoal !== 'All' && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-medium">
                Goal: {selectedGoal}
                <button onClick={() => setSelectedGoal('All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedCondition !== 'All' && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-medium">
                Focus: {selectedCondition}
                <button onClick={() => setSelectedCondition('All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {maxPrice < 500 && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-medium">
                Under ${maxPrice}
                <button onClick={() => setMaxPrice(500)}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}
      </section>

      {/* Services Grid */}
      {filteredServices.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={() => onOpenBooking(service)}
              onSelect={() => setSelectedDetailService(service)}
            />
          ))}
        </section>
      ) : (
        <div className="text-center py-16 bg-surface-container-low rounded-2xl border border-outline-variant/40 space-y-3">
          <p className="text-sm font-semibold text-primary">No services found matching your current filter criteria.</p>
          <p className="text-xs text-on-surface-variant">Try adjusting your filters or search keywords.</p>
          <button
            onClick={handleClearFilters}
            className="text-xs font-bold bg-primary text-on-primary px-4 py-2 rounded-lg mt-2 inline-block"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedDetailService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-xl shadow-ambient-deep overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="relative h-48 w-full bg-surface-container">
              <img
                src={selectedDetailService.image}
                alt={selectedDetailService.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedDetailService(null)}
                className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md text-primary hover:bg-surface p-1.5 rounded-full shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {selectedDetailService.goal}
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <span className="text-xs font-bold text-secondary uppercase tracking-widest block mb-1">
                  {selectedDetailService.category}
                </span>
                <h3 className="text-2xl font-bold font-heading text-primary">
                  {selectedDetailService.title}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mt-2">
                  {selectedDetailService.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-surface-container-low p-3.5 rounded-xl text-center border border-outline-variant/40">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Duration</span>
                  <span className="text-xs font-bold text-primary">{selectedDetailService.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Format</span>
                  <span className="text-xs font-bold text-primary">{selectedDetailService.consultationType}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Investment</span>
                  <span className="text-xs font-bold text-primary">${selectedDetailService.price}</span>
                </div>
              </div>

              {selectedDetailService.features && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
                    What's Included in This Protocol:
                  </h4>
                  <div className="space-y-2">
                    {selectedDetailService.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-on-surface-variant">
                        <Check className="w-4 h-4 text-secondary shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-outline-variant/40">
                <button
                  onClick={() => setSelectedDetailService(null)}
                  className="text-xs font-semibold px-4 py-2.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const s = selectedDetailService;
                    setSelectedDetailService(null);
                    onOpenBooking(s);
                  }}
                  className="text-xs font-semibold px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary transition-all flex items-center gap-2 shadow-sm"
                >
                  Enroll in Protocol (${selectedDetailService.price}) <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
