import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface UseChatOptions {
  onError?: (error: Error) => void;
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

      try {
        // TODO: Replace with actual API call
        // Example:
        // const response = await fetch('/api/chat', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     message: message.text,
        //     files: message.files,
        //     history: messages,
        //   }),
        // });
        // const data = await response.json();

        // Simulate AI response
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `I received your message: "${message.text}". How can I help you further?`,
        };

        addMessage(assistantMessage);
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
