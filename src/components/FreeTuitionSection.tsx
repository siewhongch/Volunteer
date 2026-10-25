import React, { useState } from 'react';
import { 
  BookOpen, 
  MapPin, 
  Clock, 
  GraduationCap, 
  UserCheck, 
  Heart, 
  Phone, 
  Mail, 
  AlertCircle, 
  PlusCircle, 
  CheckCircle2, 
  Search,
  Sparkles,
  Shield,
  MessageSquare
} from 'lucide-react';
import { TuitionTutor, TuitionRequest, Region } from '../types';

interface FreeTuitionSectionProps {
  tutors: TuitionTutor[];
  requests: TuitionRequest[];
  selectedRegion: Region;
  searchQuery: string;
  onOpenOfferModal: () => void;
  onOpenRequestModal: () => void;
  onContactTutor: (tutor: TuitionTutor) => void;
  onHelpKid: (request: TuitionRequest) => void;
}

export const FreeTuitionSection: React.FC<FreeTuitionSectionProps> = ({
  tutors,
  requests,
  selectedRegion,
  searchQuery,
  onOpenOfferModal,
  onOpenRequestModal,
  onContactTutor,
  onHelpKid,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'tutors' | 'requests'>('tutors');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const subjectOptions = [
    'All',
    'Mathematics',
    'Science',
    'English',
    'Chinese',
    'Malay / Tamil',
    'PSLE Prep',
  ];

  // Filtering Tutors
  const filteredTutors = tutors.filter((tutor) => {
    const matchesRegion = selectedRegion === 'All' || tutor.region === selectedRegion || tutor.areas.some(a => a.toLowerCase().includes('online'));
    const matchesSubject = selectedSubject === 'All' || tutor.subjects.some(s => s.toLowerCase().includes(selectedSubject.toLowerCase()));
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      tutor.tutorName.toLowerCase().includes(q) ||
      tutor.schoolGrade.toLowerCase().includes(q) ||
      tutor.bio.toLowerCase().includes(q) ||
      tutor.areas.some(a => a.toLowerCase().includes(q)) ||
      tutor.subjects.some(s => s.toLowerCase().includes(q));

    return matchesRegion && matchesSubject && matchesQuery;
  });

  // Filtering Requests
  const filteredRequests = requests.filter((req) => {
    const matchesRegion = selectedRegion === 'All' || req.region === selectedRegion || req.preferredMode.includes('Online');
    const matchesSubject = selectedSubject === 'All' || req.subjectsNeeded.some(s => s.toLowerCase().includes(selectedSubject.toLowerCase()));
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      req.childName.toLowerCase().includes(q) ||
      req.neighborhood.toLowerCase().includes(q) ||
      req.notes.toLowerCase().includes(q) ||
      req.primaryLevel.toLowerCase().includes(q) ||
      req.subjectsNeeded.some(s => s.toLowerCase().includes(q));

    return matchesRegion && matchesSubject && matchesQuery;
  });

  return (
    <section id="free-tuition" className="py-14 bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30 scroll-mt-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner with Visual & Storytelling */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden mb-10">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-transparent" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold text-amber-100">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Dedicated Free Community Tuition Exchange</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
                Free Tuition for Kids (Ages 7 – 12)
              </h2>
              <p className="text-sm sm:text-base text-amber-50 leading-relaxed max-w-2xl">
                Bridging the academic gap for primary school children. High school students can volunteer their knowledge in Math, Science, English, or Mother Tongue, clocking approved VIA hours while mentoring a child.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenOfferModal}
                  className="px-4 py-2.5 bg-white text-slate-900 hover:bg-amber-50 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-amber-600" />
                  <span>Offer Free Tuition (Student Volunteer)</span>
                </button>
                <button
                  onClick={onOpenRequestModal}
                  className="px-4 py-2.5 bg-slate-900/40 hover:bg-slate-900/60 border border-white/30 text-white font-bold text-xs rounded-xl backdrop-blur-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-rose-300" />
                  <span>Request Free Tuition (For a Kid 7–12)</span>
                </button>
              </div>
            </div>

            {/* Photo showcase thumbnail */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg aspect-[4/3] bg-amber-900/40">
                <img
                  src="/src/assets/images/community_tuition_tutoring_1792918046578.jpg"
                  alt="High school student tutor patiently explaining primary school math problem to child"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Safety & Community Guideline Notice */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200/80 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
          <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-950">Safety First for Student Tutors & Young Learners:</span>
            <p className="text-amber-800">
              In-person sessions should take place at supervised public spaces such as Singapore National Libraries (e.g., Tampines, Jurong, Bishan, Woodlands) or Community Clubs (CCs), or conducted digitally over Zoom with parent/guardian consent.
            </p>
          </div>
        </div>

        {/* Dual Mode Switcher (Interactive Tabs) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setActiveSubTab('tutors')}
              className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'tutors'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              High School Tutors Available ({tutors.length})
            </button>
            <button
              onClick={() => setActiveSubTab('requests')}
              className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'requests'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kids Needing Tuition ({requests.length})
            </button>
          </div>

          {/* Subject Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap mr-1">Subject:</span>
            {subjectOptions.map((subj) => {
              const isSelected = selectedSubject === subj;
              return (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white font-semibold'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {subj}
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: High School Tutors Available */}
        {activeSubTab === 'tutors' && (
          <div>
            {filteredTutors.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-900">No student tutors match current criteria</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Try clearing your subject filter or region, or register as a student tutor to help local primary school kids!
                </p>
                <button
                  onClick={onOpenOfferModal}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  Offer Free Tuition
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      {/* Tutor Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white font-extrabold flex items-center justify-center text-sm font-display shadow-xs">
                            {tutor.tutorName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-slate-900">
                              {tutor.tutorName}
                            </h3>
                            <p className="text-xs text-slate-500">
                              {tutor.schoolGrade}
                            </p>
                          </div>
                        </div>

                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          {tutor.status}
                        </span>
                      </div>

                      {/* Bio */}
                      <p className="text-xs text-slate-600 leading-relaxed italic">
                        "{tutor.bio}"
                      </p>

                      {/* Subjects Offered */}
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                          Subjects Taught
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {tutor.subjects.map((sub, i) => (
                            <span
                              key={i}
                              className="text-xs font-medium text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded-md border border-amber-200/60"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Areas & Availability */}
                      <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-800">Areas: </span>
                            <span>{tutor.areas.join(', ')}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-800">Hours: </span>
                            <span>{tutor.availability}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Clocked <strong className="text-slate-700 tabular-nums">{tutor.hoursClocked}h</strong> tuition
                      </span>
                      <button
                        onClick={() => onContactTutor(tutor)}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Contact Tutor</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Kids Needing Tuition */}
        {activeSubTab === 'requests' && (
          <div>
            {filteredRequests.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-slate-900">No tuition requests match current filters</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  If you are a parent or guardian of a primary school child (ages 7-12) needing help, post a request!
                </p>
                <button
                  onClick={onOpenRequestModal}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  Post a Tuition Request
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-rose-400 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      {/* Request Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-slate-900">
                              {req.childName}
                            </h3>
                            {req.urgent && (
                              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                Exam Prep / Urgent
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Age {req.childAge} · {req.primaryLevel}
                          </p>
                        </div>

                        <span className="text-[11px] text-slate-400">
                          {req.datePosted}
                        </span>
                      </div>

                      {/* Parent Notes */}
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        "{req.notes}"
                      </p>

                      {/* Subjects Needed */}
                      <div>
                        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                          Help Needed In
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {req.subjectsNeeded.map((sub, i) => (
                            <span
                              key={i}
                              className="text-xs font-medium text-rose-800 bg-rose-50/80 px-2.5 py-1 rounded-md border border-rose-200/60"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Location & Preferred Mode */}
                      <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-800">Location: </span>
                            <span>{req.neighborhood} ({req.region})</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-800">Mode: </span>
                            <span>{req.preferredMode}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        Guardian: {req.guardianName.split(' ')[0]}
                      </span>
                      <button
                        onClick={() => onHelpKid(req)}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5" />
                        <span>Offer Help / Connect</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
