
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddRecordFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type RecordFormValues = {
  date: string;
  pluckerCount: string;
  totalWeight: string;
  averagePrice: string;
};

const AddRecordForm = ({ open, onOpenChange }: AddRecordFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RecordFormValues>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      pluckerCount: "",
      totalWeight: "",
      averagePrice: "2.5"
    }
  });

  const onSubmit = (data: RecordFormValues) => {
    console.log("Form submitted:", data);
    toast.success("New collection record added successfully!");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Collection Record</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Collection Date</Label>
              <Input 
                id="date"
                type="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pluckerCount">Number of Pluckers</Label>
              <Input 
                id="pluckerCount"
                type="number"
                {...register("pluckerCount", { 
                  required: "Number of pluckers is required",
                  min: {
                    value: 1,
                    message: "At least one plucker is required"
                  }
                })}
                placeholder="Enter number of pluckers" 
              />
              {errors.pluckerCount && <p className="text-sm text-destructive">{errors.pluckerCount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalWeight">Total Weight (kg)</Label>
              <Input 
                id="totalWeight"
                type="number"
                step="0.1"
                {...register("totalWeight", { 
                  required: "Total weight is required",
                  min: {
                    value: 0.1,
                    message: "Weight must be greater than 0"
                  }
                })}
                placeholder="Enter total weight in kg" 
              />
              {errors.totalWeight && <p className="text-sm text-destructive">{errors.totalWeight.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="averagePrice">Average Price per kg ($)</Label>
              <Input 
                id="averagePrice"
                type="number"
                step="0.1"
                {...register("averagePrice", { 
                  required: "Average price is required",
                  min: {
                    value: 0.1,
                    message: "Price must be greater than 0"
                  }
                })}
                placeholder="Enter average price per kg" 
              />
              {errors.averagePrice && <p className="text-sm text-destructive">{errors.averagePrice.message}</p>}
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
            <Button type="submit" className="bg-tea-dark hover:bg-tea-dark/90">Save Record</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecordForm;
