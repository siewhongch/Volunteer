import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  BookOpen, 
  HeartHandshake, 
  CheckCircle2, 
  Info,
  Building2,
  Users
} from 'lucide-react';

export const GuidelinesSection: React.FC = () => {
  return (
    <section id="guidelines" className="py-14 bg-slate-50/70 scroll-mt-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-2">
            <Info className="w-3.5 h-3.5" />
            <span>Singapore Student Service Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            MOE VIA Guidelines & Student Safety
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Everything you need to know about clocking Value-in-Action (VIA) hours for Singapore schools, LEAPS 2.0 recognition, and youth mentoring safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: MOE LEAPS 2.0 & NYAA */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              MOE LEAPS 2.0 Service Domain
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In Singapore secondary schools and JCs, participation in community service contributes directly to your Service Domain score (Levels 1 to 5).
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Level 1–2: At least 20 hours across 2 years</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Level 3–4: 30–60 hours with self-initiated VIA</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Level 5: Student-led sustained initiative</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Safe Free Tutoring Protocols */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Safety Code for Free Tuition
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When providing free tuition to children aged 7–12, high school volunteers and guardians must observe community safety protocols:
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Meet at public libraries (NLB) or Community Clubs (CC)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Guardian consent required for all minors under 14</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Online sessions via Zoom/Meet are recommended</span>
              </li>
            </ul>
          </div>

          {/* Card 3: For Charity Organisations */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              For Registered Charities & Schools
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Registered Singapore VWOs, IPCs, and school VIA coordinators can easily post upcoming drives, track student attendances, and issue digital endorsements.
            </p>
            <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Instant broadcast to high school volunteers</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Standardized attendance & timesheet export</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Direct email confirmation to teacher ICs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
