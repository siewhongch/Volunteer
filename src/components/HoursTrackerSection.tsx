import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  FileText, 
  Printer, 
  Award, 
  Download, 
  Calendar, 
  User, 
  Building2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { VolunteerHourLog } from '../types';

interface HoursTrackerSectionProps {
  logs: VolunteerHourLog[];
  onAddLog: (newLog: Omit<VolunteerHourLog, 'id'>) => void;
  targetHours: number;
  setTargetHours: (hours: number) => void;
  studentName: string;
  setStudentName: (name: string) => void;
}

export const HoursTrackerSection: React.FC<HoursTrackerSectionProps> = ({
  logs,
  onAddLog,
  targetHours,
  setTargetHours,
  studentName,
  setStudentName,
}) => {
  const [isLogFormOpen, setIsLogFormOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // New Log Form State
  const [activityTitle, setActivityTitle] = useState('');
  const [orgName, setOrgName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState('');
  const [category, setCategory] = useState('Food Rescue & Nutrition');
  const [supervisorName, setSupervisorName] = useState('');
  const [supervisorContact, setSupervisorContact] = useState('');
  const [reflections, setReflections] = useState('');

  // Calculations
  const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);
  const verifiedHours = logs
    .filter((l) => l.status === 'Verified')
    .reduce((sum, log) => sum + log.hours, 0);
  const pendingHours = logs
    .filter((l) => l.status === 'Pending Verification')
    .reduce((sum, log) => sum + log.hours, 0);

  const progressPercent = Math.min(100, Math.round((totalHours / targetHours) * 100));

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle || !orgName || !hours) return;

    onAddLog({
      studentName: studentName || 'Student Volunteer',
      activityTitle,
      organizationOrProject: orgName,
      date,
      hours: parseFloat(hours),
      category,
      supervisorName: supervisorName || 'Community Coordinator',
      supervisorContact: supervisorContact || 'contact@via.org.sg',
      reflections: reflections || 'Contributed meaningful community service and learned the value of civic responsibility.',
      status: 'Pending Verification',
    });

    // Reset
    setActivityTitle('');
    setOrgName('');
    setHours('');
    setSupervisorName('');
    setSupervisorContact('');
    setReflections('');
    setIsLogFormOpen(false);
  };

  return (
    <section id="tracker" className="py-14 bg-white scroll-mt-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4" />
              <span>Personal Volunteer Dashboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Track Your VIA & Volunteer Hours
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Keep an official log of your service projects for Singapore MOE LEAPS 2.0 (Service Domain), National Youth Achievement Award (NYAA), and school VIA testimonials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Export VIA Timesheet</span>
            </button>
            <button
              onClick={() => setIsLogFormOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Volunteer Hours</span>
            </button>
          </div>
        </div>

        {/* Top Progress & Stats Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Student Info & Goal Progress */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Student Volunteer Profile
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter Student Name"
                      className="bg-slate-800/80 border border-slate-700 focus:border-amber-400 text-white font-bold text-lg sm:text-xl rounded-lg px-3 py-1 outline-none w-64"
                    />
                    <span className="text-xs text-slate-400 hidden sm:inline">(Click to edit name)</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400">Target Goal</span>
                  <div className="flex items-center gap-1">
                    <select
                      value={targetHours}
                      onChange={(e) => setTargetHours(Number(e.target.value))}
                      className="bg-slate-800 border border-slate-700 text-amber-400 font-bold text-sm rounded-lg px-2 py-1 outline-none cursor-pointer"
                    >
                      <option value={20}>20 Hours (MOE Baseline)</option>
                      <option value={30}>30 Hours (LEAPS Level 3)</option>
                      <option value={50}>50 Hours (NYAA Silver)</option>
                      <option value={80}>80 Hours (NYAA Gold)</option>
                      <option value={100}>100 Hours (Honor Roll)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    <strong className="text-white text-base font-extrabold tabular-nums">{totalHours.toFixed(1)}</strong> of {targetHours} Hours Completed
                  </span>
                  <span className="font-bold text-amber-400 tabular-nums">
                    {progressPercent}% Achieved
                  </span>
                </div>
                <div className="w-full h-3.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 rounded-full transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick KPI columns */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-display tabular-nums">
                  {totalHours.toFixed(1)}
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">Total Clocked</div>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display tabular-nums">
                  {verifiedHours.toFixed(1)}
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">Verified</div>
              </div>

              <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
                <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-display tabular-nums">
                  {pendingHours.toFixed(1)}
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">Pending</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logged Activities Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Activity History & Reflection Records ({logs.length})
            </h3>
            <span className="text-xs text-slate-500">
              Singapore MOE Formatted
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Activity Title & Organisation</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Hours</th>
                  <th className="py-3 px-4">Supervisor Contact</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-600">
                      {log.date}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{log.activityTitle}</div>
                      <div className="text-slate-500 text-[11px]">{log.organizationOrProject}</div>
                      {log.reflections && (
                        <p className="text-[11px] text-slate-600 italic mt-1 line-clamp-1">
                          "{log.reflections}"
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-600">
                      {log.category}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap font-bold text-slate-900 tabular-nums">
                      {log.hours.toFixed(1)}h
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      <div>{log.supervisorName}</div>
                      <div className="text-slate-400">{log.supervisorContact}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {log.status === 'Verified' ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL: Log Volunteer Hours */}
      {isLogFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Log Volunteer / VIA Hours
                </h3>
              </div>
              <button
                onClick={() => setIsLogFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Activity Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Primary 5 Math Tuition / Willing Hearts Bento Pack"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-amber-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Organisation or Project *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Willing Hearts / High School Volunteer"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Date of Service *
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Hours Clocked (e.g. 3.5) *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="24"
                    required
                    placeholder="3.5"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Cause Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-amber-500 outline-none"
                  >
                    <option value="Free Tuition & Mentorship">Free Tuition & Mentorship</option>
                    <option value="Food Rescue & Nutrition">Food Rescue & Nutrition</option>
                    <option value="Eldercare & Active Ageing">Eldercare & Active Ageing</option>
                    <option value="Environmental & Clean-up">Environmental & Clean-up</option>
                    <option value="Special Needs & Disability">Special Needs & Disability</option>
                    <option value="Animal Welfare">Animal Welfare</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Supervisor / Teacher Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mr. Tan Keng Boon"
                    value={supervisorName}
                    onChange={(e) => setSupervisorName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Supervisor Contact (Email/Phone)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. tan_kb@moe.edu.sg"
                    value={supervisorContact}
                    onChange={(e) => setSupervisorContact(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Personal Reflection (Key takeaways & learning) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="What impact did your service have? What skills did you develop?"
                  value={reflections}
                  onChange={(e) => setReflections(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-amber-500 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogFormOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Log Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Printable VIA Timesheet / Summary */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-600" />
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  Official VIA Timesheet & Summary
                </h3>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Certificate / Timesheet Body */}
            <div className="my-6 p-6 border-2 border-slate-300 rounded-2xl bg-amber-50/20 space-y-4">
              <div className="text-center pb-4 border-b border-slate-200">
                <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                  Republic of Singapore · Student Value-in-Action Record
                </span>
                <h4 className="text-xl font-extrabold text-slate-900 mt-1 font-display">
                  Values-In-Action (VIA) Service Portfolio
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Compliant with MOE LEAPS 2.0 (Service Domain) & NYAA Standards
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500">Student Name:</span>
                  <div className="font-bold text-slate-900 text-sm">{studentName}</div>
                </div>
                <div>
                  <span className="text-slate-500">Total Hours Verified:</span>
                  <div className="font-bold text-emerald-700 text-sm tabular-nums">
                    {verifiedHours.toFixed(1)} Hours
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Total Hours Logged:</span>
                  <div className="font-bold text-slate-900 text-sm tabular-nums">
                    {totalHours.toFixed(1)} Hours
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Service Goal Status:</span>
                  <div className="font-bold text-amber-700 text-sm">
                    {progressPercent}% towards {targetHours}h Goal
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-xs font-bold text-slate-800 mb-2">Itemized Community Engagements:</div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {logs.map((log) => (
                    <div key={log.id} className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-900">
                        <span>{log.activityTitle}</span>
                        <span className="tabular-nums text-amber-700">{log.hours}h</span>
                      </div>
                      <div className="text-slate-500 text-[11px] flex justify-between mt-0.5">
                        <span>{log.organizationOrProject} · {log.date}</span>
                        <span className={log.status === 'Verified' ? 'text-emerald-700 font-semibold' : 'text-amber-700'}>
                          {log.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-8 text-[11px] text-slate-500">
                <div>
                  <div className="border-b border-slate-400 h-8 mb-1"></div>
                  <div>Student Signature / Date</div>
                </div>
                <div>
                  <div className="border-b border-slate-400 h-8 mb-1"></div>
                  <div>Teacher-in-charge / Charity Supervisor</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Summary</span>
              </button>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
