import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: 'alex@nutriva.health',
    password: 'password123'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let res;
      if (isRegister) {
        res = await api.register(formData);
      } else {
        res = await api.login({ email: formData.email, password: formData.password });
      }
      onAuthSuccess && onAuthSuccess(res.data);
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setFormData({
      name: 'Dr. Alex Morgan',
      email: 'alex@nutriva.health',
      password: 'password123'
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl w-full max-w-md shadow-ambient-deep overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-primary text-on-primary px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-heading">
              {isRegister ? 'Create Your NUTRIVA Account' : 'Sign In to Client Portal'}
            </h2>
            <p className="text-xs text-on-primary-container">
              {isRegister ? 'Join our high-performance clinical health platform' : 'Access your meal plans & clinical sessions'}
            </p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-semibold text-primary mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs bg-surface border border-outline-variant rounded-lg pl-8 pr-3 py-2.5 text-on-surface focus:border-secondary outline-none"
                />
                <User className="w-3.5 h-3.5 absolute left-2.5 top-3 text-on-surface-variant" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full text-xs bg-surface border border-outline-variant rounded-lg pl-8 pr-3 py-2.5 text-on-surface focus:border-secondary outline-none"
              />
              <Mail className="w-3.5 h-3.5 absolute left-2.5 top-3 text-on-surface-variant" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-primary mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full text-xs bg-surface border border-outline-variant rounded-lg pl-8 pr-3 py-2.5 text-on-surface focus:border-secondary outline-none"
              />
              <Lock className="w-3.5 h-3.5 absolute left-2.5 top-3 text-on-surface-variant" />
            </div>
          </div>

          {/* Quick Demo Credentials helper */}
          {!isRegister && (
            <div className="bg-surface-container-low p-2.5 rounded-lg text-[11px] text-on-surface-variant flex items-center justify-between">
              <span>Demo Account: <strong>alex@nutriva.health</strong></span>
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-secondary font-bold hover:underline"
              >
                Auto-fill
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-on-primary py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-secondary hover:text-primary transition-colors underline"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
