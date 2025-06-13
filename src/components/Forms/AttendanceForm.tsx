
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Attendance } from '@/types';
import { mockStudents, mockClasses, mockInstitutes } from '@/services/mockData';

interface AttendanceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Attendance>) => void;
  attendance?: Attendance;
  mode: 'create' | 'edit';
}

export const AttendanceForm: React.FC<AttendanceFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  attendance,
  mode
}) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: attendance || {
      studentId: '',
      classId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Present' as const,
      instituteId: ''
    }
  });

  React.useEffect(() => {
    if (attendance) {
      Object.keys(attendance).forEach(key => {
        setValue(key as keyof Attendance, attendance[key as keyof Attendance]);
      });
    } else {
      reset({
        studentId: '',
        classId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present' as const,
        instituteId: ''
      });
    }
  }, [attendance, setValue, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Mark Attendance' : 'Edit Attendance'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student *</Label>
              <Select onValueChange={(value) => setValue('studentId', value)} value={watch('studentId')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {mockStudents.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="classId">Class *</Label>
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
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                {...register('date', { required: 'Date is required' })}
                className="w-full"
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select onValueChange={(value: 'Present' | 'Absent' | 'Late') => setValue('status', value)} value={watch('status')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="Late">Late</SelectItem>
                </SelectContent>
              </Select>
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
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {mode === 'create' ? 'Mark Attendance' : 'Update Attendance'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
