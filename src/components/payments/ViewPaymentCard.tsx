
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, FileText, Download, Calendar, DollarSign, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ViewPaymentCardProps {
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

const ViewPaymentCard = ({ open, onOpenChange, payment }: ViewPaymentCardProps) => {
  const handleGenerateReport = () => {
    // Handle report generation logic
    console.log("Generating report for payment:", payment.id);
  };

  const handleDownloadPdf = () => {
    // Handle PDF download logic
    console.log("Downloading PDF for payment:", payment.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Payment Details</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center mb-6">
            <div className="bg-tea-light/20 p-3 rounded-full mr-3">
              <DollarSign className="h-6 w-6 text-tea-dark" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{payment.period}</h2>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {payment.status}
              </span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Payment Date</p>
                  <p className="font-medium">{payment.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pluckers Count</p>
                  <p className="font-medium">{payment.pluckerCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium text-xl">${payment.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Average Per Plucker</p>
                  <p className="font-medium">${(payment.totalAmount / payment.pluckerCount).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="summary" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="pluckers">Pluckers</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Payment Period
                      </h3>
                      <p className="text-gray-600 pl-6">1st - 30th {payment.period}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Payment Method
                      </h3>
                      <p className="text-gray-600 pl-6">Bank Transfer</p>
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Top Earners
                      </h3>
                      <div className="pl-6 mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span>Mary Johnson</span>
                          <span className="font-medium">$125.50</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Robert Smith</span>
                          <span className="font-medium">$118.75</span>
                        </div>
                        <div className="flex justify-between">
                          <span>James Brown</span>
                          <span className="font-medium">$112.20</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pluckers" className="pt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="max-h-60 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Collection (kg)</th>
                          <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase">Amount ($)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr>
                          <td className="py-2 px-4">Mary Johnson</td>
                          <td className="py-2 px-4">50.2</td>
                          <td className="py-2 px-4">$125.50</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">Robert Smith</td>
                          <td className="py-2 px-4">47.5</td>
                          <td className="py-2 px-4">$118.75</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">James Brown</td>
                          <td className="py-2 px-4">44.8</td>
                          <td className="py-2 px-4">$112.20</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">Patricia White</td>
                          <td className="py-2 px-4">42.1</td>
                          <td className="py-2 px-4">$105.25</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">David Lee</td>
                          <td className="py-2 px-4">41.5</td>
                          <td className="py-2 px-4">$103.75</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

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

export default ViewPaymentCard;
