
import React from 'react';
import { CalendarIcon, Clock } from 'lucide-react';

// Sample activity data
const activities = [
  {
    id: 1,
    action: "Daily collection recorded",
    user: "John Doe",
    details: "Added 45 kg of tea leaves",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Payment processed",
    user: "Admin",
    details: "Monthly payment for 15 pluckers",
    time: "5 hours ago",
  },
  {
    id: 3,
    action: "New plucker added",
    user: "Admin",
    details: "Sarah Johnson joined the team",
    time: "Yesterday",
  },
  {
    id: 4,
    action: "Price update",
    user: "Admin",
    details: "Tea leaf price updated to $2.50/kg",
    time: "2 days ago",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        <button className="text-sm text-tea-dark hover:text-tea-dark/70">View all</button>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className="bg-tea-light/10 p-2 rounded-full mr-4">
              <CalendarIcon className="h-5 w-5 text-tea-dark" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-800">{activity.action}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {activity.time}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">{activity.user}</span> · {activity.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
