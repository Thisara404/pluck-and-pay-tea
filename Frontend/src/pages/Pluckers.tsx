import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { PlusIcon, Search, Filter, User, Eye, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import AddPluckerForm from '@/components/pluckers/AddPluckerForm';
import ViewPluckerCard from '@/components/pluckers/ViewPluckerCard';
import EditPluckerCard from '@/components/pluckers/EditPluckerCard';
import api from '../lib/api'; // Import the API client
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define the plucker type
interface Plucker {
  _id: string;
  name: string;
  phone: string;
  joinDate: string;
  status: string;
  collection: number;
  address: string;
}

const Pluckers = () => {
  const [isAddPluckerOpen, setIsAddPluckerOpen] = useState(false);
  const [isViewPluckerOpen, setIsViewPluckerOpen] = useState(false);
  const [isEditPluckerOpen, setIsEditPluckerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pluckers, setPluckers] = useState<Plucker[]>([]);
  const [selectedPlucker, setSelectedPlucker] = useState<Plucker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Fetch pluckers from the backend
  const fetchPluckers = async () => {
    try {
      setIsLoading(true);
      
      const response = await api.get('/pluckers');
      console.log('Pluckers response:', response.data);
      setPluckers(response.data);
      
      // If we have pluckers, select the first one as default
      if (response.data.length > 0) {
        setSelectedPlucker(response.data[0]);
      }
    } catch (error: any) {
      console.error('Error fetching pluckers:', error);
      toast.error(error.response?.data?.message || 'Failed to load pluckers');
    } finally {
      setIsLoading(false);
    }
  };

  // Load pluckers when component mounts
  useEffect(() => {
    fetchPluckers();
  }, []);

  const handleViewPlucker = (plucker: Plucker) => {
    setSelectedPlucker(plucker);
    setIsViewPluckerOpen(true);
  };

  const handleEditPlucker = (plucker: Plucker) => {
    setSelectedPlucker(plucker);
    setIsEditPluckerOpen(true);
  };

  const handleDeletePlucker = (plucker: Plucker) => {
    setSelectedPlucker(plucker);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPlucker) return;
    
    try {
      await api.delete(`/pluckers/${selectedPlucker._id}`);
      
      toast.success('Plucker deleted successfully');
      fetchPluckers();
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      console.error('Error deleting plucker:', error);
      toast.error(error.response?.data?.message || 'Failed to delete plucker');
    }
  };

  // Handle successful plucker creation
  const handlePluckerCreated = () => {
    fetchPluckers();
    setIsAddPluckerOpen(false);
    toast.success('Plucker added successfully');
  };

  // Handle successful plucker update
  const handlePluckerUpdated = () => {
    fetchPluckers();
    setIsEditPluckerOpen(false);
    toast.success('Plucker updated successfully');
  };

  // Filter pluckers based on search term and status
  const filteredPluckers = pluckers.filter(plucker => {
    const matchesSearch = plucker.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         plucker.phone.includes(searchTerm);
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && plucker.status === statusFilter;
  });

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
      {isAddPluckerOpen && (
        <AddPluckerForm 
          open={isAddPluckerOpen} 
          onOpenChange={setIsAddPluckerOpen}
          onSuccess={handlePluckerCreated}
        />
      )}

      {/* View Plucker Card Dialog */}
      {selectedPlucker && isViewPluckerOpen && (
        <ViewPluckerCard 
          open={isViewPluckerOpen} 
          onOpenChange={setIsViewPluckerOpen}
          plucker={selectedPlucker}
        />
      )}

      {/* Edit Plucker Card Dialog */}
      {selectedPlucker && isEditPluckerOpen && (
        <EditPluckerCard 
          open={isEditPluckerOpen} 
          onOpenChange={setIsEditPluckerOpen}
          plucker={selectedPlucker}
          onSuccess={handlePluckerUpdated}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the plucker{" "}
              <span className="font-medium">{selectedPlucker?.name}</span>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search pluckers..."
              className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tea-light"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-tea-light"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="py-10 text-center">Loading pluckers...</div>
        ) : (
          <>
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
                  {filteredPluckers.length > 0 ? (
                    filteredPluckers.map((plucker) => (
                      <tr key={plucker._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="bg-tea-brown/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                              <User className="h-5 w-5 text-tea-brown" />
                            </div>
                            <span className="font-medium text-gray-800">{plucker.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{plucker.phone}</td>
                        <td className="px-6 py-4 text-gray-700">{new Date(plucker.joinDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            plucker.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {plucker.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{plucker.collection} kg</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex">
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
                              className="mr-2 flex items-center"
                              onClick={() => handleEditPlucker(plucker)}
                            >
                              <Pencil className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center text-red-500 border-red-200 hover:bg-red-50"
                              onClick={() => handleDeletePlucker(plucker)}
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                        No pluckers found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-500">
                Showing {filteredPluckers.length} of {pluckers.length} pluckers
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Pluckers;