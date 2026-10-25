import React from 'react';
import { Search, MapPin, Sparkles, BookOpen, Clock, HeartHandshake, ShieldCheck, Compass } from 'lucide-react';
import { Region } from '../types';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRegion: Region;
  setSelectedRegion: (region: Region) => void;
  onExploreClick: (tabId: string) => void;
  onOpenPostModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  onExploreClick,
  onOpenPostModal,
}) => {
  const regions: Region[] = ['All', 'Central', 'East', 'West', 'North', 'North-East', 'Online'];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-orange-50/40 to-white pt-8 pb-12 border-b border-slate-200/60">
      {/* Decorative ambient radial glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 left-10 w-80 h-80 bg-rose-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, Value Proposition, Action CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-800 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Singapore High School Community & VIA Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display text-balance">
              Serve your community.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600">
                Clock your VIA hours.
              </span>{' '}
              Mentor local kids.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Connecting secondary, junior college, and polytechnic students across Singapore with verified charity organisations, student-led Value-in-Action initiatives, and dedicated free primary school tuition.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onExploreClick('opportunities')}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-semibold text-sm rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-[1.02] cursor-pointer"
              >
                Find Volunteer Drives
              </button>
              <button
                onClick={() => onExploreClick('free-tuition')}
                className="px-5 py-2.5 bg-white border border-slate-300 hover:border-amber-400 hover:bg-amber-50/50 text-slate-800 font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Free Tuition (Kids 7–12)</span>
              </button>
              <button
                onClick={() => onExploreClick('singapore-map')}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>OneMap Explorer</span>
              </button>
              <button
                onClick={onOpenPostModal}
                className="px-4 py-2.5 text-amber-700 hover:text-amber-800 font-semibold text-sm hover:underline cursor-pointer"
              >
                Post an Opportunity +
              </button>
            </div>

            {/* Search and Region filter bar */}
            <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by keywords (e.g. Willing Hearts, Math tuition, beach cleanup)..."
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Region interactive filter pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-500 font-medium whitespace-nowrap pl-1 pr-2 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" /> Region:
                </span>
                {regions.map((region) => {
                  const isSelected = selectedRegion === region;
                  return (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-3 py-1 font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-white font-semibold shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {region}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl blur-md opacity-30 group-hover:opacity-40 transition-opacity" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/60 aspect-[16/10] bg-slate-100">
                <img
                  src="/src/assets/images/hero_singapore_volunteers_1792918046414.jpg"
                  alt="Singapore high school students joyfully volunteering together outdoors in a community park"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                {/* Scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Real Community Impact · Singapore</span>
                  </div>
                  <p className="text-sm font-medium text-slate-100 mt-1">
                    "Volunteering opened my eyes to community needs beyond the classroom."
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    — Victoria JC & Raffles Institution Student Volunteers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Impact Strip */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
          <div className="p-4 bg-white/80 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Hours Logged</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tabular-nums">
              1,480+
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Clocked across Singapore</div>
          </div>

          <div className="p-4 bg-white/80 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 text-rose-600 mb-1">
              <HeartHandshake className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Charity Partners</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tabular-nums">
              36+
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Welfare homes, soup kitchens & shelters</div>
          </div>

          <div className="p-4 bg-white/80 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Free Tuition Kids</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tabular-nums">
              142
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Primary 1–6 kids matched</div>
          </div>

          <div className="p-4 bg-white/80 rounded-xl border border-slate-200/70">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">MOE Standards</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              LEAPS 2.0
            </div>
            <div className="text-xs text-slate-500 mt-0.5">Verified service hour records</div>
          </div>
        </div>
      </div>
    </div>
  );
};
