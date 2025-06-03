import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddRecordFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  apiUrl: string;
}

type Plucker = {
  _id: string;
  name: string;
}

type RecordFormValues = {
  date: string;
  pluckerCount: number;
  totalWeight: number;
  averagePrice: number;
  pluckerDetails: {
    pluckerId: string;
    weight: number;
  }[];
};

const AddRecordForm = ({ open, onOpenChange, onSuccess, apiUrl }: AddRecordFormProps) => {
  const [pluckers, setPluckers] = useState<Plucker[]>([]);
  const [pluckerEntries, setPluckerEntries] = useState<{id: string, pluckerId: string, weight: number}[]>(
    [{ id: Date.now().toString(), pluckerId: "", weight: 0 }]
  );
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<RecordFormValues>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      pluckerCount: 1,
      totalWeight: 0,
      averagePrice: 2.5,
      pluckerDetails: []
    }
  });

  // Fetch pluckers for dropdown selection
  useEffect(() => {
    const fetchPluckers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("Authentication required");
          return;
        }

        const response = await axios.get(`${apiUrl}/pluckers`, {
          headers: {
            'x-auth-token': token
          }
        });
        
        // Make sure the data is an array before setting it
        if (Array.isArray(response.data)) {
          setPluckers(response.data);
        } else {
          console.error("Expected array of pluckers but got:", response.data);
          setPluckers([]); // Initialize as empty array
          toast.error("Failed to load pluckers data");
        }
      } catch (error) {
        console.error("Failed to fetch pluckers:", error);
        toast.error("Failed to load pluckers");
        setPluckers([]); // Initialize as empty array in case of error
      }
    };
    
    if (open) {
      fetchPluckers();
    }
  }, [open, apiUrl]);

  // Add a new plucker entry row
  const addPluckerEntry = () => {
    setPluckerEntries([
      ...pluckerEntries,
      { id: Date.now().toString(), pluckerId: "", weight: 0 }
    ]);
    
    // Update form values
    setValue("pluckerCount", pluckerEntries.length + 1);
  };

  // Remove a plucker entry row
  const removePluckerEntry = (id: string) => {
    // Don't remove if it's the only entry
    if (pluckerEntries.length <= 1) return;
    
    const updatedEntries = pluckerEntries.filter(entry => entry.id !== id);
    setPluckerEntries(updatedEntries);
    
    // Update form values
    setValue("pluckerCount", updatedEntries.length);
  };

  // Update a plucker entry field
  const updatePluckerEntry = (id: string, field: 'pluckerId' | 'weight', value: string | number) => {
    const updatedEntries = pluckerEntries.map(entry => {
      if (entry.id === id) {
        return { ...entry, [field]: value };
      }
      return entry;
    });
    
    setPluckerEntries(updatedEntries);
    
    // Calculate total weight
    if (field === 'weight') {
      const totalWeight = updatedEntries.reduce((sum, entry) => sum + (Number(entry.weight) || 0), 0);
      setValue("totalWeight", totalWeight);
    }
  };

  const onSubmit = async (data: RecordFormValues) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Authentication required");
        return;
      }

      // Format the data for submission
      const pluckerDetails = pluckerEntries.filter(entry => entry.pluckerId && entry.weight > 0)
        .map(entry => ({
          pluckerId: entry.pluckerId,
          weight: Number(entry.weight)
        }));
      
      if (pluckerDetails.length === 0) {
        toast.error("Please add at least one plucker with weight");
        setIsLoading(false);
        return;
      }

      const recordData = {
        date: data.date,
        pluckerCount: pluckerDetails.length,
        totalWeight: data.totalWeight,
        averagePrice: data.averagePrice,
        pluckerDetails: pluckerDetails
      };

      const response = await axios.post(`${apiUrl}/records`, recordData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });

      reset();
      setPluckerEntries([{ id: Date.now().toString(), pluckerId: "", weight: 0 }]);
      
      if (onSuccess) {
        onSuccess();
      } else {
        onOpenChange(false);
        toast.success("Record added successfully");
      }
    } catch (error: any) {
      console.error("Error creating record:", error);
      toast.error(error.response?.data?.message || "Failed to add record");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add New Collection Record</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Collection Date</Label>
              <Input 
                id="date"
                type="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="averagePrice">Average Price per kg (LKR)</Label>
              <Input 
                id="averagePrice"
                type="number"
                step="0.1"
                {...register("averagePrice", { 
                  required: "Price is required",
                  valueAsNumber: true,
                  min: {
                    value: 0.1,
                    message: "Price must be greater than 0"
                  }
                })}
              />
              {errors.averagePrice && <p className="text-sm text-destructive">{errors.averagePrice.message}</p>}
            </div>

            <div className="border p-4 rounded-md bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Plucker Details</h3>
                <Button 
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={addPluckerEntry}
                >
                  Add Plucker
                </Button>
              </div>
              
              <div className="space-y-4">
                {pluckerEntries.map((entry, index) => (
                  <div key={entry.id} className="grid grid-cols-7 gap-2 items-end">
                    <div className="col-span-4">
                      <Label htmlFor={`plucker-${entry.id}`} className="text-sm">Plucker</Label>
                      <Select
                        value={entry.pluckerId}
                        onValueChange={(value) => updatePluckerEntry(entry.id, 'pluckerId', value)}
                      >
                        <SelectTrigger id={`plucker-${entry.id}`}>
                          <SelectValue placeholder="Select plucker" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.isArray(pluckers) ? 
                            pluckers.map((plucker) => (
                              <SelectItem key={plucker._id} value={plucker._id}>{plucker.name}</SelectItem>
                            ))
                            : 
                            <SelectItem value="">No pluckers available</SelectItem>
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor={`weight-${entry.id}`} className="text-sm">Weight (kg)</Label>
                      <Input
                        id={`weight-${entry.id}`}
                        type="number"
                        step="0.1"
                        value={entry.weight}
                        onChange={(e) => updatePluckerEntry(entry.id, 'weight', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className="text-red-500 h-9"
                        onClick={() => removePluckerEntry(entry.id)}
                        disabled={pluckerEntries.length <= 1}
                      >
                        ✕
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-md">
              <div>
                <p className="text-sm text-gray-500">Total pluckers:</p>
                <p className="font-medium">{pluckerEntries.filter(e => e.pluckerId && e.weight > 0).length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total weight:</p>
                <p className="font-medium">{watch("totalWeight")} kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total value:</p>
                <p className="font-medium">${(watch("totalWeight") * watch("averagePrice")).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-tea-dark hover:bg-tea-dark/90"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Record'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecordForm;
