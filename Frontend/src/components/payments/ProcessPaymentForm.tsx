
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Calendar } from "lucide-react";

interface ProcessPaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PaymentFormValues = {
  period: string;
  totalAmount: string;
  pluckerCount: string;
  paymentDate: string;
  notes: string;
};

const ProcessPaymentForm = ({ open, onOpenChange }: ProcessPaymentFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PaymentFormValues>({
    defaultValues: {
      period: new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getFullYear(),
      totalAmount: "",
      pluckerCount: "",
      paymentDate: new Date().toISOString().split('T')[0],
      notes: ""
    }
  });

  const onSubmit = (data: PaymentFormValues) => {
    console.log("Form submitted:", data);
    toast.success("Payment processed successfully!");
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Process New Payment</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period">Payment Period</Label>
              <div className="relative">
                <Input 
                  id="period"
                  {...register("period", { required: "Payment period is required" })}
                  placeholder="e.g. May 2023" 
                  className="pl-9"
                />
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              {errors.period && <p className="text-sm text-destructive">{errors.period.message}</p>}
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
                placeholder="Enter total number of pluckers" 
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
                  min: {
                    value: 0.01,
                    message: "Amount must be greater than 0"
                  }
                })}
                placeholder="Enter total payment amount" 
              />
              {errors.totalAmount && <p className="text-sm text-destructive">{errors.totalAmount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input 
                id="paymentDate"
                type="date"
                {...register("paymentDate", { required: "Payment date is required" })}
              />
              {errors.paymentDate && <p className="text-sm text-destructive">{errors.paymentDate.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input 
                id="notes"
                {...register("notes")}
                placeholder="Add any additional notes" 
              />
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
            <Button type="submit" className="bg-tea-dark hover:bg-tea-dark/90">Process Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessPaymentForm;
