// Mock data for the Company Management App
import { Customer, Employee, Service, Booking, Payment, Notification } from '../types';

export const mockCustomers: Customer[] = [
  {
    id: 'C001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 234-567-8901',
    address: '123 Main St, New York, NY 10001',
    bookingCount: 8,
    totalSpent: 373500, // Converted to INR (4500 * 83)
    rating: 4.5,
    joinedDate: '2024-01-15'
  },
  {
    id: 'C002',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 234-567-8902',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    bookingCount: 5,
    totalSpent: 265600, // 3200 * 83
    rating: 5.0,
    joinedDate: '2024-02-20'
  },
  {
    id: 'C003',
    name: 'Michael Brown',
    email: 'mbrown@email.com',
    phone: '+1 234-567-8903',
    address: '789 Pine Rd, Queens, NY 11354',
    bookingCount: 12,
    totalSpent: 647400, // 7800 * 83
    rating: 4.8,
    joinedDate: '2023-11-10'
  },
  {
    id: 'C004',
    name: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1 234-567-8904',
    address: '321 Elm St, Manhattan, NY 10002',
    bookingCount: 3,
    totalSpent: 124500, // 1500 * 83
    rating: 4.2,
    joinedDate: '2024-03-05'
  },
  {
    id: 'C005',
    name: 'David Wilson',
    email: 'dwilson@email.com',
    phone: '+1 234-567-8905',
    address: '654 Maple Dr, Bronx, NY 10451',
    bookingCount: 15,
    totalSpent: 763600, // 9200 * 83
    rating: 4.9,
    joinedDate: '2023-09-18'
  }
];

export const mockEmployees: Employee[] = [
  {
    id: 'E001',
    name: 'James Miller',
    role: 'Plumber',
    email: 'j.miller@company.com',
    phone: '+1 234-567-9001',
    aadhaarNumber: '1234 5678 9012',
    verified: true,
    status: 'Available',
    rating: 4.7,
    completedTasks: 145
  },
  {
    id: 'E002',
    name: 'Robert Garcia',
    role: 'Electrician',
    email: 'r.garcia@company.com',
    phone: '+1 234-567-9002',
    aadhaarNumber: '2345 6789 0123',
    verified: true,
    status: 'Assigned',
    rating: 4.8,
    completedTasks: 167,
    assignedBooking: 'B001'
  },
  {
    id: 'E003',
    name: 'William Martinez',
    role: 'Carpenter',
    email: 'w.martinez@company.com',
    phone: '+1 234-567-9003',
    aadhaarNumber: '3456 7890 1234',
    verified: true,
    status: 'Available',
    rating: 4.6,
    completedTasks: 132
  },
  {
    id: 'E004',
    name: 'Thomas Anderson',
    role: 'Plumber',
    email: 't.anderson@company.com',
    phone: '+1 234-567-9004',
    aadhaarNumber: '4567 8901 2345',
    verified: false,
    status: 'On Leave',
    rating: 4.5,
    completedTasks: 98
  },
  {
    id: 'E005',
    name: 'Daniel Taylor',
    role: 'Electrician',
    email: 'd.taylor@company.com',
    phone: '+1 234-567-9005',
    aadhaarNumber: '5678 9012 3456',
    verified: true,
    status: 'Available',
    rating: 4.9,
    completedTasks: 203
  },
  {
    id: 'E006',
    name: 'Christopher Moore',
    role: 'Mason',
    email: 'c.moore@company.com',
    phone: '+1 234-567-9006',
    aadhaarNumber: '6789 0123 4567',
    verified: true,
    status: 'Assigned',
    rating: 4.7,
    completedTasks: 156,
    assignedBooking: 'B003'
  },
  {
    id: 'E007',
    name: 'Matthew Jackson',
    role: 'Painter',
    email: 'm.jackson@company.com',
    phone: '+1 234-567-9007',
    aadhaarNumber: '7890 1234 5678',
    verified: true,
    status: 'Available',
    rating: 4.4,
    completedTasks: 89
  },
  {
    id: 'E008',
    name: 'Joshua White',
    role: 'Plumber',
    email: 'j.white@company.com',
    phone: '+1 234-567-9008',
    aadhaarNumber: '8901 2345 6789',
    verified: false,
    status: 'Available',
    rating: 4.6,
    completedTasks: 121
  },
  // Additional employees to reach 100+
  ...Array.from({ length: 100 }, (_, i) => {
    const employeeNum = i + 9;
    const roles = ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Mason', 'Welder', 'HVAC Technician', 'Roofer'];
    const statuses: ('Available' | 'Assigned' | 'On Leave')[] = ['Available', 'Available', 'Available', 'Assigned', 'On Leave'];
    return {
      id: `E${employeeNum.toString().padStart(3, '0')}`,
      name: `Employee ${employeeNum}`,
      role: roles[i % roles.length],
      email: `employee${employeeNum}@company.com`,
      phone: `+1 234-567-${(9000 + employeeNum).toString()}`,
      aadhaarNumber: `${(1000 + employeeNum).toString().padStart(4, '0')} ${(5000 + employeeNum).toString().padStart(4, '0')} ${(9000 + employeeNum).toString().padStart(4, '0')}`,
      verified: i % 5 !== 0,
      status: statuses[i % statuses.length],
      rating: 4.0 + Math.random(),
      completedTasks: Math.floor(Math.random() * 200) + 50
    };
  })
];

