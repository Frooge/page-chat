'use client';

import '@pages/panel/Panel.css';
import { useState } from 'react';
import { useChat } from './hooks/useChat';
import { usePageContext } from './hooks/usePageContext';
import { Header } from './components/Header';
import { ConversationList } from './components/ConversationList';
import { InputPrompt } from './components/InputPrompt';

export default function Panel() {
  const pageContext = usePageContext();
  const [webSearch, setWebSearch] = useState(false);
  
  const { messages, isLoading, handleSubmit, clearMessages } = useChat({
    onError: (error) => {
      console.error('Chat error:', error);
    },
    pageContext,
    webSearch,
  });

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      <Header 
        onClearChat={clearMessages}
      />
      <ConversationList messages={messages} isLoading={isLoading} />
      <InputPrompt 
        onSubmit={handleSubmit} 
        disabled={isLoading}
        webSearch={webSearch}
        onWebSearchToggle={setWebSearch}
      />
    </div>
  );
}
