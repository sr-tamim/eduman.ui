/**
 * Common API response interfaces used throughout the application
 */

// Base API response type that all responses will follow
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status?: number;
}
