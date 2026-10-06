import React from 'react';
import { Shield, Sparkles, CheckCircle2, Heart } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenCalculator }) {
  return (
    <footer className="w-full mt-20 bg-surface-container-highest border-t border-outline-variant/60">
      {/* Top Banner / Trust Band */}
      <div className="border-b border-outline-variant/40 bg-surface-container-low py-6 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-max-width mx-auto flex flex-wrap justify-between items-center gap-6 text-xs text-on-surface-variant">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-secondary" />
            <span className="font-semibold text-primary">Certified Board Clinical Nutritionists</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-secondary" />
            <span className="font-semibold text-primary">HIPAA-Compliant & Secure Telehealth</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="font-semibold text-primary">100% Peer-Reviewed Protocols</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-max-width mx-auto">
        {/* Brand Col */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-heading text-primary">NUTRIVA</span>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Precision Nutrition for High-Performance Living. We merge clinical expertise with individualized dietary protocols to elevate human vitality.
          </p>
          <div className="text-xs text-on-surface-variant/80 mt-2">
            San Francisco • New York • London
          </div>
        </div>

        {/* Explore Col */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Explore Platform</span>
          <button onClick={() => { setActiveTab('services'); window.scrollTo(0, 0); }} className="text-left text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            Dietary Services & Protocols
          </button>
          <button onClick={() => { setActiveTab('nutritionists'); window.scrollTo(0, 0); }} className="text-left text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            Our Certified Nutritionists
          </button>
          <button onClick={() => { setActiveTab('about'); window.scrollTo(0, 0); }} className="text-left text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            The 5-Step NUTRIVA Approach
          </button>
          <button onClick={onOpenCalculator} className="text-left text-xs text-secondary font-medium hover:underline transition-colors">
            Interactive Macro & BMR Calculator
          </button>
        </div>

        {/* Resources Col */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Clinical Resources</span>
          <a href="#evidence" className="text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            Evidence-Based Methodology
          </a>
          <a href="#biomarkers" className="text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            Biomarker & DNA Testing Info
          </a>
          <a href="#faq" className="text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            Frequently Asked Questions
          </a>
          <a href="#support" className="text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            Client Portal Support
          </a>
        </div>

        {/* Legal Col */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Legal & Privacy</span>
          <a href="#privacy" className="text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            Privacy Policy & Data Security
          </a>
          <a href="#terms" className="text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            Terms of Service
          </a>
          <a href="#telehealth" className="text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            Telehealth Consent Guidelines
          </a>
          <a href="#disclaimer" className="text-xs text-on-surface-variant hover:text-primary hover:underline transition-colors">
            Medical Disclaimer
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-outline-variant/40 py-6 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-max-width mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <p>© {new Date().getFullYear()} NUTRIVA Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted for optimal longevity and health</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
