
import React, { useState } from 'react';
import { PageLayout } from '@/components/Layout/PageLayout';
import { DataTable } from '@/components/UI/DataTable';
import { ExamForm } from '@/components/Forms/ExamForm';
import { mockExams } from '@/services/mockData';
import { Exam } from '@/types';
import { useToast } from '@/hooks/use-toast';

const columns = [
  { key: 'name', label: 'Exam Name', sortable: true },
  { key: 'subject', label: 'Subject', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'totalMarks', label: 'Total Marks', sortable: true },
  { key: 'resultStatus', label: 'Status', sortable: true },
];

export const Exams: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | undefined>();
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const { toast } = useToast();

  const handleLoadData = () => {
    setLoading(true);
    setTimeout(() => {
      setExams(mockExams);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    console.log('Searching exams:', query);
  };

  const handleCreate = () => {
    setFormMode('create');
    setEditingExam(undefined);
    setFormOpen(true);
  };

  const handleEdit = (exam: Exam) => {
    setFormMode('edit');
    setEditingExam(exam);
    setFormOpen(true);
  };

  const handleDelete = (exam: Exam) => {
    if (confirm('Are you sure you want to delete this exam?')) {
      setExams(prev => prev.filter(e => e.id !== exam.id));
      toast({
        title: "Success",
        description: "Exam deleted successfully",
      });
    }
  };

  const handleFormSubmit = (data: Partial<Exam>) => {
    if (formMode === 'create') {
      const newExam = {
        ...data,
        id: Date.now().toString(),
      } as Exam;
      setExams(prev => [...prev, newExam]);
      toast({
        title: "Success",
        description: "Exam created successfully",
      });
    } else {
      setExams(prev => prev.map(e => 
        e.id === editingExam?.id ? { ...e, ...data } : e
      ));
      toast({
        title: "Success",
        description: "Exam updated successfully",
      });
    }
  };

  return (
    <PageLayout title="Exam Management" showSidebar={true}>
      <div className="p-4 md:p-6">
        <DataTable
          title="Exam Management"
          columns={columns}
          data={exams}
          loading={loading}
          onLoadData={handleLoadData}
          onSearch={handleSearch}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          module="exams"
        />

        <ExamForm
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          exam={editingExam}
          mode={formMode}
        />
      </div>
    </PageLayout>
  );
};
