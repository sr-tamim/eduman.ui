import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Base API client configuration using Axios
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/dev';

// Create an Axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Enable cookies for authentication
  withCredentials: true,
  // Default timeout in ms
  timeout: 10000,
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const response = error.response;

    // Format error message from response if available
    const errorMessage = (response?.data as any)?.message || error.message || 'Something went wrong';

    return Promise.reject(new Error(errorMessage));
  },
);

// Type for request options extending AxiosRequestConfig
export interface ApiRequestConfig extends AxiosRequestConfig {}

// Define a generic type for request data
export type RequestData = Record<string, unknown>;

/**
 * API client with typed methods for making HTTP requests
 */
export const apiClient = {
  /**
   * Generic request method
   */
  request: async <T>(config: ApiRequestConfig): Promise<T> => {
    const response = await axiosInstance.request<T>(config);
    return response.data;
  },

  /**
   * GET request method
   */
  get: async <T>(url: string, config?: ApiRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  /**
   * POST request method
   */
  post: async <T>(url: string, data?: RequestData, config?: ApiRequestConfig): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  /**
   * PUT request method
   */
  put: async <T>(url: string, data?: RequestData, config?: ApiRequestConfig): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },

  /**
   * PATCH request method
   */
  patch: async <T>(url: string, data?: RequestData, config?: ApiRequestConfig): Promise<T> => {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  },

  /**
   * DELETE request method
   */
  delete: async <T>(url: string, config?: ApiRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },
};
