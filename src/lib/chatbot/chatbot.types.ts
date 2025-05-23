import { z } from 'zod';
import { ApiResponse } from '@/lib/api-types';

export interface ChatHistoryItem {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// API response type for chatbot
export type ChatbotApiResponse = ApiResponse<ChatHistoryItem[]>;

// Schema for chat form validation
export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});

// Infer TypeScript type from the schema
export type ChatMessageFormValues = z.infer<typeof chatMessageSchema>;

// Request structure for sending a chat message
export interface ChatMessageRequest {
  prompt: string;
}
