
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Calendar, Search, Filter, ChevronDown, FileTextIcon, DownloadIcon, BarChart3Icon, DollarSignIcon, UsersIcon } from 'lucide-react';
import GenerateReportForm from '@/components/reports/GenerateReportForm';

// Sample reports data
const reportsData = [
  { 
    id: 1, 
    title: "Monthly Collection Summary", 
    period: "May 2023", 
    type: "collection", 
    created: "2023-05-31", 
    downloads: 12 
  },
  { 
    id: 2, 
    title: "Monthly Payment Report", 
    period: "May 2023", 
    type: "payment", 
    created: "2023-05-31", 
    downloads: 10 
  },
  { 
    id: 3, 
    title: "Pluckers Performance Analysis", 
    period: "May 2023", 
    type: "performance", 
    created: "2023-05-31", 
    downloads: 8 
  },
  { 
    id: 4, 
    title: "Monthly Collection Summary", 
    period: "April 2023", 
    type: "collection", 
    created: "2023-04-30", 
    downloads: 15 
  },
  { 
    id: 5, 
    title: "Monthly Payment Report", 
    period: "April 2023", 
    type: "payment", 
    created: "2023-04-30", 
    downloads: 14 
  },
];

// Function to get the icon for each report type
const getReportIcon = (type: string) => {
  switch (type) {
    case 'collection':
      return <BarChart3Icon className="h-5 w-5 text-tea-dark" />;
    case 'payment':
      return <DollarSignIcon className="h-5 w-5 text-tea-dark" />;
    case 'performance':
      return <UsersIcon className="h-5 w-5 text-tea-dark" />;
    default:
      return <FileTextIcon className="h-5 w-5 text-tea-dark" />;
  }
};

const Reports = () => {
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <Button 
          className="bg-tea-dark hover:bg-tea-dark/90"
          onClick={() => setIsGenerateReportOpen(true)}
        >
          <FileTextIcon className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      {/* Generate Report Form Dialog */}
      <GenerateReportForm 
        open={isGenerateReportOpen} 
        onOpenChange={setIsGenerateReportOpen} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-tea-light/30 p-3 rounded-full">
              <BarChart3Icon className="h-5 w-5 text-tea-dark" />
            </div>
            <span className="text-sm text-gray-500">Collection</span>
          </div>
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-sm text-gray-500">Total reports</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-tea-light/30 p-3 rounded-full">
              <DollarSignIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <span className="text-sm text-gray-500">Payment</span>
          </div>
          <h3 className="text-2xl font-bold">8</h3>
          <p className="text-sm text-gray-500">Total reports</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-tea-light/30 p-3 rounded-full">
              <UsersIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <span className="text-sm text-gray-500">Performance</span>
          </div>
          <h3 className="text-2xl font-bold">4</h3>
          <p className="text-sm text-gray-500">Total reports</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-tea-light/30 p-3 rounded-full">
              <DownloadIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <span className="text-sm text-gray-500">Downloads</span>
          </div>
          <h3 className="text-2xl font-bold">59</h3>
          <p className="text-sm text-gray-500">All time</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" className="flex items-center mr-2">
              <Calendar className="h-4 w-4 mr-2" />
              Period
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search reports..."
                className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tea-light"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Report Title</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportsData.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="bg-tea-light/20 p-2 rounded-full mr-3">
                        {getReportIcon(report.type)}
                      </div>
                      <span className="font-medium text-gray-800">{report.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{report.period}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      report.type === 'collection' 
                        ? 'bg-blue-100 text-blue-800' 
                        : report.type === 'payment' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{report.created}</td>
                  <td className="px-6 py-4 text-gray-700">{report.downloads}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" className="mr-2">View</Button>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <DownloadIcon className="h-3.5 w-3.5 mr-1" />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">Showing 1-5 of 24 reports</p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
