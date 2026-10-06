import React, { useState } from 'react';
import { Search, Bell, Menu, X, User, Sparkles, Calendar } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenCalculator,
  onOpenAuth,
  user,
  onLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'nutritionists', label: 'Nutritionists' },
    { id: 'consultations', label: 'Consultations' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab('services');
      // Pass search query context if desired
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/30 transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-max-width mx-auto h-20">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2 group"
        >
          <span className="text-2xl md:text-3xl font-bold font-heading text-primary tracking-tight group-hover:opacity-90 transition-opacity">
            NUTRIVA
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
            CLINICAL
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-semibold transition-all py-1 px-1 border-b-2 ${
                  isActive
                    ? 'text-primary border-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary border-transparent hover:border-outline-variant'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          {/* Quick Macro Tool Link */}
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-container/60 hover:bg-secondary-container px-3 py-1.5 rounded-full transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Macro Calc
          </button>
        </nav>

        {/* Desktop Trailing Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search Trigger */}
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search diet, doctor..."
                autoFocus
                className="w-48 text-xs bg-surface-container-low border border-secondary text-on-surface rounded-full pl-8 pr-7 py-1.5 focus:outline-none focus:ring-1 focus:ring-secondary"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 text-on-surface-variant" />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-2 text-on-surface-variant hover:text-primary text-xs"
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-on-surface-variant hover:text-primary p-2 rounded-full hover:bg-surface-container-high transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/* User Auth state */}
          {user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/60">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-secondary shadow-sm">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="text-left leading-tight hidden xl:block">
                <p className="text-xs font-semibold text-primary">{user.name}</p>
                <p className="text-[10px] text-on-surface-variant">{user.membership || 'Client'}</p>
              </div>
              <button
                onClick={onLogout}
                className="text-xs text-on-surface-variant hover:text-error ml-1 transition-colors underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="font-medium text-xs border border-secondary text-primary px-4 py-2 rounded-lg hover:bg-surface-container-low transition-colors"
            >
              Sign In
            </button>
          )}

          {/* Consultation CTA */}
          <button
            onClick={() => onOpenBooking()}
            className="bg-primary hover:bg-primary/90 text-on-primary px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm hover:shadow active:scale-95 flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Session
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="bg-primary text-on-primary text-xs px-3 py-1.5 rounded-lg font-medium"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-primary p-2 rounded-lg hover:bg-surface-container"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-b border-outline-variant px-6 py-5 flex flex-col gap-4 shadow-ambient">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-sm py-2 px-3 rounded-lg font-semibold transition-colors ${
                  activeTab === item.id
                    ? 'bg-secondary-container text-primary'
                    : 'text-on-surface hover:bg-surface-container'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="text-left text-sm py-2 px-3 rounded-lg font-semibold text-secondary flex items-center gap-2 hover:bg-surface-container"
            >
              <Sparkles className="w-4 h-4" />
              Nutritional Macro Calculator
            </button>
          </div>

          <div className="pt-3 border-t border-outline-variant/60 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs font-semibold text-primary">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-error underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full text-center text-xs border border-secondary text-primary py-2.5 rounded-lg font-medium"
              >
                Sign In to Portal
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-secondary hover:bg-secondary/90 text-on-secondary text-xs py-2.5 rounded-lg font-medium transition-colors text-center"
            >
              Find Your Nutritionist
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
