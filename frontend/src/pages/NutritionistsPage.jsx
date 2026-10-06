import React, { useState } from 'react';
import { Award, Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import NutritionistCard from '../components/NutritionistCard';

export default function NutritionistsPage({
  nutritionists = [],
  onOpenBooking
}) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [search, setSearch] = useState('');

  const specialties = [
    'All',
    'Longevity',
    'Sports',
    'Gut',
    'Weight'
  ];

  const filtered = nutritionists.filter(n => {
    const matchSpecialty = selectedSpecialty === 'All' || n.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    const matchSearch = search === '' || 
      n.name.toLowerCase().includes(search.toLowerCase()) || 
      n.role.toLowerCase().includes(search.toLowerCase()) ||
      n.bio.toLowerCase().includes(search.toLowerCase());
    return matchSpecialty && matchSearch;
  });

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto py-12 space-y-12">
      {/* Page Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
          Clinical Faculty
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-primary tracking-tight">
          Board-Certified Clinical Nutritionists
        </h1>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          Partner with accredited doctoral researchers and registered dietitians specialized in biomarker interpretation and bespoke nutritional therapy.
        </p>
      </section>

      {/* Specialty Filter Bar */}
      <section className="bg-surface-container-low rounded-2xl p-6 shadow-ambient border border-outline-variant/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-primary mr-2">Specialty:</span>
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${
                selectedSpecialty === spec
                  ? 'bg-secondary text-on-secondary shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface border border-outline-variant/60 hover:border-secondary'
              }`}
            >
              {spec === 'All' ? 'All Specialties' : spec}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by doctor or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-surface-container-lowest border border-outline-variant rounded-xl pl-8 pr-3 py-2 text-on-surface focus:border-secondary outline-none"
          />
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-on-surface-variant" />
        </div>
      </section>

      {/* Nutritionists Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {filtered.map(nut => (
          <NutritionistCard
            key={nut.id}
            nutritionist={nut}
            onBook={(service, n) => onOpenBooking(service, n || nut)}
          />
        ))}
      </section>

      {/* Trust & Guarantee Box */}
      <section className="bg-primary text-on-primary rounded-2xl p-8 shadow-ambient flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold font-heading">Nutriva Clinical Verification Standard</h3>
          <p className="text-xs text-on-primary-container">
            All practitioners undergo rigorous credential verification, background audits, and clinical peer reviews.
          </p>
        </div>
        <button
          onClick={() => onOpenBooking()}
          className="bg-secondary text-on-secondary hover:bg-secondary/90 px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide shrink-0 transition-all shadow-sm"
        >
          Book An Intake Session
        </button>
      </section>
    </div>
  );
}
