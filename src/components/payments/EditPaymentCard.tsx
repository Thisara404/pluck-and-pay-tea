
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditPaymentCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payment: {
    id: number;
    period: string;
    status: string;
    pluckerCount: number;
    totalAmount: number;
    date: string;
  };
}

type PaymentFormValues = {
  period: string;
  status: string;
  pluckerCount: number;
  totalAmount: number;
  date: string;
};

const EditPaymentCard = ({ open, onOpenChange, payment }: EditPaymentCardProps) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PaymentFormValues>({
    defaultValues: {
      period: payment.period,
      status: payment.status,
      pluckerCount: payment.pluckerCount,
      totalAmount: payment.totalAmount,
      date: payment.date,
    }
  });

  React.useEffect(() => {
    if (open) {
      setValue("period", payment.period);
      setValue("status", payment.status);
      setValue("pluckerCount", payment.pluckerCount);
      setValue("totalAmount", payment.totalAmount);
      setValue("date", payment.date);
    }
  }, [open, payment, setValue]);

  const onSubmit = (data: PaymentFormValues) => {
    console.log("Form submitted:", data);
    toast.success("Payment updated successfully!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Payment</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period">Payment Period</Label>
              <Input 
                id="period"
                {...register("period", { required: "Period is required" })}
                placeholder="e.g. May 2023" 
              />
              {errors.period && <p className="text-sm text-destructive">{errors.period.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Payment Date</Label>
              <Input 
                id="date"
                type="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                onValueChange={(value) => setValue("status", value)} 
                defaultValue={payment.status}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="totalAmount">Total Amount ($)</Label>
              <Input 
                id="totalAmount"
                type="number"
                step="0.01"
                {...register("totalAmount", { 
                  required: "Total amount is required",
                  valueAsNumber: true,
                  min: { value: 0.01, message: "Amount must be greater than 0" } 
                })}
              />
              {errors.totalAmount && <p className="text-sm text-destructive">{errors.totalAmount.message}</p>}
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

export default EditPaymentCard;
