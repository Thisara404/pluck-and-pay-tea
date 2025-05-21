
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, FileText, Download, User } from "lucide-react";

interface ViewPluckerCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plucker: {
    id: number;
    name: string;
    phone: string;
    address: string;
    joinDate: string;
    status: string;
    collection: number;
  };
}

const ViewPluckerCard = ({ open, onOpenChange, plucker }: ViewPluckerCardProps) => {
  const handleGenerateReport = () => {
    // Handle report generation logic
    console.log("Generating report for plucker:", plucker.id);
  };

  const handleDownloadPdf = () => {
    // Handle PDF download logic
    console.log("Downloading PDF for plucker:", plucker.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Plucker Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center mb-6">
            <div className="bg-tea-brown/10 w-16 h-16 rounded-full flex items-center justify-center mr-4">
              <User className="h-8 w-8 text-tea-brown" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{plucker.name}</h2>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                plucker.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {plucker.status}
              </span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{plucker.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium">{plucker.joinDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{plucker.address || "No address provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Collection</p>
                  <p className="font-medium">{plucker.collection} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Daily</p>
                  <p className="font-medium">{Math.round(plucker.collection / 30 * 10) / 10} kg</p>
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

export default ViewPluckerCard;
