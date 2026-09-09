import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Building2, Users, Bell, Clock, MapPin } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Settings</h1>
        <p className="text-gray-500 mt-1">Manage your company settings and preferences</p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList>
          <TabsTrigger value="company">
            <Building2 className="w-4 h-4 mr-2" />
            Company
          </TabsTrigger>
          <TabsTrigger value="admins">
            <Users className="w-4 h-4 mr-2" />
            Admins
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="operations">
            <Clock className="w-4 h-4 mr-2" />
            Operations
          </TabsTrigger>
        </TabsList>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="SSS Homescapes" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="ssshomescapes@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="9505955917" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue="www.ssshomescapes.com" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="101, Anasuya Arcade, Seethammapeta, Dwarakanagar, Visakhapatnam" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input id="taxId" defaultValue="XX-XXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license">Business License</Label>
                  <Input id="license" defaultValue="BL-123456" />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Management */}
        <TabsContent value="admins" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Admin Accounts</CardTitle>
                <Button>Add Admin</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'John Doe', email: 'john@company.com', role: 'Super Admin' },
                  { name: 'Jane Smith', email: 'jane@company.com', role: 'Manager' },
                  { name: 'Bob Johnson', email: 'bob@company.com', role: 'Accountant' }
                ].map((admin, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p>{admin.name}</p>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{admin.role}</span>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p>Super Admin</p>
                    <p className="text-sm text-gray-500">Full access to all features</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p>Manager</p>
                    <p className="text-sm text-gray-500">Manage bookings and employees</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p>Accountant</p>
                    <p className="text-sm text-gray-500">Access to payments and reports</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p>New Booking Requests</p>
                  <p className="text-sm text-gray-500">Get notified when a new booking is made</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Payment Confirmations</p>
                  <p className="text-sm text-gray-500">Receive alerts for successful payments</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Work Completion Updates</p>
                  <p className="text-sm text-gray-500">Notifications when employees complete tasks</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Employee Leave Requests</p>
                  <p className="text-sm text-gray-500">Alert when employees request time off</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Daily Summary Reports</p>
                  <p className="text-sm text-gray-500">Receive end-of-day business summary</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Customer Feedback</p>
                  <p className="text-sm text-gray-500">Get notified of new customer reviews</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Operations Settings */}
        <TabsContent value="operations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Opening Time</Label>
                  <Input id="startTime" type="time" defaultValue="10:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Closing Time</Label>
                  <Input id="endTime" type="time" defaultValue="18:00" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p>Weekend Operations</p>
                  <p className="text-sm text-gray-500">Enable bookings on weekends</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex justify-end pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Areas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="serviceArea">Primary Service Area</Label>
                <Input id="serviceArea" defaultValue="New York City, NY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceRadius">Service Radius (miles)</Label>
                <Input id="serviceRadius" type="number" defaultValue="25" />
              </div>
              <div>
                <Label>Additional Service Areas</Label>
                <div className="mt-2 space-y-2">
                  {['Brooklyn, NY', 'Queens, NY', 'Manhattan, NY'].map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{area}</span>
                      </div>
                      <Button variant="ghost" size="sm">Remove</Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-2">Add Area</Button>
              </div>
              <div className="flex justify-end pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minAdvance">Minimum Advance Booking (hours)</Label>
                <Input id="minAdvance" type="number" defaultValue="2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxAdvance">Maximum Advance Booking (days)</Label>
                <Input id="maxAdvance" type="number" defaultValue="30" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Auto-Assignment</p>
                  <p className="text-sm text-gray-500">Automatically assign available employees</p>
                </div>
                <Switch />
              </div>
              <div className="flex justify-end pt-4">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
