
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Teacher } from '@/types';
import { mockInstitutes } from '@/services/mockData';

interface TeacherFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Teacher>) => void;
  teacher?: Teacher;
  mode: 'create' | 'edit';
}

const subjects = [
  'Mathematics', 'Science', 'English', 'History', 'Geography', 
  'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art'
];

export const TeacherForm: React.FC<TeacherFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  teacher,
  mode
}) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: teacher || {
      name: '',
      nic: '',
      email: '',
      phone: '',
      gender: 'Male' as const,
      dob: '',
      address: '',
      city: '',
      province: '',
      town: '',
      instituteId: '',
      subjects: [],
      qualification: '',
      experience: ''
    }
  });

  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>(
    teacher?.subjects || []
  );

  React.useEffect(() => {
    if (teacher) {
      Object.keys(teacher).forEach(key => {
        setValue(key as keyof Teacher, teacher[key as keyof Teacher]);
      });
      setSelectedSubjects(teacher.subjects || []);
    } else {
      reset({
        name: '',
        nic: '',
        email: '',
        phone: '',
        gender: 'Male' as const,
        dob: '',
        address: '',
        city: '',
        province: '',
        town: '',
        instituteId: '',
        subjects: [],
        qualification: '',
        experience: ''
      });
      setSelectedSubjects([]);
    }
  }, [teacher, setValue, reset]);

  const handleSubjectChange = (subject: string, checked: boolean) => {
    let newSubjects;
    if (checked) {
      newSubjects = [...selectedSubjects, subject];
    } else {
      newSubjects = selectedSubjects.filter(s => s !== subject);
    }
    setSelectedSubjects(newSubjects);
    setValue('subjects', newSubjects);
  };

  const handleFormSubmit = (data: any) => {
    data.subjects = selectedSubjects;
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Teacher' : 'Edit Teacher'}
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
              <Label htmlFor="nic">NIC Number *</Label>
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
              <Label htmlFor="gender">Gender</Label>
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
              <Label htmlFor="town">Town</Label>
              <Input
                id="town"
                {...register('town')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Input
                id="province"
                {...register('province')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instituteId">Institute</Label>
              <Select onValueChange={(value) => setValue('instituteId', value)} value={watch('instituteId')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select institute" />
                </SelectTrigger>
                <SelectContent>
                  {mockInstitutes.map((institute) => (
                    <SelectItem key={institute.id} value={institute.id}>
                      {institute.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                {...register('qualification')}
                placeholder="e.g., B.Ed, M.A"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                {...register('experience')}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Subjects Teaching</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3 border rounded-md">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox
                    id={subject}
                    checked={selectedSubjects.includes(subject)}
                    onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                  />
                  <Label htmlFor={subject} className="text-sm">{subject}</Label>
                </div>
              ))}
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
              {mode === 'create' ? 'Add Teacher' : 'Update Teacher'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
