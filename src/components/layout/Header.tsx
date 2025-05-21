
import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const Header = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'New plucker registered', time: '10 minutes ago', read: false },
    { id: 2, title: 'Daily collection report ready', time: '1 hour ago', read: false },
    { id: 3, title: 'Payment processed successfully', time: '3 hours ago', read: true },
    { id: 4, title: 'System maintenance scheduled', time: 'Yesterday', read: true },
  ];

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-tea-dark">Tea Plantation Management</h1>
        <p className="text-sm text-gray-500">Manage your tea pluckers and payments</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-tea-light"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        <Popover open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
          <PopoverTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-tea-gold rounded-full"></span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="bg-white rounded-md shadow-lg">
              <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs bg-tea-gold/20 text-tea-brown px-2 py-0.5 rounded-full">
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div>
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-tea-light/5' : ''}`}
                      >
                        <div className="flex items-start">
                          {!notification.read && (
                            <span className="mt-1.5 mr-2 w-2 h-2 bg-tea-gold rounded-full flex-shrink-0"></span>
                          )}
                          <div className={`${notification.read ? 'pl-4' : ''}`}>
                            <p className="text-sm font-medium">{notification.title}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>No notifications</p>
                  </div>
                )}
              </div>
              <div className="px-4 py-2 border-t border-gray-100 text-center">
                <button 
                  className="text-sm text-tea-dark hover:underline"
                  onClick={() => setIsNotificationsOpen(false)}
                >
                  Mark all as read
                </button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Link to="/profile" className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-full">
          <div className="w-8 h-8 bg-tea-brown/20 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-tea-brown" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">Estate Manager</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
