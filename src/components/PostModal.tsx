import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  BookOpen, 
  Heart, 
  X, 
  PlusCircle, 
  CheckCircle2, 
  GraduationCap 
} from 'lucide-react';
import { 
  CharityOpportunity, 
  StudentVIAProject, 
  TuitionTutor, 
  TuitionRequest, 
  Region 
} from '../types';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCharityOpp: (opp: CharityOpportunity) => void;
  onAddStudentProject: (project: StudentVIAProject) => void;
  onAddTutor: (tutor: TuitionTutor) => void;
  onAddTuitionRequest: (request: TuitionRequest) => void;
  initialType?: 'charity' | 'via' | 'tutor' | 'request';
}

export const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  onClose,
  onAddCharityOpp,
  onAddStudentProject,
  onAddTutor,
  onAddTuitionRequest,
  initialType = 'charity',
}) => {
  const [postType, setPostType] = useState<'charity' | 'via' | 'tutor' | 'request'>(initialType);
  const [submitted, setSubmitted] = useState(false);

  // Charity Opp Fields
  const [charityTitle, setCharityTitle] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [charityCause, setCharityCause] = useState('Food Rescue & Nutrition');
  const [charityRegion, setCharityRegion] = useState<Region>('Central');
  const [address, setAddress] = useState('');
  const [hoursReward, setHoursReward] = useState('4');
  const [slots, setSlots] = useState('10');
  const [charityDesc, setCharityDesc] = useState('');
  const [charityEmail, setCharityEmail] = useState('');
  const [charityPhone, setCharityPhone] = useState('');
  const [dates, setDates] = useState('Weekends, 9:00 AM - 1:00 PM');

  // Student VIA Fields
  const [viaTitle, setViaTitle] = useState('');
  const [leadName, setLeadName] = useState('');
  const [school, setSchool] = useState('');
  const [viaCause, setViaCause] = useState('Environmental & Clean-up');
  const [viaRegion, setViaRegion] = useState<Region>('East');
  const [viaDesc, setViaDesc] = useState('');
  const [targetGoal, setTargetGoal] = useState('');
  const [viaHours, setViaHours] = useState('12');
  const [membersNeeded, setMembersNeeded] = useState('5');
  const [viaEmail, setViaEmail] = useState('');
  const [viaDateRange, setViaDateRange] = useState('Next Month (Term Break)');

  // Tutor Fields
  const [tutorName, setTutorName] = useState('');
  const [tutorSchool, setTutorSchool] = useState('');
  const [tutorSubjects, setTutorSubjects] = useState('');
  const [tutorAreas, setTutorAreas] = useState('');
  const [tutorRegion, setTutorRegion] = useState<Region>('East');
  const [tutorAvailability, setTutorAvailability] = useState('');
  const [tutorBio, setTutorBio] = useState('');
  const [tutorEmail, setTutorEmail] = useState('');
  const [tutorPhone, setTutorPhone] = useState('');

  // Tuition Request Fields
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('10');
  const [primaryLevel, setPrimaryLevel] = useState<'Primary 1' | 'Primary 2' | 'Primary 3' | 'Primary 4' | 'Primary 5' | 'Primary 6'>('Primary 4');
  const [reqSubjects, setReqSubjects] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [reqRegion, setReqRegion] = useState<Region>('West');
  const [preferredMode, setPreferredMode] = useState<'In-Person (Home)' | 'In-Person (Community Club / Library)' | 'Online (Zoom)'>('In-Person (Community Club / Library)');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [urgent, setUrgent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (postType === 'charity') {
      onAddCharityOpp({
        id: `opp-${Date.now()}`,
        title: charityTitle,
        organisation,
        cause: charityCause,
        region: charityRegion,
        address,
        hoursReward: parseFloat(hoursReward) || 3,
        commitment: 'Flexible',
        slotsLeft: parseInt(slots) || 5,
        maxSlots: parseInt(slots) || 5,
        description: charityDesc,
        requirements: ['Age 14 and above', 'Punctual & enthusiastic'],
        contactEmail: charityEmail,
        contactPhone: charityPhone || '+65 6000 0000',
        dates,
        verifiedCharity: true,
      });
    } else if (postType === 'via') {
      onAddStudentProject({
        id: `via-${Date.now()}`,
        title: viaTitle,
        leadStudentName: leadName,
        school,
        cause: viaCause,
        region: viaRegion,
        description: viaDesc,
        targetGoal,
        hoursEstimate: parseFloat(viaHours) || 10,
        membersNeeded: parseInt(membersNeeded) || 4,
        currentMembers: 1,
        dateRange: viaDateRange,
        contactEmail: viaEmail,
        keyActivities: ['Community engagement', 'Volunteer coordination', 'Direct service'],
        status: 'Recruiting',
      });
    } else if (postType === 'tutor') {
      const subArray = tutorSubjects.split(',').map((s) => s.trim()).filter(Boolean);
      const areaArray = tutorAreas.split(',').map((a) => a.trim()).filter(Boolean);

      onAddTutor({
        id: `tutor-${Date.now()}`,
        tutorName,
        schoolGrade: tutorSchool,
        subjects: subArray.length > 0 ? subArray : ['Primary Math', 'Primary Science'],
        levels: ['Primary 1-6'],
        areas: areaArray.length > 0 ? areaArray : ['Tampines', 'Online'],
        region: tutorRegion,
        availability: tutorAvailability || 'Weekends',
        bio: tutorBio,
        contactEmail: tutorEmail,
        contactPhone: tutorPhone || '+65 9000 0000',
        hoursClocked: 0,
        status: 'Available',
      });
    } else if (postType === 'request') {
      const subArray = reqSubjects.split(',').map((s) => s.trim()).filter(Boolean);

      onAddTuitionRequest({
        id: `req-${Date.now()}`,
        childName,
        childAge: parseInt(childAge) || 9,
        primaryLevel,
        subjectsNeeded: subArray.length > 0 ? subArray : ['Primary Math'],
        neighborhood,
        region: reqRegion,
        preferredMode,
        urgent,
        guardianName,
        guardianPhone,
        guardianEmail,
        notes,
        datePosted: 'Just now',
        matchedStatus: 'Open',
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-700">
              Community Contribution
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 font-display">
              Post an Opportunity or Community Need
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-16 text-center space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-xl font-bold text-slate-900">Successfully Posted!</h4>
            <p className="text-xs text-slate-500">
              Your submission is live on the Singapore High School Volunteer platform.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-5 space-y-5 text-xs">
            {/* Category Selector Tabs */}
            <div>
              <label className="block font-bold text-slate-800 mb-2">
                What would you like to post?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPostType('charity')}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    postType === 'charity'
                      ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Building2 className="w-4 h-4 mb-1 text-amber-600" />
                  <span className="leading-tight">Charity Drive (NGO)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPostType('via')}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    postType === 'via'
                      ? 'border-rose-500 bg-rose-50 text-rose-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Sparkles className="w-4 h-4 mb-1 text-rose-600" />
                  <span className="leading-tight">Student VIA Initiative</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPostType('tutor')}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    postType === 'tutor'
                      ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 mb-1 text-orange-600" />
                  <span className="leading-tight">Offer Free Tuition</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPostType('request')}
                  className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    postType === 'request'
                      ? 'border-rose-500 bg-rose-50 text-rose-950 font-bold shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <Heart className="w-4 h-4 mb-1 text-rose-600" />
                  <span className="leading-tight">Request Free Tuition</span>
                </button>
              </div>
            </div>

            {/* FORM 1: Charity Opp */}
            {postType === 'charity' && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Volunteer Drive Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Community Bento Meal Prep & Packaging"
                    value={charityTitle}
                    onChange={(e) => setCharityTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Charity / NGO Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Willing Hearts Singapore"
                      value={organisation}
                      onChange={(e) => setOrganisation(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Singapore Region *
                    </label>
                    <select
                      value={charityRegion}
                      onChange={(e) => setCharityRegion(e.target.value as Region)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    >
                      <option value="Central">Central</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="North">North</option>
                      <option value="North-East">North-East</option>
                      <option value="Online">Online / Islandwide</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Cause
                    </label>
                    <select
                      value={charityCause}
                      onChange={(e) => setCharityCause(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    >
                      <option value="Food Rescue & Nutrition">Food Rescue</option>
                      <option value="Eldercare & Active Ageing">Eldercare</option>
                      <option value="Environmental & Clean-up">Environmental</option>
                      <option value="Special Needs & Disability">Special Needs</option>
                      <option value="Animal Welfare">Animal Welfare</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Hours Awarded *
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      required
                      placeholder="4"
                      value={hoursReward}
                      onChange={(e) => setHoursReward(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Volunteer Slots *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      placeholder="10"
                      value={slots}
                      onChange={(e) => setSlots(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Location Address in Singapore *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1 Lorong J Telok Kurau, Singapore 425792"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Dates & Shift Times *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Every Saturday, 8:30 AM - 12:30 PM"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Description & Duties *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="What will the high school volunteers do during this session?"
                    value={charityDesc}
                    onChange={(e) => setCharityDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Coordinator Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="volunteer@charity.org.sg"
                      value={charityEmail}
                      onChange={(e) => setCharityEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      placeholder="+65 6789 0123"
                      value={charityPhone}
                      onChange={(e) => setCharityPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FORM 2: Student VIA */}
            {postType === 'via' && (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Student VIA Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Project Tech Kakis: Coding for Kids in Jalan Kukoh"
                    value={viaTitle}
                    onChange={(e) => setViaTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Student Lead Name(s) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Denise Goh & Justin Koh"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      School / Institution *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Victoria JC (JC1) / Raffles Institution"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Region
                    </label>
                    <select
                      value={viaRegion}
                      onChange={(e) => setViaRegion(e.target.value as Region)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    >
                      <option value="Central">Central</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="North">North</option>
                      <option value="North-East">North-East</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Est. Total VIA Hours *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="16"
                      value={viaHours}
                      onChange={(e) => setViaHours(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Team Members Needed *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      placeholder="5"
                      value={membersNeeded}
                      onChange={(e) => setMembersNeeded(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Target Goal / Deliverable *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mentor 20 children and conduct 4 workshops during holidays"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Project Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Explain the background, beneficiary, and what fellow high school volunteers will do..."
                    value={viaDesc}
                    onChange={(e) => setViaDesc(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Lead Student Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student.leader@gmail.com"
                      value={viaEmail}
                      onChange={(e) => setViaEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Timeline / Date Range *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Term 4 School Holidays"
                      value={viaDateRange}
                      onChange={(e) => setViaDateRange(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FORM 3: Offer Free Tuition (Student Tutor) */}
            {postType === 'tutor' && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cheryl Tan"
                      value={tutorName}
                      onChange={(e) => setTutorName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Your School & Level *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. JC1 · Hwa Chong Institution"
                      value={tutorSchool}
                      onChange={(e) => setTutorSchool(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Subjects You Can Teach (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Primary 4-6 Mathematics, Primary 5 Science, English"
                    value={tutorSubjects}
                    onChange={(e) => setTutorSubjects(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Areas You Can Travel To (comma-separated) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tampines, Bedok, Pasir Ris, Online Zoom"
                      value={tutorAreas}
                      onChange={(e) => setTutorAreas(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Primary Region
                    </label>
                    <select
                      value={tutorRegion}
                      onChange={(e) => setTutorRegion(e.target.value as Region)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-orange-500"
                    >
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="Central">Central</option>
                      <option value="North">North</option>
                      <option value="North-East">North-East</option>
                      <option value="Online">Online</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Availability *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saturdays 10 AM - 1 PM, Friday evenings"
                    value={tutorAvailability}
                    onChange={(e) => setTutorAvailability(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Brief Bio / Tutoring Style *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Share your strengths, PSLE/O-level scores or passion for teaching young kids..."
                    value={tutorBio}
                    onChange={(e) => setTutorBio(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@gmail.com"
                      value={tutorEmail}
                      onChange={(e) => setTutorEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Contact Number (for parent coordination)
                    </label>
                    <input
                      type="text"
                      placeholder="+65 9123 4567"
                      value={tutorPhone}
                      onChange={(e) => setTutorPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FORM 4: Request Free Tuition (Kids 7-12) */}
            {postType === 'request' && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Child's Name / Nickname *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bryan / Lucas"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Child Age (7–12) *
                    </label>
                    <input
                      type="number"
                      min="7"
                      max="12"
                      required
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Primary Level *
                    </label>
                    <select
                      value={primaryLevel}
                      onChange={(e) => setPrimaryLevel(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    >
                      <option value="Primary 1">Primary 1</option>
                      <option value="Primary 2">Primary 2</option>
                      <option value="Primary 3">Primary 3</option>
                      <option value="Primary 4">Primary 4</option>
                      <option value="Primary 5">Primary 5</option>
                      <option value="Primary 6">Primary 6</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Subjects Requiring Help (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Primary 5 Mathematics (Word Problems), Primary 5 Science"
                    value={reqSubjects}
                    onChange={(e) => setReqSubjects(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Neighbourhood / Landmark in Singapore *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jurong West St 65 / Bishan Library"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Region *
                    </label>
                    <select
                      value={reqRegion}
                      onChange={(e) => setReqRegion(e.target.value as Region)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    >
                      <option value="Central">Central</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="North">North</option>
                      <option value="North-East">North-East</option>
                      <option value="Online">Online via Zoom</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Preferred Mode *
                    </label>
                    <select
                      value={preferredMode}
                      onChange={(e) => setPreferredMode(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    >
                      <option value="In-Person (Community Club / Library)">In-Person (Library or CC)</option>
                      <option value="In-Person (Home)">In-Person (Home)</option>
                      <option value="Online (Zoom)">Online (Zoom)</option>
                    </select>
                  </div>
                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={urgent}
                        onChange={(e) => setUrgent(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500"
                      />
                      <span className="font-semibold text-rose-700">Exam Prep / Urgent Request</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Specific Learning Difficulties or Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Needs help with fractions and model drawing heuristics. Very willing to learn."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mdm. Linda Tan"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Guardian Phone *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+65 9123 4567"
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Guardian Email
                    </label>
                    <input
                      type="email"
                      placeholder="guardian@gmail.com"
                      value={guardianEmail}
                      onChange={(e) => setGuardianEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-bold rounded-xl shadow-xs transition-all hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Submission</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
