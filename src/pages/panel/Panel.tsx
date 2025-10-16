'use client';

import '@pages/panel/Panel.css';
import { useChat } from './hooks/useChat';
import { Header } from './components/Header';
import { ConversationList } from './components/ConversationList';
import { InputPrompt } from './components/InputPrompt';

export default function Panel() {
  const { messages, isLoading, handleSubmit, clearMessages } = useChat({
    onError: (error) => {
      console.error('Chat error:', error);
      // You can add toast notifications or other error handling here
    },
  });

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <Header onClearChat={clearMessages} />
      <ConversationList messages={messages} isLoading={isLoading} />
      <InputPrompt onSubmit={handleSubmit} disabled={isLoading} />
    </div>
  );
}
