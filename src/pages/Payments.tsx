
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { PlusIcon, Calendar, Search, Filter, ChevronDown, DollarSignIcon, CheckIcon, XIcon } from 'lucide-react';

// Sample payments data
const paymentsData = [
  { id: 1, period: "May 2023", status: "completed", pluckerCount: 42, totalAmount: 3890, date: "2023-05-31" },
  { id: 2, period: "April 2023", status: "completed", pluckerCount: 40, totalAmount: 3720, date: "2023-04-30" },
  { id: 3, period: "March 2023", status: "completed", pluckerCount: 38, totalAmount: 3540, date: "2023-03-31" },
  { id: 4, period: "February 2023", status: "completed", pluckerCount: 35, totalAmount: 3250, date: "2023-02-28" },
  { id: 5, period: "January 2023", status: "completed", pluckerCount: 36, totalAmount: 3380, date: "2023-01-31" },
];

const Payments = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
        <Button className="bg-tea-dark hover:bg-tea-dark/90">
          <PlusIcon className="h-4 w-4 mr-2" />
          Process New Payment
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <DollarSignIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount Paid</p>
              <p className="font-medium">$17,780</p>
            </div>
          </div>
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <Calendar className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Periods</p>
              <p className="font-medium">5 Months</p>
            </div>
          </div>
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <CheckIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Average</p>
              <p className="font-medium">$3,556</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="outline" className="flex items-center mr-2">
              <Calendar className="h-4 w-4 mr-2" />
              Year
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search payments..."
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
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Period</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Pluckers Count</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paymentsData.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-tea-dark mr-2" />
                      <span className="font-medium text-gray-800">{payment.period}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{payment.pluckerCount}</td>
                  <td className="px-6 py-4 text-gray-700">${payment.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-700">{payment.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" className="mr-2">View</Button>
                    <Button variant="outline" size="sm">Report</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">Showing 1-5 of 5 payments</p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payments;
