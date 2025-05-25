import { apiClient } from '../api-client';
import { ChatbotApiResponse, ChatMessageRequest } from './chatbot.types';

const ENDPOINTS = {
  CHAT: '/chatbot/chat',
  HISTORY: '/chatbot/history',
};

/**
 * Chatbot service containing API calls for the chatbot functionality
 */
export const chatbotService = {
  /**
   * Send a message to the chatbot and get a response
   */
  sendMessage: async (data: ChatMessageRequest): Promise<ChatbotApiResponse> => {
    return apiClient.post<ChatbotApiResponse>(ENDPOINTS.CHAT, data);
  },

  /**
   * Get chat history from the server without sending a new prompt
   */
  getChatHistory: async (): Promise<ChatbotApiResponse> => {
    return apiClient.get<ChatbotApiResponse>(ENDPOINTS.HISTORY);
  },

  /**
   * Clear chat history and get the new state (usually just welcome message)
   * Returns the new chat history after clearing
   */
  clearChatHistory: async (): Promise<ChatbotApiResponse> => {
    return apiClient.delete<ChatbotApiResponse>(ENDPOINTS.HISTORY);
  },
};
