import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Microscope, HeartPulse, Compass, Users2, ArrowRight } from 'lucide-react';

export default function AboutPage({ onOpenBooking, onOpenCalculator }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Assess',
      icon: 'assignment',
      summary: 'Comprehensive intake and biomarker analysis.',
      details: 'We begin with an exhaustive assessment: standard metabolic panels, dietary diaries, hormonal markers, digestive history, sleep metrics, and biometric measurements to establish an accurate biological baseline.'
    },
    {
      num: '02',
      title: 'Understand',
      icon: 'psychology',
      summary: 'Identifying your unique metabolic profile.',
      details: 'Our clinical team interprets your biomarker and nutritional data to isolate glycemic response tendencies, insulin sensitivity curves, micronutrient deficiencies, and digestive friction points.'
    },
    {
      num: '03',
      title: 'Personalize',
      icon: 'tune',
      summary: 'Crafting a bespoke nutritional protocol.',
      details: 'Your nutritionist constructs an individualized food protocol including exact macro/micronutrient allocations, nutrient timing around circadian rhythms, recipe blueprints, and supplement plans.'
    },
    {
      num: '04',
      title: 'Support',
      icon: 'support_agent',
      summary: 'Ongoing expert guidance and accountability.',
      details: 'Consistent 1-on-1 telehealth check-ins, continuous feedback through our client portal, and real-time adjustments keep you on track as your body adapts.'
    },
    {
      num: '05',
      title: 'Improve',
      icon: 'trending_up',
      summary: 'Iterative optimization for long-term health.',
      details: 'We re-evaluate blood chemistry and body composition at structured intervals, continuously refining protocols for peak mental clarity, body composition, and biological longevity.'
    }
  ];

  return (
    <div className="w-full">
      {/* Page Hero */}
      <section className="px-margin-mobile md:px-margin-desktop py-12 md:py-16 max-w-max-width mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-5 text-center md:text-left">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-secondary bg-secondary-container px-3 py-1 rounded-full">
            Our Philosophy
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-heading text-primary leading-tight">
            Precision Nutrition for High-Performance Living.
          </h1>
          <p className="text-base text-on-surface-variant leading-relaxed max-w-2xl">
            We believe optimal health shouldn't be a guessing game. NUTRIVA combines clinical expertise with bespoke, evidence-based dietary strategies to unlock your body's true potential.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={() => onOpenBooking()}
              className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded-lg text-xs font-bold tracking-wide transition-all shadow-sm flex items-center gap-2"
            >
              Meet Our Nutritionists <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCalculator}
              className="border border-secondary text-primary hover:bg-surface-container px-6 py-3 rounded-lg text-xs font-bold transition-all"
            >
              Test Macro Profile
            </button>
          </div>
        </div>

        <div className="flex-1 w-full h-[380px] rounded-2xl overflow-hidden shadow-ambient-deep relative border border-outline-variant/60 group">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="NUTRIVA Organic and Clinical Ingredients"
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80"
          />
        </div>
      </section>

      {/* Bento Grid: Mission & Pillars */}
      <section className="px-margin-mobile md:px-margin-desktop py-16 max-w-max-width mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
            Core Scientific Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary">
            Our Mission & Standards
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            To democratize access to elite-level nutritional guidance, making personalized, science-backed health strategies accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Bento Item 1 */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-ambient border border-outline-variant/60 flex flex-col">
            <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-6 text-secondary">
              <Microscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-primary mb-3">Evidence-Based</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Every recommendation is rooted in peer-reviewed clinical research. No fads, just verifiable science tailored to your biochemistry.
            </p>
          </div>

          {/* Bento Item 2 (Wide) */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-ambient border border-outline-variant/60 flex flex-col md:col-span-2">
            <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-6 text-secondary">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-primary mb-3">Uncompromising Accessibility</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              We are dismantling the barriers to expert dietary care. Through intuitive telehealth technology and streamlined digital consultation processes, we connect you directly with world-class nutritionists, ensuring that comprehensive health management fits seamlessly into your demanding lifestyle.
            </p>
          </div>

          {/* Bento Item 3 */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-ambient border border-outline-variant/60 flex flex-col">
            <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-6 text-secondary">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-primary mb-3">Metabolic Individuality</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Two bodies respond differently to identical calories. We tailor nutrient timing, glycemic load, and fiber density to your unique genetic and microbial profile.
            </p>
          </div>

          {/* Bento Item 4 */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-ambient border border-outline-variant/60 flex flex-col">
            <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-6 text-secondary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-primary mb-3">Clinical Rigor</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Every nutritionist on our board holds verified credentials (MS, PhD, RDN) and adheres to strict medical ethics and data privacy standards.
            </p>
          </div>

          {/* Bento Item 5 */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-ambient border border-outline-variant/60 flex flex-col">
            <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-6 text-secondary">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-primary mb-3">Human-First Coaching</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Technology provides the precision, but empathetic human coaches provide the sustainable motivation and real-world adaptability you need.
            </p>
          </div>
        </div>
      </section>

      {/* The 5-Step Process Section with Interactive Focus */}
      <section className="w-full bg-surface-container-low py-20 border-y border-outline-variant/40">
        <div className="max-w-max-width px-margin-mobile md:px-margin-desktop mx-auto">
          <div className="text-center space-y-2 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-secondary block">
              Step-by-Step Pathway
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary">
              The NUTRIVA 5-Step Approach
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant">
              A systematic, five-step methodology to sustained vitality and metabolic mastery.
            </p>
          </div>

          {/* Step Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeStep === idx
                    ? 'bg-primary text-on-primary border-primary shadow-md scale-102'
                    : 'bg-surface-container-lowest text-on-surface border-outline-variant/60 hover:border-secondary'
                }`}
              >
                <span className={`text-xs font-bold block mb-1 ${activeStep === idx ? 'text-secondary-fixed' : 'text-secondary'}`}>
                  {step.num}. {step.title}
                </span>
                <p className={`text-[11px] line-clamp-2 ${activeStep === idx ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                  {step.summary}
                </p>
              </button>
            ))}
          </div>

          {/* Active Step Deep-Dive Box */}
          <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-ambient border border-outline-variant/60 flex flex-col md:flex-row items-center gap-8 animate-in fade-in duration-300">
            <div className="w-20 h-20 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0 font-heading text-3xl font-bold">
              {steps[activeStep].num}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold text-secondary tracking-widest">Phase {activeStep + 1}</span>
                <span className="text-xs text-on-surface-variant">•</span>
                <span className="text-xs text-on-surface-variant">{steps[activeStep].summary}</span>
              </div>
              <h3 className="text-xl font-bold font-heading text-primary">
                {steps[activeStep].title}: In-Depth Protocol
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                {steps[activeStep].details}
              </p>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="shrink-0 bg-secondary hover:bg-secondary/90 text-on-secondary px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              Start Phase 01
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
