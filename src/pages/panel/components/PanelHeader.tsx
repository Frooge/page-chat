import { Button } from '@src/components/ui/button';
import { MessageSquare, Sparkles } from 'lucide-react';

export function PanelHeader() {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h1 className="font-semibold text-lg">AI Assistant</h1>
      </div>
      <Button variant="ghost" size="icon-sm">
        <MessageSquare className="h-4 w-4" />
      </Button>
    </div>
  );
}
