import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Calendar, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CharityOpportunity, Region, CauseCategory } from '../types';

interface OpportunitiesSectionProps {
  opportunities: CharityOpportunity[];
  selectedRegion: Region;
  searchQuery: string;
  onSignUp: (opportunity: CharityOpportunity) => void;
  onOpenPostModal: () => void;
}

export const OpportunitiesSection: React.FC<OpportunitiesSectionProps> = ({
  opportunities,
  selectedRegion,
  searchQuery,
  onSignUp,
  onOpenPostModal,
}) => {
  const [selectedCause, setSelectedCause] = useState<CauseCategory>('All');

  const causes: CauseCategory[] = [
    'All',
    'Food Rescue & Nutrition',
    'Eldercare & Active Ageing',
    'Special Needs & Disability',
    'Environmental & Clean-up',
    'Animal Welfare',
    'Free Tuition & Mentorship',
  ];

  // Filtering
  const filtered = opportunities.filter((opp) => {
    const matchesRegion = selectedRegion === 'All' || opp.region === selectedRegion;
    const matchesCause = selectedCause === 'All' || opp.cause === selectedCause;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = 
      !query ||
      opp.title.toLowerCase().includes(query) ||
      opp.organisation.toLowerCase().includes(query) ||
      opp.description.toLowerCase().includes(query) ||
      opp.address.toLowerCase().includes(query);

    return matchesRegion && matchesCause && matchesQuery;
  });

  return (
    <section id="opportunities" className="py-12 bg-slate-50/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>Registered Charities & Non-Profits</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Volunteer Opportunities Across Singapore
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Sign up directly for volunteer shifts at recognized charity organizations. Every session provides signed verification for your MOE LEAPS 2.0 VIA records.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPostModal}
              className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Organisation Posting?</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>
        </div>

        {/* Cause Filter Bar (Interactive segmented controls) */}
        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-medium text-slate-500 whitespace-nowrap flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Cause:
          </span>
          {causes.map((cause) => {
            const isSelected = selectedCause === cause;
            return (
              <button
                key={cause}
                onClick={() => setSelectedCause(cause)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cause}
              </button>
            );
          })}
        </div>

        {/* Opportunities Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900">No volunteer opportunities matched your filters</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Try selecting "All" regions or clear your search terms to see all available charity volunteering drives.
            </p>
            <button
              onClick={() => {
                setSelectedCause('All');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((opp) => (
              <div
                key={opp.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Visual Header / Cover Image */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  {opp.imageUrl ? (
                    <img
                      src={opp.imageUrl}
                      alt={opp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white">
                      <Building2 className="w-12 h-12 opacity-40" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                  {/* Top metadata strip: unboxed clean text */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="bg-slate-900/70 backdrop-blur-xs px-2.5 py-1 rounded-md font-medium">
                      {opp.region} · Singapore
                    </span>
                    <span className="bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-md shadow-xs">
                      +{opp.hoursReward}h VIA
                    </span>
                  </div>

                  {/* Organisation Name */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-amber-200">
                      <Building2 className="w-3.5 h-3.5" />
                      <span className="truncate">{opp.organisation}</span>
                      {opp.verifiedCharity && (
                        <span title="Verified Charity">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed cause label */}
                    <div className="text-xs font-semibold text-amber-700 mb-1">
                      {opp.cause} · {opp.commitment}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                      {opp.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {opp.description}
                    </p>
                  </div>

                  {/* Key metadata list */}
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="truncate text-slate-700">{opp.address}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate text-slate-700">{opp.dates}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Users className="w-3.5 h-3.5 text-amber-600" />
                        <span>
                          <strong className="text-slate-900">{opp.slotsLeft}</strong> of {opp.maxSlots} slots left
                        </span>
                      </div>
                      <span className="text-amber-700 font-medium">Open for High Schoolers</span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <button
                    onClick={() => onSignUp(opp)}
                    className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-semibold text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Sign Up / Register for Shift</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
