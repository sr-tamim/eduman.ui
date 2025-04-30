import { z } from 'zod';
import { ApiResponse } from '@/lib/api-types';

// User data returned from authentication endpoints
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

// Authentication response with user data
export type AuthResponse = ApiResponse<UserData>;

// Login schema with validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Registration schema with validation
export const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
    // role: z.enum(['student', 'teacher', 'admin', 'moderator'], {
    //   errorMap: () => ({ message: 'Please select a valid role' }),
    // }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Infer TypeScript types from the schema
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
