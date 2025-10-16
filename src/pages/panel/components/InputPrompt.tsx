import { useState, useRef, KeyboardEvent } from 'react';
import { cn } from '@src/lib/utils';
import { AttachmentIcon, SendIcon, CloseIcon, FileIcon } from '@assets/icons';

interface InputPromptProps {
  onSubmit: (message: { text?: string; files?: File[] }) => void;
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
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if ((!input.trim() && files.length === 0) || disabled) return;

    onSubmit({ text: input, files });
    setInput('');
    setFiles([]);
    
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
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
      {/* File previews */}
      {files.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm"
            >
              <FileIcon size={16} className="flex-shrink-0" />
              <span className="truncate max-w-[200px]">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-muted-foreground hover:text-foreground"
                type="button"
              >
                <CloseIcon size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* File upload button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="flex-shrink-0 rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          type="button"
          title="Attach files"
        >
          <AttachmentIcon size={20} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ maxHeight: '200px' }}
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={disabled || (!input.trim() && files.length === 0)}
          className="flex-shrink-0 rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
