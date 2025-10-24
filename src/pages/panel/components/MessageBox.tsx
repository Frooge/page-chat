import { cn } from '@src/lib/utils';
import { UIMessage } from '@ai-sdk/react';
import { UserIcon, BotIcon } from '@assets/icons';
import Markdown from 'react-markdown';
import { ReasoningText } from './ReasoningText';
import { ToolCall } from './ToolCall';
import type { ToolUIPart, DynamicToolUIPart } from 'ai';

interface MessageBoxProps {
  message: UIMessage;
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
        <div className="space-y-2">
          {message.parts.map((part, index) => {
            // Text part - render as markdown
            if (part.type === 'text') {
              return (
                <div key={index} className="prose prose-sm max-w-none dark:prose-invert">
                  <Markdown
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-600 underline cursor-pointer"
                        />
                      ),
                    }}
                  >
                    {part.text}
                  </Markdown>
                </div>
              );
            }

            // Reasoning part - collapsible section
            if (part.type === 'reasoning') {
              return (
                <ReasoningText key={index} text={part.text} />
              );
            }

            // Tool invocation part (typed tools)
            if (part.type.startsWith('tool-')) {
              const toolPart = part as ToolUIPart | DynamicToolUIPart;
              
              // Only show tool calls that have completed or have output/error
              if (toolPart.state === 'output-available' || toolPart.state === 'output-error') {
                const toolName = 'toolName' in toolPart 
                  ? toolPart.toolName 
                  : part.type.replace('tool-', '');
                
                return (
                  <ToolCall
                    key={index}
                    toolName={toolName}
                    args={toolPart.input || {}}
                    result={toolPart.state === 'output-available' ? toolPart.output : undefined}
                  />
                );
              }
              return null;
            }

            // File part - render images
            if (part.type === 'file' && part.mediaType?.startsWith('image/')) {
              return (
                <img
                  key={index}
                  src={part.url}
                  alt={part.filename || 'Attachment'}
                  className="max-w-full rounded-lg border"
                />
              );
            }

            // File part - render as download link
            if (part.type === 'file') {
              return (
                <a
                  key={index}
                  href={part.url}
                  download={part.filename}
                  className="flex items-center gap-2 text-sm text-blue-500 hover:underline"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {part.filename || 'Download file'}
                </a>
              );
            }

            // Source URL part
            if (part.type === 'source-url') {
              return (
                <a
                  key={index}
                  href={part.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-500 hover:underline"
                >
                  [{part.title || new URL(part.url).hostname}]
                </a>
              );
            }

            // Source document part
            if (part.type === 'source-document') {
              return (
                <span key={index} className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  [{part.title || 'Document'}]
                </span>
              );
            }

            // Default: return null for unknown parts
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
