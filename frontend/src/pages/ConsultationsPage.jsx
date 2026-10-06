import React, { useState } from 'react';
import { Calendar, Clock, Video, User, AlertCircle, Plus, CheckCircle, Trash2, Shield } from 'lucide-react';
import { api } from '../services/api';

export default function ConsultationsPage({
  consultations = [],
  onOpenBooking,
  onRefreshConsultations,
  onShowToast
}) {
  const [cancellingId, setCancellingId] = useState(null);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you wish to cancel this scheduled consultation?')) return;
    try {
      setCancellingId(id);
      await api.cancelConsultation(id);
      onShowToast && onShowToast('Consultation cancelled successfully', 'info');
      onRefreshConsultations && onRefreshConsultations();
    } catch (err) {
      onShowToast && onShowToast('Failed to cancel consultation', 'error');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="w-full px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/40 pb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-secondary block mb-1">
            Client Portal Dashboard
          </span>
          <h1 className="text-3xl font-bold font-heading text-primary">
            Your Scheduled Consultations
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Manage your upcoming clinical appointments, review intake goals, and join encrypted video sessions.
          </p>
        </div>

        <button
          onClick={() => onOpenBooking()}
          className="bg-primary hover:bg-primary/90 text-on-primary px-5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" /> Book New Session
        </button>
      </div>

      {/* Consultations List */}
      {consultations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {consultations.map((c) => (
            <div
              key={c.id}
              className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient border border-outline-variant/60 flex flex-col justify-between hover:shadow-ambient-hover transition-all"
            >
              <div className="space-y-4">
                {/* Top Badge bar */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary bg-secondary-container px-2.5 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" /> {c.status || 'Confirmed'}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">
                    ID: {c.id}
                  </span>
                </div>

                {/* Main details */}
                <div>
                  <h3 className="font-heading text-lg font-bold text-primary">
                    {c.serviceName}
                  </h3>
                  <p className="text-xs text-secondary font-semibold mt-0.5">
                    with {c.nutritionistName}
                  </p>
                </div>

                {/* Date & Time pills */}
                <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-3 rounded-xl border border-outline-variant/40 text-xs">
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <span>{c.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>{c.time}</span>
                  </div>
                </div>

                {/* Client info & goals */}
                <div className="space-y-1 text-xs text-on-surface-variant pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-on-surface-variant">Client Name:</span>
                    <span className="font-semibold text-primary">{c.clientName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-on-surface-variant">Goal:</span>
                    <span className="font-semibold text-primary">{c.goal}</span>
                  </div>
                  {c.dietaryRestrictions && c.dietaryRestrictions !== 'None' && (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-on-surface-variant">Dietary Restrictions:</span>
                      <span className="font-semibold text-secondary">{c.dietaryRestrictions}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-5 border-t border-outline-variant/40 flex items-center justify-between gap-3">
                <button
                  onClick={() => alert(`Connecting to Secure Telehealth Room for session ${c.id}...`)}
                  className="bg-secondary hover:bg-secondary/90 text-on-secondary px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Video className="w-3.5 h-3.5" /> Join Telehealth Room
                </button>

                <button
                  onClick={() => handleCancel(c.id)}
                  disabled={cancellingId === c.id}
                  className="text-xs text-error hover:bg-error-container/30 px-3 py-2 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface-container-low rounded-2xl border border-outline-variant/50 space-y-4">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary mx-auto flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold font-heading text-primary">No Consultations Scheduled Yet</h3>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            Ready to take your metabolic health to the next level? Book your initial clinical assessment today.
          </p>
          <button
            onClick={() => onOpenBooking()}
            className="bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold px-6 py-2.5 rounded-lg shadow-sm"
          >
            Schedule Intake Assessment
          </button>
        </div>
      )}

      {/* Security Guarantee Notice */}
      <div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/60 flex items-center gap-3 text-xs text-on-surface-variant">
        <Shield className="w-5 h-5 text-secondary shrink-0" />
        <span>
          All consultations are conducted via end-to-end encrypted video conforming to HIPAA and GDPR healthcare privacy specifications.
        </span>
      </div>
    </div>
  );
}
