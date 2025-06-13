import { Institute, Class, Student, Teacher, Exam, Result, Attendance } from '@/types';

export const mockInstitutes: Institute[] = [
  {
    id: '1',
    name: 'Springfield High School',
    location: 'Springfield, IL',
    type: 'school',
    availability: 'active',
    businessRegId: 'BRN123456',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Tech Institute of Excellence',
    location: 'Chicago, IL',
    type: 'training_center',
    availability: 'active',
    businessRegId: 'BRN789012',
    createdAt: '2024-01-15'
  }
];

export const mockClasses: Class[] = [
  {
    id: '1',
    name: 'Mathematics Grade 10',
    grade: '10',
    subject: 'Mathematics',
    instituteId: '1',
    teacherId: '3',
    studentCount: 25,
    status: 'active'
  },
  {
    id: '2',
    name: 'Physics Grade 11',
    grade: '11',
    subject: 'Physics',
    instituteId: '1',
    teacherId: '3',
    studentCount: 20,
    status: 'active'
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    nic: '200012345678',
    gPhone: '+1234567890',
    fPhone: '+1234567891',
    mPhone: '+1234567892',
    gender: 'Female',
    email: 'alice@student.com',
    dob: '2005-03-15',
    birthCertificateId: 'BC123456',
    fatherName: 'Robert Johnson',
    motherName: 'Mary Johnson',
    guardianName: 'Robert Johnson',
    fatherJob: 'Engineer',
    motherJob: 'Teacher',
    address: '123 Main St',
    town: 'Springfield',
    city: 'Springfield',
    province: 'Illinois',
    instituteId: '1',
    classId: '1'
  }
];

export const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'John Smith',
    nic: '199012345678',
    phone: '+94771234567',
    email: 'john.smith@school.com',
    dob: '1990-05-15',
    gender: 'Male',
    address: '123 Main Street',
    town: 'Colombo',
    city: 'Colombo',
    province: 'Western',
    subjects: ['Mathematics', 'Physics'],
    instituteId: '1'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    nic: '198509876543',
    phone: '+94777654321',
    email: 'sarah.johnson@school.com',
    dob: '1985-08-22',
    gender: 'Female',
    address: '456 Oak Avenue',
    town: 'Kandy',
    city: 'Kandy',
    province: 'Central',
    subjects: ['English', 'Literature'],
    instituteId: '1'
  }
];

export const mockExams: Exam[] = [
  {
    id: '1',
    name: 'Mid-term Mathematics',
    subject: 'Mathematics',
    date: '2024-07-15',
    classId: '1',
    instituteId: '1',
    resultStatus: 'Published',
    totalMarks: 100
  }
];

export const mockResults: Result[] = [
  {
    id: '1',
    studentId: '1',
    classId: '1',
    subject: 'Mathematics',
    examId: '1',
    marks: 85,
    grade: 'A',
    status: 'Pass'
  }
];

export const mockAttendance: Attendance[] = [
  {
    id: '1',
    studentId: '1',
    classId: '1',
    date: '2024-06-13',
    status: 'Present',
    instituteId: '1'
  }
];
