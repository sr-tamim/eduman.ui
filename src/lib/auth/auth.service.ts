import { apiClient } from '../api-client';
import { AuthResponse, LoginFormValues, RegisterFormValues } from './auth.types';

const ENDPOINTS = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  LOGOUT: '/users/logout',
  ME: '/users/profile',
};

/**
 * Auth service containing API calls for authentication
 */
export const authService = {
  /**
   * Login a user with email and password
   */
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(ENDPOINTS.LOGIN, data);
  },

  /**
   * Register a new user
   */
  register: async (data: RegisterFormValues): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>(ENDPOINTS.REGISTER, data);
  },

  /**
   * Log out user by calling the logout endpoint
   */
  logout: async (): Promise<void> => {
    await apiClient.post(ENDPOINTS.LOGOUT);
  },

  /**
   * Check if user is authenticated by making a request to get user info
   */
  isAuthenticated: async (): Promise<boolean> => {
    try {
      await apiClient.get(ENDPOINTS.ME);
      return true;
    } catch (error) {
      return false;
    }
  },
};
