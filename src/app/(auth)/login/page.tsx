'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Select a role'); // Default disabled role
  const [isRegister, setIsRegister] = useState(false); // Toggle between login/signup
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegister && (!name || !role || role === 'Select a role'))) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    const endpoint = isRegister
      ? 'https://mist-hackathon-backend.onrender.com/api/user/register'
      : 'https://mist-hackathon-backend.onrender.com/api/user/login';

    const requestBody = isRegister ? { name, email, password, role } : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData.message || 'Something went wrong!');
      }

      localStorage.setItem('token', jsonData.data.authToken);
      toast({
        title: 'Success',
        description: 'Login successful!',
        variant: 'default',
      });
      router.push('/dashboard');
    } catch {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="flex flex-col md:flex-row w-full max-w-4xl h-auto shadow-lg rounded-lg overflow-hidden">
        {/* Left Column - Login Form */}
        <div className="flex flex-col justify-center items-center p-8 bg-white w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{isRegister ? 'Sign Up' : 'Login'}</h1>

          {isRegister && (
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4"
            />
          )}

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />

          {/* Role Selection (Only in Sign Up Mode) */}
          {isRegister && (
            <Select.Root value={role} onValueChange={setRole}>
              <Select.Trigger className="w-full flex items-center justify-between p-2 border rounded-md bg-gray-100 text-gray-700 cursor-pointer">
                <Select.Value>{role || 'Select a role'}</Select.Value>
                <ChevronDown className="h-4 w-4" />
              </Select.Trigger>
              <Select.Content className="bg-white border rounded-md shadow-md">
                <Select.Viewport className="p-2">
                  {['student', 'teacher', 'admin', 'moderator'].map((r) => (
                    <Select.Item
                      key={r}
                      value={r}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                    >
                      <Select.ItemText>{r.charAt(0).toUpperCase() + r.slice(1)}</Select.ItemText>
                      <Select.ItemIndicator className="ml-auto">
                        <Check className="h-4 w-4 text-green-600" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          )}

          {/* Toggle between Login and Signup */}

          <Button onClick={handleAuth} className="w-full mt-4">
            {isRegister ? 'Sign Up' : 'Login'}
          </Button>
          <br />
          <p
            className="text-sm text-gray-600 mt-2 cursor-pointer hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Already have an account? Log in' : 'New here? Sign up'}
          </p>
        </div>

        {/* Right Column - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gray-200 justify-center items-center">
          <img src="/undraw_access-account_aydp.png" alt="Login Illustration" className="max-w-full h-auto" />
        </div>
      </Card>
    </div>
  );
}
