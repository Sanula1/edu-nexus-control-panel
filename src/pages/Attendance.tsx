
import React, { useState } from 'react';
import { PageLayout } from '@/components/Layout/PageLayout';
import { DataTable } from '@/components/UI/DataTable';
import { AttendanceForm } from '@/components/Forms/AttendanceForm';
import { mockAttendance } from '@/services/mockData';
import { Attendance } from '@/types';
import { useToast } from '@/hooks/use-toast';

const columns = [
  { key: 'studentId', label: 'Student ID', sortable: true },
  { key: 'date', label: 'Date', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'classId', label: 'Class ID', sortable: true },
];

export const AttendancePage: React.FC = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingAttendance, setEditingAttendance] = useState<Attendance | undefined>();
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const { toast } = useToast();

  const handleLoadData = () => {
    setLoading(true);
    setTimeout(() => {
      setAttendance(mockAttendance);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (query: string) => {
    console.log('Searching attendance:', query);
  };

  const handleCreate = () => {
    setFormMode('create');
    setEditingAttendance(undefined);
    setFormOpen(true);
  };

  const handleEdit = (attendance: Attendance) => {
    setFormMode('edit');
    setEditingAttendance(attendance);
    setFormOpen(true);
  };

  const handleDelete = (attendance: Attendance) => {
    if (confirm('Are you sure you want to delete this attendance record?')) {
      setAttendance(prev => prev.filter(a => a.id !== attendance.id));
      toast({
        title: "Success",
        description: "Attendance record deleted successfully",
      });
    }
  };

  const handleFormSubmit = (data: Partial<Attendance>) => {
    if (formMode === 'create') {
      const newAttendance = {
        ...data,
        id: Date.now().toString(),
      } as Attendance;
      setAttendance(prev => [...prev, newAttendance]);
      toast({
        title: "Success",
        description: "Attendance marked successfully",
      });
    } else {
      setAttendance(prev => prev.map(a => 
        a.id === editingAttendance?.id ? { ...a, ...data } : a
      ));
      toast({
        title: "Success",
        description: "Attendance updated successfully",
      });
    }
  };

  return (
    <PageLayout title="Attendance Management" showSidebar={true}>
      <div className="p-4 md:p-6">
        <DataTable
          title="Attendance Management"
          columns={columns}
          data={attendance}
          loading={loading}
          onLoadData={handleLoadData}
          onSearch={handleSearch}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          module="attendance"
        />

        <AttendanceForm
          isOpen={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
          attendance={editingAttendance}
          mode={formMode}
        />
      </div>
    </PageLayout>
  );
};
