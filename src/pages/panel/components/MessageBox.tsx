import { cn } from '@src/lib/utils';
import { ChatMessage } from '../hooks/useChat';
import { UserIcon, BotIcon } from '@assets/icons';
import Markdown from 'react-markdown';
interface MessageBoxProps {
  message: ChatMessage;
  className?: string;
}

export function MessageBox({ message, className }: MessageBoxProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full gap-3 px-4 py-4',
        isUser ? 'bg-background' : 'bg-muted/50',
        className
      )}
    >
      <div className="flex-shrink-0">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full',
            isUser
              ? 'bg-blue-500 text-white'
              : 'bg-purple-500 text-white'
          )}
        >
          {isUser ? <UserIcon size={18} /> : <BotIcon size={18} />}
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {isUser ? 'You' : 'Assistant'}
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <Markdown>
            {message.content}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
