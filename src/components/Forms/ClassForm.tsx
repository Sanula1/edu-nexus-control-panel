
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Class } from '@/types';
import { mockInstitutes, mockTeachers } from '@/services/mockData';

interface ClassFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Class>) => void;
  classItem?: Class;
  mode: 'create' | 'edit';
}

export const ClassForm: React.FC<ClassFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  classItem,
  mode
}) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: classItem || {
      name: '',
      grade: '',
      subject: '',
      instituteId: '',
      teacherId: '',
      capacity: 30,
      status: 'active' as const,
      schedule: '',
      description: ''
    }
  });

  React.useEffect(() => {
    if (classItem) {
      Object.keys(classItem).forEach(key => {
        setValue(key as keyof Class, classItem[key as keyof Class]);
      });
    } else {
      reset({
        name: '',
        grade: '',
        subject: '',
        instituteId: '',
        teacherId: '',
        capacity: 30,
        status: 'active' as const,
        schedule: '',
        description: ''
      });
    }
  }, [classItem, setValue, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Class' : 'Edit Class'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Class Name *</Label>
              <Input
                id="name"
                {...register('name', { required: 'Class name is required' })}
                className="w-full"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade *</Label>
              <Select onValueChange={(value) => setValue('grade', value)} value={watch('grade')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 13 }, (_, i) => (
                    <SelectItem key={i} value={`Grade ${i + 1}`}>
                      Grade {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select onValueChange={(value) => setValue('subject', value)} value={watch('subject')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instituteId">Institute *</Label>
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
              <Label htmlFor="teacherId">Teacher</Label>
              <Select onValueChange={(value) => setValue('teacherId', value)} value={watch('teacherId')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeachers.map((teacher) => (
                    <SelectItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                {...register('capacity', { min: 1, max: 100, valueAsNumber: true })}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value: 'active' | 'inactive' | 'completed') => setValue('status', value)} value={watch('status')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">Schedule</Label>
              <Input
                id="schedule"
                {...register('schedule')}
                placeholder="e.g., Mon-Fri 9:00-10:00 AM"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              className="w-full min-h-[80px]"
              placeholder="Enter class description..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {mode === 'create' ? 'Create Class' : 'Update Class'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
