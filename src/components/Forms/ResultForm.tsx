
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Result } from '@/types';
import { mockStudents, mockClasses, mockExams } from '@/services/mockData';

interface ResultFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Result>) => void;
  result?: Result;
  mode: 'create' | 'edit';
}

export const ResultForm: React.FC<ResultFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  result,
  mode
}) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: result || {
      studentId: '',
      classId: '',
      subject: '',
      examId: '',
      marks: 0,
      grade: '',
      status: 'Pending' as const
    }
  });

  React.useEffect(() => {
    if (result) {
      Object.keys(result).forEach(key => {
        setValue(key as keyof Result, result[key as keyof Result]);
      });
    } else {
      reset({
        studentId: '',
        classId: '',
        subject: '',
        examId: '',
        marks: 0,
        grade: '',
        status: 'Pending' as const
      });
    }
  }, [result, setValue, reset]);

  const calculateGrade = (marks: number, totalMarks = 100) => {
    const percentage = (marks / totalMarks) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  const handleMarksChange = (marks: number) => {
    setValue('marks', marks);
    const grade = calculateGrade(marks);
    setValue('grade', grade);
    setValue('status', marks >= 50 ? 'Pass' : 'Fail');
  };

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Result' : 'Edit Result'}
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
              <Label htmlFor="examId">Exam</Label>
              <Select onValueChange={(value) => setValue('examId', value)} value={watch('examId')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  {mockExams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.name} - {exam.subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
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
              <Label htmlFor="marks">Marks *</Label>
              <Input
                id="marks"
                type="number"
                {...register('marks', { 
                  required: 'Marks are required',
                  min: 0,
                  max: 100,
                  valueAsNumber: true,
                  onChange: (e) => handleMarksChange(Number(e.target.value))
                })}
                className="w-full"
              />
              {errors.marks && <p className="text-sm text-destructive">{errors.marks.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                {...register('grade')}
                className="w-full"
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value: 'Pass' | 'Fail' | 'Pending') => setValue('status', value)} value={watch('status')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pass">Pass</SelectItem>
                  <SelectItem value="Fail">Fail</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {mode === 'create' ? 'Create Result' : 'Update Result'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
