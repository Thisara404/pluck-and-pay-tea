
import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { PlusIcon, Search, Filter, User, Eye, Pencil, FileText } from 'lucide-react';
import AddPluckerForm from '@/components/pluckers/AddPluckerForm';
import ViewPluckerCard from '@/components/pluckers/ViewPluckerCard';
import EditPluckerCard from '@/components/pluckers/EditPluckerCard';

// Sample pluckers data
const pluckersData = [
  { id: 1, name: "Mary Johnson", phone: "0771234567", joinDate: "2022-01-15", status: "active", collection: 345, address: "123 Tea Gardens, Kericho" },
  { id: 2, name: "Robert Smith", phone: "0727654321", joinDate: "2021-06-22", status: "active", collection: 332, address: "456 Green Valley, Kericho" },
  { id: 3, name: "James Brown", phone: "0761112233", joinDate: "2022-03-10", status: "active", collection: 310, address: "789 Hill View, Nandi Hills" },
  { id: 4, name: "Patricia White", phone: "0784455667", joinDate: "2023-01-05", status: "active", collection: 295, address: "234 Tea Lane, Kericho" },
  { id: 5, name: "David Lee", phone: "0758877665", joinDate: "2021-11-30", status: "inactive", collection: 290, address: "567 Mountain Road, Nandi Hills" },
  { id: 6, name: "Sarah Taylor", phone: "0799887766", joinDate: "2022-08-12", status: "active", collection: 280, address: "890 Farm Avenue, Kericho" },
  { id: 7, name: "Thomas Anderson", phone: "0712233445", joinDate: "2023-04-01", status: "active", collection: 275, address: "345 Valley View, Limuru" },
  { id: 8, name: "Jennifer Wilson", phone: "0776655443", joinDate: "2022-05-20", status: "inactive", collection: 260, address: "678 Highland Road, Limuru" },
];

const Pluckers = () => {
  const [isAddPluckerOpen, setIsAddPluckerOpen] = useState(false);
  const [isViewPluckerOpen, setIsViewPluckerOpen] = useState(false);
  const [isEditPluckerOpen, setIsEditPluckerOpen] = useState(false);
  const [selectedPlucker, setSelectedPlucker] = useState(pluckersData[0]);

  const handleViewPlucker = (plucker: typeof pluckersData[0]) => {
    setSelectedPlucker(plucker);
    setIsViewPluckerOpen(true);
  };

  const handleEditPlucker = (plucker: typeof pluckersData[0]) => {
    setSelectedPlucker(plucker);
    setIsEditPluckerOpen(true);
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tea Pluckers</h1>
        <Button 
          className="bg-tea-dark hover:bg-tea-dark/90"
          onClick={() => setIsAddPluckerOpen(true)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Plucker
        </Button>
      </div>

      {/* Add Plucker Form Dialog */}
      <AddPluckerForm 
        open={isAddPluckerOpen} 
        onOpenChange={setIsAddPluckerOpen} 
      />

      {/* View Plucker Card Dialog */}
      <ViewPluckerCard 
        open={isViewPluckerOpen} 
        onOpenChange={setIsViewPluckerOpen}
        plucker={selectedPlucker}
      />

      {/* Edit Plucker Card Dialog */}
      <EditPluckerCard 
        open={isEditPluckerOpen} 
        onOpenChange={setIsEditPluckerOpen}
        plucker={selectedPlucker}
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search pluckers..."
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tea-light"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tea-light">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Collection (kg)</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pluckersData.map((plucker) => (
                <tr key={plucker.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="bg-tea-brown/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-tea-brown" />
                      </div>
                      <span className="font-medium text-gray-800">{plucker.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{plucker.phone}</td>
                  <td className="px-6 py-4 text-gray-700">{plucker.joinDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      plucker.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {plucker.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{plucker.collection} kg</td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mr-2 flex items-center"
                      onClick={() => handleViewPlucker(plucker)}
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center"
                      onClick={() => handleEditPlucker(plucker)}
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">Showing 1-8 of 8 pluckers</p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pluckers;
