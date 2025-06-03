import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

interface EditPluckerCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plucker: {
    _id: string;
    name: string;
    phone: string;
    address: string;
    joinDate: string;
    status: string;
  };
  onSuccess?: () => void;
  apiUrl: string;
}

type PluckerFormValues = {
  name: string;
  phone: string;
  address: string;
  joinDate: string;
  status: string;
};

const EditPluckerCard = ({ open, onOpenChange, plucker, onSuccess, apiUrl }: EditPluckerCardProps) => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<PluckerFormValues>({
    defaultValues: {
      name: plucker.name,
      phone: plucker.phone,
      address: plucker.address || '',
      joinDate: new Date(plucker.joinDate).toISOString().split('T')[0],
      status: plucker.status,
    }
  });

  React.useEffect(() => {
    if (open) {
      setValue("name", plucker.name);
      setValue("phone", plucker.phone);
      setValue("address", plucker.address || '');
      setValue("joinDate", new Date(plucker.joinDate).toISOString().split('T')[0]);
      setValue("status", plucker.status);
    }
  }, [open, plucker, setValue]);

  const onSubmit = async (data: PluckerFormValues) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Authentication required. Please login.");
        return;
      }

      await axios.put(
        `${apiUrl}/pluckers/${plucker._id}`, 
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
          }
        }
      );

      if (onSuccess) {
        onSuccess();
      } else {
        onOpenChange(false);
        toast.success("Plucker updated successfully!");
      }
    } catch (error: any) {
      console.error("Error updating plucker:", error);
      toast.error(error.response?.data?.message || "Failed to update plucker. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Plucker</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter plucker's full name" 
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone"
                {...register("phone", { required: "Phone number is required" })}
                placeholder="Enter phone number" 
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address"
                {...register("address")}
                placeholder="Enter address (optional)" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              <Input 
                id="joinDate"
                type="date"
                {...register("joinDate", { required: "Join date is required" })} 
              />
              {errors.joinDate && <p className="text-sm text-destructive">{errors.joinDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                onValueChange={(value) => setValue("status", value)} 
                defaultValue={plucker.status}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-tea-dark hover:bg-tea-dark/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPluckerCard;
