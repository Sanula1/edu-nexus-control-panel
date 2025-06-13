
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutes: string[];
  classes: string[];
  phone?: string;
  nic?: string;
  gender?: 'Male' | 'Female';
  dob?: string;
  address?: string;
  town?: string;
  city?: string;
  province?: string;
}

export type UserRole = 
  | 'super_admin' 
  | 'institute_admin' 
  | 'teacher' 
  | 'attendance_marker' 
  | 'student' 
  | 'parent';

export interface Institute {
  id: string;
  name: string;
  location: string;
  type: 'school' | 'college' | 'university' | 'training_center';
  availability: 'active' | 'inactive' | 'suspended';
  businessRegId: string;
  createdAt: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  subject: string;
  instituteId: string;
  teacherId: string;
  studentCount: number;
  status: 'active' | 'inactive' | 'completed';
  capacity?: number;
  schedule?: string;
  description?: string;
}

export interface Student {
  id: string;
  name: string;
  nic: string;
  gPhone: string;
  fPhone?: string;
  mPhone?: string;
  phone?: string;
  gender: 'Male' | 'Female';
  email?: string;
  dob?: string;
  birthCertificateId?: string;
  fatherName?: string;
  motherName?: string;
  guardianName?: string;
  guardianPhone?: string;
  emergencyContact?: string;
  fatherJob?: string;
  motherJob?: string;
  address?: string;
  town?: string;
  city?: string;
  province?: string;
  instituteId?: string;
  classId?: string;
}

export interface Teacher {
  id: string;
  name: string;
  nic: string;
  phone: string;
  email?: string;
  dob?: string;
  gender?: 'Male' | 'Female';
  address?: string;
  town?: string;
  city?: string;
  province?: string;
  instituteId?: string;
  subjects: string[];
  qualification?: string;
  experience?: string;
}

export interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  classId: string;
  instituteId: string;
  resultStatus: 'Pending' | 'Published' | 'Draft';
  totalMarks: number;
}

export interface Result {
  id: string;
  studentId: string;
  classId: string;
  subject: string;
  examId: string;
  marks: number;
  grade: string;
  status: 'Pass' | 'Fail' | 'Pending';
}

export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  instituteId: string;
}

export interface Permission {
  module: string;
  actions: ('view' | 'create' | 'edit' | 'delete')[];
}

export interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
}
