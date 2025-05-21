
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { PlusIcon, Calendar, Search, Filter, ChevronDown, LeafIcon } from 'lucide-react';

// Sample records data
const recordsData = [
  { id: 1, date: "2023-05-15", totalWeight: 85, pluckerCount: 12, averagePrice: 2.5 },
  { id: 2, date: "2023-05-14", totalWeight: 92, pluckerCount: 14, averagePrice: 2.5 },
  { id: 3, date: "2023-05-13", totalWeight: 78, pluckerCount: 11, averagePrice: 2.5 },
  { id: 4, date: "2023-05-12", totalWeight: 88, pluckerCount: 13, averagePrice: 2.5 },
  { id: 5, date: "2023-05-11", totalWeight: 95, pluckerCount: 15, averagePrice: 2.5 },
  { id: 6, date: "2023-05-10", totalWeight: 82, pluckerCount: 12, averagePrice: 2.2 },
  { id: 7, date: "2023-05-09", totalWeight: 79, pluckerCount: 11, averagePrice: 2.2 },
  { id: 8, date: "2023-05-08", totalWeight: 86, pluckerCount: 13, averagePrice: 2.2 },
];

const Records = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daily Collection Records</h1>
        <Button className="bg-tea-dark hover:bg-tea-dark/90">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Record
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <Calendar className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Selected Date Range</p>
              <p className="font-medium">May 8 - 15, 2023</p>
            </div>
          </div>
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <LeafIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Collection</p>
              <p className="font-medium">685 kg</p>
            </div>
          </div>
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <LeafIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Daily</p>
              <p className="font-medium">85.6 kg</p>
            </div>
          </div>
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <LeafIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Price/kg</p>
              <p className="font-medium">$2.4</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" className="flex items-center mr-2">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search records..."
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
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Weight (kg)</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Pluckers</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Average Price</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recordsData.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-tea-dark mr-2" />
                      <span className="font-medium text-gray-800">{record.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{record.totalWeight} kg</td>
                  <td className="px-6 py-4 text-gray-700">{record.pluckerCount}</td>
                  <td className="px-6 py-4 text-gray-700">${record.averagePrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-700">${(record.totalWeight * record.averagePrice).toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" className="mr-2">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">Showing 1-8 of 30 records</p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Records;
