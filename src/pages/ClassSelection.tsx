
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockClasses, mockInstitutes } from '@/services/mockData';
import { BookOpen, Users, GraduationCap, Clock, User } from 'lucide-react';
import { PageLayout } from '@/components/Layout/PageLayout';

export const ClassSelection: React.FC = () => {
  const { user, selectedInstitute, setSelectedClass } = useAuth();
  const navigate = useNavigate();

  const selectedInstituteData = mockInstitutes.find(inst => inst.id === selectedInstitute);
  const instituteClasses = mockClasses.filter(cls => 
    cls.instituteId === selectedInstitute && 
    (user?.classes.includes(cls.id) || user?.role === 'super_admin' || user?.role === 'institute_admin')
  );

  const handleSelectClass = (classId: string) => {
    setSelectedClass(classId);
    navigate('/dashboard');
  };

  const handleBackToInstitutes = () => {
    navigate('/institutes');
  };

  return (
    <PageLayout title="Select Class" showSidebar={false}>
      <div className="min-h-full bg-gradient-to-br from-green-50 to-blue-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Button variant="outline" onClick={handleBackToInstitutes} className="mb-4">
                ← Back to Institutes
              </Button>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {selectedInstituteData?.name}
              </h1>
              <p className="text-muted-foreground">Select a class to access your dashboard</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="capitalize">
                {user?.role.replace('_', ' ')}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instituteClasses.map((classItem) => (
              <Card 
                key={classItem.id} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/20"
                onClick={() => handleSelectClass(classItem.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-8 h-8 text-green-600" />
                    </div>
                    <Badge 
                      variant={classItem.status === 'active' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {classItem.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {classItem.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Grade {classItem.grade}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      <span>{classItem.subject}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-green-600" />
                      <span>{classItem.studentCount} Students</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <User className="w-4 h-4 text-green-600" />
                      <span>Mr. John Smith</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">8</p>
                        <p className="text-xs text-muted-foreground">Exams</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">95%</p>
                        <p className="text-xs text-muted-foreground">Attendance</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Enter Class
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {instituteClasses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Classes Found</h3>
              <p className="text-muted-foreground">You are not enrolled in any classes yet.</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
