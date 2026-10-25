import React from 'react';
import { 
  Sparkles, 
  Users, 
  GraduationCap, 
  Clock, 
  Target, 
  ArrowRight, 
  PlusCircle, 
  Mail,
  CheckCircle2
} from 'lucide-react';
import { StudentVIAProject, Region } from '../types';

interface StudentVIASectionProps {
  projects: StudentVIAProject[];
  selectedRegion: Region;
  searchQuery: string;
  onJoinProject: (project: StudentVIAProject) => void;
  onOpenPostModal: () => void;
}

export const StudentVIASection: React.FC<StudentVIASectionProps> = ({
  projects,
  selectedRegion,
  searchQuery,
  onJoinProject,
  onOpenPostModal,
}) => {
  const filtered = projects.filter((proj) => {
    const matchesRegion = selectedRegion === 'All' || proj.region === selectedRegion;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      proj.title.toLowerCase().includes(query) ||
      proj.school.toLowerCase().includes(query) ||
      proj.leadStudentName.toLowerCase().includes(query) ||
      proj.description.toLowerCase().includes(query) ||
      proj.cause.toLowerCase().includes(query);

    return matchesRegion && matchesQuery;
  });

  return (
    <section id="via-projects" className="py-12 bg-white scroll-mt-20 border-t border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Student-Led Initiatives</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Value-in-Action (VIA) Projects by Students
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Started by passionate high school students looking for peer volunteers. Join an ongoing project or post your own team's initiative to recruit classmates and cross-school peers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPostModal}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-600 hover:to-amber-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Your VIA Initiative</span>
            </button>
          </div>
        </div>

        {/* Project Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 p-8">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-900">No student VIA projects found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Be the first student leader to post a Value-in-Action initiative for fellow high schoolers!
            </p>
            <button
              onClick={onOpenPostModal}
              className="mt-4 px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
            >
              Post a VIA Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((proj) => {
              const spotsLeft = Math.max(0, proj.membersNeeded - proj.currentMembers);
              return (
                <div
                  key={proj.id}
                  className="group bg-white rounded-2xl border border-slate-200/90 hover:border-rose-400 shadow-xs hover:shadow-md transition-all duration-300 p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top unboxed metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1.5 font-semibold text-rose-700">
                        <GraduationCap className="w-4 h-4" />
                        <span>{proj.school}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-medium">{proj.region}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-bold text-amber-600 tabular-nums">~{proj.hoursEstimate}h VIA</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-700 transition-colors leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Led by <strong className="text-slate-800">{proj.leadStudentName}</strong> · Timeline: {proj.dateRange}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Target & Activities */}
                    <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 border border-slate-100 text-xs">
                      <div className="flex items-start gap-2">
                        <Target className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-800">Target Goal: </span>
                          <span className="text-slate-600">{proj.targetGoal}</span>
                        </div>
                      </div>

                      <div className="pt-1 flex flex-wrap gap-1.5">
                        {proj.keyActivities.map((act, i) => (
                          <span
                            key={i}
                            className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-[11px] text-slate-700"
                          >
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer status & action */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-600">
                      <span className="font-bold text-slate-900 tabular-nums">{proj.currentMembers}</span> of {proj.membersNeeded} members
                      {spotsLeft > 0 ? (
                        <span className="text-emerald-700 font-medium ml-1.5">({spotsLeft} spots open)</span>
                      ) : (
                        <span className="text-slate-400 font-medium ml-1.5">(Team Full)</span>
                      )}
                    </div>

                    <button
                      onClick={() => onJoinProject(proj)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-rose-600 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Join Team / Contact</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
