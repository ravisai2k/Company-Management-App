import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Search, Calendar, UserCheck } from 'lucide-react';
import { mockBookings, mockEmployees } from '../data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

export function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [bookingToAssign, setBookingToAssign] = useState<typeof mockBookings[0] | null>(null);

  // Filter bookings
  const completedBookings = mockBookings.filter(b => b.status === 'Completed');
  const pendingBookings = mockBookings.filter(b => b.status === 'Pending');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    return status === 'Paid'
      ? 'bg-green-100 text-green-800'
      : 'bg-orange-100 text-orange-800';
  };

  const handleAssignEmployee = (booking: typeof mockBookings[0]) => {
    setBookingToAssign(booking);
    setShowAssignDialog(true);
  };

  const BookingTable = ({ bookings }: { bookings: typeof mockBookings }) => {
    const filtered = bookings.filter(booking =>
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>
                <div>
                  <div>{booking.customerName}</div>
                  <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                </div>
              </TableCell>
              <TableCell>{booking.serviceName}</TableCell>
              <TableCell>
                <div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {new Date(booking.date).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">{booking.time}</div>
                </div>
              </TableCell>
              <TableCell>
                {booking.employeeName ? (
                  <div className="flex items-center gap-1">
                    <UserCheck className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{booking.employeeName}</span>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleAssignEmployee(booking)}>
                    Assign
                  </Button>
                )}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                    {booking.paymentStatus}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-1">₹{booking.price}</p>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking)}>
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>Booking Management</h1>
        <p className="text-gray-500 mt-1">
          Manage all bookings and assign employees
        </p>
      </div>

      {/* 🔍 Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search bookings by customer, service, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* 📊 Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Bookings Today</p>
            <p className="mt-2 text-xl font-semibold">7</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="mt-2 text-xl font-semibold">5</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="mt-2 text-xl font-semibold">2</p>
          </CardContent>
        </Card>
      </div>

      {/* 🗂️ Bookings Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <div className="border-b px-4">
              <TabsList className="h-12">
                <TabsTrigger value="all">All Bookings</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="m-0">
              <BookingTable bookings={mockBookings} />
            </TabsContent>
            <TabsContent value="today" className="m-0">
              <BookingTable bookings={mockBookings.slice(0, 7)} /> {/* Example for today */}
            </TabsContent>
            <TabsContent value="pending" className="m-0">
              <BookingTable bookings={pendingBookings} />
            </TabsContent>
            <TabsContent value="completed" className="m-0">
              <BookingTable bookings={completedBookings} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
