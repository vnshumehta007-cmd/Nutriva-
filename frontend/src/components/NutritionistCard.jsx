import React from 'react';
import { Star, Award, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';

export default function NutritionistCard({ nutritionist, onBook }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-ambient border border-outline-variant/60 overflow-hidden flex flex-col hover:shadow-ambient-hover hover:-translate-y-1 transition-all duration-300">
      {/* Header with Photo & Badges */}
      <div className="p-6 pb-4 flex items-start gap-4">
        <div className="relative shrink-0">
          <img
            src={nutritionist.avatar}
            alt={nutritionist.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-secondary/20 shadow-sm"
          />
          <div className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary p-1 rounded-full shadow-sm" title="Verified Specialist">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mb-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-primary">{nutritionist.rating}</span>
            <span className="text-on-surface-variant font-normal">({nutritionist.reviewsCount} reviews)</span>
          </div>

          <h3 className="font-heading text-base font-bold text-primary truncate">
            {nutritionist.name}
          </h3>
          <p className="text-xs text-secondary font-medium line-clamp-1 mt-0.5">
            {nutritionist.role}
          </p>
          <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
            {nutritionist.experience} Experience
          </span>
        </div>
      </div>

      {/* Bio & Specialty */}
      <div className="px-6 py-3 flex-grow flex flex-col gap-3 border-t border-outline-variant/30 text-xs text-on-surface-variant">
        <p className="leading-relaxed italic">
          "{nutritionist.bio}"
        </p>

        <div className="flex items-start gap-2 text-[11px] text-primary/80 mt-auto bg-surface-container-low p-2.5 rounded-lg">
          <GraduationCap className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <span className="line-clamp-2">{nutritionist.education}</span>
        </div>

        {/* Available Slots Preview */}
        {nutritionist.availableSlots && (
          <div className="mt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
              Earliest Availability:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {nutritionist.availableSlots.map((slot, i) => (
                <span key={i} className="text-[10px] bg-surface-container text-primary px-2 py-0.5 rounded border border-outline-variant/50">
                  {slot}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Booking Action */}
      <div className="p-6 pt-3 border-t border-outline-variant/40 flex items-center justify-between gap-3 mt-auto">
        <div>
          <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Consult Fee</span>
          <span className="text-sm font-bold text-primary font-heading">${nutritionist.consultationFee}<span className="text-xs font-normal text-on-surface-variant">/session</span></span>
        </div>

        <button
          onClick={() => onBook(null, nutritionist)}
          className="bg-primary hover:bg-primary/90 text-on-primary text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book Specialist
        </button>
      </div>
    </div>
  );
}
