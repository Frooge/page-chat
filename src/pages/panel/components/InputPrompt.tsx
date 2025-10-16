import { useState, useRef, KeyboardEvent } from 'react';
import { cn } from '@src/lib/utils';
import { SendIcon } from '@assets/icons';

interface InputPromptProps {
  onSubmit: (message: { text?: string }) => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export function InputPrompt({
  onSubmit,
  disabled,
  className,
  placeholder = 'Type your message...',
}: InputPromptProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;

    onSubmit({ text: input });
    setInput('');
    
    // Reset textarea height
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
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  };

  return (
    <div className={cn('border-t border-border bg-background p-4', className)}>
      <div className="flex justify-center items-end rounded-md border border-input bg-background">
        {/* Text input */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent resize-none px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden border-none outline-none"
            style={{ maxHeight: '200px' }}
          />

        {/* Submit button */}
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

      <div className="mt-2 text-xs text-muted-foreground">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
}
