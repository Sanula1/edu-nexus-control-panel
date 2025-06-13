
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, Filter, Download, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  loading: boolean;
  onLoadData: () => void;
  onSearch: (query: string) => void;
  onCreate?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  createPermission?: string;
  editPermission?: string;
  deletePermission?: string;
  module: string;
  customActions?: (item: any) => React.ReactNode;
}

export const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  loading,
  onLoadData,
  onSearch,
  onCreate,
  onEdit,
  onDelete,
  createPermission = 'create',
  editPermission = 'edit',
  deletePermission = 'delete',
  module,
  customActions
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { hasPermission } = useAuth();

  const canCreate = hasPermission(module, createPermission);
  const canEdit = hasPermission(module, editPermission);
  const canDelete = hasPermission(module, deletePermission);

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
    setCurrentPage(1);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <div className="flex items-center gap-3">
          <Button onClick={onLoadData} disabled={loading}>
            {loading ? 'Loading...' : 'Load Data'}
          </Button>
          {canCreate && onCreate && (
            <Button onClick={onCreate} className="gap-2">
              <Plus className="w-4 h-4" />
              Create New
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
                  >
                    {column.label}
                  </th>
                ))}
                {(canEdit || canDelete || customActions) && (
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {paginatedData.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-muted/30">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-foreground">
                      {item[column.key]}
                    </td>
                  ))}
                  {(canEdit || canDelete || customActions) && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {customActions && customActions(item)}
                        {canEdit && onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        {canDelete && onDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDelete(item)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
