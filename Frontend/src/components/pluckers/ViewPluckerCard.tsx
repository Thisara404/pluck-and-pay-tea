import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Calendar, Star, Trash, Edit, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import EditPluckerCard from "./EditPluckerCard";
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
import { useNavigate } from "react-router-dom";

interface Plucker {
  _id: string;
  name: string;
  phone: string;
  address?: string;
  status: "active" | "inactive";
  collection: number;
  joinDate: string;
  createdAt: string;
}

interface ViewPluckerCardProps {
  plucker: Plucker;
}

const ViewPluckerCard = ({ plucker }: ViewPluckerCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Format join date
  const joinDate = new Date(plucker.joinDate);
  const joinDateString = joinDate.toLocaleDateString();
  const joinDuration = formatDistanceToNow(joinDate, { addSuffix: true });

  const deletePluckerMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/pluckers/${plucker._id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pluckers"] });
      toast({
        title: "Plucker deleted",
        description: "The plucker has been removed from the system.",
        variant: "default",
      });
      // If on the plucker detail page, navigate away
      if (window.location.pathname.includes(plucker._id)) {
        navigate("/pluckers");
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error deleting plucker",
        description:
          error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    setIsDeleteAlertOpen(false);
    deletePluckerMutation.mutate();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{plucker.name}</CardTitle>
              <CardDescription>
                Joined {joinDateString} ({joinDuration})
              </CardDescription>
            </div>
            <Badge variant={plucker.status === "active" ? "default" : "secondary"}>
              {plucker.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-tea-dark" />
              <span>{plucker.phone}</span>
            </div>
            
            {plucker.address && (
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-tea-dark" />
                <span>{plucker.address}</span>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-tea-dark" />
              <span>{plucker.collection} kg collected</span>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditDialogOpen(true)}
                className="flex items-center space-x-1"
              >
                <Edit className="h-4 w-4 mr-1" /> Edit
              </Button>
              
              <div className="space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteAlertOpen(true)}
                  className="flex items-center space-x-1"
                >
                  <Trash className="h-4 w-4 mr-1" /> Delete
                </Button>
                
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate(`/pluckers/${plucker._id}`)}
                  className="bg-tea-brown hover:bg-tea-brown/90 flex items-center"
                >
                  View Details <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <EditPluckerCard plucker={plucker} onClose={() => setIsEditDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the plucker "{plucker.name}" and all associated records.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ViewPluckerCard;
