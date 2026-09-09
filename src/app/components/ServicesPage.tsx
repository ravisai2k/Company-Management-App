import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Star, IndianRupee, TrendingUp, Plus } from 'lucide-react';
import { mockServices } from '../data/mockData';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { toast } from 'sonner';

export function ServicesPage() {
  const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState<typeof mockServices[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Service Management</h1>
          <p className="text-gray-500 mt-1">Manage all services offered by your company</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Services</p>
            <p className="mt-2">{mockServices.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Active Services</p>
            <p className="mt-2">{mockServices.filter(s => s.active).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Bookings</p>
            <p className="mt-2">{mockServices.reduce((sum, s) => sum + s.bookingCount, 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="mt-2">₹{mockServices.reduce((sum, s) => sum + s.revenue, 0).toLocaleString('en-IN')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="mb-1">{service.name}</h3>
                  <Badge variant="outline">{service.category}</Badge>
                </div>
                <Switch checked={service.active} />
              </div>

              <p className="text-sm text-gray-600 mb-4">{service.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Base Price</span>
                  </div>
                  <span>₹{service.basePrice.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">Bookings</span>
                  </div>
                  <span>{service.bookingCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-500">Rating</span>
                  </div>
                  <span>{service.rating.toFixed(1)}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-sm text-gray-500">Total Revenue</span>
                  <span className="text-green-600">₹{service.revenue.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  size="sm"
                  onClick={() => {
                    setSelectedService(service);
                    setIsEditing(true);
                    setEditedService(service);
                  }}
                >
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  size="sm"
                  onClick={() => {
                    setSelectedService(service);
                    setIsEditing(false);
                  }}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Details/Edit Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => {
        setSelectedService(null);
        setIsEditing(false);
        setEditedService(null);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Service' : 'Service Details'}</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-6">
              {!isEditing ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Service ID</p>
                      <p>{selectedService.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <Badge variant="outline">{selectedService.category}</Badge>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Service Name</p>
                      <p>{selectedService.name}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Description</p>
                      <p className="text-sm">{selectedService.description}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Base Price</p>
                      <p>₹{selectedService.basePrice.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <Badge className={selectedService.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {selectedService.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-gray-500">Total Bookings</p>
                        <p className="mt-1">{selectedService.bookingCount}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-gray-500">Rating</p>
                        <p className="mt-1 flex items-center justify-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {selectedService.rating.toFixed(1)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="mt-1 text-green-600">₹{selectedService.revenue.toLocaleString('en-IN')}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        setIsEditing(true);
                        setEditedService(selectedService);
                      }}
                    >
                      Edit Service
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label>Service Name</Label>
                      <Input 
                        value={editedService?.name || ''} 
                        onChange={(e) => setEditedService(prev => prev ? {...prev, name: e.target.value} : null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input 
                        value={editedService?.category || ''} 
                        onChange={(e) => setEditedService(prev => prev ? {...prev, category: e.target.value} : null)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Base Price (₹)</Label>
                      <Input 
                        type="number"
                        value={editedService?.basePrice || ''} 
                        onChange={(e) => setEditedService(prev => prev ? {...prev, basePrice: parseFloat(e.target.value)} : null)}
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label>Description</Label>
                      <Textarea 
                        value={editedService?.description || ''} 
                        onChange={(e) => setEditedService(prev => prev ? {...prev, description: e.target.value} : null)}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Active Status</Label>
                      <div className="flex items-center gap-2 h-10">
                        <Switch 
                          checked={editedService?.active || false}
                          onCheckedChange={(checked: boolean) => setEditedService(prev => prev ? {...prev, active: checked} : null)}
                        />
                        <span className="text-sm">{editedService?.active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setIsEditing(false);
                        setEditedService(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        toast.success('Service updated successfully!');
                        setIsEditing(false);
                        setSelectedService(editedService);
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
