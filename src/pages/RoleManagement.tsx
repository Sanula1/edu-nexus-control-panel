
import React, { useState } from 'react';
import { PageLayout } from '@/components/Layout/PageLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface CustomRole {
  id: string;
  name: string;
  displayName: string;
  permissions: {
    [module: string]: string[];
  };
}

const availableModules = [
  'dashboard',
  'institutes',
  'classes',
  'students',
  'teachers',
  'exams',
  'results',
  'attendance',
  'profile'
];

const availableActions = ['view', 'create', 'edit', 'delete'];

export const RoleManagement: React.FC = () => {
  const [customRoles, setCustomRoles] = useState<CustomRole[]>([
    {
      id: '1',
      name: 'parent',
      displayName: 'Parent',
      permissions: {
        students: ['view'],
        results: ['view'],
        attendance: ['view'],
        profile: ['view', 'edit']
      }
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingRole, setEditingRole] = useState<CustomRole | null>(null);
  const [newRole, setNewRole] = useState<Partial<CustomRole>>({
    name: '',
    displayName: '',
    permissions: {}
  });

  const handleCreateRole = () => {
    if (newRole.name && newRole.displayName) {
      const role: CustomRole = {
        id: Date.now().toString(),
        name: newRole.name,
        displayName: newRole.displayName,
        permissions: newRole.permissions || {}
      };
      setCustomRoles([...customRoles, role]);
      setNewRole({ name: '', displayName: '', permissions: {} });
      setIsCreating(false);
    }
  };

  const handleUpdateRole = () => {
    if (editingRole) {
      setCustomRoles(customRoles.map(role => 
        role.id === editingRole.id ? editingRole : role
      ));
      setEditingRole(null);
    }
  };

  const handleDeleteRole = (roleId: string) => {
    setCustomRoles(customRoles.filter(role => role.id !== roleId));
  };

  const handlePermissionChange = (
    role: CustomRole | Partial<CustomRole>, 
    module: string, 
    action: string, 
    checked: boolean
  ) => {
    const updatedPermissions = { ...role.permissions };
    if (!updatedPermissions[module]) {
      updatedPermissions[module] = [];
    }
    
    if (checked) {
      if (!updatedPermissions[module].includes(action)) {
        updatedPermissions[module].push(action);
      }
    } else {
      updatedPermissions[module] = updatedPermissions[module].filter(a => a !== action);
      if (updatedPermissions[module].length === 0) {
        delete updatedPermissions[module];
      }
    }

    if (editingRole && role.id === editingRole.id) {
      setEditingRole({ ...editingRole, permissions: updatedPermissions });
    } else if (isCreating) {
      setNewRole({ ...newRole, permissions: updatedPermissions });
    }
  };

  const RoleForm = ({ 
    role, 
    isEditing = false 
  }: { 
    role: CustomRole | Partial<CustomRole>; 
    isEditing?: boolean; 
  }) => (
    <Card className="p-6 mb-4">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Role Name (Code)</Label>
            <Input
              id="name"
              value={role.name || ''}
              onChange={(e) => {
                if (isEditing && editingRole) {
                  setEditingRole({ ...editingRole, name: e.target.value });
                } else {
                  setNewRole({ ...newRole, name: e.target.value });
                }
              }}
              placeholder="e.g., parent"
            />
          </div>
          <div>
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={role.displayName || ''}
              onChange={(e) => {
                if (isEditing && editingRole) {
                  setEditingRole({ ...editingRole, displayName: e.target.value });
                } else {
                  setNewRole({ ...newRole, displayName: e.target.value });
                }
              }}
              placeholder="e.g., Parent"
            />
          </div>
        </div>

        <div>
          <Label>Permissions</Label>
          <div className="mt-2 space-y-4">
            {availableModules.map(module => (
              <div key={module} className="border rounded-lg p-4">
                <h4 className="font-medium capitalize mb-2">{module}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {availableActions.map(action => (
                    <div key={action} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${module}-${action}`}
                        checked={role.permissions?.[module]?.includes(action) || false}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(role, module, action, checked as boolean)
                        }
                      />
                      <Label htmlFor={`${module}-${action}`} className="text-sm capitalize">
                        {action}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={isEditing ? handleUpdateRole : handleCreateRole}
            className="gap-2"
          >
            {isEditing ? 'Update Role' : 'Create Role'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setIsCreating(false);
              setEditingRole(null);
              setNewRole({ name: '', displayName: '', permissions: {} });
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <PageLayout title="Role Management" showSidebar={true}>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Custom Roles</h2>
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Create New Role
          </Button>
        </div>

        {isCreating && (
          <RoleForm role={newRole} />
        )}

        {editingRole && (
          <RoleForm role={editingRole} isEditing={true} />
        )}

        <div className="space-y-4">
          {customRoles.map(role => (
            <Card key={role.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{role.displayName}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Code: {role.name}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Permissions:</h4>
                    {Object.entries(role.permissions).map(([module, actions]) => (
                      <div key={module} className="text-sm">
                        <span className="font-medium capitalize">{module}:</span>{' '}
                        <span className="text-muted-foreground">
                          {actions.join(', ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingRole(role)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-semibold mb-2">Example: Parent Role</h3>
          <p className="text-sm text-muted-foreground">
            A Parent role has been created with limited access:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 ml-4 list-disc">
            <li>Can only view their child's student profile</li>
            <li>Can view exam results</li>
            <li>Can view attendance records</li>
            <li>Can edit their own profile</li>
            <li>Cannot access teacher, institute, or class management</li>
          </ul>
        </Card>
      </div>
    </PageLayout>
  );
};
