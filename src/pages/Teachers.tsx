
import React, { useState } from 'react';
import { PageLayout } from '@/components/Layout/PageLayout';
import { DataTable } from '@/components/UI/DataTable';
import { TeacherForm } from '@/components/Forms/TeacherForm';
import { mockTeachers } from '@/services/mockData';
import { Teacher } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'nic', label: 'NIC', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'phone', label: 'Phone', sortable: false },
  { key: 'subjects', label: 'Subjects', sortable: false },
  { key: 'city', label: 'City', sortable: true },
];

// Type for display purposes where subjects is a string
type TeacherDisplay = Omit<Teacher, 'subjects'> & { subjects: string };

export const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<TeacherDisplay[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>();
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLoadData = () => {
    setLoading(true);
    setTimeout(() => {
      // Transform subjects array to string for display
      const transformedTeachers: TeacherDisplay[] = mockTeachers.map(teacher => ({
        ...teacher,
        subjects: Array.isArray(teacher.subjects) 
          ? teacher.subjects.join(', ') 
          : teacher.subjects
      }));

      // Filter teachers based on user role
      if (user?.role === 'super_admin') {
        setTeachers(transformedTeachers);
      } else {
        // Institute admin only sees teachers from their institutes
        const userTeachers = transformedTeachers.filter(teacher => 
          user?.institutes.includes(teacher.instituteId || '')
        );
        setTeachers(userTeachers);
      }
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    console.log('Searching teachers:', query);
  };

  const handleCreate = () => {
    setFormMode('create');
    setEditingTeacher(undefined);
    setFormOpen(true);
  };

  const handleEdit = (teacher: TeacherDisplay) => {
    // Convert subjects string back to array for editing
    const teacherForEdit: Teacher = {
      ...teacher,
      subjects: typeof teacher.subjects === 'string' 
        ? teacher.subjects.split(', ').filter((s: string) => s.trim()) 
        : teacher.subjects
    };
    setFormMode('edit');
    setEditingTeacher(teacherForEdit);
    setFormOpen(true);
  };

  const handleDelete = (teacher: TeacherDisplay) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(prev => prev.filter(t => t.id !== teacher.id));
      toast({
        title: "Success",
        description: "Teacher deleted successfully",
      });
    }
  };

  const handleFormSubmit = (data: Partial<Teacher>) => {
    if (formMode === 'create') {
      const newTeacher: Teacher = {
        ...data,
        id: Date.now().toString(),
        subjects: Array.isArray(data.subjects) 
          ? data.subjects 
          : (data.subjects ? [data.subjects] : [])
      } as Teacher;
      
      // Transform for display
      const displayTeacher: TeacherDisplay = {
        ...newTeacher,
        subjects: newTeacher.subjects.join(', ')
      };
      
      setTeachers(prev => [...prev, displayTeacher]);
      toast({
        title: "Success",
        description: "Teacher added successfully",
      });
    } else {
      setTeachers(prev => prev.map(t => 
        t.id === editingTeacher?.id ? { 
          ...t, 
          ...data,
          subjects: Array.isArray(data.subjects) 
            ? data.subjects.join(', ') 
            : (data.subjects || t.subjects)
        } as TeacherDisplay : t
      ));
      toast({
        title: "Success",
        description: "Teacher updated successfully",
      });
    }
  };

  return (
    <PageLayout title="Teacher Management" showSidebar={true}>
      <div className="p-4 md:p-6">
        <DataTable
          title="Teacher Management"
          columns={columns}
          data={teachers}
          loading={loading}
          onLoadData={handleLoadData}
          onSearch={handleSearch}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          module="teachers"
        />

        <TeacherForm
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          teacher={editingTeacher}
          mode={formMode}
        />
      </div>
    </PageLayout>
  );
};
