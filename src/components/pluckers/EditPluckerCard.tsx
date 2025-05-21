
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditPluckerCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plucker: {
    id: number;
    name: string;
    phone: string;
    address: string;
    joinDate: string;
    status: string;
  };
}

type PluckerFormValues = {
  name: string;
  phone: string;
  address: string;
  joinDate: string;
  status: string;
};

const EditPluckerCard = ({ open, onOpenChange, plucker }: EditPluckerCardProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PluckerFormValues>({
    defaultValues: {
      name: plucker.name,
      phone: plucker.phone,
      address: plucker.address,
      joinDate: plucker.joinDate,
      status: plucker.status,
    }
  });

  React.useEffect(() => {
    if (open) {
      setValue("name", plucker.name);
      setValue("phone", plucker.phone);
      setValue("address", plucker.address);
      setValue("joinDate", plucker.joinDate);
      setValue("status", plucker.status);
    }
  }, [open, plucker, setValue]);

  const onSubmit = (data: PluckerFormValues) => {
    console.log("Form submitted:", data);
    toast.success("Plucker updated successfully!");
    onOpenChange(false);
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
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-tea-dark hover:bg-tea-dark/90">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPluckerCard;
