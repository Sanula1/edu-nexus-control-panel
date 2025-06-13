
import React from 'react';
import { Sidebar } from '@/components/Layout/Sidebar';
import { Header } from '@/components/Layout/Header';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  title, 
  children, 
  showSidebar = true 
}) => {
  return (
    <div className="flex h-screen bg-background">
      {showSidebar && (
        <div className="w-64 flex-shrink-0">
          <Sidebar />
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <footer className="border-t border-border p-4 bg-card">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 EduPanel. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};
