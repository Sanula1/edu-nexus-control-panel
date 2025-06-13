
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';

export const Header: React.FC<{ title: string }> = ({ title }) => {
  const { user, selectedInstitute, selectedClass } = useAuth();

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {(selectedInstitute || selectedClass) && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              {selectedInstitute && <span>Institute: Springfield High School</span>}
              {selectedClass && <span>• Class: Mathematics Grade 10</span>}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
