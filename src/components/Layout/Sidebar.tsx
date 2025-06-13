
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Calendar, 
  BarChart3,
  Building,
  Settings,
  LogOut
} from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['super_admin', 'institute_admin', 'teacher', 'student', 'parent'] },
  { name: 'Institutes', href: '/institutes-manage', icon: Building, roles: ['super_admin', 'institute_admin'] },
  { name: 'Classes', href: '/classes-manage', icon: BookOpen, roles: ['super_admin', 'institute_admin', 'teacher'] },
  { name: 'Students', href: '/students', icon: GraduationCap, roles: ['super_admin', 'institute_admin', 'teacher', 'parent'] },
  { name: 'Teachers', href: '/teachers', icon: Users, roles: ['super_admin', 'institute_admin'] },
  { name: 'Exams', href: '/exams', icon: FileText, roles: ['super_admin', 'institute_admin', 'teacher', 'student', 'parent'] },
  { name: 'Results', href: '/results', icon: BarChart3, roles: ['super_admin', 'institute_admin', 'teacher', 'student', 'parent'] },
  { name: 'Attendance', href: '/attendance', icon: Calendar, roles: ['super_admin', 'institute_admin', 'teacher', 'attendance_marker', 'student', 'parent'] },
  { name: 'Role Management', href: '/roles', icon: Settings, roles: ['super_admin'] },
  { name: 'Profile', href: '/profile', icon: Settings, roles: ['super_admin', 'institute_admin', 'teacher', 'attendance_marker', 'student', 'parent'] },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const filteredNavigation = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">EduPanel</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {filteredNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">
              {user?.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role.replace('_', ' ')}
            </p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};
