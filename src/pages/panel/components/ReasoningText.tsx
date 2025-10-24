import { cn } from '@src/lib/utils';

interface ReasoningTextProps {
  text: string;
  className?: string;
}

export function ReasoningText({ text, className }: ReasoningTextProps) {
  return (
    <details className={cn('group', className)}>
      <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground list-none">
        <span>done thinking &gt;</span>
      </summary>
      <div className="mt-2 rounded-md bg-muted/30 p-3 text-xs font-mono text-muted-foreground whitespace-pre-wrap border border-muted">
        {text}
      </div>
    </details>
  );
}
