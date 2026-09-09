// Type definitions for the Company Management App

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bookingCount: number;
  totalSpent: number;
  rating: number;
  joinedDate: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  aadhaarNumber: string;
  verified: boolean;
  status: 'Available' | 'On Leave' | 'Assigned';
  rating: number;
  completedTasks: number;
  assignedBooking?: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  bookingCount: number;
  rating: number;
  revenue: number;
  active: boolean;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  employeeId?: string;
  employeeName?: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  date: string;
  time: string;
  address: string;
  price: number;
  paymentStatus: 'Paid' | 'Pending';
  notes?: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  customerName: string;
  serviceName: string;
  amount: number;
  status: 'Paid' | 'Pending';
  method: 'UPI' | 'Card' | 'Cash';
  date: string;
}

export interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'employee' | 'completion';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
