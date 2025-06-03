import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Download, FileText } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface ViewRecordCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: {
    _id: string;
    date: string;
    totalWeight: number;
    pluckerCount: number;
    averagePrice: number;
    pluckerDetails?: {
      pluckerId: string;
      weight: number;
    }[];
  };
}

interface Plucker {
  _id: string;
  name: string;
  phone: string;
}

const ViewRecordCard = ({ open, onOpenChange, record }: ViewRecordCardProps) => {
  const [pluckers, setPluckers] = useState<{[key: string]: Plucker}>({});
  
  useEffect(() => {
    const fetchPluckerDetails = async () => {
      if (!record.pluckerDetails || record.pluckerDetails.length === 0) return;
      
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const pluckerIds = record.pluckerDetails.map(detail => detail.pluckerId);
        const pluckersMap: {[key: string]: Plucker} = {};
        
        // Fetch details for each plucker
        for (const pluckerId of pluckerIds) {
          const response = await axios.get(`http://localhost:5000/api/pluckers/${pluckerId}`, {
            headers: { 'x-auth-token': token }
          });
          pluckersMap[pluckerId] = response.data;
        }
        
        setPluckers(pluckersMap);
      } catch (error) {
        console.error("Error fetching plucker details:", error);
      }
    };
    
    if (open && record.pluckerDetails) {
      fetchPluckerDetails();
    }
  }, [open, record]);

  const handleGenerateReport = () => {
    // Handle report generation logic
    toast.success("Generating report...");
  };

  const handleDownloadPdf = () => {
    // Handle PDF download logic
    toast.success("Downloading PDF...");
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
              <h2 className="text-2xl font-bold text-gray-800">{new Date(record.date).toLocaleDateString()}</h2>
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
                  <p className="font-medium">LKR {record.averagePrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Value</p>
                  <p className="font-medium">LKR {(record.totalWeight * record.averagePrice).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {record.pluckerDetails && record.pluckerDetails.length > 0 && (
            <Card className="mt-4">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Users className="h-5 w-5 text-tea-dark mr-2" />
                  <h3 className="font-semibold">Plucker Details</h3>
                </div>
                <div className="space-y-3">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 border-b">
                        <th className="pb-2">Plucker Name</th>
                        <th className="pb-2">Weight (kg)</th>
                        <th className="pb-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.pluckerDetails.map((detail, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-2">
                            {pluckers[detail.pluckerId]?.name || "Loading..."}
                          </td>
                          <td className="py-2">{detail.weight} kg</td>
                          <td className="py-2">${(detail.weight * record.averagePrice).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

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
