
import React, { useState } from 'react';
import { PageLayout } from '@/components/Layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { User, Edit, Save, X, Mail, Phone, MapPin, Calendar, Building, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+94771234567',
    address: '123 Main Street, Colombo',
    bio: 'Experienced educator with 10+ years in mathematics and science teaching.',
    nic: '199012345678',
    dob: '1990-05-15',
    gender: 'Male'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically call an API to update the profile
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+94771234567',
      address: '123 Main Street, Colombo',
      bio: 'Experienced educator with 10+ years in mathematics and science teaching.',
      nic: '199012345678',
      dob: '1990-05-15',
      gender: 'Male'
    });
    setIsEditing(false);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          {isEditing ? (
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          ) : (
            <p className="text-sm p-2 bg-muted/50 rounded">{formData.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          {isEditing ? (
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          ) : (
            <p className="text-sm p-2 bg-muted/50 rounded">{formData.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          {isEditing ? (
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          ) : (
            <p className="text-sm p-2 bg-muted/50 rounded">{formData.phone}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="nic">NIC Number</Label>
          {isEditing ? (
            <Input
              id="nic"
              value={formData.nic}
              onChange={(e) => handleInputChange('nic', e.target.value)}
            />
          ) : (
            <p className="text-sm p-2 bg-muted/50 rounded">{formData.nic}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          {isEditing ? (
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
            />
          ) : (
            <p className="text-sm p-2 bg-muted/50 rounded">{new Date(formData.dob).toLocaleDateString()}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          {isEditing ? (
            <Input
              id="gender"
              value={formData.gender}
              onChange={(e) => handleInputChange('gender', e.target.value)}
            />
          ) : (
            <p className="text-sm p-2 bg-muted/50 rounded">{formData.gender}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        {isEditing ? (
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        ) : (
          <p className="text-sm p-2 bg-muted/50 rounded">{formData.address}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        {isEditing ? (
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
          />
        ) : (
          <p className="text-sm p-2 bg-muted/50 rounded">{formData.bio}</p>
        )}
      </div>
    </div>
  );

  return (
    <PageLayout title="Profile">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">{user?.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="capitalize">
                      {user?.role.replace('_', ' ')}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {user?.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="academic">Academic Info</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                {renderPersonalInfo()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Institutes</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <Building className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Springfield High School</p>
                            <p className="text-sm text-muted-foreground">Primary Institute</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold">Classes</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Mathematics Grade 10</p>
                            <p className="text-sm text-muted-foreground">45 Students</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">Physics Grade 11</p>
                            <p className="text-sm text-muted-foreground">38 Students</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Security</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Enable Two-Factor Authentication
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>SMS Notifications</span>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};
