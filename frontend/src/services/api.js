const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  // Services
  async getServices(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/services${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  async getServiceById(id) {
    const res = await fetch(`${API_BASE}/services/${id}`);
    if (!res.ok) throw new Error('Failed to fetch service');
    return res.json();
  },

  // Nutritionists
  async getNutritionists(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/nutritionists${query ? `?${query}` : ''}`);
    if (!res.ok) throw new Error('Failed to fetch nutritionists');
    return res.json();
  },

  // Consultations
  async getConsultations() {
    const res = await fetch(`${API_BASE}/consultations`);
    if (!res.ok) throw new Error('Failed to fetch consultations');
    return res.json();
  },

  async bookConsultation(bookingData) {
    const res = await fetch(`${API_BASE}/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to book consultation');
    }
    return res.json();
  },

  async cancelConsultation(id) {
    const res = await fetch(`${API_BASE}/consultations/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to cancel consultation');
    return res.json();
  },

  // Macro & Calorie Calculator
  async calculateMacros(calculatorInputs) {
    const res = await fetch(`${API_BASE}/calculator/macro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(calculatorInputs)
    });
    if (!res.ok) throw new Error('Calculation failed');
    return res.json();
  },

  // Auth & Testimonials
  async login(credentials) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!res.ok) throw new Error('Registration failed');
    return res.json();
  },

  async getTestimonials() {
    const res = await fetch(`${API_BASE}/auth/testimonials`);
    if (!res.ok) throw new Error('Failed to fetch testimonials');
    return res.json();
  },

  async submitContact(data) {
    const res = await fetch(`${API_BASE}/auth/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit message');
    return res.json();
  }
};
