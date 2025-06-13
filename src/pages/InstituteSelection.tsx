
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockInstitutes } from '@/services/mockData';
import { Building, MapPin, Users, Calendar, Phone, Mail } from 'lucide-react';
import { PageLayout } from '@/components/Layout/PageLayout';

export const InstituteSelection: React.FC = () => {
  const { user, setSelectedInstitute } = useAuth();
  const navigate = useNavigate();

  const userInstitutes = mockInstitutes.filter(institute => 
    user?.institutes.includes(institute.id)
  );

  const handleSelectInstitute = (instituteId: string) => {
    setSelectedInstitute(instituteId);
    navigate('/classes');
  };

  return (
    <PageLayout title="Select Institute" showSidebar={false}>
      <div className="min-h-full bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user?.name}</h1>
            <p className="text-muted-foreground">Select an institute to continue to your dashboard</p>
            <Badge variant="secondary" className="mt-2 capitalize">
              {user?.role.replace('_', ' ')}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userInstitutes.map((institute) => (
              <Card 
                key={institute.id} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/20"
                onClick={() => handleSelectInstitute(institute.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Building className="w-8 h-8 text-primary" />
                    </div>
                    <Badge 
                      variant={institute.availability === 'active' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {institute.availability}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {institute.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{institute.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium">{institute.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>Established {new Date(institute.createdAt).getFullYear()}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">45</p>
                        <p className="text-xs text-muted-foreground">Classes</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">1,234</p>
                        <p className="text-xs text-muted-foreground">Students</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-primary/90 transition-colors">
                    <Building className="w-4 h-4 mr-2" />
                    Enter Institute
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {userInstitutes.length === 0 && (
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Institutes Found</h3>
              <p className="text-muted-foreground">You are not enrolled in any institutes yet.</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
