
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface GenerateReportFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type ReportFormValues = {
  title: string;
  type: string;
  period: string;
  format: string;
};

const GenerateReportForm = ({ open, onOpenChange }: GenerateReportFormProps) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ReportFormValues>({
    defaultValues: {
      title: "",
      type: "",
      period: new Date().toLocaleString('default', { month: 'long' }) + " " + new Date().getFullYear(),
      format: "pdf"
    }
  });

  const reportType = watch("type");

  React.useEffect(() => {
    if (reportType === "collection") {
      setValue("title", "Monthly Collection Summary");
    } else if (reportType === "payment") {
      setValue("title", "Monthly Payment Report");
    } else if (reportType === "performance") {
      setValue("title", "Pluckers Performance Analysis");
    }
  }, [reportType, setValue]);

  const onSubmit = (data: ReportFormValues) => {
    console.log("Form submitted:", data);
    toast.success("Report generated successfully!");
    reset();
    onOpenChange(false);
  };

  // Custom handler for the Select component since it doesn't work with register directly
  const handleSelectChange = (value: string) => {
    setValue("type", value);
  };

  const handleFormatChange = (value: string) => {
    setValue("format", value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Generate New Report</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Report Type</Label>
              <Select onValueChange={handleSelectChange} defaultValue={reportType}>
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collection">Collection Report</SelectItem>
                  <SelectItem value="payment">Payment Report</SelectItem>
                  <SelectItem value="performance">Performance Analysis</SelectItem>
                </SelectContent>
              </Select>
              {!reportType && <p className="text-sm text-destructive">Report type is required</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Report Title</Label>
              <Input 
                id="title"
                {...register("title", { required: "Report title is required" })}
                placeholder="Enter report title"
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="period">Report Period</Label>
              <div className="relative">
                <Input 
                  id="period"
                  {...register("period", { required: "Report period is required" })}
                  placeholder="e.g. May 2023"
                  className="pl-9"
                />
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              {errors.period && <p className="text-sm text-destructive">{errors.period.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Report Format</Label>
              <Select onValueChange={handleFormatChange} defaultValue="pdf">
                <SelectTrigger id="format" className="w-full">
                  <SelectValue placeholder="Select report format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
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
            <Button 
              type="submit" 
              className="bg-tea-dark hover:bg-tea-dark/90"
              disabled={!reportType}
            >
              Generate Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateReportForm;
