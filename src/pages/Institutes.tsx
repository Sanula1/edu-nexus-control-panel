
import React, { useState } from 'react';
import { PageLayout } from '@/components/Layout/PageLayout';
import { DataTable } from '@/components/UI/DataTable';
import { InstituteForm } from '@/components/Forms/InstituteForm';
import { mockInstitutes } from '@/services/mockData';
import { Institute } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const Institutes: React.FC = () => {
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingInstitute, setEditingInstitute] = useState<Institute | undefined>();
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const { user } = useAuth();
  const { toast } = useToast();

  // Super admin sees all columns, institute admin sees limited columns
  const getColumns = () => {
    const baseColumns = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'location', label: 'Location', sortable: true },
      { key: 'type', label: 'Type', sortable: true },
      { key: 'availability', label: 'Status', sortable: true },
    ];

    if (user?.role === 'super_admin') {
      return [
        ...baseColumns,
        { key: 'businessRegId', label: 'Business Reg ID', sortable: false },
        { key: 'createdAt', label: 'Created', sortable: true },
      ];
    }

    return baseColumns;
  };

  const handleLoadData = () => {
    setLoading(true);
    setTimeout(() => {
      // Filter institutes based on user role
      if (user?.role === 'super_admin') {
        setInstitutes(mockInstitutes);
      } else {
        // Institute admin only sees their own institutes
        const userInstitutes = mockInstitutes.filter(institute => 
          user?.institutes.includes(institute.id)
        );
        setInstitutes(userInstitutes);
      }
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    console.log('Searching institutes:', query);
  };

  const handleCreate = () => {
    setFormMode('create');
    setEditingInstitute(undefined);
    setFormOpen(true);
  };

  const handleEdit = (institute: Institute) => {
    setFormMode('edit');
    setEditingInstitute(institute);
    setFormOpen(true);
  };

  const handleDelete = (institute: Institute) => {
    if (confirm('Are you sure you want to delete this institute?')) {
      setInstitutes(prev => prev.filter(i => i.id !== institute.id));
      toast({
        title: "Success",
        description: "Institute deleted successfully",
      });
    }
  };

  const handleFormSubmit = (data: Partial<Institute>) => {
    if (formMode === 'create') {
      const newInstitute = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
      } as Institute;
      setInstitutes(prev => [...prev, newInstitute]);
      toast({
        title: "Success",
        description: "Institute created successfully",
      });
    } else {
      setInstitutes(prev => prev.map(i => 
        i.id === editingInstitute?.id ? { ...i, ...data } : i
      ));
      toast({
        title: "Success",
        description: "Institute updated successfully",
      });
    }
  };

  return (
    <PageLayout title="Institute Management" showSidebar={true}>
      <div className="p-4 md:p-6">
        <DataTable
          title="Institute Management"
          columns={getColumns()}
          data={institutes}
          loading={loading}
          onLoadData={handleLoadData}
          onSearch={handleSearch}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          module="institutes"
        />

        <InstituteForm
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          institute={editingInstitute}
          mode={formMode}
        />
      </div>
    </PageLayout>
  );
};
