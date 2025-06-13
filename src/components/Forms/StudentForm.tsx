
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Student } from '@/types';
import { mockClasses } from '@/services/mockData';

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Student>) => void;
  student?: Student;
  mode: 'create' | 'edit';
}

export const StudentForm: React.FC<StudentFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  student,
  mode
}) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: student || {
      name: '',
      nic: '',
      email: '',
      phone: '',
      gPhone: '',
      gender: 'Male' as const,
      dob: '',
      address: '',
      city: '',
      classId: '',
      guardianName: '',
      guardianPhone: '',
      emergencyContact: ''
    }
  });

  React.useEffect(() => {
    if (student) {
      Object.keys(student).forEach(key => {
        setValue(key as keyof Student, student[key as keyof Student]);
      });
    } else {
      reset({
        name: '',
        nic: '',
        email: '',
        phone: '',
        gPhone: '',
        gender: 'Male' as const,
        dob: '',
        address: '',
        city: '',
        classId: '',
        guardianName: '',
        guardianPhone: '',
        emergencyContact: ''
      });
    }
  }, [student, setValue, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Student' : 'Edit Student'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register('name', { required: 'Full name is required' })}
                className="w-full"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nic">NIC/ID Number *</Label>
              <Input
                id="nic"
                {...register('nic', { required: 'NIC is required' })}
                className="w-full"
              />
              {errors.nic && <p className="text-sm text-destructive">{errors.nic.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register('phone')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gPhone">Guardian Phone *</Label>
              <Input
                id="gPhone"
                {...register('gPhone', { required: 'Guardian phone is required' })}
                className="w-full"
              />
              {errors.gPhone && <p className="text-sm text-destructive">{errors.gPhone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select onValueChange={(value: 'Male' | 'Female') => setValue('gender', value)} value={watch('gender')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                {...register('dob')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                {...register('city')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="classId">Class</Label>
              <Select onValueChange={(value) => setValue('classId', value)} value={watch('classId')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {mockClasses.map((classItem) => (
                    <SelectItem key={classItem.id} value={classItem.id}>
                      {classItem.name} - {classItem.grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guardianName">Guardian Name</Label>
              <Input
                id="guardianName"
                {...register('guardianName')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="guardianPhone">Guardian Phone</Label>
              <Input
                id="guardianPhone"
                {...register('guardianPhone')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                {...register('emergencyContact')}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              {...register('address')}
              className="w-full min-h-[80px]"
              placeholder="Enter full address..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {mode === 'create' ? 'Add Student' : 'Update Student'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
