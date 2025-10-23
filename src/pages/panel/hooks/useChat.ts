import { useState, useCallback } from 'react';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface PageContext {
  url: string;
  title: string;
  content: string;
}

export interface UseChatOptions {
  onError?: (error: Error) => void;
  pageContext?: PageContext | null;
}

export function useChat(options?: UseChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  }, []);

  const handleSubmit = useCallback(
    async (message: { text?: string; files?: any[] }) => {
      if (!message.text?.trim() && !message.files?.length) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message.text || '',
      };

      addMessage(userMessage);
      setIsLoading(true);

      // Create assistant message placeholder
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
      };

      addMessage(assistantMessage);

      try {
        // Send the message to the backend
        const response = await fetch(`${API_URL}/chat/stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            prompt: message.text || '',
            messages: messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            pageContext: options?.pageContext || undefined,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        // Handle ReadableStream
        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No response body');
        }

        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: msg.content + chunk }
                  : msg
              )
            );
          }
        } finally {
          reader.releaseLock();
        }
      } catch (error) {
        console.error('Error sending message:', error);
        options?.onError?.(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [addMessage, options]
  );

  return {
    messages,
    isLoading,
    handleSubmit,
    addMessage,
    clearMessages,
    removeMessage,
  };
}
