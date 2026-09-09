import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Search, Star, Phone, Mail, UserPlus, Clock } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { mockEmployees } from '../data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

export function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<typeof mockEmployees[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState<typeof mockEmployees[0] | null>(null);

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Assigned':
        return 'bg-blue-100 text-blue-800';
      case 'On Leave':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get available employees for "Active Now" section
  const availableEmployees = mockEmployees.filter(e => e.status === 'Available').slice(0, 8);
  
  // Helper to get initials from name
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Helper to get random active time for demo
  const getActiveTime = () => {
    const hours = Math.floor(Math.random() * 3) + 7; // 7-9 AM
    const minutes = ['00', '15', '30', '45'][Math.floor(Math.random() * 4)];
    return `${hours}:${minutes} AM`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Employee Management</h1>
          <p className="text-gray-500 mt-1">Manage your workforce and track performance</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search employees by name, role, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Available Employees</p>
            <p className="mt-2">{mockEmployees.filter(e => e.status === 'Available').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Currently Assigned</p>
            <p className="mt-2">{mockEmployees.filter(e => e.status === 'Assigned').length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">On Leave</p>
            <p className="mt-2">{mockEmployees.filter(e => e.status === 'On Leave').length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Now Section */}
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Employees Currently Available at the Office
            </h3>
            <p className="text-sm text-gray-500 mt-1">{availableEmployees.length} employees ready for assignment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {availableEmployees.map((employee) => (
              <div 
                key={employee.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer"
                onClick={() => setSelectedEmployee(employee)}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{employee.name}</p>
                  <p className="text-xs text-gray-500 truncate">{employee.role}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>Available since {getActiveTime()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {employee.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(employee.status)}>
                      {employee.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{employee.rating.toFixed(1)}</span>
                      </div>
                      <p className="text-sm text-gray-500">{employee.completedTasks} tasks</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Employee Details Dialog */}
      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p>{selectedEmployee.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p>{selectedEmployee.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <Badge variant="outline">{selectedEmployee.role}</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge className={getStatusColor(selectedEmployee.status)}>
                    {selectedEmployee.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{selectedEmployee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p>{selectedEmployee.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Aadhaar Card Number</p>
                  <p>{selectedEmployee.aadhaarNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Verification Status</p>
                  <Badge className={selectedEmployee.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {selectedEmployee.verified ? 'Verified' : 'Not Verified'}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-500">Completed Tasks</p>
                    <p className="mt-1">{selectedEmployee.completedTasks}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-500">Rating</p>
                    <p className="mt-1 flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {selectedEmployee.rating.toFixed(1)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-500">Current Status</p>
                    <p className="mt-1 text-sm">{selectedEmployee.status}</p>
                  </CardContent>
                </Card>
              </div>

              {!selectedEmployee.verified && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> This employee is not yet verified to work in {selectedEmployee.role} services. Please complete the verification process.
                  </p>
                </div>
              )}

              {selectedEmployee.assignedBooking && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm">
                    Currently assigned to booking: <span className="font-medium">{selectedEmployee.assignedBooking}</span>
                  </p>
                </div>
              )}

              {!isEditing ? (
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setIsEditing(true);
                      setEditedEmployee(selectedEmployee);
                    }}
                  >
                    Edit Details
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      toast.success('Employee status updated successfully!');
                    }}
                  >
                    Update Status
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input 
                        value={editedEmployee?.name || ''} 
                        onChange={(e) => setEditedEmployee(prev => prev ? {...prev, name: e.target.value} : null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Role</Label>
                      <Input 
                        value={editedEmployee?.role || ''} 
                        onChange={(e) => setEditedEmployee(prev => prev ? {...prev, role: e.target.value} : null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input 
                        value={editedEmployee?.email || ''} 
                        onChange={(e) => setEditedEmployee(prev => prev ? {...prev, email: e.target.value} : null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input 
                        value={editedEmployee?.phone || ''} 
                        onChange={(e) => setEditedEmployee(prev => prev ? {...prev, phone: e.target.value} : null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Aadhaar Card Number</Label>
                      <Input 
                        value={editedEmployee?.aadhaarNumber || ''} 
                        onChange={(e) => setEditedEmployee(prev => prev ? {...prev, aadhaarNumber: e.target.value} : null)}
                        placeholder="XXXX XXXX XXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select 
                        value={editedEmployee?.status || ''} 
                        onValueChange={(value) => setEditedEmployee(prev => prev ? {...prev, status: value as any} : null)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="Assigned">Assigned</SelectItem>
                          <SelectItem value="On Leave">On Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="verified"
                      checked={editedEmployee?.verified || false}
                      onCheckedChange={(checked) => setEditedEmployee(prev => prev ? {...prev, verified: checked as boolean} : null)}
                    />
                    <Label htmlFor="verified" className="cursor-pointer">
                      Verified - Has right to work in {editedEmployee?.role || 'this'} service
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setIsEditing(false);
                        setEditedEmployee(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        toast.success('Employee details updated successfully!');
                        setIsEditing(false);
                        setSelectedEmployee(editedEmployee);
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}