
import React, { useState } from 'react';
import { PageLayout } from '@/components/Layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockInstitutes, mockClasses } from '@/services/mockData';
import { DataTable } from '@/components/UI/DataTable';
import { Users, BookOpen, GraduationCap, BarChart3, Calendar, Building, Edit, MapPin, Phone, Mail } from 'lucide-react';

const statsData = [
  { title: 'Total Students', value: '1,234', icon: GraduationCap, change: '+12%' },
  { title: 'Active Classes', value: '45', icon: BookOpen, change: '+3%' },
  { title: 'Teachers', value: '67', icon: Users, change: '+5%' },
  { title: 'Attendance Rate', value: '94.5%', icon: Calendar, change: '+2.1%' },
];

const classColumns = [
  { key: 'name', label: 'Class Name', sortable: true },
  { key: 'grade', label: 'Grade', sortable: true },
  { key: 'subject', label: 'Subject', sortable: true },
  { key: 'studentCount', label: 'Students', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const Dashboard: React.FC = () => {
  const { user, selectedInstitute, selectedClass, hasPermission } = useAuth();
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedInstituteData = mockInstitutes.find(inst => inst.id === selectedInstitute);
  const selectedClassData = mockClasses.find(cls => cls.id === selectedClass);

  const canEditInstitute = hasPermission('institutes', 'edit');
  const canEditClass = hasPermission('classes', 'edit');

  const handleLoadClassData = () => {
    setLoading(true);
    setTimeout(() => {
      const instituteClasses = mockClasses.filter(cls => cls.instituteId === selectedInstitute);
      setClasses(instituteClasses);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    console.log('Searching classes:', query);
  };

  const handleCreateClass = () => {
    console.log('Create new class');
  };

  const handleEditClass = (classItem: any) => {
    console.log('Edit class:', classItem);
  };

  const handleDeleteClass = (classItem: any) => {
    console.log('Delete class:', classItem);
  };

  return (
    <PageLayout title="Dashboard">
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 font-medium">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="institute">Institute Details</TabsTrigger>
            <TabsTrigger value="classes">Class Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New student enrolled</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Exam results published</p>
                        <p className="text-xs text-muted-foreground">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Class schedule updated</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-xl text-left transition-colors">
                      <GraduationCap className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm font-medium">Add Student</p>
                    </button>
                    <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-xl text-left transition-colors">
                      <BookOpen className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm font-medium">Create Class</p>
                    </button>
                    <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-xl text-left transition-colors">
                      <Calendar className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm font-medium">Mark Attendance</p>
                    </button>
                    <button className="p-4 bg-primary/10 hover:bg-primary/20 rounded-xl text-left transition-colors">
                      <BarChart3 className="w-6 h-6 text-primary mb-2" />
                      <p className="text-sm font-medium">View Reports</p>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="institute" className="space-y-6">
            {selectedInstituteData && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Building className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{selectedInstituteData.name}</CardTitle>
                      <Badge variant={selectedInstituteData.availability === 'active' ? 'default' : 'destructive'}>
                        {selectedInstituteData.availability}
                      </Badge>
                    </div>
                  </div>
                  {canEditInstitute && (
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Institute
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Basic Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{selectedInstituteData.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Building className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Type</p>
                            <p className="font-medium">{selectedInstituteData.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Established</p>
                            <p className="font-medium">{new Date(selectedInstituteData.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Statistics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <p className="text-2xl font-bold text-primary">45</p>
                          <p className="text-sm text-muted-foreground">Total Classes</p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <p className="text-2xl font-bold text-primary">1,234</p>
                          <p className="text-sm text-muted-foreground">Total Students</p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <p className="text-2xl font-bold text-primary">67</p>
                          <p className="text-sm text-muted-foreground">Teachers</p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <p className="text-2xl font-bold text-primary">94.5%</p>
                          <p className="text-sm text-muted-foreground">Avg Attendance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <DataTable
              title="Class Management"
              columns={classColumns}
              data={classes}
              loading={loading}
              onLoadData={handleLoadClassData}
              onSearch={handleSearch}
              onCreate={canEditClass ? handleCreateClass : undefined}
              onEdit={canEditClass ? handleEditClass : undefined}
              onDelete={canEditClass ? handleDeleteClass : undefined}
              module="classes"
            />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};
