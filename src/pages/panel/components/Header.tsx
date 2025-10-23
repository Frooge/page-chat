import { cn } from '@src/lib/utils';
import { TrashIcon, ChatIcon } from '@assets/icons';

interface HeaderProps {
  onClearChat?: () => void;
  className?: string;
}

export function Header({ onClearChat, className }: HeaderProps) {
  return (
    <header className={cn('flex items-center justify-between border-b border-border bg-background px-4 py-3', className)}>
      <div className="flex items-center gap-2">
        <ChatIcon size={24} className="text-blue-500" />
        <h1 className="text-lg font-semibold">Chat</h1>
      </div>
      <div className="flex items-center gap-2">
        {onClearChat && (
          <button
            onClick={onClearChat}
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            title="Clear conversation"
          >
            <TrashIcon size={16} />
            <span>Clear</span>
          </button>
        )}
      </div>
    </header>
  );
}
