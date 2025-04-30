'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema, LoginFormValues, RegisterFormValues } from '@/lib/auth/auth.types';
import { useLogin, useRegister, useAuthStatus } from '@/lib/auth/auth.hooks';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // React Query hooks for login, register, and auth status
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const { data: isAuthenticated, isLoading: isCheckingAuth } = useAuthStatus();

  // Setup React Hook Form for login
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Setup React Hook Form for registration
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && !isCheckingAuth) {
      // Start fade out animation before redirecting
      setIsRedirecting(true);

      // Wait for animation to complete before redirecting
      const redirectTimer = setTimeout(() => {
        router.push('/dashboard');
      }, 500); // Match this with the CSS transition duration

      return () => clearTimeout(redirectTimer);
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  // Handle form submission for login
  const handleLogin = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  // Handle form submission for registration
  const handleRegister = (data: RegisterFormValues) => {
    registerMutation.mutate(data);
  };

  // Toggle between login and register forms
  const toggleAuthMode = () => {
    setIsRegister(!isRegister);
    // Reset form when toggling
    loginForm.reset();
    registerForm.reset();
  };

  // Determine if the form is submitting
  const isSubmitting = loginMutation.isPending || registerMutation.isPending;
  const isLoading = isCheckingAuth || isRedirecting;

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 p-4 relative">
      {/* Main content with fade out animation when redirecting */}
      <div
        className={cn(
          'w-full max-w-4xl transition-opacity duration-500 ease-in-out relative z-10',
          isRedirecting && 'opacity-30',
        )}
      >
        <Card className="flex flex-col md:flex-row w-full h-auto shadow-lg rounded-lg overflow-hidden">
          {/* Left Column - Form */}
          <div className="flex flex-col justify-center items-center p-8 bg-white w-full md:w-1/2">
            <h1 className="text-2xl font-bold mb-4">{isRegister ? 'Sign Up' : 'Login'}</h1>

            {isRegister ? (
              // Registration Form
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="w-full space-y-4">
                {/* Name field */}
                <div>
                  <Input
                    type="text"
                    placeholder="Name"
                    {...registerForm.register('name')}
                    className={registerForm.formState.errors.name ? 'border-red-500' : ''}
                  />
                  {registerForm.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.name.message}</p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...registerForm.register('email')}
                    className={registerForm.formState.errors.email ? 'border-red-500' : ''}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Password field */}
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...registerForm.register('password')}
                    className={registerForm.formState.errors.password ? 'border-red-500' : ''}
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password field */}
                <div>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...registerForm.register('confirmPassword')}
                    className={registerForm.formState.errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
                  {isSubmitting ? 'Processing...' : 'Sign Up'}
                </Button>
              </form>
            ) : (
              // Login Form
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="w-full space-y-4">
                {/* Email field */}
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...loginForm.register('email')}
                    className={loginForm.formState.errors.email ? 'border-red-500' : ''}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                {/* Password field */}
                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    {...loginForm.register('password')}
                    className={loginForm.formState.errors.password ? 'border-red-500' : ''}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
                  {isSubmitting ? 'Processing...' : 'Login'}
                </Button>
              </form>
            )}

            {/* Toggle Login/Register */}
            <p className="text-sm text-gray-600 mt-4 cursor-pointer hover:underline" onClick={toggleAuthMode}>
              {isRegister ? 'Already have an account? Log in' : 'New here? Sign up'}
            </p>
          </div>

          {/* Right Column - Illustration */}
          <div className="hidden md:flex md:w-1/2 bg-gray-200 justify-center items-end">
            <Image
              src="/login/security.svg"
              alt="Login Illustration"
              width={500}
              height={500}
              className="max-w-full pl-8 pt-8"
              priority
            />
          </div>
        </Card>
      </div>

      {/* Overlay for loading or redirecting states */}
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center bg-background backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out ${isLoading ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="w-16 h-16 relative mb-6">
          <div className="w-16 h-16 rounded-full border-t-2 border-b-2 border-primary animate-spin"></div>
          <div
            className={cn(
              'absolute inset-0 rounded-full border-t-2 border-primary animate-ping',
              'opacity-75 transition-opacity duration-1000 ease-in-out',
            )}
          ></div>
        </div>
        <p className="text-lg font-medium animate-pulse">
          {isRedirecting ? 'Redirecting to dashboard...' : 'Checking authentication...'}
        </p>
      </div>
    </div>
  );
}
