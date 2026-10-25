export type Region = 'All' | 'Central' | 'East' | 'West' | 'North' | 'North-East' | 'Online';

export type CauseCategory = 
  | 'All'
  | 'Free Tuition & Mentorship'
  | 'Eldercare & Active Ageing'
  | 'Food Rescue & Nutrition'
  | 'Special Needs & Disability'
  | 'Environmental & Clean-up'
  | 'Animal Welfare';

export interface CharityOpportunity {
  id: string;
  title: string;
  organisation: string;
  cause: string;
  region: Region;
  address: string;
  hoursReward: number;
  commitment: 'One-time' | 'Weekly' | 'Bi-weekly' | 'Flexible';
  slotsLeft: number;
  maxSlots: number;
  description: string;
  requirements: string[];
  contactEmail: string;
  contactPhone: string;
  dates: string;
  imageUrl?: string;
  verifiedCharity: boolean;
}

export interface StudentVIAProject {
  id: string;
  title: string;
  leadStudentName: string;
  school: string;
  cause: string;
  region: Region;
  description: string;
  targetGoal: string;
  hoursEstimate: number;
  membersNeeded: number;
  currentMembers: number;
  dateRange: string;
  contactEmail: string;
  contactPhone?: string;
  keyActivities: string[];
  status: 'Recruiting' | 'Active' | 'Completed';
  imageUrl?: string;
}

export interface TuitionTutor {
  id: string;
  tutorName: string;
  schoolGrade: string;
  subjects: string[];
  levels: string[]; // e.g. "Primary 1-3", "Primary 4-6"
  areas: string[]; // e.g. ["Tampines & Bedok", "Online"]
  region: Region;
  availability: string;
  bio: string;
  contactEmail: string;
  contactPhone: string;
  hoursClocked: number;
  status: 'Available' | 'Fully Booked';
}

export interface TuitionRequest {
  id: string;
  childName: string;
  childAge: number; // 7 - 12
  primaryLevel: 'Primary 1' | 'Primary 2' | 'Primary 3' | 'Primary 4' | 'Primary 5' | 'Primary 6';
  subjectsNeeded: string[];
  neighborhood: string;
  region: Region;
  preferredMode: 'In-Person (Home)' | 'In-Person (Community Club / Library)' | 'Online (Zoom)';
  urgent: boolean;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  notes: string;
  datePosted: string;
  matchedStatus: 'Open' | 'Matched';
}

export interface VolunteerHourLog {
  id: string;
  studentName: string;
  activityTitle: string;
  organizationOrProject: string;
  date: string;
  hours: number;
  category: string;
  supervisorName: string;
  supervisorContact: string;
  reflections: string;
  status: 'Verified' | 'Pending Verification';
}
