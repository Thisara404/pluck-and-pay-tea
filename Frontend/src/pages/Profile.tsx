
import React from 'react';
import Layout from '../components/layout/Layout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

const Profile = () => {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-tea-dark mb-8">Admin Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="col-span-1">
            <CardHeader className="text-center pb-2">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-tea-brown/20 text-tea-brown text-xl">AU</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">Admin User</CardTitle>
              <p className="text-gray-500">Estate Manager</p>
            </CardHeader>
            <CardContent>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>admin@teaplantation.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>+94 77 123 4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>Kandy, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Joined Jan 2023</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats and Information */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">Admin User</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-medium">Estate Manager</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">Management</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">Central Highlands Estate</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Managed Estates</p>
                    <p className="font-medium">3 Estates</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Team Size</p>
                    <p className="font-medium">124 Pluckers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estate Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">Monthly Collection</h3>
                    <p className="text-2xl font-bold text-green-700">5,240 kg</p>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">Total Payouts</h3>
                    <p className="text-2xl font-bold text-amber-700">$12,450</p>
                    <p className="text-xs text-amber-600">For last month</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-500">Quality Rating</h3>
                    <p className="text-2xl font-bold text-blue-700">4.8/5.0</p>
                    <p className="text-xs text-blue-600">Grade A Premium</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
