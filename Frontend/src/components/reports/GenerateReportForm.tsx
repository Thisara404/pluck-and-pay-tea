import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { generatePluckerRecordsReport } from "@/utils/pdf";
import api from "@/lib/api";

interface GenerateReportFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

type ReportFormValues = {
  startDate: string;
  endDate: string;
};

const GenerateReportForm = ({ open, onOpenChange }: GenerateReportFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ReportFormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ReportFormValues) => {
    try {
      setIsLoading(true);
      
      // For frontend-only demo: Generate sample data
      const samplePluckerData = [
        {
          name: "Mary Johnson",
          records: [
            { date: "2023-06-01", weight: 12.5, earnings: 1250 },
            { date: "2023-06-02", weight: 10.8, earnings: 1080 },
            { date: "2023-06-03", weight: 11.2, earnings: 1120 },
          ],
          totalWeight: 34.5,
          totalEarnings: 3450
        },
        {
          name: "Robert Smith",
          records: [
            { date: "2023-06-01", weight: 9.5, earnings: 950 },
            { date: "2023-06-02", weight: 10.2, earnings: 1020 },
            { date: "2023-06-03", weight: 9.8, earnings: 980 },
          ],
          totalWeight: 29.5,
          totalEarnings: 2950
        },
        {
          name: "James Brown",
          records: [
            { date: "2023-06-01", weight: 8.7, earnings: 870 },
            { date: "2023-06-02", weight: 9.3, earnings: 930 },
            { date: "2023-06-03", weight: 8.9, earnings: 890 },
          ],
          totalWeight: 26.9,
          totalEarnings: 2690
        }
      ];
      
      try {
        // Try to fetch real data (if backend is available)
        const [pluckersResponse, recordsResponse] = await Promise.all([
          api.get('/pluckers'),
          api.get('/records', { 
            params: { 
              startDate: data.startDate, 
              endDate: data.endDate 
            }
          })
        ]);
        
        // Process real data as shown in previous example...
        const pluckers = pluckersResponse.data;
        const records = recordsResponse.data;
        
        // Process real data to create the structure needed for the PDF report
        const pluckerRecordsMap = new Map();
        
        // Initialize plucker records map
        pluckers.forEach(plucker => {
          pluckerRecordsMap.set(plucker._id, {
            name: plucker.name,
            records: [],
            totalWeight: 0,
            totalEarnings: 0
          });
        });
        
        // Aggregate record data by plucker
        records.forEach(record => {
          if (record.pluckerDetails && record.pluckerDetails.length > 0) {
            record.pluckerDetails.forEach(detail => {
              if (pluckerRecordsMap.has(detail.pluckerId)) {
                const pluckerData = pluckerRecordsMap.get(detail.pluckerId);
                const earnings = detail.weight * record.averagePrice;
                
                pluckerData.records.push({
                  date: record.date,
                  weight: detail.weight,
                  earnings: earnings
                });
                
                pluckerData.totalWeight += detail.weight;
                pluckerData.totalEarnings += earnings;
              }
            });
          }
        });
        
        // Convert the map to an array for the report
        const pluckerDataArray = Array.from(pluckerRecordsMap.values())
          .filter(plucker => plucker.records.length > 0) 
          .sort((a, b) => b.totalWeight - a.totalWeight);
        
        if (pluckerDataArray.length === 0) {
          toast.warning("No plucking records found for the selected date range");
          setIsLoading(false);
          return;
        }
        
        generatePluckerRecordsReport(
          "Plucker Collection Records Report",
          { start: data.startDate, end: data.endDate },
          pluckerDataArray
        );
        
      } catch (apiError) {
        console.log("Using sample data for PDF generation");
        // If API calls fail, use sample data instead
        generatePluckerRecordsReport(
          "Plucker Collection Records Report (Sample Data)",
          { start: data.startDate, end: data.endDate },
          samplePluckerData
        );
      }
      
      toast.success("Report generated successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error generating report:", error);
      toast.error("Failed to generate report");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Generate Pluckers Report</DialogTitle>
          <DialogDescription>
            Generate a report showing all plucking records for the selected date range.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Report Period</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register("startDate", { required: "Start date is required" })}
                  />
                  {errors.startDate && <p className="text-sm text-red-600">{errors.startDate.message}</p>}
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    {...register("endDate", { required: "End date is required" })}
                  />
                  {errors.endDate && <p className="text-sm text-red-600">{errors.endDate.message}</p>}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-tea-dark hover:bg-tea-dark/90"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateReportForm;
