import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import StatsCard from '../components/dashboard/StatsCard';
import RecentActivity from '../components/dashboard/RecentActivity';
import TeaCollectionChart from '../components/dashboard/TeaCollectionChart';
import TopPluckers from '../components/dashboard/TopPluckers';
import { LeafIcon, UsersIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const Dashboard = () => {
  const API_URL = 'http://localhost:5000/api';
  
  const [stats, setStats] = useState({
    totalCollection: 0,
    activePluckers: 0,
    collectionDays: 0,
    totalPayments: 0,
    collectionTrend: 0,
    pluckersTrend: 0,
    paymentsTrend: 0
  });
  
  const [chartData, setChartData] = useState([]);
  const [topPluckers, setTopPluckers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication required. Please login.');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch dashboard stats
        const statsResponse = await axios.get(`${API_URL}/reports/dashboard-stats`, {
          headers: { 'x-auth-token': token }
        });
        
        // Fetch recent records for chart data
        const recordsResponse = await axios.get(`${API_URL}/records?limit=14`, {
          headers: { 'x-auth-token': token }
        });
        
        // Fetch top pluckers
        const pluckersResponse = await axios.get(`${API_URL}/pluckers?sort=collection&limit=5`, {
          headers: { 'x-auth-token': token }
        });
        
        // Process data
        processStatsData(statsResponse.data);
        processChartData(recordsResponse.data);
        processPluckersData(pluckersResponse.data);
        
        // Generate some activity data based on records and pluckers
        generateActivityData(recordsResponse.data, pluckersResponse.data);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_URL]);

  const processStatsData = (data) => {
    // If the API returns dashboard stats directly, use that
    if (data && data.stats) {
      setStats(data.stats);
    } else {
      // If we need to calculate from various endpoints
      // This is a fallback in case the API doesn't have a dedicated dashboard stats endpoint
      setStats({
        totalCollection: data.totalCollection || 0,
        activePluckers: data.activePluckers || 0,
        collectionDays: data.collectionDays || 0,
        totalPayments: data.totalPayments || 0,
        collectionTrend: data.collectionTrend || 0,
        pluckersTrend: data.pluckersTrend || 0,
        paymentsTrend: data.paymentsTrend || 0
      });
    }
  };

  const processChartData = (records) => {
    if (!records || !Array.isArray(records)) return;
    
    // Transform records into chart data format
    const chartData = records.map(record => ({
      name: new Date(record.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      amount: record.totalWeight
    }));
    
    setChartData(chartData);
  };

  const processPluckersData = (pluckers) => {
    if (!pluckers || !Array.isArray(pluckers)) return;
    
    // Transform pluckers data for the TopPluckers component
    const processedPluckers = pluckers.map(plucker => ({
      id: plucker._id,
      name: plucker.name,
      amount: plucker.collection || 0,
      // Calculate efficiency - can be adjusted based on your business logic
      efficiency: Math.min(95, Math.round((plucker.collection / (stats.totalCollection || 1)) * 100 * 3)) 
    }));
    
    setTopPluckers(processedPluckers);
  };

  const generateActivityData = (records, pluckers) => {
    const activities = [];
    
    // Generate activities based on the most recent records
    if (records && Array.isArray(records) && records.length > 0) {
      const recentRecord = records[0];
      activities.push({
        id: 1,
        action: "Daily collection recorded",
        user: "John Doe", // Replace with actual user if available
        details: `Added ${recentRecord.totalWeight} kg of tea leaves`,
        time: `${Math.floor(Math.random() * 5) + 1} hours ago`,
      });
    }
    
    // Generate payment activity
    activities.push({
      id: 2,
      action: "Payment processed",
      user: "Admin",
      details: `Monthly payment for ${pluckers.length} pluckers`,
      time: `${Math.floor(Math.random() * 10) + 5} hours ago`,
    });
    
    // Add more activities
    if (pluckers && Array.isArray(pluckers) && pluckers.length > 0) {
      const recentPlucker = pluckers[pluckers.length - 1]; // Assume last one is most recent
      activities.push({
        id: 3,
        action: "New plucker added",
        user: "Admin",
        details: `${recentPlucker.name} joined the team`,
        time: "Yesterday",
      });
    }
    
    // Price update activity
    activities.push({
      id: 4,
      action: "Price update",
      user: "Admin",
      details: "Tea leaf price updated to $2.50/kg",
      time: "2 days ago",
    });
    
    setActivities(activities);
  };

  // Format numbers for display
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Total Collection" 
          value={`${formatNumber(stats.totalCollection)} kg`} 
          icon={<LeafIcon className="h-5 w-5 text-tea-dark" />}
          description="This month"
          trend={{ value: stats.collectionTrend, isPositive: stats.collectionTrend > 0 }}
        />
        <StatsCard 
          title="Active Pluckers" 
          value={formatNumber(stats.activePluckers)} 
          icon={<UsersIcon className="h-5 w-5 text-tea-dark" />}
          trend={{ value: stats.pluckersTrend, isPositive: stats.pluckersTrend > 0 }}
        />
        <StatsCard 
          title="Collection Days" 
          value={formatNumber(stats.collectionDays)} 
          icon={<CalendarIcon className="h-5 w-5 text-tea-dark" />}
          description="This month"
        />
        <StatsCard 
          title="Total Payments" 
          value={`LKR ${formatNumber(stats.totalPayments)}`} 
          icon={<DollarSignIcon className="h-5 w-5 text-tea-dark" />}
          trend={{ value: stats.paymentsTrend, isPositive: stats.paymentsTrend > 0 }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <TeaCollectionChart data={chartData} isLoading={isLoading} />
        </div>
        <div>
          <RecentActivity activities={activities} isLoading={isLoading} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TopPluckers pluckers={topPluckers} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default Dashboard;
