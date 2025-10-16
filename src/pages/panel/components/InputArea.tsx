import {
  PromptInput,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputButton,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@src/components/ai-elements/prompt-input';
import { PaperclipIcon } from 'lucide-react';

interface InputAreaProps {
  isLoading: boolean;
  onSubmit: (message: { text?: string; files?: any[] }) => void | Promise<void>;
}

export function InputArea({ isLoading, onSubmit }: InputAreaProps) {
  return (
    <div className="border-t p-4">
      <PromptInput
        accept="image/*"
        multiple
        onSubmit={onSubmit}
        className="w-full"
      >
        <PromptInputAttachments>
          {(attachment) => <PromptInputAttachment data={attachment} />}
        </PromptInputAttachments>
        <PromptInputTextarea placeholder="Type your message..." />
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputButton
              onClick={() => {
                const attachments = document.querySelector<HTMLInputElement>(
                  'input[type="file"]'
                );
                attachments?.click();
              }}
            >
              <PaperclipIcon className="h-4 w-4" />
            </PromptInputButton>
          </PromptInputTools>
          <PromptInputSubmit status={isLoading ? 'submitted' : undefined} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
}
