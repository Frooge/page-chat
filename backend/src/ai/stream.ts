import { google } from '@ai-sdk/google';
import { streamText, type ModelMessage } from 'ai';
import { getSystemPrompt, type PageContext } from '../prompts/prompt.js';

export async function createAIStream(
  prompt: string, 
  messages: ModelMessage[] = [],
  pageContext?: PageContext
) {
  const contextMessages: ModelMessage[] = [];

  // Always add the system prompt (with or without page context)
  contextMessages.push({
    role: 'system',
    content: getSystemPrompt(pageContext)
  });

  const result = await streamText({
    model: google('gemini-2.5-flash'),
    messages: [
      ...contextMessages,
      ...messages,
      { role: 'user', content: prompt }
    ],
  });

  return result.toTextStreamResponse();
}