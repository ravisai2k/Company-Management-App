import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  ClipboardList,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  mockBookings,
  mockEmployees,
  mockPayments,
  mockServices,
} from "../data/mockData";

export function DashboardPage() {
  // ✅ Fixed statistics
  const totalBookingsToday = 7;
  const completedBookingsCount = 5;
  const pendingBookingsCount = 2;
  const activeEmployees = 22;

  // Calculate total revenue from mock data
  const totalRevenue = mockPayments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + p.amount, 0);

  // Chart data - Daily bookings
  const dailyBookingsData = [
    { name: "Mon", bookings: 12 },
    { name: "Tue", bookings: 19 },
    { name: "Wed", bookings: 15 },
    { name: "Thu", bookings: 22 },
    { name: "Fri", bookings: 18 },
    { name: "Sat", bookings: 8 },
    { name: "Sun", bookings: 5 },
  ];

  // Service category trends
  const serviceTrendsData = mockServices.map((service) => ({
    name: service.category,
    bookings: service.bookingCount,
    revenue: service.revenue,
  }));

  // Employee performance
  const topEmployees = [...mockEmployees]
    .sort((a, b) => b.completedTasks - a.completedTasks)
    .slice(0, 5)
    .map((emp) => ({
      name: emp.name.split(" ")[0],
      tasks: emp.completedTasks,
      rating: emp.rating,
    }));

  // Service distribution
  const serviceDistribution = [
    { name: "Plumbing", value: 234, color: "#3b82f6" },
    { name: "Electrical", value: 189, color: "#8b5cf6" },
    { name: "Carpentry", value: 156, color: "#ec4899" },
    { name: "Painting", value: 178, color: "#f59e0b" },
    { name: "Masonry", value: 98, color: "#10b981" },
    { name: "Renovation", value: 45, color: "#ef4444" },
  ];

  const stats = [
    {
      title: "Total Bookings Today",
      value: totalBookingsToday,
      icon: ClipboardList,
      color: "bg-blue-500",
    },
    {
      title: "Completed Bookings",
      value: completedBookingsCount,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Pending Bookings",
      value: pendingBookingsCount,
      icon: Clock,
      color: "bg-orange-500",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      color: "bg-emerald-500",
    },
    {
      title: "Active Employees",
      value: activeEmployees,
      icon: Users,
      color: "bg-purple-500",
    },
    {
      title: "Revenue Growth",
      value: "+15.3%",
      icon: TrendingUp,
      color: "bg-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's your business overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="mt-2 text-xl font-semibold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Bookings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyBookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Category Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Service Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={serviceTrendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Employees */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topEmployees} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="tasks" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
