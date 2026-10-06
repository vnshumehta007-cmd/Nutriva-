import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Mail, Phone, CheckCircle, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function BookingModal({
  isOpen,
  onClose,
  initialService,
  initialNutritionist,
  onBookingSuccess,
  services = [],
  nutritionists = []
}) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceName: '',
    nutritionistName: '',
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '10:00 AM',
    goal: 'Weight Loss & Metabolic Health',
    dietaryRestrictions: 'None',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({
        ...prev,
        serviceName: initialService.title,
        goal: initialService.goal || prev.goal
      }));
    } else if (services.length > 0 && !formData.serviceName) {
      setFormData(prev => ({ ...prev, serviceName: services[0].title }));
    }

    if (initialNutritionist) {
      setFormData(prev => ({
        ...prev,
        nutritionistName: initialNutritionist.name
      }));
    } else if (nutritionists.length > 0 && !formData.nutritionistName) {
      setFormData(prev => ({ ...prev, nutritionistName: nutritionists[0].name }));
    }
  }, [initialService, initialNutritionist, services, nutritionists]);

  if (!isOpen) return null;

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'
  ];

  const goals = [
    'Weight Loss & Metabolic Health',
    'Sports Conditioning & Muscle Hypertrophy',
    'Gut Microbiome Healing & IBS Relief',
    'Longevity & Anti-Aging Cellular Health',
    'Hormone Balance & Sustained Energy'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.bookConsultation(formData);
      onBookingSuccess && onBookingSuccess(response.data);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-xl shadow-ambient-deep overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-primary text-on-primary px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-secondary-fixed-dim font-bold block">
              Telehealth Consultation
            </span>
            <h2 className="text-xl font-bold font-heading">Schedule Your Nutrition Consultation</h2>
          </div>
          <button
            onClick={onClose}
            className="text-on-primary/80 hover:text-on-primary p-1.5 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-error-container text-on-error-container text-xs p-3 px-6 border-b border-error/20">
            {error}
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[78vh] overflow-y-auto">
          
          {/* Service & Nutritionist Picker */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                Select Dietary Protocol
              </label>
              <select
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                className="w-full text-xs bg-surface border border-outline-variant rounded-lg p-2.5 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                required
              >
                {services.map(s => (
                  <option key={s.id} value={s.title}>{s.title} (${s.price})</option>
                ))}
                {!services.length && (
                  <option value="Personalized Diet">Personalized Diet ($199)</option>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-primary mb-1">
                Assigned Specialist
              </label>
              <select
                value={formData.nutritionistName}
                onChange={(e) => setFormData({ ...formData, nutritionistName: e.target.value })}
                className="w-full text-xs bg-surface border border-outline-variant rounded-lg p-2.5 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
              >
                {nutritionists.map(n => (
                  <option key={n.id} value={n.name}>{n.name}</option>
                ))}
                {!nutritionists.length && (
                  <option value="Dr. Elena Vance, PhD, RD">Dr. Elena Vance, PhD, RD</option>
                )}
              </select>
            </div>
          </div>

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-secondary" /> Preferred Date
              </label>
              <input
                type="date"
                value={formData.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full text-xs bg-surface border border-outline-variant rounded-lg p-2.5 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-secondary" /> Available Slot
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full text-xs bg-surface border border-outline-variant rounded-lg p-2.5 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none"
                required
              >
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Client Details */}
          <div className="pt-2 border-t border-outline-variant/40 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary">
              Personal Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-on-surface-variant mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full text-xs bg-surface border border-outline-variant rounded-lg pl-8 pr-3 py-2 text-on-surface focus:border-secondary outline-none"
                  />
                  <User className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-on-surface-variant" />
                </div>
              </div>

              <div>
                <label className="block text-xs text-on-surface-variant mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    className="w-full text-xs bg-surface border border-outline-variant rounded-lg pl-8 pr-3 py-2 text-on-surface focus:border-secondary outline-none"
                  />
                  <Mail className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-on-surface-variant" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs text-on-surface-variant mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.clientPhone}
                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  className="w-full text-xs bg-surface border border-outline-variant rounded-lg pl-8 pr-3 py-2 text-on-surface focus:border-secondary outline-none"
                />
                <Phone className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-on-surface-variant" />
              </div>
            </div>
          </div>

          {/* Goal & Clinical Notes */}
          <div className="pt-2 border-t border-outline-variant/40 space-y-3">
            <div>
              <label className="block text-xs text-on-surface-variant mb-1">Primary Health Goal</label>
              <select
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="w-full text-xs bg-surface border border-outline-variant rounded-lg p-2 text-on-surface outline-none"
              >
                {goals.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-on-surface-variant mb-1">
                Known Food Allergies / Dietary Restrictions
              </label>
              <input
                type="text"
                placeholder="e.g. Dairy intolerance, Gluten free, Vegan, Shellfish allergy"
                value={formData.dietaryRestrictions}
                onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
                className="w-full text-xs bg-surface border border-outline-variant rounded-lg px-3 py-2 text-on-surface outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-on-surface-variant mb-1">
                Brief Health Notes or Specific Questions for the Clinician
              </label>
              <textarea
                rows={2}
                placeholder="Share any ongoing medications, biomarker test results, or specific targets..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full text-xs bg-surface border border-outline-variant rounded-lg px-3 py-2 text-on-surface outline-none resize-none"
              />
            </div>
          </div>

          {/* Trust notice */}
          <div className="flex items-center gap-2 bg-secondary-container/40 text-on-secondary-container p-3 rounded-lg text-[11px]">
            <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
            <span>Encrypted 256-bit telehealth connection. 100% confidential.</span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2.5 rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="text-xs font-semibold px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
            >
              {loading ? 'Confirming...' : 'Confirm & Reserve Slot'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
