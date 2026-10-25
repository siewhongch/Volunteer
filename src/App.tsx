/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OpportunitiesSection } from './components/OpportunitiesSection';
import { StudentVIASection } from './components/StudentVIASection';
import { FreeTuitionSection } from './components/FreeTuitionSection';
import { HoursTrackerSection } from './components/HoursTrackerSection';
import { GuidelinesSection } from './components/GuidelinesSection';
import { Footer } from './components/Footer';
import { PostModal } from './components/PostModal';
import { 
  SignUpModal, 
  JoinVIAModal, 
  ContactTutorModal, 
  HelpKidModal 
} from './components/ActionModals';
import { 
  INITIAL_CHARITY_OPPORTUNITIES, 
  INITIAL_STUDENT_VIA_PROJECTS, 
  INITIAL_TUITION_TUTORS, 
  INITIAL_TUITION_REQUESTS, 
  INITIAL_HOUR_LOGS 
} from './data/initialData';
import { 
  CharityOpportunity, 
  StudentVIAProject, 
  TuitionTutor, 
  TuitionRequest, 
  VolunteerHourLog, 
  Region 
} from './types';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

export default function App() {
  // Persistence state
  const [opportunities, setOpportunities] = useState<CharityOpportunity[]>(() => {
    const saved = localStorage.getItem('hsv_opportunities');
    return saved ? JSON.parse(saved) : INITIAL_CHARITY_OPPORTUNITIES;
  });

  const [projects, setProjects] = useState<StudentVIAProject[]>(() => {
    const saved = localStorage.getItem('hsv_projects');
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_VIA_PROJECTS;
  });

  const [tutors, setTutors] = useState<TuitionTutor[]>(() => {
    const saved = localStorage.getItem('hsv_tutors');
    return saved ? JSON.parse(saved) : INITIAL_TUITION_TUTORS;
  });

  const [requests, setRequests] = useState<TuitionRequest[]>(() => {
    const saved = localStorage.getItem('hsv_requests');
    return saved ? JSON.parse(saved) : INITIAL_TUITION_REQUESTS;
  });

  const [logs, setLogs] = useState<VolunteerHourLog[]>(() => {
    const saved = localStorage.getItem('hsv_logs');
    return saved ? JSON.parse(saved) : INITIAL_HOUR_LOGS;
  });

  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('hsv_student_name') || 'Cheryl Lim (Sec 4 / JC1)';
  });

  const [targetHours, setTargetHours] = useState<number>(() => {
    const saved = localStorage.getItem('hsv_target_hours');
    return saved ? parseInt(saved) : 30;
  });

  // UI state
  const [activeTab, setActiveTab] = useState<string>('opportunities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('All');

  // Modals state
  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [postModalType, setPostModalType] = useState<'charity' | 'via' | 'tutor' | 'request'>('charity');

  const [selectedOppForSignUp, setSelectedOppForSignUp] = useState<CharityOpportunity | null>(null);
  const [selectedProjectForJoin, setSelectedProjectForJoin] = useState<StudentVIAProject | null>(null);
  const [selectedTutorForContact, setSelectedTutorForContact] = useState<TuitionTutor | null>(null);
  const [selectedRequestForHelp, setSelectedRequestForHelp] = useState<TuitionRequest | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('hsv_opportunities', JSON.stringify(opportunities));
  }, [opportunities]);

  useEffect(() => {
    localStorage.setItem('hsv_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('hsv_tutors', JSON.stringify(tutors));
  }, [tutors]);

  useEffect(() => {
    localStorage.setItem('hsv_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('hsv_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('hsv_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('hsv_target_hours', targetHours.toString());
  }, [targetHours]);

  // Total Hours calculation
  const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);

  // Handlers
  const handleAddCharityOpp = (newOpp: CharityOpportunity) => {
    setOpportunities([newOpp, ...opportunities]);
    showToast(`New charity opportunity "${newOpp.title}" has been published!`);
  };

  const handleAddStudentProject = (newProj: StudentVIAProject) => {
    setProjects([newProj, ...projects]);
    showToast(`Student VIA project "${newProj.title}" posted successfully!`);
  };

  const handleAddTutor = (newTutor: TuitionTutor) => {
    setTutors([newTutor, ...tutors]);
    showToast(`You are now registered as a student tutor for Primary kids!`);
  };

  const handleAddTuitionRequest = (newReq: TuitionRequest) => {
    setRequests([newReq, ...requests]);
    showToast(`Tuition request for ${newReq.childName} has been posted!`);
  };

  const handleAddLog = (newLog: Omit<VolunteerHourLog, 'id'>) => {
    const logItem: VolunteerHourLog = {
      ...newLog,
      id: `log-${Date.now()}`,
    };
    setLogs([logItem, ...logs]);
    showToast(`Logged ${logItem.hours} hours for "${logItem.activityTitle}"!`);
  };

  // Sign up for charity shift
  const handleConfirmSignUp = (
    opp: CharityOpportunity,
    studentData: { name: string; school: string; email: string; phone: string; autoAddHourLog: boolean }
  ) => {
    // Decrease slots
    setOpportunities(
      opportunities.map((o) =>
        o.id === opp.id ? { ...o, slotsLeft: Math.max(0, o.slotsLeft - 1) } : o
      )
    );

    if (studentData.autoAddHourLog) {
      const newLogItem: VolunteerHourLog = {
        id: `log-${Date.now()}`,
        studentName: studentData.name || studentName,
        activityTitle: `Registered Shift: ${opp.title}`,
        organizationOrProject: opp.organisation,
        date: new Date().toISOString().split('T')[0],
        hours: opp.hoursReward,
        category: opp.cause,
        supervisorName: opp.organisation,
        supervisorContact: opp.contactEmail,
        reflections: `Registered to serve with ${opp.organisation}. Scheduled shift in ${opp.region} region.`,
        status: 'Pending Verification',
      };
      setLogs([newLogItem, ...logs]);
    }

    showToast(`Signed up successfully for ${opp.title}!`);
  };

  // Join VIA project
  const handleConfirmJoinVIA = (project: StudentVIAProject, applicantName: string) => {
    setProjects(
      projects.map((p) =>
        p.id === project.id ? { ...p, currentMembers: p.currentMembers + 1 } : p
      )
    );
    showToast(`Application sent to ${project.leadStudentName}!`);
  };

  // Help a kid with tuition
  const handleConfirmHelpKid = (request: TuitionRequest, studentTutor: string) => {
    showToast(`Your offer to tutor ${request.childName} was delivered to ${request.guardianName}!`);
  };

  // Open post modal with specific type
  const openPostModalWithType = (type: 'charity' | 'via' | 'tutor' | 'request') => {
    setPostModalType(type);
    setIsPostModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfe] text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPostModal={() => openPostModalWithType('charity')}
        totalHours={totalHours}
      />

      {/* Hero */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        onExploreClick={(tabId) => {
          setActiveTab(tabId);
          document.getElementById(tabId)?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPostModal={() => openPostModalWithType('charity')}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Charity & NGO Opportunities */}
        <OpportunitiesSection
          opportunities={opportunities}
          selectedRegion={selectedRegion}
          searchQuery={searchQuery}
          onSignUp={(opp) => setSelectedOppForSignUp(opp)}
          onOpenPostModal={() => openPostModalWithType('charity')}
        />

        {/* Section 2: Dedicated Free Tuition for Kids (7 - 12) */}
        <FreeTuitionSection
          tutors={tutors}
          requests={requests}
          selectedRegion={selectedRegion}
          searchQuery={searchQuery}
          onOpenOfferModal={() => openPostModalWithType('tutor')}
          onOpenRequestModal={() => openPostModalWithType('request')}
          onContactTutor={(tutor) => setSelectedTutorForContact(tutor)}
          onHelpKid={(request) => setSelectedRequestForHelp(request)}
        />

        {/* Section 3: Student-Led VIA Projects */}
        <StudentVIASection
          projects={projects}
          selectedRegion={selectedRegion}
          searchQuery={searchQuery}
          onJoinProject={(proj) => setSelectedProjectForJoin(proj)}
          onOpenPostModal={() => openPostModalWithType('via')}
        />

        {/* Section 4: Volunteer Hours & VIA Tracker */}
        <HoursTrackerSection
          logs={logs}
          onAddLog={handleAddLog}
          targetHours={targetHours}
          setTargetHours={setTargetHours}
          studentName={studentName}
          setStudentName={setStudentName}
        />

        {/* Section 5: MOE VIA Guidelines & Student Safety */}
        <GuidelinesSection />
      </main>

      {/* Footer */}
      <Footer
        onNavClick={(tabId) => {
          setActiveTab(tabId);
          document.getElementById(tabId)?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* MODALS */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onAddCharityOpp={handleAddCharityOpp}
        onAddStudentProject={handleAddStudentProject}
        onAddTutor={handleAddTutor}
        onAddTuitionRequest={handleAddTuitionRequest}
        initialType={postModalType}
      />

      <SignUpModal
        opportunity={selectedOppForSignUp}
        onClose={() => setSelectedOppForSignUp(null)}
        onConfirmSignUp={handleConfirmSignUp}
      />

      <JoinVIAModal
        project={selectedProjectForJoin}
        onClose={() => setSelectedProjectForJoin(null)}
        onConfirmJoin={handleConfirmJoinVIA}
      />

      <ContactTutorModal
        tutor={selectedTutorForContact}
        onClose={() => setSelectedTutorForContact(null)}
      />

      <HelpKidModal
        request={selectedRequestForHelp}
        onClose={() => setSelectedRequestForHelp(null)}
        onConfirmHelp={handleConfirmHelpKid}
      />
    </div>
  );
}
