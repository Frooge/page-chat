import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@src/components/ai-elements/conversation';
import { Message, MessageAvatar, MessageContent } from '@src/components/ai-elements/message';
import { Response } from '@src/components/ai-elements/response';
import { Sparkles } from 'lucide-react';
import type { ChatMessage } from '../hooks/useChat';

interface ConversationAreaProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ConversationArea({ messages, isLoading }: ConversationAreaProps) {
  return (
    <div className="flex-1 overflow-hidden">
      <Conversation className="h-full">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<Sparkles className="h-12 w-12" />}
              title="Start a conversation"
              description="Ask me anything! I'm here to help you."
            />
          ) : (
            <>
              {messages.map((msg) => (
                <Message key={msg.id} from={msg.role}>
                  <MessageAvatar
                    src={
                      msg.role === 'user'
                        ? 'https://avatar.vercel.sh/user'
                        : 'https://avatar.vercel.sh/ai'
                    }
                    name={msg.role === 'user' ? 'You' : 'AI'}
                  />
                  <MessageContent variant="contained">
                    {typeof msg.content === 'string' ? (
                      <Response>{msg.content}</Response>
                    ) : (
                      msg.content
                    )}
                  </MessageContent>
                </Message>
              ))}
              {isLoading && (
                <Message from="assistant">
                  <MessageAvatar
                    src="https://avatar.vercel.sh/ai"
                    name="AI"
                  />
                  <MessageContent variant="contained">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
                      </div>
                      <span className="text-xs">Thinking...</span>
                    </div>
                  </MessageContent>
                </Message>
              )}
            </>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
}
