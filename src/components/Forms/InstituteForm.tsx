
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Institute } from '@/types';

interface InstituteFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Institute>) => void;
  institute?: Institute;
  mode: 'create' | 'edit';
}

export const InstituteForm: React.FC<InstituteFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  institute,
  mode
}) => {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: institute || {
      name: '',
      location: '',
      type: 'school' as const,
      businessRegId: '',
      address: '',
      phone: '',
      email: '',
      availability: 'active' as const
    }
  });

  React.useEffect(() => {
    if (institute) {
      Object.keys(institute).forEach(key => {
        setValue(key as keyof Institute, institute[key as keyof Institute]);
      });
    } else {
      reset({
        name: '',
        location: '',
        type: 'school' as const,
        businessRegId: '',
        address: '',
        phone: '',
        email: '',
        availability: 'active' as const
      });
    }
  }, [institute, setValue, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Institute' : 'Edit Institute'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Institute Name *</Label>
              <Input
                id="name"
                {...register('name', { required: 'Institute name is required' })}
                className="w-full"
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select onValueChange={(value: 'school' | 'college' | 'university' | 'training_center') => setValue('type', value)} value={watch('type')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="university">University</SelectItem>
                  <SelectItem value="training_center">Training Center</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessRegId">Business Registration ID</Label>
              <Input
                id="businessRegId"
                {...register('businessRegId')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register('phone')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Status</Label>
              <Select onValueChange={(value: 'active' | 'inactive' | 'suspended') => setValue('availability', value)} value={watch('availability')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              {...register('location', { required: 'Location is required' })}
              className="w-full"
            />
            {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              {...register('address')}
              className="w-full min-h-[80px]"
              placeholder="Enter full address..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              {mode === 'create' ? 'Create Institute' : 'Update Institute'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
