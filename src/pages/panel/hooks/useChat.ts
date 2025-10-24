import { useChat as useAIChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useMemo, useRef } from 'react';

const API_URL = process.env.VITE_API_URL;

export interface PageContext {
  url: string;
  title: string;
  content: string;
}

export interface UseChatOptions {
  onError?: (error: Error) => void;
  pageContext?: PageContext | null;
  webSearch?: boolean;
}

export function useChat(options?: UseChatOptions) {
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const {
    messages,
    sendMessage,
    status,
    error,
    stop,
    regenerate,
    setMessages,
  } = useAIChat({
    transport: new DefaultChatTransport({
        api: `${API_URL}/chat/stream`,
        body: () => ({
          pageContext: optionsRef.current?.pageContext || undefined,
          webSearch: optionsRef.current?.webSearch || false,
        }),
      }),
    onError: options?.onError,
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  return {
    messages,
    sendMessage,
    status,
    error,
    isLoading,
    stop,
    regenerate,
    setMessages,
    handleSubmit: (message: { text?: string; files?: any[] }) => {
      if (message.text?.trim()) {
        sendMessage({ text: message.text, files: message.files });
      }
    },
    addMessage: (message: any) => {
      setMessages((prev) => [...prev, message]);
    },
    clearMessages: () => {
      setMessages([]);
    },
    removeMessage: (id: string) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    },
  };
}
