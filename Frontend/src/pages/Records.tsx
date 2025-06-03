import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '@/components/ui/button';
import { PlusIcon, Calendar, Search, Filter, ChevronDown, LeafIcon, Eye, Pencil, Download, Trash2, AlertTriangle } from 'lucide-react';
import AddRecordForm from '@/components/records/AddRecordForm';
import ViewRecordCard from '@/components/records/ViewRecordCard';
import EditRecordCard from '@/components/records/EditRecordCard';
import api, { API_URL } from '../lib/api'; // Import the API client
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

// Define the record type based on backend model
interface Record {
  _id: string;
  date: string;
  totalWeight: number;
  pluckerCount: number;
  averagePrice: number;
  pluckerDetails?: {
    pluckerId: string;
    weight: number;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

const Records = () => {
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [isViewRecordOpen, setIsViewRecordOpen] = useState(false);
  const [isEditRecordOpen, setIsEditRecordOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('');
  
  // Analytics data
  const [analytics, setAnalytics] = useState({
    totalWeight: 0,
    averageDaily: 0,
    averagePrice: 0,
    selectedDateRange: 'Last 7 days'
  });
  
  // Fetch records from the backend
  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      
      // Use the API client for requests
      const response = await api.get('/records');
      console.log('Records response:', response.data);
      
      // Update state with fetched data
      setRecords(response.data);
      
      // If we have records, calculate analytics
      if (response.data.length > 0) {
        const totalWeight = response.data.reduce((acc: number, record: Record) => acc + record.totalWeight, 0);
        const averageDaily = totalWeight / response.data.length;
        const averagePrice = response.data.reduce((acc: number, record: Record) => acc + record.averagePrice, 0) / response.data.length;
        
        setAnalytics({
          totalWeight,
          averageDaily: Math.round(averageDaily * 10) / 10,
          averagePrice: Math.round(averagePrice * 100) / 100,
          selectedDateRange: 'Last 7 days'
        });
        
        // Set the default selected record if available
        setSelectedRecord(response.data[0]);
      }
    } catch (error: any) {
      console.error('Error fetching records:', error);
      toast.error(error.response?.data?.message || 'Failed to load records');
      
      // You could add fallback data here if needed
    } finally {
      setIsLoading(false);
    }
  };

  // Load records when component mounts
  useEffect(() => {
    fetchRecords();
  }, []);

  const handleViewRecord = (record: Record) => {
    setSelectedRecord(record);
    setIsViewRecordOpen(true);
  };

  const handleEditRecord = (record: Record) => {
    setSelectedRecord(record);
    setIsEditRecordOpen(true);
  };

  const handleDeleteRecord = (record: Record) => {
    setSelectedRecord(record);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRecord) return;
    
    try {
      await api.delete(`/records/${selectedRecord._id}`);
      
      toast.success('Record deleted successfully');
      fetchRecords();
      setIsDeleteDialogOpen(false);
    } catch (error: any) {
      console.error('Error deleting record:', error);
      toast.error(error.response?.data?.message || 'Failed to delete record');
    }
  };

  // Handle successful record creation
  const handleRecordCreated = () => {
    fetchRecords();
    setIsAddRecordOpen(false);
    toast.success('Record added successfully');
  };

  // Handle successful record update
  const handleRecordUpdated = () => {
    fetchRecords();
    setIsEditRecordOpen(false);
    toast.success('Record updated successfully');
  };

  // Filter records based on search term
  const filteredRecords = records.filter(record => {
    if (!searchTerm) return true;
    
    const recordDate = new Date(record.date).toLocaleDateString();
    return recordDate.includes(searchTerm);
  });

  const handleDownloadPdf = (recordId: string) => {
    // Handle PDF download logic
    console.log("Downloading PDF for record:", recordId);
    toast.success("PDF download started");
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Daily Collection Records</h1>
        <Button 
          className="bg-tea-dark hover:bg-tea-dark/90"
          onClick={() => setIsAddRecordOpen(true)}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Record
        </Button>
      </div>

      {/* Add Record Form Dialog */}
      {isAddRecordOpen && (
        <AddRecordForm 
          open={isAddRecordOpen} 
          onOpenChange={setIsAddRecordOpen}
          onSuccess={handleRecordCreated}
          apiUrl={API_URL}  // Add this prop
        />
      )}

      {/* View Record Dialog */}
      {selectedRecord && isViewRecordOpen && (
        <ViewRecordCard 
          open={isViewRecordOpen} 
          onOpenChange={setIsViewRecordOpen}
          record={selectedRecord}
        />
      )}

      {/* Edit Record Dialog */}
      {selectedRecord && isEditRecordOpen && (
        <EditRecordCard 
          open={isEditRecordOpen} 
          onOpenChange={setIsEditRecordOpen}
          record={selectedRecord}
          onSuccess={handleRecordUpdated}
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
              Are you sure you want to delete the record from{" "}
              <span className="font-medium">{selectedRecord ? new Date(selectedRecord.date).toLocaleDateString() : ''}</span>?
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <Calendar className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Selected Date Range</p>
              <p className="font-medium">{analytics.selectedDateRange}</p>
            </div>
          </div>
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <LeafIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Collection</p>
              <p className="font-medium">{analytics.totalWeight} kg</p>
            </div>
          </div>
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <LeafIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Daily</p>
              <p className="font-medium">{analytics.averageDaily} kg</p>
            </div>
          </div>
          <div className="p-4 bg-tea-light/10 rounded-lg flex items-center">
            <div className="bg-tea-light/30 p-3 rounded-full mr-4">
              <LeafIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg Price/kg</p>
              <p className="font-medium">${analytics.averagePrice.toFixed(2)}</p>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <Button variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {isLoading ? (
          <div className="py-10 text-center">Loading records...</div>
        ) : (
          <>
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
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                      <tr key={record._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-tea-dark mr-2" />
                            <span className="font-medium text-gray-800">{new Date(record.date).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{record.totalWeight} kg</td>
                        <td className="px-6 py-4 text-gray-700">{record.pluckerCount}</td>
                        <td className="px-6 py-4 text-gray-700">LKR {record.averagePrice.toFixed(2)}</td>
                        <td className="px-6 py-4 text-gray-700">LKR {(record.totalWeight * record.averagePrice).toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <div className="flex">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mr-2 flex items-center"
                              onClick={() => handleViewRecord(record)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="mr-2 flex items-center"
                              onClick={() => handleEditRecord(record)}
                            >
                              <Pencil className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="mr-2 flex items-center"
                              onClick={() => handleDownloadPdf(record._id)}
                            >
                              <Download className="h-3.5 w-3.5 mr-1" />
                              PDF
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center text-red-500 border-red-200 hover:bg-red-50"
                              onClick={() => handleDeleteRecord(record)}
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
                        No records found matching your search criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-500">
                Showing {filteredRecords.length} of {records.length} records
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

export default Records;
