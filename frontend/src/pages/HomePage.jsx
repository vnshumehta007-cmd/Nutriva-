import React from 'react';
import { Sparkles, Shield, Award, CheckCircle2, ArrowRight, Activity, Users, Star, ArrowUpRight, ChevronRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';

export default function HomePage({
  services = [],
  testimonials = [],
  onOpenBooking,
  onOpenCalculator,
  setActiveTab
}) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 md:py-20 max-w-max-width mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16 min-h-[75vh]">
        <div className="w-full md:w-1/2 flex flex-col gap-6 items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            Next-Gen Precision Nutrition
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-primary leading-[1.15] tracking-tight">
            Nutrition that fits your life.
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Bespoke, evidence-based diet plans crafted by board-certified clinical nutritionists to help you achieve lasting high-performance living. Experience wellness tailored specifically to your biology.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="bg-secondary hover:bg-surface-tint text-on-secondary px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
            >
              Find Your Nutritionist
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-surface text-secondary border border-secondary px-8 py-3.5 rounded-lg text-sm font-semibold tracking-wide hover:bg-surface-container-low transition-colors text-center shadow-sm"
            >
              Explore Services
            </button>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex items-center gap-6 pt-4 border-t border-outline-variant/50 w-full sm:w-auto text-xs text-on-surface-variant">
            <div>
              <span className="font-bold text-primary text-base font-heading block">98.4%</span>
              <span>Client Success Rate</span>
            </div>
            <div className="h-8 w-px bg-outline-variant/60" />
            <div>
              <span className="font-bold text-primary text-base font-heading block">12,000+</span>
              <span>Custom Meal Plans</span>
            </div>
            <div className="h-8 w-px bg-outline-variant/60" />
            <div>
              <span className="font-bold text-primary text-base font-heading block">4.9 / 5.0</span>
              <span>Clinical Rating</span>
            </div>
          </div>
        </div>

        {/* Hero Image Showcase */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <div className="relative w-full aspect-square max-w-[480px] rounded-2xl overflow-hidden shadow-ambient-deep bg-surface-container border border-outline-variant/60 group">
            <img
              alt="NUTRIVA Precision Nutrition"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80"
            />
            {/* Floating Glassmorphic Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-surface/90 backdrop-blur-md p-4 rounded-xl shadow-ambient border border-white/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block">Featured Approach</span>
                <span className="text-xs font-bold text-primary font-heading">Metabolic Biomarker Synchronization</span>
              </div>
              <button
                onClick={onOpenCalculator}
                className="text-xs bg-primary text-on-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/90 flex items-center gap-1"
              >
                Run Calc <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <section className="bg-surface-container-low py-10 px-margin-mobile md:px-margin-desktop border-y border-outline-variant/40">
        <div className="max-w-max-width mx-auto flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-primary font-heading block">Certified Clinical Experts</span>
              <span className="text-xs text-on-surface-variant">PhD & Registered Dietitians (RDN)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-primary font-heading block">100% Secure Telehealth</span>
              <span className="text-xs text-on-surface-variant">HIPAA Compliant & Encrypted Data</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-bold text-primary font-heading block">Evidence-Based Science</span>
              <span className="text-xs text-on-surface-variant">Zero fad diets, purely peer-reviewed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Protocols Section */}
      <section className="px-margin-mobile md:px-margin-desktop py-20 max-w-max-width mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-1">
              Curated Protocols
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary">
              Popular Nutrition Services
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-secondary hover:text-primary flex items-center gap-1 group self-start md:self-auto"
          >
            View All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {services.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onBook={() => onOpenBooking(service)}
              onSelect={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* Interactive Tool Banner: Macro Calculator */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 max-w-max-width mx-auto">
        <div className="bg-primary text-on-primary rounded-2xl p-8 sm:p-12 shadow-ambient-deep flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-xl z-10">
            <span className="text-xs uppercase tracking-widest text-secondary-fixed-dim font-bold block mb-2">
              Free Assessment Tool
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-4 leading-snug">
              Discover Your Personalized Caloric & Macro Breakdown in 60 Seconds
            </h3>
            <p className="text-sm text-on-primary-container leading-relaxed mb-6">
              Our clinical algorithm calculates your exact BMR, energy expenditure, and ideal macronutrient distribution tailored to your age, physiology, and goals.
            </p>
            <button
              onClick={onOpenCalculator}
              className="bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed px-6 py-3 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Launch Interactive Macro Calculator
            </button>
          </div>

          <div className="z-10 grid grid-cols-2 gap-3 w-full lg:w-auto">
            <div className="bg-primary-container p-4 rounded-xl border border-white/10 text-center">
              <span className="text-2xl font-bold font-heading text-secondary-fixed block">40%</span>
              <span className="text-[11px] text-on-primary-container">Avg. Fat Reduction</span>
            </div>
            <div className="bg-primary-container p-4 rounded-xl border border-white/10 text-center">
              <span className="text-2xl font-bold font-heading text-secondary-fixed block">3.2x</span>
              <span className="text-[11px] text-on-primary-container">Energy Consistency</span>
            </div>
            <div className="bg-primary-container p-4 rounded-xl border border-white/10 text-center">
              <span className="text-2xl font-bold font-heading text-secondary-fixed block">100%</span>
              <span className="text-[11px] text-on-primary-container">Clinical Backing</span>
            </div>
            <div className="bg-primary-container p-4 rounded-xl border border-white/10 text-center">
              <span className="text-2xl font-bold font-heading text-secondary-fixed block">1-on-1</span>
              <span className="text-[11px] text-on-primary-container">Expert Consultation</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 5-Step Methodology Teaser */}
      <section className="bg-surface-container-low py-20 px-margin-mobile md:px-margin-desktop border-y border-outline-variant/40">
        <div className="max-w-max-width mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
              The NUTRIVA Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary">
              A Systemic Approach to Sustained Vitality
            </h2>
            <p className="text-sm text-on-surface-variant">
              We remove guesswork by taking a scientific, multi-phase path toward lasting metabolic health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { num: '01', title: 'Assess', desc: 'Comprehensive intake and biomarker profiling.' },
              { num: '02', title: 'Understand', desc: 'Identifying your unique metabolic patterns.' },
              { num: '03', title: 'Personalize', desc: 'Crafting your tailored dietary protocol.' },
              { num: '04', title: 'Support', desc: 'Continuous clinical coaching and guidance.' },
              { num: '05', title: 'Improve', desc: 'Iterative adjustments for lifelong vitality.' },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-6 rounded-xl shadow-ambient border border-outline-variant/50 hover:border-secondary transition-all group"
              >
                <span className="text-2xl font-bold font-heading text-secondary/40 group-hover:text-secondary transition-colors block mb-3">
                  {step.num}
                </span>
                <h4 className="font-heading text-sm font-bold text-primary mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-secondary hover:text-primary underline underline-offset-4"
            >
              Learn more about our clinical methodology →
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-margin-mobile md:px-margin-desktop py-20 max-w-max-width mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
            Real Transformations
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary">
            Trusted by High Performers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-surface-container-lowest p-6 rounded-xl shadow-ambient border border-outline-variant/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h5 className="text-xs font-bold text-primary font-heading">{t.name}</h5>
                    <span className="text-[10px] text-on-surface-variant">{t.role}</span>
                  </div>
                </div>
                {t.outcome && (
                  <span className="text-[10px] font-bold text-secondary bg-secondary-container px-2 py-0.5 rounded">
                    {t.outcome}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
