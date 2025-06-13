
import React, { useState } from 'react';
import { PageLayout } from '@/components/Layout/PageLayout';
import { DataTable } from '@/components/UI/DataTable';
import { ClassForm } from '@/components/Forms/ClassForm';
import { mockClasses } from '@/services/mockData';
import { Class } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const columns = [
  { key: 'name', label: 'Class Name', sortable: true },
  { key: 'grade', label: 'Grade', sortable: true },
  { key: 'subject', label: 'Subject', sortable: true },
  { key: 'studentCount', label: 'Students', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
];

export const Classes: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | undefined>();
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoadData = () => {
    setLoading(true);
    setTimeout(() => {
      // Filter classes based on user role
      if (user?.role === 'super_admin') {
        setClasses(mockClasses);
      } else if (user?.role === 'institute_admin') {
        // Institute admin sees classes from their institutes
        const userClasses = mockClasses.filter(classItem => 
          user?.institutes.includes(classItem.instituteId)
        );
        setClasses(userClasses);
      } else {
        // Teachers see only their assigned classes
        const userClasses = mockClasses.filter(classItem => 
          user?.classes.includes(classItem.id)
        );
        setClasses(userClasses);
      }
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    console.log('Searching classes:', query);
  };

  const handleCreate = () => {
    setFormMode('create');
    setEditingClass(undefined);
    setFormOpen(true);
  };

  const handleEdit = (classItem: Class) => {
    setFormMode('edit');
    setEditingClass(classItem);
    setFormOpen(true);
  };

  const handleDelete = (classItem: Class) => {
    if (confirm('Are you sure you want to delete this class?')) {
      setClasses(prev => prev.filter(c => c.id !== classItem.id));
      toast({
        title: "Success",
        description: "Class deleted successfully",
      });
    }
  };

  const handleViewStudents = (classItem: Class) => {
    // Navigate to students page with class filter
    navigate(`/students?classId=${classItem.id}&className=${encodeURIComponent(classItem.name)}`);
  };

  const handleFormSubmit = (data: Partial<Class>) => {
    if (formMode === 'create') {
      const newClass = {
        ...data,
        id: Date.now().toString(),
        studentCount: 0,
      } as Class;
      setClasses(prev => [...prev, newClass]);
      toast({
        title: "Success",
        description: "Class created successfully",
      });
    } else {
      setClasses(prev => prev.map(c => 
        c.id === editingClass?.id ? { ...c, ...data } : c
      ));
      toast({
        title: "Success",
        description: "Class updated successfully",
      });
    }
  };

  return (
    <PageLayout title="Class Management" showSidebar={true}>
      <div className="p-4 md:p-6">
        <DataTable
          title="Class Management"
          columns={columns}
          data={classes}
          loading={loading}
          onLoadData={handleLoadData}
          onSearch={handleSearch}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          module="classes"
          customActions={(item) => (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewStudents(item)}
              className="h-8 px-2 text-xs"
            >
              View Students
            </Button>
          )}
        />

        <ClassForm
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          classItem={editingClass}
          mode={formMode}
        />
      </div>
    </PageLayout>
  );
};
