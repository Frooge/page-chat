import { useEffect, useRef } from 'react';
import { cn } from '@src/lib/utils';
import { ChatMessage } from '../hooks/useChat';
import { MessageBox } from './MessageBox';
import { ChatIcon, BotIcon } from '@assets/icons';

interface ConversationListProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  className?: string;
}

export function ConversationList({ messages, isLoading, className }: ConversationListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={cn('flex-1 overflow-y-auto', className)}>
      {messages.length === 0 ? (
        <div className="flex h-full items-center justify-center p-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <ChatIcon size={32} className="text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Start a conversation</h3>
            <p className="text-sm text-muted-foreground">
              Send a message to begin chatting
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-0">
          {messages.map((message, index) => {
            const isLastMessage = index === messages.length - 1;
            const shouldShowLoading = isLoading && isLastMessage && message.role === 'assistant';
            return (
              <div key={message.id}>
                <MessageBox message={message} />
                {shouldShowLoading && (
                  <div className="flex w-full bg-muted/50">
                    <span className="w-[3rem]"></span>
                    <div className="flex items-center gap-1 px-4 pb-4 pt-0">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                    </div>
                  </div>

                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
