import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { chatbotService } from './chatbot.service';
import { ChatHistoryItem, ChatMessageRequest } from './chatbot.types';

/**
 * Custom hook for sending messages to the chatbot
 */
export const useChatbot = (onSuccess: (response: ChatHistoryItem[]) => void) => {
  return useMutation({
    mutationFn: (data: ChatMessageRequest) => chatbotService.sendMessage(data),
    onSuccess: (apiResponse) => {
      // The response from the API will be structured as { data: ChatHistoryItem[] }
      // according to our ChatbotApiResponse type
      if (apiResponse && apiResponse.data) {
        onSuccess(apiResponse.data);
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to get a response. Please try again.',
        variant: 'destructive',
      });
    },
  });
};

/**
 * Custom hook for loading chat history on initial render
 */
export const useChatHistory = () => {
  return useQuery({
    queryKey: ['chatHistory'],
    queryFn: () => chatbotService.getChatHistory(),
    /*  onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load chat history.',
        variant: 'destructive',
      });
    }, */
    // Don't refetch automatically on window focus
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook for clearing chat history
 */
export const useClearChatHistory = (onSuccess: (response: ChatHistoryItem[]) => void) => {
  return useMutation({
    mutationFn: () => chatbotService.clearChatHistory(),
    onSuccess: (apiResponse) => {
      // The response will contain the new (empty) chat history
      if (apiResponse && apiResponse.data) {
        onSuccess(apiResponse.data);
        toast({
          title: 'Chat Cleared',
          description: 'Your conversation history has been cleared',
          variant: 'default',
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to clear chat history',
        variant: 'destructive',
      });
    },
  });
};
