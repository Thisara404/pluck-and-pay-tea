
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, FileText, Download, Calendar, Users } from "lucide-react";

interface ViewRecordCardProps {
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

const ViewRecordCard = ({ open, onOpenChange, record }: ViewRecordCardProps) => {
  const handleGenerateReport = () => {
    // Handle report generation logic
    console.log("Generating report for record:", record.id);
  };

  const handleDownloadPdf = () => {
    // Handle PDF download logic
    console.log("Downloading PDF for record:", record.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Daily Record Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center mb-6">
            <div className="bg-tea-light/20 p-3 rounded-full mr-3">
              <Calendar className="h-6 w-6 text-tea-dark" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{record.date}</h2>
              <p className="text-sm text-gray-500">Collection Record</p>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total Weight</p>
                  <p className="font-medium">{record.totalWeight} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pluckers Count</p>
                  <p className="font-medium">{record.pluckerCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Price</p>
                  <p className="font-medium">${record.averagePrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="font-medium">${(record.totalWeight * record.averagePrice).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <Users className="h-5 w-5 text-tea-dark mr-2" />
                <h3 className="font-semibold">Top Performers</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-tea-brown/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
                    <span>Mary Johnson</span>
                  </div>
                  <span className="font-medium">12.5 kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-tea-brown/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                    <span>Robert Smith</span>
                  </div>
                  <span className="font-medium">11.2 kg</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="bg-tea-brown/10 w-8 h-8 rounded-full flex items-center justify-center mr-3">3</span>
                    <span>James Brown</span>
                  </div>
                  <span className="font-medium">10.8 kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={handleGenerateReport}
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center" 
              onClick={handleDownloadPdf}
            >
              <Download className="h-4 w-4 mr-2" />
              Download as PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewRecordCard;
