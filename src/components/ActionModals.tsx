import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  X, 
  Phone, 
  Mail, 
  User, 
  GraduationCap, 
  BookOpen, 
  Heart,
  Calendar,
  Sparkles
} from 'lucide-react';
import { CharityOpportunity, StudentVIAProject, TuitionTutor, TuitionRequest, VolunteerHourLog } from '../types';

interface SignUpModalProps {
  opportunity: CharityOpportunity | null;
  onClose: () => void;
  onConfirmSignUp: (opp: CharityOpportunity, studentData: { name: string; school: string; email: string; phone: string; autoAddHourLog: boolean }) => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({
  opportunity,
  onClose,
  onConfirmSignUp,
}) => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [autoAddHourLog, setAutoAddHourLog] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  if (!opportunity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onConfirmSignUp(opportunity, { name, school, email, phone, autoAddHourLog });
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Volunteer Registration
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Sign Up for Volunteer Shift
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-slate-900">Shift Confirmed!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Your registration with <strong>{opportunity.organisation}</strong> is confirmed. A copy of the briefing details has been logged.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 space-y-4 text-xs">
            {/* Opportunity summary card */}
            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-1.5">
              <div className="font-bold text-slate-900 text-sm">{opportunity.title}</div>
              <div className="text-slate-600 text-xs flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{opportunity.organisation}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-700 font-semibold">+{opportunity.hoursReward}h VIA</span>
              </div>
              <div className="text-slate-500 text-[11px] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{opportunity.dates}</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name (as per Student NRIC/EZ-Link) *</label>
              <input
                type="text"
                required
                placeholder="e.g. Rachel Lim Jia Ying"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">High School / JC *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Victoria JC (JC1)"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Contact *</label>
                <input
                  type="text"
                  required
                  placeholder="+65 9123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address (for confirmation) *</label>
              <input
                type="email"
                required
                placeholder="student@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={autoAddHourLog}
                  onChange={(e) => setAutoAddHourLog(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="font-semibold text-amber-900">
                  Automatically log {opportunity.hoursReward} hours in my VIA Tracker (as Pending Verification)
                </span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold rounded-lg shadow-xs cursor-pointer"
              >
                Confirm Registration
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface JoinVIAModalProps {
  project: StudentVIAProject | null;
  onClose: () => void;
  onConfirmJoin: (project: StudentVIAProject, applicantName: string) => void;
}

export const JoinVIAModal: React.FC<JoinVIAModalProps> = ({
  project,
  onClose,
  onConfirmJoin,
}) => {
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onConfirmJoin(project, name);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              Student Initiative
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Join VIA Project Team
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-slate-900">Application Sent!</h4>
            <p className="text-xs text-slate-600 max-w-xs mx-auto">
              Project lead <strong>{project.leadStudentName}</strong> has received your interest and will coordinate via email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 space-y-4 text-xs">
            <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200/80 space-y-1">
              <div className="font-bold text-slate-900 text-sm">{project.title}</div>
              <div className="text-slate-600 text-xs">
                Led by {project.leadStudentName} ({project.school}) · Est. ~{project.hoursEstimate}h VIA
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Lucas Tan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your School & Year *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anglo-Chinese Junior College (JC1)"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Why would you like to join this project? *</label>
              <textarea
                rows={3}
                required
                placeholder="Share your interest, relevant skills, or availability..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-600 hover:to-amber-700 text-white font-bold rounded-lg shadow-xs cursor-pointer"
              >
                Send Request to Lead
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface ContactTutorModalProps {
  tutor: TuitionTutor | null;
  onClose: () => void;
}

export const ContactTutorModal: React.FC<ContactTutorModalProps> = ({
  tutor,
  onClose,
}) => {
  const [parentName, setParentName] = useState('');
  const [childGrade, setChildGrade] = useState('Primary 5');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!tutor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Free Tuition Exchange
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Connect with Tutor: {tutor.tutorName}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900">Message Delivered!</h4>
            <p className="text-xs text-slate-600">
              {tutor.tutorName} has been notified. You can also reach out directly via:
            </p>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-slate-800 space-y-1 font-mono">
              <div>Email: {tutor.contactEmail}</div>
              <div>Phone / WhatsApp: {tutor.contactPhone}</div>
            </div>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 space-y-4 text-xs">
            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 space-y-1">
              <div className="font-bold text-slate-900">{tutor.schoolGrade}</div>
              <div className="text-slate-600 text-xs">
                Teaches: {tutor.subjects.join(', ')}
              </div>
              <div className="text-slate-500 text-[11px]">
                Travel Areas: {tutor.areas.join(', ')}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Parent / Guardian Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mdm. Ang"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Child's Primary Level *</label>
              <select
                value={childGrade}
                onChange={(e) => setChildGrade(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
              >
                <option value="Primary 1">Primary 1 (Age 7)</option>
                <option value="Primary 2">Primary 2 (Age 8)</option>
                <option value="Primary 3">Primary 3 (Age 9)</option>
                <option value="Primary 4">Primary 4 (Age 10)</option>
                <option value="Primary 5">Primary 5 (Age 11)</option>
                <option value="Primary 6">Primary 6 (Age 12 / PSLE)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Message to Tutor *</label>
              <textarea
                rows={3}
                required
                placeholder="Hi, we are looking for help with Primary 5 Math fractions and would love to meet at Bishan Library on Saturdays..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-xs cursor-pointer"
              >
                Send Message & Connect
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface HelpKidModalProps {
  request: TuitionRequest | null;
  onClose: () => void;
  onConfirmHelp: (request: TuitionRequest, studentTutor: string) => void;
}

export const HelpKidModal: React.FC<HelpKidModalProps> = ({
  request,
  onClose,
  onConfirmHelp,
}) => {
  const [tutorName, setTutorName] = useState('');
  const [tutorSchool, setTutorSchool] = useState('');
  const [availability, setAvailability] = useState('');
  const [sent, setSent] = useState(false);

  if (!request) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      onConfirmHelp(request, tutorName);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              Student Volunteer Matching
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Offer Free Tuition to {request.childName}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {sent ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900">Offer Sent to Family!</h4>
            <p className="text-xs text-slate-600">
              Guardian <strong>{request.guardianName}</strong> will contact you to coordinate dates and location.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 space-y-4 text-xs">
            <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-200/80 space-y-1">
              <div className="font-bold text-slate-900">{request.childName} ({request.primaryLevel})</div>
              <div className="text-rose-900 font-medium">Subjects: {request.subjectsNeeded.join(', ')}</div>
              <div className="text-slate-600 text-[11px]">Location: {request.neighborhood} ({request.preferredMode})</div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Name (Student Tutor) *</label>
              <input
                type="text"
                required
                placeholder="e.g. Amanda Choo"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your School & Year *</label>
              <input
                type="text"
                required
                placeholder="e.g. Temasek Junior College (JC2)"
                value={tutorSchool}
                onChange={(e) => setTutorSchool(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Proposed Days & Time Available *</label>
              <input
                type="text"
                required
                placeholder="e.g. Saturdays 10 AM - 12 PM at Library or Zoom"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900">
              Direct Guardian Contact: {request.guardianPhone} · {request.guardianEmail}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-bold rounded-lg shadow-xs cursor-pointer"
              >
                Send Volunteer Offer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
