
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { LeafIcon, UsersIcon, CalendarIcon, DollarSignIcon, BarChart3Icon } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: <LeafIcon className="w-5 h-5" />, path: "/" },
  { name: "Pluckers", icon: <UsersIcon className="w-5 h-5" />, path: "/pluckers" },
  { name: "Daily Records", icon: <CalendarIcon className="w-5 h-5" />, path: "/records" },
  { name: "Payments", icon: <DollarSignIcon className="w-5 h-5" />, path: "/payments" },
  { name: "Reports", icon: <BarChart3Icon className="w-5 h-5" />, path: "/reports" },
];

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-gray-200">
        <LeafIcon className="text-tea-dark mr-2 h-6 w-6" />
        {!collapsed && (
          <span className="font-bold text-tea-dark text-xl">Tea Manager</span>
        )}
        <button
          className="ml-auto text-gray-500 hover:text-gray-700"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex-1 pt-5">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-gray-700 hover:bg-tea-light/10 hover:text-tea-dark",
                  location.pathname === item.path && "bg-tea-light/20 text-tea-dark border-r-4 border-tea-dark",
                  collapsed ? "justify-center" : ""
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className={cn(
          "flex items-center",
          collapsed ? "justify-center" : ""
        )}>
          <div className="bg-tea-gold/30 p-2 rounded-full">
            <LeafIcon className="w-5 h-5 text-tea-brown" />
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Tea Estate</p>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
