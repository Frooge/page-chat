import { useState, useRef, KeyboardEvent } from 'react';
import { cn } from '@src/lib/utils';
import { SendIcon, GlobeIcon } from '@assets/icons';

interface InputPromptProps {
  onSubmit: (message: { text?: string }) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  webSearch?: boolean;
  onWebSearchToggle?: (enabled: boolean) => void;
}

export function InputPrompt({
  onSubmit,
  disabled,
  className,
  placeholder = 'Type your message...',
  webSearch,
  onWebSearchToggle,
}: InputPromptProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;

    onSubmit({ text: input });
    setInput('');
    
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  return (
    <div className={cn('bg-background p-4', className)}>
      <div className="flex flex-col rounded-md border border-input bg-background">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="w-full bg-transparent resize-none p-3 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden border-none outline-none"
          style={{ maxHeight: '200px' }}
        />

        <div className="flex items-center justify-between px-2 py-1 border-t border-border">
          {onWebSearchToggle ? (
            <button
              onClick={() => onWebSearchToggle(!webSearch)}
              className={cn(
                'flex items-center gap-2 px-2 py-1 rounded transition-colors',
                webSearch 
                  ? 'text-blue-500 hover:bg-blue-500/10' 
                  : 'text-muted-foreground hover:bg-muted'
              )}
              type="button"
              role="switch"
              aria-checked={webSearch}
            >
              <GlobeIcon size={16} />
              <span className="text-xs">Web Search {webSearch ? 'On' : 'Off'}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
            className="flex-shrink-0 p-2 text-foreground hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            type="button"
            title="Send message"
          >
            <SendIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
