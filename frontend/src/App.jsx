import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import MacroCalculatorModal from './components/MacroCalculatorModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import NutritionistsPage from './pages/NutritionistsPage';
import ConsultationsPage from './pages/ConsultationsPage';

import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [services, setServices] = useState([]);
  const [nutritionists, setNutritionists] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [user, setUser] = useState({
    id: "usr-1",
    name: "Alex Morgan",
    email: "alex@nutriva.health",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    membership: "Premium Tier"
  });

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [selectedNutritionistForBooking, setSelectedNutritionistForBooking] = useState(null);

  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success', title = '') => {
    setToast({ message, type, title });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const loadData = async () => {
    try {
      const [srvRes, nutRes, conRes, testRes] = await Promise.allSettled([
        api.getServices(),
        api.getNutritionists(),
        api.getConsultations(),
        api.getTestimonials()
      ]);

      if (srvRes.status === 'fulfilled') setServices(srvRes.value.data || []);
      if (nutRes.status === 'fulfilled') setNutritionists(nutRes.value.data || []);
      if (conRes.status === 'fulfilled') setConsultations(conRes.value.data || []);
      if (testRes.status === 'fulfilled') setTestimonials(testRes.value.data || []);
    } catch (err) {
      console.error('Error loading initial platform data:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenBooking = (service = null, nutritionist = null) => {
    setSelectedServiceForBooking(service);
    setSelectedNutritionistForBooking(nutritionist);
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = (newBooking) => {
    showToast(
      `Your consultation with ${newBooking.nutritionistName} on ${newBooking.date} at ${newBooking.time} has been reserved.`,
      'success',
      'Session Confirmed'
    );
    // Reload consultations
    api.getConsultations().then(res => setConsultations(res.data || [])).catch(() => {});
  };

  const handleBookWithMetrics = (macroResult) => {
    setSelectedServiceForBooking({
      id: 'srv-custom',
      title: `Custom Macro Protocol (${macroResult.targetCalories} kcal)`,
      price: 199,
      goal: 'Macro & Metabolic Optimization'
    });
    setBookingModalOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    showToast(`Welcome to Nutriva, ${userData.name}!`, 'success', 'Signed In');
  };

  const handleLogout = () => {
    setUser(null);
    showToast('You have been logged out.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => handleOpenBooking()}
        onOpenCalculator={() => setCalculatorModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Page Router View */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomePage
            services={services}
            testimonials={testimonials}
            onOpenBooking={handleOpenBooking}
            onOpenCalculator={() => setCalculatorModalOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onOpenBooking={handleOpenBooking}
            onOpenCalculator={() => setCalculatorModalOpen(true)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            services={services}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'nutritionists' && (
          <NutritionistsPage
            nutritionists={nutritionists}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'consultations' && (
          <ConsultationsPage
            consultations={consultations}
            onOpenBooking={handleOpenBooking}
            onRefreshConsultations={() => api.getConsultations().then(res => setConsultations(res.data || []))}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Global Brand Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenCalculator={() => setCalculatorModalOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialService={selectedServiceForBooking}
        initialNutritionist={selectedNutritionistForBooking}
        onBookingSuccess={handleBookingSuccess}
        services={services}
        nutritionists={nutritionists}
      />

      <MacroCalculatorModal
        isOpen={calculatorModalOpen}
        onClose={() => setCalculatorModalOpen(false)}
        onBookWithMetrics={handleBookWithMetrics}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* Feedback Toast */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
