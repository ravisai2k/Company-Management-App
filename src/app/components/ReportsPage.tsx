import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Download,
  Calendar,
  TrendingUp,
  IndianRupee,
  ClipboardList,
} from 'lucide-react';
import {
  mockBookings,
  mockPayments,
  mockServices,
  mockEmployees,
} from '../data/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

export function ReportsPage() {
  const [timeRange, setTimeRange] = useState('week');

  // Helper function to get date ranges
  const getDateRanges = () => {
    const now = new Date();

    if (timeRange === 'week') {
      const startOfThisWeek = new Date(now);
      startOfThisWeek.setDate(now.getDate() - now.getDay());
      startOfThisWeek.setHours(0, 0, 0, 0);
      return { currentStart: startOfThisWeek, currentEnd: now };
    } else if (timeRange === 'month') {
      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return { currentStart: startOfThisMonth, currentEnd: now };
    } else if (timeRange === 'quarter') {
      const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
      const startOfThisQuarter = new Date(now.getFullYear(), quarterMonth, 1);
      return { currentStart: startOfThisQuarter, currentEnd: now };
    } else {
      const startOfThisYear = new Date(now.getFullYear(), 0, 1);
      return { currentStart: startOfThisYear, currentEnd: now };
    }
  };

  // Set total bookings based on time range
  const getTotalBookings = () => {
    switch (timeRange) {
      case 'week':
        return 42;
      case 'month':
        return 168; // 42 × 4
      case 'quarter':
        return 504; // 42 × 12
      case 'year':
        return 2184; // 42 × 52
      default:
        return 0;
    }
  };

  // Fake data for demo
  const totalBookings = getTotalBookings();
  const completedBookings = Math.floor(totalBookings * 0.85); // assume 85% completed
  const totalRevenue = totalBookings * 1200; // assume avg ₹1200 per booking
  const completionRate = (completedBookings / totalBookings) * 100;

  const bookingsChange = '+5.2%';
  const revenueChange = '+6.1%';
  const completionRateChange = '+2.4%';
  const topService = { name: 'Plumbing', count: 16 };
  const topServiceChange = '+3.5%';

  // Chart data adjustments
  const getRevenueChartData = () => {
    switch (timeRange) {
      case 'week':
        return [
          { month: 'Mon', revenue: 8500, bookings: 6 },
          { month: 'Tue', revenue: 9500, bookings: 7 },
          { month: 'Wed', revenue: 10500, bookings: 7 },
          { month: 'Thu', revenue: 9800, bookings: 6 },
          { month: 'Fri', revenue: 11000, bookings: 7 },
          { month: 'Sat', revenue: 10200, bookings: 5 },
          { month: 'Sun', revenue: 8700, bookings: 4 },
        ];
      case 'month':
        return [
          { month: 'Week 1', revenue: 48000, bookings: 42 },
          { month: 'Week 2', revenue: 50000, bookings: 42 },
          { month: 'Week 3', revenue: 51000, bookings: 42 },
          { month: 'Week 4', revenue: 49000, bookings: 42 },
        ];
      case 'quarter':
        return [
          { month: 'Month 1', revenue: 192000, bookings: 168 },
          { month: 'Month 2', revenue: 202000, bookings: 168 },
          { month: 'Month 3', revenue: 210000, bookings: 168 },
        ];
      case 'year':
        return [
          { month: 'Jan', revenue: 168000, bookings: 168 },
          { month: 'Feb', revenue: 165000, bookings: 168 },
          { month: 'Mar', revenue: 172000, bookings: 168 },
          { month: 'Apr', revenue: 180000, bookings: 168 },
          { month: 'May', revenue: 176000, bookings: 168 },
          { month: 'Jun', revenue: 178000, bookings: 168 },
          { month: 'Jul', revenue: 185000, bookings: 168 },
          { month: 'Aug', revenue: 182000, bookings: 168 },
          { month: 'Sep', revenue: 188000, bookings: 168 },
          { month: 'Oct', revenue: 190000, bookings: 168 },
          { month: 'Nov', revenue: 194000, bookings: 168 },
          { month: 'Dec', revenue: 198000, bookings: 168 },
        ];
      default:
        return [];
    }
  };

  const monthlyRevenueData = getRevenueChartData();

  // Service performance
  const servicePerformanceData = mockServices.map((service) => ({
    name: service.category,
    bookings: service.bookingCount,
    revenue: service.revenue,
    rating: service.rating,
  }));

  // Daily bookings
  const dailyBookingsData = [
    { day: 'Mon', completed: 7, pending: 1, cancelled: 0 },
    { day: 'Tue', completed: 8, pending: 1, cancelled: 0 },
    { day: 'Wed', completed: 6, pending: 2, cancelled: 1 },
    { day: 'Thu', completed: 7, pending: 1, cancelled: 0 },
    { day: 'Fri', completed: 8, pending: 0, cancelled: 1 },
    { day: 'Sat', completed: 4, pending: 1, cancelled: 0 },
    { day: 'Sun', completed: 2, pending: 1, cancelled: 0 },
  ];

  // Employee performance
  const employeePerformanceData = mockEmployees.map((emp) => ({
    name: emp.name.split(' ')[0],
    tasks: emp.completedTasks,
    rating: emp.rating * 20,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">
            Comprehensive business insights and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => toast.success('Report exported successfully!')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bookings */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="mt-2 text-xl font-semibold">{totalBookings}</p>
                <p
                  className={`text-sm mt-1 ${
                    bookingsChange.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {bookingsChange} from last period
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ClipboardList className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="mt-2 text-xl font-semibold">
                  ₹{totalRevenue.toLocaleString()}
                </p>
                <p
                  className={`text-sm mt-1 ${
                    revenueChange.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {revenueChange} from last period
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <IndianRupee className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Completion Rate */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completion Rate</p>
                <p className="mt-2 text-xl font-semibold">
                  {completionRate.toFixed(1)}%
                </p>
                <p
                  className={`text-sm mt-1 ${
                    completionRateChange.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {completionRateChange} from last period
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Service */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Top Service</p>
                <p className="mt-2 text-sm font-semibold">
                  {topService.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {topService.count} bookings · {topServiceChange}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & Bookings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Bookings Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Revenue (₹)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bookings"
                stroke="#10b981"
                strokeWidth={2}
                name="Bookings"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
