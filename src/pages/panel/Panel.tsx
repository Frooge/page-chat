'use client';

import '@pages/panel/Panel.css';
import { PanelHeader, ConversationArea, InputArea } from './components';
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
      <PanelHeader />
      <ConversationArea messages={messages} isLoading={isLoading} />
      <InputArea isLoading={isLoading} onSubmit={handleSubmit} />
    </div>
  );
}