export const mockServices: Service[] = [
  {
    id: 'S001',
    name: 'Residential Plumbing',
    category: 'Plumbing',
    description: 'Complete plumbing services for residential properties',
    basePrice: 12450, // 150 * 83
    bookingCount: 345,
    rating: 4.6,
    revenue: 4294500, // Increased and converted
    active: true
  },
  {
    id: 'S002',
    name: 'Electrical Installation',
    category: 'Electrical',
    description: 'Professional electrical installation and repair services',
    basePrice: 16600, // 200 * 83
    bookingCount: 298,
    rating: 4.8,
    revenue: 4944800, // Increased and converted
    active: true
  },
  {
    id: 'S003',
    name: 'Home Renovation',
    category: 'Renovation',
    description: 'Complete home renovation and remodeling',
    basePrice: 207500, // 2500 * 83
    bookingCount: 78,
    rating: 4.9,
    revenue: 16185000, // Increased and converted
    active: true
  },
  {
    id: 'S004',
    name: 'New Construction',
    category: 'Construction',
    description: 'New building construction services',
    basePrice: 4150000, // 50000 * 83
    bookingCount: 25,
    rating: 4.7,
    revenue: 103750000, // Increased and converted
    active: true
  },
  {
    id: 'S005',
    name: 'Carpentry Work',
    category: 'Carpentry',
    description: 'Custom carpentry and woodwork services',
    basePrice: 24900, // 300 * 83
    bookingCount: 234,
    rating: 4.5,
    revenue: 5828600, // Increased and converted
    active: true
  },
  {
    id: 'S006',
    name: 'Painting Services',
    category: 'Painting',
    description: 'Interior and exterior painting',
    basePrice: 33200, // 400 * 83
    bookingCount: 267,
    rating: 4.4,
    revenue: 8864400, // Increased and converted
    active: true
  },
  {
    id: 'S007',
    name: 'Masonry Work',
    category: 'Masonry',
    description: 'Brick and stone masonry services',
    basePrice: 29050, // 350 * 83
    bookingCount: 156,
    rating: 4.7,
    revenue: 4531800, // Increased and converted
    active: true
  },
  {
    id: 'S008',
    name: 'Building Checkup',
    category: 'Inspection',
    description: 'Comprehensive building inspection and safety assessment',
    basePrice: 8300, // 100 * 83
    bookingCount: 189,
    rating: 4.6,
    revenue: 1568700,
    active: true
  },
  {
    id: 'S009',
    name: 'Land Survey',
    category: 'Survey',
    description: 'Professional land measurement and survey services',
    basePrice: 20750, // 250 * 83
    bookingCount: 98,
    rating: 4.8,
    revenue: 2033500,
    active: true
  },
  {
    id: 'S010',
    name: 'Steel and Cement Ratio',
    category: 'Consultation',
    description: 'Expert consultation on optimal steel and cement ratios for construction',
    basePrice: 12450, // 150 * 83
    bookingCount: 145,
    rating: 4.7,
    revenue: 1805250,
    active: true
  },
  {
    id: 'S011',
    name: 'Tile Making',
    category: 'Manufacturing',
    description: 'Custom tile design and manufacturing services',
    basePrice: 16600, // 200 * 83
    bookingCount: 112,
    rating: 4.5,
    revenue: 1859200,
    active: true
  },
  {
    id: 'S012',
    name: 'Interior and Exterior',
    category: 'Design',
    description: 'Complete interior and exterior design and finishing services',
    basePrice: 41500, // 500 * 83
    bookingCount: 203,
    rating: 4.9,
    revenue: 8424500,
    active: true
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'B001',
    customerId: 'C001',
    customerName: 'John Smith',
    customerPhone: '+1 234-567-8901',
    serviceId: 'S002',
    serviceName: 'Electrical Installation',
    employeeId: 'E002',
    employeeName: 'Robert Garcia',
    status: 'In Progress',
    date: '2025-11-12', // Changed to today
    time: '10:00 AM',
    address: '123 Main St, New York, NY 10001',
    price: 16600, // Converted to INR
    paymentStatus: 'Pending',
    notes: 'Install new ceiling fans in 3 rooms'
  },
  {
    id: 'B002',
    customerId: 'C002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8902',
    serviceId: 'S001',
    serviceName: 'Residential Plumbing',
    status: 'Pending',
    date: '2025-11-12', // Changed to today
    time: '2:00 PM',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    price: 12450, // Converted to INR
    paymentStatus: 'Pending',
    notes: 'Fix leaking kitchen faucet'
  },
  {
    id: 'B003',
    customerId: 'C003',
    customerName: 'Michael Brown',
    customerPhone: '+1 234-567-8903',
    serviceId: 'S007',
    serviceName: 'Masonry Work',
    employeeId: 'E006',
    employeeName: 'Christopher Moore',
    status: 'In Progress',
    date: '2025-11-12', // Changed to today
    time: '9:00 AM',
    address: '789 Pine Rd, Queens, NY 11354',
    price: 29050, // Converted to INR
    paymentStatus: 'Paid',
    notes: 'Repair front porch brickwork'
  },
  {
    id: 'B004',
    customerId: 'C004',
    customerName: 'Emily Davis',
    customerPhone: '+1 234-567-8904',
    serviceId: 'S006',
    serviceName: 'Painting Services',
    employeeId: 'E007',
    employeeName: 'Matthew Jackson',
    status: 'Completed',
    date: '2025-11-11',
    time: '8:00 AM',
    address: '321 Elm St, Manhattan, NY 10002',
    price: 33200, // Converted to INR
    paymentStatus: 'Paid'
  },
  {
    id: 'B005',
    customerId: 'C005',
    customerName: 'David Wilson',
    customerPhone: '+1 234-567-8905',
    serviceId: 'S005',
    serviceName: 'Carpentry Work',
    employeeId: 'E003',
    employeeName: 'William Martinez',
    status: 'Completed',
    date: '2025-11-10',
    time: '11:00 AM',
    address: '654 Maple Dr, Bronx, NY 10451',
    price: 24900, // Converted to INR
    paymentStatus: 'Paid'
  },
  {
    id: 'B006',
    customerId: 'C001',
    customerName: 'John Smith',
    customerPhone: '+1 234-567-8901',
    serviceId: 'S001',
    serviceName: 'Residential Plumbing',
    status: 'Pending',
    date: '2025-11-12', // Changed to today for 4 total today
    time: '3:00 PM',
    address: '123 Main St, New York, NY 10001',
    price: 12450, // Converted to INR
    paymentStatus: 'Pending',
    notes: 'Install new water heater'
  },
  // Additional bookings for this week
  {
    id: 'B007',
    customerId: 'C002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8902',
    serviceId: 'S003',
    serviceName: 'Home Renovation',
    status: 'Completed',
    date: '2025-11-09',
    time: '9:00 AM',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    price: 207500,
    paymentStatus: 'Paid'
  },
  {
    id: 'B008',
    customerId: 'C003',
    customerName: 'Michael Brown',
    customerPhone: '+1 234-567-8903',
    serviceId: 'S002',
    serviceName: 'Electrical Installation',
    status: 'Completed',
    date: '2025-11-08',
    time: '10:00 AM',
    address: '789 Pine Rd, Queens, NY 11354',
    price: 16600,
    paymentStatus: 'Paid'
  },
  // More bookings for this month (November 2025)
  {
    id: 'B009',
    customerId: 'C004',
    customerName: 'Emily Davis',
    customerPhone: '+1 234-567-8904',
    serviceId: 'S012',
    serviceName: 'Interior and Exterior',
    status: 'Completed',
    date: '2025-11-05',
    time: '8:00 AM',
    address: '321 Elm St, Manhattan, NY 10002',
    price: 41500,
    paymentStatus: 'Paid'
  },
  {
    id: 'B010',
    customerId: 'C005',
    customerName: 'David Wilson',
    customerPhone: '+1 234-567-8905',
    serviceId: 'S004',
    serviceName: 'New Construction',
    status: 'Completed',
    date: '2025-11-03',
    time: '7:00 AM',
    address: '654 Maple Dr, Bronx, NY 10451',
    price: 4150000,
    paymentStatus: 'Paid'
  },
  {
    id: 'B011',
    customerId: 'C001',
    customerName: 'John Smith',
    customerPhone: '+1 234-567-8901',
    serviceId: 'S008',
    serviceName: 'Building Checkup',
    status: 'Completed',
    date: '2025-11-02',
    time: '10:00 AM',
    address: '123 Main St, New York, NY 10001',
    price: 8300,
    paymentStatus: 'Paid'
  },
  {
    id: 'B012',
    customerId: 'C002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8902',
    serviceId: 'S009',
    serviceName: 'Land Survey',
    status: 'Completed',
    date: '2025-11-01',
    time: '9:00 AM',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    price: 20750,
    paymentStatus: 'Paid'
  },
  // Previous months (October 2025)
  {
    id: 'B013',
    customerId: 'C003',
    customerName: 'Michael Brown',
    customerPhone: '+1 234-567-8903',
    serviceId: 'S003',
    serviceName: 'Home Renovation',
    status: 'Completed',
    date: '2025-10-28',
    time: '8:00 AM',
    address: '789 Pine Rd, Queens, NY 11354',
    price: 207500,
    paymentStatus: 'Paid'
  },
  {
    id: 'B014',
    customerId: 'C004',
    customerName: 'Emily Davis',
    customerPhone: '+1 234-567-8904',
    serviceId: 'S001',
    serviceName: 'Residential Plumbing',
    status: 'Completed',
    date: '2025-10-25',
    time: '11:00 AM',
    address: '321 Elm St, Manhattan, NY 10002',
    price: 12450,
    paymentStatus: 'Paid'
  },
  {
    id: 'B015',
    customerId: 'C005',
    customerName: 'David Wilson',
    customerPhone: '+1 234-567-8905',
    serviceId: 'S002',
    serviceName: 'Electrical Installation',
    status: 'Completed',
    date: '2025-10-22',
    time: '10:00 AM',
    address: '654 Maple Dr, Bronx, NY 10451',
    price: 16600,
    paymentStatus: 'Paid'
  },
  {
    id: 'B016',
    customerId: 'C001',
    customerName: 'John Smith',
    customerPhone: '+1 234-567-8901',
    serviceId: 'S006',
    serviceName: 'Painting Services',
    status: 'Completed',
    date: '2025-10-20',
    time: '9:00 AM',
    address: '123 Main St, New York, NY 10001',
    price: 33200,
    paymentStatus: 'Paid'
  },
  {
    id: 'B017',
    customerId: 'C002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8902',
    serviceId: 'S005',
    serviceName: 'Carpentry Work',
    status: 'Completed',
    date: '2025-10-18',
    time: '8:00 AM',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    price: 24900,
    paymentStatus: 'Paid'
  },
  {
    id: 'B018',
    customerId: 'C003',
    customerName: 'Michael Brown',
    customerPhone: '+1 234-567-8903',
    serviceId: 'S010',
    serviceName: 'Steel and Cement Ratio',
    status: 'Completed',
    date: '2025-10-15',
    time: '10:00 AM',
    address: '789 Pine Rd, Queens, NY 11354',
    price: 12450,
    paymentStatus: 'Paid'
  },
  {
    id: 'B019',
    customerId: 'C004',
    customerName: 'Emily Davis',
    customerPhone: '+1 234-567-8904',
    serviceId: 'S011',
    serviceName: 'Tile Making',
    status: 'Completed',
    date: '2025-10-12',
    time: '9:00 AM',
    address: '321 Elm St, Manhattan, NY 10002',
    price: 16600,
    paymentStatus: 'Paid'
  },
  {
    id: 'B020',
    customerId: 'C005',
    customerName: 'David Wilson',
    customerPhone: '+1 234-567-8905',
    serviceId: 'S007',
    serviceName: 'Masonry Work',
    status: 'Completed',
    date: '2025-10-10',
    time: '8:00 AM',
    address: '654 Maple Dr, Bronx, NY 10451',
    price: 29050,
    paymentStatus: 'Paid'
  },
  {
    id: 'B021',
    customerId: 'C001',
    customerName: 'John Smith',
    customerPhone: '+1 234-567-8901',
    serviceId: 'S012',
    serviceName: 'Interior and Exterior',
    status: 'Completed',
    date: '2025-10-08',
    time: '10:00 AM',
    address: '123 Main St, New York, NY 10001',
    price: 41500,
    paymentStatus: 'Paid'
  },
  {
    id: 'B022',
    customerId: 'C002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8902',
    serviceId: 'S001',
    serviceName: 'Residential Plumbing',
    status: 'Completed',
    date: '2025-10-05',
    time: '11:00 AM',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    price: 12450,
    paymentStatus: 'Paid'
  },
  {
    id: 'B023',
    customerId: 'C003',
    customerName: 'Michael Brown',
    customerPhone: '+1 234-567-8903',
    serviceId: 'S008',
    serviceName: 'Building Checkup',
    status: 'Completed',
    date: '2025-10-03',
    time: '9:00 AM',
    address: '789 Pine Rd, Queens, NY 11354',
    price: 8300,
    paymentStatus: 'Paid'
  },
  // September 2025
  {
    id: 'B024',
    customerId: 'C004',
    customerName: 'Emily Davis',
    customerPhone: '+1 234-567-8904',
    serviceId: 'S004',
    serviceName: 'New Construction',
    status: 'Completed',
    date: '2025-09-28',
    time: '7:00 AM',
    address: '321 Elm St, Manhattan, NY 10002',
    price: 4150000,
    paymentStatus: 'Paid'
  },
  {
    id: 'B025',
    customerId: 'C005',
    customerName: 'David Wilson',
    customerPhone: '+1 234-567-8905',
    serviceId: 'S003',
    serviceName: 'Home Renovation',
    status: 'Completed',
    date: '2025-09-25',
    time: '8:00 AM',
    address: '654 Maple Dr, Bronx, NY 10451',
    price: 207500,
    paymentStatus: 'Paid'
  },
  {
    id: 'B026',
    customerId: 'C001',
    customerName: 'John Smith',
    customerPhone: '+1 234-567-8901',
    serviceId: 'S002',
    serviceName: 'Electrical Installation',
    status: 'Completed',
    date: '2025-09-22',
    time: '10:00 AM',
    address: '123 Main St, New York, NY 10001',
    price: 16600,
    paymentStatus: 'Paid'
  },
  {
    id: 'B027',
    customerId: 'C002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8902',
    serviceId: 'S006',
    serviceName: 'Painting Services',
    status: 'Completed',
    date: '2025-09-20',
    time: '9:00 AM',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    price: 33200,
    paymentStatus: 'Paid'
  },
  {
    id: 'B028',
    customerId: 'C003',
    customerName: 'Michael Brown',
    customerPhone: '+1 234-567-8903',
    serviceId: 'S005',
    serviceName: 'Carpentry Work',
    status: 'Completed',
    date: '2025-09-18',
    time: '8:00 AM',
    address: '789 Pine Rd, Queens, NY 11354',
    price: 24900,
    paymentStatus: 'Paid'
  },
  {
    id: 'B029',
    customerId: 'C004',
    customerName: 'Emily Davis',
    customerPhone: '+1 234-567-8904',
    serviceId: 'S009',
    serviceName: 'Land Survey',
    status: 'Completed',
    date: '2025-09-15',
    time: '10:00 AM',
    address: '321 Elm St, Manhattan, NY 10002',
    price: 20750,
    paymentStatus: 'Paid'
  },
  {
    id: 'B030',
    customerId: 'C005',
    customerName: 'David Wilson',
    customerPhone: '+1 234-567-8905',
    serviceId: 'S007',
    serviceName: 'Masonry Work',
    status: 'Completed',
    date: '2025-09-12',
    time: '9:00 AM',
    address: '654 Maple Dr, Bronx, NY 10451',
    price: 29050,
    paymentStatus: 'Paid'
  },
  {
    id: 'B031',
    customerId: 'C001',
    customerName: 'John Smith',
    customerPhone: '+1 234-567-8901',
    serviceId: 'S011',
    serviceName: 'Tile Making',
    status: 'Completed',
    date: '2025-09-10',
    time: '8:00 AM',
    address: '123 Main St, New York, NY 10001',
    price: 16600,
    paymentStatus: 'Paid'
  },
  {
    id: 'B032',
    customerId: 'C002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8902',
    serviceId: 'S010',
    serviceName: 'Steel and Cement Ratio',
    status: 'Completed',
    date: '2025-09-08',
    time: '10:00 AM',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    price: 12450,
    paymentStatus: 'Paid'
  },
  {
    id: 'B033',
    customerId: 'C003',
    customerName: 'Michael Brown',
    customerPhone: '+1 234-567-8903',
    serviceId: 'S001',
    serviceName: 'Residential Plumbing',
    status: 'Completed',
    date: '2025-09-05',
    time: '11:00 AM',
    address: '789 Pine Rd, Queens, NY 11354',
    price: 12450,
    paymentStatus: 'Paid'
  },
  // Earlier months for year comparison
  {
    id: 'B034',
    customerId: 'C004',
    customerName: 'Emily Davis',
    customerPhone: '+1 234-567-8904',
    serviceId: 'S012',
    serviceName: 'Interior and Exterior',
    status: 'Completed',
    date: '2025-08-28',
    time: '9:00 AM',
    address: '321 Elm St, Manhattan, NY 10002',
    price: 41500,
    paymentStatus: 'Paid'
  },
  {
    id: 'B035',
    customerId: 'C005',
    customerName: 'David Wilson',
    customerPhone: '+1 234-567-8905',
    serviceId: 'S003',
    serviceName: 'Home Renovation',
    status: 'Completed',
    date: '2025-07-20',
    time: '8:00 AM',
    address: '654 Maple Dr, Bronx, NY 10451',
    price: 207500,
    paymentStatus: 'Paid'
  },
  {
    id: 'B036',
    customerId: 'C001',
    customerName: 'John Smith',
    customerPhone: '+1 234-567-8901',
    serviceId: 'S004',
    serviceName: 'New Construction',
    status: 'Completed',
    date: '2025-06-15',
    time: '7:00 AM',
    address: '123 Main St, New York, NY 10001',
    price: 4150000,
    paymentStatus: 'Paid'
  },
  {
    id: 'B037',
    customerId: 'C002',
    customerName: 'Sarah Johnson',
    customerPhone: '+1 234-567-8902',
    serviceId: 'S002',
    serviceName: 'Electrical Installation',
    status: 'Completed',
    date: '2025-05-10',
    time: '10:00 AM',
    address: '456 Oak Ave, Brooklyn, NY 11201',
    price: 16600,
    paymentStatus: 'Paid'
  },
  {
    id: 'B038',
    customerId: 'C003',
    customerName: 'Michael Brown',
    customerPhone: '+1 234-567-8903',
    serviceId: 'S006',
    serviceName: 'Painting Services',
    status: 'Completed',
    date: '2025-04-22',
    time: '9:00 AM',
    address: '789 Pine Rd, Queens, NY 11354',
    price: 33200,
    paymentStatus: 'Paid'
  },
  {
    id: 'B039',
    customerId: 'C004',
    customerName: 'Emily Davis',
    customerPhone: '+1 234-567-8904',
    serviceId: 'S005',
    serviceName: 'Carpentry Work',
    status: 'Completed',
    date: '2025-03-18',
    time: '8:00 AM',
    address: '321 Elm St, Manhattan, NY 10002',
    price: 24900,
    paymentStatus: 'Paid'
  },
  {
    id: 'B040',
    customerId: 'C005',
    customerName: 'David Wilson',
    customerPhone: '+1 234-567-8905',
    serviceId: 'S001',
    serviceName: 'Residential Plumbing',
    status: 'Completed',
    date: '2025-02-25',
    time: '11:00 AM',
    address: '654 Maple Dr, Bronx, NY 10451',
    price: 12450,
    paymentStatus: 'Paid'
  },
  {
    id: 'B041',
    customerId: 'C001',
    customerName: 'John Smith',
    customerPhone: '+1 234-567-8901',
    serviceId: 'S007',
    serviceName: 'Masonry Work',
    status: 'Completed',
    date: '2025-01-30',
    time: '9:00 AM',
    address: '123 Main St, New York, NY 10001',
    price: 29050,
    paymentStatus: 'Paid'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'P001',
    bookingId: 'B003',
    customerName: 'Michael Brown',
    serviceName: 'Masonry Work',
    amount: 29050,
    status: 'Paid',
    method: 'UPI',
    date: '2025-11-12'
  },
  {
    id: 'P002',
    bookingId: 'B004',
    customerName: 'Emily Davis',
    serviceName: 'Painting Services',
    amount: 33200,
    status: 'Paid',
    method: 'Card',
    date: '2025-11-11'
  },
  {
    id: 'P003',
    bookingId: 'B005',
    customerName: 'David Wilson',
    serviceName: 'Carpentry Work',
    amount: 24900,
    status: 'Paid',
    method: 'Cash',
    date: '2025-11-10'
  },
  {
    id: 'P004',
    bookingId: 'B001',
    customerName: 'John Smith',
    serviceName: 'Electrical Installation',
    amount: 16600,
    status: 'Pending',
    method: 'UPI',
    date: '2025-11-12'
  },
  {
    id: 'P005',
    bookingId: 'B002',
    customerName: 'Sarah Johnson',
    serviceName: 'Residential Plumbing',
    amount: 12450,
    status: 'Pending',
    method: 'Card',
    date: '2025-11-12'
  },
  {
    id: 'P006',
    bookingId: 'B006',
    customerName: 'John Smith',
    serviceName: 'Residential Plumbing',
    amount: 12450,
    status: 'Pending',
    method: 'UPI',
    date: '2025-11-12'
  },
  // Additional payments for this week
  {
    id: 'P007',
    bookingId: 'B007',
    customerName: 'Sarah Johnson',
    serviceName: 'Home Renovation',
    amount: 207500,
    status: 'Paid',
    method: 'Card',
    date: '2025-11-09'
  },
  {
    id: 'P008',
    bookingId: 'B008',
    customerName: 'Michael Brown',
    serviceName: 'Electrical Installation',
    amount: 16600,
    status: 'Paid',
    method: 'UPI',
    date: '2025-11-08'
  },
  // November 2025 payments
  {
    id: 'P009',
    bookingId: 'B009',
    customerName: 'Emily Davis',
    serviceName: 'Interior and Exterior',
    amount: 41500,
    status: 'Paid',
    method: 'Card',
    date: '2025-11-05'
  },
  {
    id: 'P010',
    bookingId: 'B010',
    customerName: 'David Wilson',
    serviceName: 'New Construction',
    amount: 4150000,
    status: 'Paid',
    method: 'Bank Transfer',
    date: '2025-11-03'
  },
  {
    id: 'P011',
    bookingId: 'B011',
    customerName: 'John Smith',
    serviceName: 'Building Checkup',
    amount: 8300,
    status: 'Paid',
    method: 'UPI',
    date: '2025-11-02'
  },
  {
    id: 'P012',
    bookingId: 'B012',
    customerName: 'Sarah Johnson',
    serviceName: 'Land Survey',
    amount: 20750,
    status: 'Paid',
    method: 'Cash',
    date: '2025-11-01'
  },
  // October 2025 payments
  {
    id: 'P013',
    bookingId: 'B013',
    customerName: 'Michael Brown',
    serviceName: 'Home Renovation',
    amount: 207500,
    status: 'Paid',
    method: 'Card',
    date: '2025-10-28'
  },
  {
    id: 'P014',
    bookingId: 'B014',
    customerName: 'Emily Davis',
    serviceName: 'Residential Plumbing',
    amount: 12450,
    status: 'Paid',
    method: 'UPI',
    date: '2025-10-25'
  },
  {
    id: 'P015',
    bookingId: 'B015',
    customerName: 'David Wilson',
    serviceName: 'Electrical Installation',
    amount: 16600,
    status: 'Paid',
    method: 'Cash',
    date: '2025-10-22'
  },
  {
    id: 'P016',
    bookingId: 'B016',
    customerName: 'John Smith',
    serviceName: 'Painting Services',
    amount: 33200,
    status: 'Paid',
    method: 'Card',
    date: '2025-10-20'
  },
  {
    id: 'P017',
    bookingId: 'B017',
    customerName: 'Sarah Johnson',
    serviceName: 'Carpentry Work',
    amount: 24900,
    status: 'Paid',
    method: 'UPI',
    date: '2025-10-18'
  },
  {
    id: 'P018',
    bookingId: 'B018',
    customerName: 'Michael Brown',
    serviceName: 'Steel and Cement Ratio',
    amount: 12450,
    status: 'Paid',
    method: 'Cash',
    date: '2025-10-15'
  },
  {
    id: 'P019',
    bookingId: 'B019',
    customerName: 'Emily Davis',
    serviceName: 'Tile Making',
    amount: 16600,
    status: 'Paid',
    method: 'UPI',
    date: '2025-10-12'
  },
  {
    id: 'P020',
    bookingId: 'B020',
    customerName: 'David Wilson',
    serviceName: 'Masonry Work',
    amount: 29050,
    status: 'Paid',
    method: 'Card',
    date: '2025-10-10'
  },
  {
    id: 'P021',
    bookingId: 'B021',
    customerName: 'John Smith',
    serviceName: 'Interior and Exterior',
    amount: 41500,
    status: 'Paid',
    method: 'UPI',
    date: '2025-10-08'
  },
  {
    id: 'P022',
    bookingId: 'B022',
    customerName: 'Sarah Johnson',
    serviceName: 'Residential Plumbing',
    amount: 12450,
    status: 'Paid',
    method: 'Cash',
    date: '2025-10-05'
  },
  {
    id: 'P023',
    bookingId: 'B023',
    customerName: 'Michael Brown',
    serviceName: 'Building Checkup',
    amount: 8300,
    status: 'Paid',
    method: 'UPI',
    date: '2025-10-03'
  },
  // September 2025 payments
  {
    id: 'P024',
    bookingId: 'B024',
    customerName: 'Emily Davis',
    serviceName: 'New Construction',
    amount: 4150000,
    status: 'Paid',
    method: 'Bank Transfer',
    date: '2025-09-28'
  },
  {
    id: 'P025',
    bookingId: 'B025',
    customerName: 'David Wilson',
    serviceName: 'Home Renovation',
    amount: 207500,
    status: 'Paid',
    method: 'Card',
    date: '2025-09-25'
  },
  {
    id: 'P026',
    bookingId: 'B026',
    customerName: 'John Smith',
    serviceName: 'Electrical Installation',
    amount: 16600,
    status: 'Paid',
    method: 'UPI',
    date: '2025-09-22'
  },
  {
    id: 'P027',
    bookingId: 'B027',
    customerName: 'Sarah Johnson',
    serviceName: 'Painting Services',
    amount: 33200,
    status: 'Paid',
    method: 'Cash',
    date: '2025-09-20'
  },
  {
    id: 'P028',
    bookingId: 'B028',
    customerName: 'Michael Brown',
    serviceName: 'Carpentry Work',
    amount: 24900,
    status: 'Paid',
    method: 'Card',
    date: '2025-09-18'
  },
  {
    id: 'P029',
    bookingId: 'B029',
    customerName: 'Emily Davis',
    serviceName: 'Land Survey',
    amount: 20750,
    status: 'Paid',
    method: 'UPI',
    date: '2025-09-15'
  },
  {
    id: 'P030',
    bookingId: 'B030',
    customerName: 'David Wilson',
    serviceName: 'Masonry Work',
    amount: 29050,
    status: 'Paid',
    method: 'Cash',
    date: '2025-09-12'
  },
  {
    id: 'P031',
    bookingId: 'B031',
    customerName: 'John Smith',
    serviceName: 'Tile Making',
    amount: 16600,
    status: 'Paid',
    method: 'Card',
    date: '2025-09-10'
  },
  {
    id: 'P032',
    bookingId: 'B032',
    customerName: 'Sarah Johnson',
    serviceName: 'Steel and Cement Ratio',
    amount: 12450,
    status: 'Paid',
    method: 'UPI',
    date: '2025-09-08'
  },
  {
    id: 'P033',
    bookingId: 'B033',
    customerName: 'Michael Brown',
    serviceName: 'Residential Plumbing',
    amount: 12450,
    status: 'Paid',
    method: 'Cash',
    date: '2025-09-05'
  },
  // Earlier months payments
  {
    id: 'P034',
    bookingId: 'B034',
    customerName: 'Emily Davis',
    serviceName: 'Interior and Exterior',
    amount: 41500,
    status: 'Paid',
    method: 'Card',
    date: '2025-08-28'
  },
  {
    id: 'P035',
    bookingId: 'B035',
    customerName: 'David Wilson',
    serviceName: 'Home Renovation',
    amount: 207500,
    status: 'Paid',
    method: 'UPI',
    date: '2025-07-20'
  },
  {
    id: 'P036',
    bookingId: 'B036',
    customerName: 'John Smith',
    serviceName: 'New Construction',
    amount: 4150000,
    status: 'Paid',
    method: 'Bank Transfer',
    date: '2025-06-15'
  },
  {
    id: 'P037',
    bookingId: 'B037',
    customerName: 'Sarah Johnson',
    serviceName: 'Electrical Installation',
    amount: 16600,
    status: 'Paid',
    method: 'Cash',
    date: '2025-05-10'
  },
  {
    id: 'P038',
    bookingId: 'B038',
    customerName: 'Michael Brown',
    serviceName: 'Painting Services',
    amount: 33200,
    status: 'Paid',
    method: 'Card',
    date: '2025-04-22'
  },
  {
    id: 'P039',
    bookingId: 'B039',
    customerName: 'Emily Davis',
    serviceName: 'Carpentry Work',
    amount: 24900,
    status: 'Paid',
    method: 'UPI',
    date: '2025-03-18'
  },
  {
    id: 'P040',
    bookingId: 'B040',
    customerName: 'David Wilson',
    serviceName: 'Residential Plumbing',
    amount: 12450,
    status: 'Paid',
    method: 'Cash',
    date: '2025-02-25'
  },
  {
    id: 'P041',
    bookingId: 'B041',
    customerName: 'John Smith',
    serviceName: 'Masonry Work',
    amount: 29050,
    status: 'Paid',
    method: 'Card',
    date: '2025-01-30'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'N001',
    type: 'booking',
    title: 'New Booking Request',
    message: 'Sarah Johnson requested Residential Plumbing service',
    timestamp: '2025-11-05T14:30:00',
    read: false
  },
  {
    id: 'N002',
    type: 'payment',
    title: 'Payment Received',
    message: 'Payment of ₹29,050 received from Michael Brown',
    timestamp: '2025-11-05T09:15:00',
    read: false
  },
  {
    id: 'N003',
    type: 'completion',
    title: 'Work Completed',
    message: 'Matthew Jackson completed painting work for Emily Davis',
    timestamp: '2025-11-04T16:45:00',
    read: true
  },
  {
    id: 'N004',
    type: 'employee',
    title: 'Employee Leave Request',
    message: 'Thomas Anderson requested leave for Nov 5-7',
    timestamp: '2025-11-04T10:00:00',
    read: true
  }
];