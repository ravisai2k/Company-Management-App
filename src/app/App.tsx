import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { CustomersPage } from './components/CustomersPage';
import { EmployeesPage } from './components/EmployeesPage';
import { BookingsPage } from './components/BookingsPage';
import { ServicesPage } from './components/ServicesPage';
import { PaymentsPage } from './components/PaymentsPage';
import { ReportsPage } from './components/ReportsPage';
import { SettingsPage } from './components/SettingsPage';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Toaster } from './components/ui/sonner';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { ScrollArea } from './components/ui/scroll-area';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  ClipboardList, 
  Briefcase, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { mockNotifications } from './data/mockData';
import companyLogo from 'figma:asset/1da61fd33df92088a3201638d93abaf418e82ba1.png';

type Page = 'dashboard' | 'customers' | 'employees' | 'bookings' | 'services' | 'payments' | 'reports' | 'settings';

export interface UserAddress {
  id: string;
  type: string;
  fullAddress: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isPrimary?: boolean;
}

export interface UserData {
  name: string;
  email: string;
  mobile?: string;
  addresses?: UserAddress[];
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<UserData>({ name: 'Harshin', email: 'admin@company.com' });

  if (!isLoggedIn) {
    return <LoginPage onLogin={(loggedInUser) => {
      setUser(loggedInUser);
      setIsLoggedIn(true);
    }} />;
  }

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  const menuItems = [
    { id: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers' as Page, label: 'Customers', icon: Users },
    { id: 'employees' as Page, label: 'Employees', icon: UserCheck },
    { id: 'bookings' as Page, label: 'Bookings', icon: ClipboardList },
    { id: 'services' as Page, label: 'Services', icon: Briefcase },
    { id: 'payments' as Page, label: 'Payments', icon: DollarSign },
    { id: 'reports' as Page, label: 'Reports', icon: BarChart3 },
    { id: 'settings' as Page, label: 'Settings', icon: Settings },
    { id: 'logout' as any, label: 'Logout', icon: LogOut },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'customers':
        return <CustomersPage />;
      case 'employees':
        return <EmployeesPage />;
      case 'bookings':
        return <BookingsPage />;
      case 'services':
        return <ServicesPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'reports':
        return <ReportsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r transition-all duration-300 overflow-hidden flex-shrink-0`}>
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="h-10 flex items-center justify-center">
              <img src={companyLogo} alt="SSS Homescapes" className="h-10 object-contain" />
            </div>
            <div>
              <h2 className="text-sm">SSS Homescapes</h2>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'logout') {
                  setIsLoggedIn(false);
                  setUser({ name: 'Harshin', email: 'admin@company.com' });
                } else {
                  setCurrentPage(item.id);
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div>
                <h1 className="text-sm text-gray-900">Welcome back, {user.name}</h1>
                <p className="text-xs text-gray-500">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadNotifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {unreadNotifications}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b">
                    <h3>Notifications</h3>
                    <p className="text-sm text-gray-500">{unreadNotifications} unread</p>
                  </div>
                  <ScrollArea className="h-96">
                    {mockNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            !notification.read ? 'bg-blue-600' : 'bg-gray-300'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm">{notification.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="p-3 text-center border-t">
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      View all notifications
                    </button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* User Profile */}
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="text-right">
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </div>
    </>
  );
}