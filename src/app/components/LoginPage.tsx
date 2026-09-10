import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Building2, Mail, Lock, User, Phone } from 'lucide-react';
import { toast } from 'sonner';
import companyLogo from 'figma:asset/1da61fd33df92088a3201638d93abaf418e82ba1.png';

import type { UserData } from '../App';

const DEMO_USER = {
  name: 'Demo User',
  email: 'demo@buildinghealth.com',
  mobile: '+91 90000 00000',
  password: 'demo1234',
};

interface AuthPageProps {
  onLogin: (user: UserData) => void;
}

export function LoginPage({ onLogin }: AuthPageProps) {
  const [loginForm, setLoginForm] = useState({ email: DEMO_USER.email, password: DEMO_USER.password });
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [verificationSent, setVerificationSent] = useState({ email: false, mobile: false });

  const ensureDemoUser = () => {
    try {
      const storedUsers = localStorage.getItem('buildingHealthUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : {};

      if (!users[DEMO_USER.email]) {
        users[DEMO_USER.email] = {
          ...DEMO_USER,
          addresses: [
            {
              id: 'demo-address-1',
              type: 'Home',
              fullAddress: '12 Demo Street, Sector 4',
              city: 'Bengaluru',
              state: 'Karnataka',
              pincode: '560001',
              landmark: 'Near City Park',
              isPrimary: true,
            },
          ],
        };
        localStorage.setItem('buildingHealthUsers', JSON.stringify(users));
      }
    } catch (error) {
      console.error('Unable to seed demo user:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    ensureDemoUser();

    if (loginForm.email && loginForm.password) {
      const storedUsers = localStorage.getItem('buildingHealthUsers');
      const users = storedUsers ? JSON.parse(storedUsers) : {};
      const userData = users[loginForm.email.trim().toLowerCase()];

      if (userData && userData.password === loginForm.password) {
        toast.success('Login successful!');
        onLogin({
          name: userData.name,
          email: userData.email,
          mobile: userData.mobile,
          addresses: userData.addresses || [],
        });
      } else if (userData) {
        toast.error('Incorrect password');
      } else {
        toast.error('User not found. Please sign up first.');
      }
    } else {
      toast.error('Please fill in all fields');
    }
  };

  const handleDemoLogin = () => {
    setLoginForm({ email: DEMO_USER.email, password: DEMO_USER.password });
    ensureDemoUser();
    toast.success('Demo account loaded. Click Login to continue.');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!verificationSent.email || !verificationSent.mobile) {
      toast.error('Please verify your email and mobile number');
      return;
    }

    const storedUsers = localStorage.getItem('buildingHealthUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : {};

    if (users[signupForm.email]) {
      toast.error('User with this email already exists');
      return;
    }

    users[signupForm.email] = {
      name: signupForm.name,
      email: signupForm.email,
      mobile: signupForm.mobile,
      password: signupForm.password,
      addresses: [],
    };

    localStorage.setItem('buildingHealthUsers', JSON.stringify(users));

    toast.success('Account created successfully!');
    onLogin({
      name: signupForm.name,
      email: signupForm.email,
      mobile: signupForm.mobile,
      addresses: [],
    });
  };

  const sendEmailVerification = () => {
    if (signupForm.email) {
      setVerificationSent((prev) => ({ ...prev, email: true }));
      toast.success('Verification code sent to your email');
    } else {
      toast.error('Please enter your email address');
    }
  };

  const sendMobileVerification = () => {
    if (signupForm.mobile) {
      setVerificationSent((prev) => ({ ...prev, mobile: true }));
      toast.success('Verification code sent to your mobile');
    } else {
      toast.error('Please enter your mobile number');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src={companyLogo}
              alt="SSS HOMESCAPES"
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-gray-900 mb-2">Building Health</h1>
          <p className="text-teal-600">Sponsored by SSS HOMESCAPES</p>
          <p className="text-sm text-gray-500 mt-2">
            A one-stop solution for all your building needs
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Login to your account to continue</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        className="pl-10"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button type="button" variant="outline" className="w-full" onClick={handleDemoLogin}>
                    Use Demo Account
                  </Button>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Sign up to get started with Building Health</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="John Doe"
                        className="pl-10"
                        value={signupForm.name}
                        onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={signupForm.email}
                          onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                        />
                      </div>
                      <Button
                        type="button"
                        variant={verificationSent.email ? 'secondary' : 'outline'}
                        onClick={sendEmailVerification}
                        disabled={verificationSent.email}
                      >
                        {verificationSent.email ? 'Sent' : 'Verify'}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-mobile">Mobile Number</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-mobile"
                          type="tel"
                          placeholder="+1 234 567 8900"
                          className="pl-10"
                          value={signupForm.mobile}
                          onChange={(e) => setSignupForm({ ...signupForm, mobile: e.target.value })}
                        />
                      </div>
                      <Button
                        type="button"
                        variant={verificationSent.mobile ? 'secondary' : 'outline'}
                        onClick={sendMobileVerification}
                        disabled={verificationSent.mobile}
                      >
                        {verificationSent.mobile ? 'Sent' : 'Verify'}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}