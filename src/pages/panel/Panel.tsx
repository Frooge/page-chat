'use client';

import '@pages/panel/Panel.css';
import { useChat } from './hooks/useChat';

export default function Panel() {
  const { messages, isLoading, handleSubmit } = useChat({
    onError: (error) => {
      console.error('Chat error:', error);
      // You can add toast notifications or other error handling here
    },
  });

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      Test
    </div>
  );
}
