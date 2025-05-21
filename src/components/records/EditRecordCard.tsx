
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditRecordCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: {
    id: number;
    date: string;
    totalWeight: number;
    pluckerCount: number;
    averagePrice: number;
  };
}

type RecordFormValues = {
  date: string;
  totalWeight: number;
  pluckerCount: number;
  averagePrice: number;
};

const EditRecordCard = ({ open, onOpenChange, record }: EditRecordCardProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RecordFormValues>({
    defaultValues: {
      date: record.date,
      totalWeight: record.totalWeight,
      pluckerCount: record.pluckerCount,
      averagePrice: record.averagePrice,
    }
  });

  React.useEffect(() => {
    if (open) {
      setValue("date", record.date);
      setValue("totalWeight", record.totalWeight);
      setValue("pluckerCount", record.pluckerCount);
      setValue("averagePrice", record.averagePrice);
    }
  }, [open, record, setValue]);

  const onSubmit = (data: RecordFormValues) => {
    console.log("Form submitted:", data);
    toast.success("Record updated successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Daily Record</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date"
                type="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalWeight">Total Weight (kg)</Label>
              <Input 
                id="totalWeight"
                type="number"
                step="0.1"
                {...register("totalWeight", { 
                  required: "Total weight is required",
                  valueAsNumber: true,
                  min: { value: 0.1, message: "Weight must be greater than 0" } 
                })}
              />
              {errors.totalWeight && <p className="text-sm text-destructive">{errors.totalWeight.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pluckerCount">Number of Pluckers</Label>
              <Input 
                id="pluckerCount"
                type="number"
                {...register("pluckerCount", { 
                  required: "Plucker count is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "At least one plucker is required" } 
                })}
              />
              {errors.pluckerCount && <p className="text-sm text-destructive">{errors.pluckerCount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="averagePrice">Average Price per kg ($)</Label>
              <Input 
                id="averagePrice"
                type="number"
                step="0.01"
                {...register("averagePrice", { 
                  required: "Average price is required",
                  valueAsNumber: true,
                  min: { value: 0.01, message: "Price must be greater than 0" } 
                })}
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
            <Button type="submit" className="bg-tea-dark hover:bg-tea-dark/90">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRecordCard;
