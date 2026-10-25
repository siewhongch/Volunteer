import React from 'react';
import { Heart, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavClick: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-base font-display">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <span>High School Volunteer</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Singapore’s youth community service network connecting secondary, JC, and polytechnic students with registered charity drives, student-led VIA projects, and free primary tuition.
            </p>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Singapore · Islandwide Community Service</span>
            </div>
          </div>

          {/* Nav Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Explore Opportunities
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavClick('opportunities')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Charity Organisation Drives
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('via-projects')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Student-Led VIA Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('free-tuition')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Free Tuition for Kids (7–12)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('tracker')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Personal VIA Hours Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Education & VIA Framework */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Schools & Recognition
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>MOE LEAPS 2.0 Service Domain</li>
              <li>Values In Action (VIA) Portfolios</li>
              <li>National Youth Achievement Award (NYAA)</li>
              <li>Public Library (NLB) Study Corners</li>
              <li>Community Club (People's Association) Hubs</li>
            </ul>
          </div>

          {/* Community & Safety */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Safety & Verification
            </h4>
            <p className="text-slate-400 leading-relaxed mb-3">
              All tuition matches and charity sessions follow child-safe guidelines in designated public venues and supervised digital classrooms.
            </p>
            <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Child Safety & Guardian Consent Mandatory</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} High School Volunteer Singapore. Dedicated to youth civic service.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavClick('guidelines')} className="hover:text-slate-400">
              VIA Guidelines
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavClick('free-tuition')} className="hover:text-slate-400">
              Tuition Safety Code
            </button>
            <span aria-hidden="true">·</span>
            <span>Singapore MOE Aligned</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
