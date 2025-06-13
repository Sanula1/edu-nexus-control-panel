
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/Layout/PageLayout';
import { DataTable } from '@/components/UI/DataTable';
import { StudentForm } from '@/components/Forms/StudentForm';
import { mockStudents } from '@/services/mockData';
import { Student } from '@/types';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'nic', label: 'NIC', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'gPhone', label: 'Phone', sortable: false },
  { key: 'gender', label: 'Gender', sortable: true },
  { key: 'city', label: 'City', sortable: true },
];

export const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>();
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const classId = searchParams.get('classId');
  const className = searchParams.get('className');

  const handleLoadData = () => {
    setLoading(true);
    setTimeout(() => {
      let filteredStudents = mockStudents;
      
      // Filter by class if classId is provided
      if (classId) {
        filteredStudents = mockStudents.filter(student => student.classId === classId);
      }
      
      setStudents(filteredStudents);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    console.log('Searching students:', query);
  };

  const handleCreate = () => {
    setFormMode('create');
    setEditingStudent(undefined);
    setFormOpen(true);
  };

  const handleEdit = (student: Student) => {
    setFormMode('edit');
    setEditingStudent(student);
    setFormOpen(true);
  };

  const handleDelete = (student: Student) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(s => s.id !== student.id));
      toast({
        title: "Success",
        description: "Student deleted successfully",
      });
    }
  };

  const handleFormSubmit = (data: Partial<Student>) => {
    if (formMode === 'create') {
      const newStudent = {
        ...data,
        id: Date.now().toString(),
      } as Student;
      setStudents(prev => [...prev, newStudent]);
      toast({
        title: "Success",
        description: "Student added successfully",
      });
    } else {
      setStudents(prev => prev.map(s => 
        s.id === editingStudent?.id ? { ...s, ...data } : s
      ));
      toast({
        title: "Success",
        description: "Student updated successfully",
      });
    }
  };

  const getTitle = () => {
    if (className) {
      return `Students - ${decodeURIComponent(className)}`;
    }
    return 'Student Management';
  };

  return (
    <PageLayout title={getTitle()} showSidebar={true}>
      <div className="p-4 md:p-6">
        {className && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Showing students enrolled in: <strong>{decodeURIComponent(className)}</strong>
            </p>
          </div>
        )}
        <DataTable
          title="Student Management"
          columns={columns}
          data={students}
          loading={loading}
          onLoadData={handleLoadData}
          onSearch={handleSearch}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          module="students"
        />

        <StudentForm
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          student={editingStudent}
          mode={formMode}
        />
      </div>
    </PageLayout>
  );
};
