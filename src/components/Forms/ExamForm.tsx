
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Exam } from '@/types';
import { mockClasses, mockInstitutes } from '@/services/mockData';

interface ExamFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Exam>) => void;
  exam?: Exam;
  mode: 'create' | 'edit';
}

export const ExamForm: React.FC<ExamFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  exam,
  mode
}) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: exam || {
      name: '',
      subject: '',
      date: '',
      classId: '',
      instituteId: '',
      resultStatus: 'Pending' as const,
      totalMarks: 100
    }
  });

  React.useEffect(() => {
    if (exam) {
      Object.keys(exam).forEach(key => {
        setValue(key as keyof Exam, exam[key as keyof Exam]);
      });
    } else {
      reset({
        name: '',
        subject: '',
        date: '',
        classId: '',
        instituteId: '',
        resultStatus: 'Pending' as const,
        totalMarks: 100
      });
    }
  }, [exam, setValue, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Exam' : 'Edit Exam'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Exam Name *</Label>
              <Input
                id="name"
                {...register('name', { required: 'Exam name is required' })}
                className="w-full"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
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
              <Label htmlFor="date">Exam Date *</Label>
              <Input
                id="date"
                type="date"
                {...register('date', { required: 'Date is required' })}
                className="w-full"
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input
                id="totalMarks"
                type="number"
                {...register('totalMarks', { min: 1, valueAsNumber: true })}
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
              <Label htmlFor="resultStatus">Result Status</Label>
              <Select onValueChange={(value: 'Pending' | 'Published' | 'Draft') => setValue('resultStatus', value)} value={watch('resultStatus')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {mode === 'create' ? 'Create Exam' : 'Update Exam'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
