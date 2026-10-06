import React from 'react';
import { Star, Clock, Check, ArrowRight } from 'lucide-react';

export default function ServiceCard({ service, onBook, onSelect }) {
  return (
    <article className="bg-surface-container-lowest rounded-xl shadow-ambient border border-outline-variant/60 overflow-hidden flex flex-col hover:shadow-ambient-hover hover:-translate-y-1 transition-all duration-300 group">
      {/* Image Container */}
      <div className="h-48 w-full bg-surface-container-high relative overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-primary flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
          <span>{service.rating}</span>
          <span className="text-[10px] text-on-surface-variant font-normal">({service.reviewsCount})</span>
        </div>

        {/* Goal Tag */}
        <div className="absolute bottom-3 left-3 bg-primary/80 backdrop-blur-sm text-on-primary text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full">
          {service.goal}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider block mb-1">
            {service.category}
          </span>
          <h3 className="font-heading text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
            {service.title}
          </h3>
          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Feature bullets */}
        {service.features && (
          <div className="space-y-1.5 mb-6 py-2 border-y border-outline-variant/40">
            {service.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        )}

        {/* Meta & Actions */}
        <div className="mt-auto">
          <div className="grid grid-cols-2 gap-2 border-t border-outline-variant/40 pt-3 pb-4">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">Duration</span>
              <span className="text-xs font-bold text-primary flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3 text-secondary" /> {service.duration}
              </span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase font-semibold text-on-surface-variant tracking-wider">Investment</span>
              <span className="text-base font-bold text-primary font-heading mt-0.5">${service.price}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect && onSelect(service)}
              className="w-full text-xs font-semibold border border-outline-variant text-primary py-2.5 rounded-lg hover:bg-surface-container-high transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onBook(service)}
              className="w-full text-xs font-semibold bg-primary hover:bg-primary/90 text-on-primary py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              Enroll Now <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
