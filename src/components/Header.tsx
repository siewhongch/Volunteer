import React, { useState } from 'react';
import { Heart, PlusCircle, Menu, X, Clock, BookOpen, Users, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPostModal: () => void;
  totalHours: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenPostModal,
  totalHours,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'opportunities', label: 'Charity Drives' },
    { id: 'via-projects', label: 'Student VIA' },
    { id: 'free-tuition', label: 'Free Tuition (Kids 7-12)' },
    { id: 'tracker', label: 'Hours Tracker' },
    { id: 'guidelines', label: 'VIA Info & Safety' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Notice Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white text-xs font-medium py-1.5 px-4 text-center">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Singapore High School VIA Platform · Supporting MOE LEAPS 2.0 & Community Outreach</span>
        </span>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Brand) - Zone 2 (Nav Links) - Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('opportunities')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0">
                High School <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">Volunteer</span>
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 single-line clean text links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-amber-600 font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('tracker')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
              title="View your logged volunteer hours"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Logged: <strong className="text-slate-900 tabular-nums">{totalHours.toFixed(1)}h</strong></span>
            </button>

            <button
              onClick={onOpenPostModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-rose-600 rounded-lg shadow-sm hover:from-amber-600 hover:to-rose-700 transition-all hover:shadow-md hover:scale-[1.02] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Opportunity / Need</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('tracker')}
              className="px-2 py-1 text-xs font-bold text-slate-700 bg-slate-100 rounded-md"
            >
              <span className="tabular-nums">{totalHours.toFixed(1)}h</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-amber-50 text-amber-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPostModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-rose-600 rounded-lg shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Opportunity / Need</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
