import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from './auth.service';
import { toast } from '@/hooks/use-toast';
import { LoginFormValues, RegisterFormValues } from './auth.types';

/**
 * Custom hook for login functionality using React Query
 */
export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginFormValues) => authService.login(credentials),
    onSuccess: () => {
      // Invalidate all queries to refetch data with new auth cookie
      queryClient.invalidateQueries();

      // Show success message
      toast({
        title: 'Success',
        description: 'Login successful!',
        variant: 'default',
      });

      // Redirect to dashboard
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Invalid credentials',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Custom hook for registration functionality using React Query
 */
export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterFormValues) => authService.register(userData),
    onSuccess: () => {
      // Invalidate all queries to refetch data with new auth cookie
      queryClient.invalidateQueries();

      // Show success message
      toast({
        title: 'Success',
        description: 'Registration successful!',
        variant: 'default',
      });

      // Redirect to dashboard
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Registration failed',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Custom hook for logout functionality
 */
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Reset query cache
      queryClient.clear();

      // Redirect to login page
      router.push('/login');

      // Show success message
      toast({
        title: 'Success',
        description: 'Logged out successfully',
        variant: 'default',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Logout failed',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Custom hook to check if user is authenticated
 */
export const useAuthStatus = () => {
  return useQuery({
    queryKey: ['auth-status'],
    queryFn: () => authService.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
