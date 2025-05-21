
import React from 'react';
import Layout from '../components/layout/Layout';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import TeaCollectionChart from '../components/dashboard/TeaCollectionChart';
import TopPluckers from '../components/dashboard/TopPluckers';
import { LeafIcon, UsersIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';

const Dashboard = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Total Collection" 
          value="1,245 kg" 
          icon={<LeafIcon className="h-5 w-5 text-tea-dark" />}
          description="May 1-30, 2023"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Active Pluckers" 
          value="42" 
          icon={<UsersIcon className="h-5 w-5 text-tea-dark" />}
          trend={{ value: 4, isPositive: true }}
        />
        <StatsCard 
          title="Collection Days" 
          value="24" 
          icon={<CalendarIcon className="h-5 w-5 text-tea-dark" />}
          description="This month"
        />
        <StatsCard 
          title="Total Payments" 
          value="$3,890" 
          icon={<DollarSignIcon className="h-5 w-5 text-tea-dark" />}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TeaCollectionChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TopPluckers />
      </div>
    </Layout>
  );
};

export default Dashboard;
