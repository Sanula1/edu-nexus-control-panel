
import React, { useState } from 'react';
import { PageLayout } from '@/components/Layout/PageLayout';
import { DataTable } from '@/components/UI/DataTable';
import { ResultForm } from '@/components/Forms/ResultForm';
import { mockResults } from '@/services/mockData';
import { Result } from '@/types';
import { useToast } from '@/hooks/use-toast';

const columns = [
  { key: 'studentId', label: 'Student ID', sortable: true },
  { key: 'subject', label: 'Subject', sortable: true },
  { key: 'examId', label: 'Exam ID', sortable: true },
  { key: 'marks', label: 'Marks', sortable: true },
  { key: 'grade', label: 'Grade', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const Results: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingResult, setEditingResult] = useState<Result | undefined>();
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const { toast } = useToast();

  const handleLoadData = () => {
    setLoading(true);
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    console.log('Searching results:', query);
  };

  const handleCreate = () => {
    setFormMode('create');
    setEditingResult(undefined);
    setFormOpen(true);
  };

  const handleEdit = (result: Result) => {
    setFormMode('edit');
    setEditingResult(result);
    setFormOpen(true);
  };

  const handleDelete = (result: Result) => {
    if (confirm('Are you sure you want to delete this result?')) {
      setResults(prev => prev.filter(r => r.id !== result.id));
      toast({
        title: "Success",
        description: "Result deleted successfully",
      });
    }
  };

  const handleFormSubmit = (data: Partial<Result>) => {
    if (formMode === 'create') {
      const newResult = {
        ...data,
        id: Date.now().toString(),
      } as Result;
      setResults(prev => [...prev, newResult]);
      toast({
        title: "Success",
        description: "Result created successfully",
      });
    } else {
      setResults(prev => prev.map(r => 
        r.id === editingResult?.id ? { ...r, ...data } : r
      ));
      toast({
        title: "Success",
        description: "Result updated successfully",
      });
    }
  };

  return (
    <PageLayout title="Result Management" showSidebar={true}>
      <div className="p-4 md:p-6">
        <DataTable
          title="Result Management"
          columns={columns}
          data={results}
          loading={loading}
          onLoadData={handleLoadData}
          onSearch={handleSearch}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          module="results"
        />

        <ResultForm
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          result={editingResult}
          mode={formMode}
        />
      </div>
    </PageLayout>
  );
};
