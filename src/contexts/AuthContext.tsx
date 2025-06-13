
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  selectedInstitute: string | null;
  selectedClass: string | null;
  setSelectedInstitute: (id: string | null) => void;
  setSelectedClass: (id: string | null) => void;
  hasPermission: (module: string, action: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'super@admin.com',
    role: 'super_admin',
    institutes: ['1', '2'],
    classes: []
  },
  {
    id: '2',
    name: 'Institute Admin',
    email: 'admin@institute.com',
    role: 'institute_admin',
    institutes: ['1'],
    classes: []
  },
  {
    id: '3',
    name: 'John Teacher',
    email: 'teacher@school.com',
    role: 'teacher',
    institutes: ['1'],
    classes: ['1', '2']
  },
  {
    id: '4',
    name: 'Jane Student',
    email: 'student@school.com',
    role: 'student',
    institutes: ['1'],
    classes: ['1']
  },
  {
    id: '5',
    name: 'Mary Parent',
    email: 'parent@school.com',
    role: 'parent',
    institutes: ['1'],
    classes: []
  }
];

const rolePermissions = {
  super_admin: {
    institutes: ['view', 'create', 'edit', 'delete'],
    users: ['view', 'create', 'edit', 'delete'],
    classes: ['view', 'create', 'edit', 'delete'],
    students: ['view', 'create', 'edit', 'delete'],
    teachers: ['view', 'create', 'edit', 'delete'],
    exams: ['view', 'create', 'edit', 'delete'],
    results: ['view', 'create', 'edit', 'delete'],
    attendance: ['view', 'create', 'edit', 'delete'],
    roles: ['view', 'create', 'edit', 'delete']
  },
  institute_admin: {
    institutes: ['view', 'edit'],
    users: ['view', 'create', 'edit'],
    classes: ['view', 'create', 'edit', 'delete'],
    students: ['view', 'create', 'edit', 'delete'],
    teachers: ['view', 'create', 'edit'],
    exams: ['view', 'create', 'edit', 'delete'],
    results: ['view', 'create', 'edit'],
    attendance: ['view', 'edit']
  },
  teacher: {
    classes: ['view'],
    students: ['view'],
    exams: ['view', 'create', 'edit'],
    results: ['view', 'create', 'edit'],
    attendance: ['view', 'create', 'edit']
  },
  attendance_marker: {
    attendance: ['view', 'create', 'edit']
  },
  student: {
    classes: ['view'],
    exams: ['view'],
    results: ['view'],
    attendance: ['view']
  },
  parent: {
    students: ['view'],
    exams: ['view'],
    results: ['view'],
    attendance: ['view'],
    profile: ['view', 'edit']
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedInstitute, setSelectedInstitute] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setSelectedInstitute(null);
    setSelectedClass(null);
    localStorage.removeItem('user');
  };

  const hasPermission = (module: string, action: string): boolean => {
    if (!user) return false;
    const permissions = rolePermissions[user.role as keyof typeof rolePermissions];
    return permissions[module as keyof typeof permissions]?.includes(action as any) || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      selectedInstitute,
      selectedClass,
      setSelectedInstitute,
      setSelectedClass,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
