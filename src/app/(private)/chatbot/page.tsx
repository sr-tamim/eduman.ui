'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatHistoryItem, ChatMessageFormValues, chatMessageSchema } from '@/lib/chatbot/chatbot.types';
import { useChatbot, useChatHistory, useClearChatHistory } from '@/lib/chatbot/chatbot.hooks';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageContainer } from '@/components/GlassPanels';

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatHistoryItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasInitializedRef = useRef<boolean>(false);

  // Setup React Hook Form for chat messages
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isValid },
  } = useForm<ChatMessageFormValues>({
    resolver: zodResolver(chatMessageSchema),
    defaultValues: {
      message: '',
    },
    mode: 'onChange',
  });

  // Fetch chat history on component mount
  const chatHistoryQuery = useChatHistory();

  // Define success handlers for chat operations
  const handleChatSuccess = (data: ChatHistoryItem[]) => {
    setMessages(data);
    setFocus('message');
  };

  // Setup TanStack Query mutations
  const chatMutation = useChatbot(handleChatSuccess);
  const clearChatMutation = useClearChatHistory(handleChatSuccess);

  // Scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Process chat history or set default welcome message
  useEffect(() => {
    if (hasInitializedRef.current) return;

    if (chatHistoryQuery.isSuccess && chatHistoryQuery.data?.data?.length > 0) {
      // If we have history from the server, use it
      setMessages(chatHistoryQuery.data.data);
      hasInitializedRef.current = true;
    } else if (!chatHistoryQuery.isLoading && messages.length === 0) {
      // If no history and query completed, show welcome message
      setMessages([
        {
          role: 'model',
          parts: [{ text: "Hello! I'm your Northern University assistant. How can I help you today?" }],
        },
      ]);
      hasInitializedRef.current = true;
    }

    // Focus input field
    setFocus('message');
  }, [chatHistoryQuery.isSuccess, chatHistoryQuery.isLoading, chatHistoryQuery.data, messages.length]);

  // Handle sending a message
  const onSubmit = (formData: ChatMessageFormValues) => {
    // Add user message to chat first (optimistic update)
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        parts: [{ text: formData.message.trim() }],
      },
    ]);

    // Send message to API
    chatMutation.mutate({
      prompt: formData.message.trim(),
    });

    // Reset the form
    reset();
  };

  // Handle clearing the chat - now using the API
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all messages?')) {
      clearChatMutation.mutate();
    }
  };

  // Check if currently loading
  const isLoading = chatMutation.isPending || chatHistoryQuery.isLoading || clearChatMutation.isPending;

  // Calculate main content
  const showInitialLoading = chatHistoryQuery.isLoading && messages.length === 0;

  return (
    <PageContainer className="flex flex-col min-h-[80vh]">
      {/* Header */}
      <div className="py-4 lg:px-6 bg-white/80 backdrop-blur border-b shadow-sm sticky top-14 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
              <div className="h-6 w-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="fill-primary">
                  <path d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-medium">University Assistant</h1>
              <p className="text-sm text-muted-foreground">Ask me anything about the university</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={handleClearChat}
            disabled={isLoading}
          >
            <RefreshCw size={14} className={clearChatMutation.isPending ? 'animate-spin' : ''} />
            <span className="ml-1">Reset</span>
          </Button>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl w-full mx-auto px-4 pt-4 pb-24">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-4">
          {showInitialLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-2">
                  <div
                    className="w-3 h-3 rounded-full bg-primary/70 animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full bg-primary/70 animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full bg-primary/70 animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  ></div>
                </div>
                <div className="text-sm text-muted-foreground">Loading conversation history...</div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[80%] md:max-w-[70%] p-4 rounded-2xl',
                      message.role === 'user'
                        ? 'bg-primary/10 text-foreground mr-2'
                        : 'bg-secondary/80 text-foreground ml-2',
                    )}
                  >
                    <div className="whitespace-pre-wrap">{message.parts[0]?.text}</div>
                    <div className="mt-1 text-xs text-muted-foreground opacity-70 text-right">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator for new messages */}
              {chatMutation.isPending && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] md:max-w-[70%] p-4 rounded-2xl bg-secondary/10 text-foreground ml-2">
                    <div className="flex space-x-2 items-center h-6">
                      <div
                        className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-primary/50 animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input area - fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white pt-8 pb-4 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <form onSubmit={handleSubmit(onSubmit)} className="relative flex items-center">
            <Input
              {...register('message')}
              placeholder="Type your message here..."
              className={cn(
                'pr-12 py-6 shadow-lg border-2 focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-full disabled:opacity-50',
                errors.message && 'border-red-500',
              )}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
              disabled={isLoading || !isValid}
            >
              <Send size={18} className="text-white" />
            </Button>
          </form>

          <div className="text-center mt-3 text-xs text-muted-foreground">Press Enter to send your message</div>
        </div>
      </div>
    </PageContainer>
  );
}
