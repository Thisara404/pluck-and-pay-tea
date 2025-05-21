
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Calendar, BarChart3Icon, DollarSign, Users } from "lucide-react";

interface ViewReportCardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: {
    id: number;
    title: string;
    period: string;
    type: string;
    created: string;
    downloads: number;
  };
}

const ViewReportCard = ({ open, onOpenChange, report }: ViewReportCardProps) => {
  const handleDownloadPdf = () => {
    // Handle PDF download logic
    console.log("Downloading PDF for report:", report.id);
  };

  // Function to get the icon for the report type
  const getReportIcon = (type: string) => {
    switch (type) {
      case 'collection':
        return <BarChart3Icon className="h-5 w-5 text-tea-dark" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-tea-dark" />;
      case 'performance':
        return <Users className="h-5 w-5 text-tea-dark" />;
      default:
        return <FileText className="h-5 w-5 text-tea-dark" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Report Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center mb-6">
            <div className="bg-tea-light/20 p-3 rounded-full mr-3">
              {getReportIcon(report.type)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{report.title}</h2>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                <span className="text-sm text-gray-500">{report.period}</span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                  report.type === 'collection' 
                    ? 'bg-blue-100 text-blue-800' 
                    : report.type === 'payment' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {report.type}
                </span>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="font-medium">{report.created}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Downloads</p>
                  <p className="font-medium">{report.downloads}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Format</p>
                  <p className="font-medium">PDF</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <FileText className="h-5 w-5 text-tea-dark mr-2" />
                <h3 className="font-semibold">Report Preview</h3>
              </div>
              
              <div className="h-72 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Report preview available after download</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button 
              variant="default" 
              className="flex items-center bg-tea-dark hover:bg-tea-dark/90" 
              onClick={handleDownloadPdf}
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReportCard;
