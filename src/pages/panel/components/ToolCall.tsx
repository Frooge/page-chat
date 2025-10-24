import { cn } from '@src/lib/utils';

interface ToolCallProps {
  toolName: string;
  args: Record<string, any>;
  result?: any;
  className?: string;
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function getToolMessage(toolName: string, args: Record<string, any>, hasResult: boolean): string {
  const action = hasResult ? 'used' : 'using';
  
  if (toolName === 'webSearch') {
    const query = args.query || '';
    return `${action} web to search for '${query}'`;
  }
  
  if (toolName === 'webFetch') {
    const urls = args.urls || [];
    const domains = urls.map(extractDomain).join(', ');
    return `${action} web to fetch for ${domains}`;
  }
  
  return `${action} ${toolName}`;
}

export function ToolCall({ toolName, args, result, className }: ToolCallProps) {
  const message = getToolMessage(toolName, args, result !== undefined);

  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      {message}
    </div>
  );
}
