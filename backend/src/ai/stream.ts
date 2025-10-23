import { google } from '@ai-sdk/google';
import { streamText, type ModelMessage } from 'ai';
import { getSystemPrompt, type PageContext } from '../prompts/prompt.js';
import { webSearchTool } from '../tools/web-search.js';

export async function createAIStream(
  prompt: string, 
  messages: ModelMessage[] = [],
  pageContext?: PageContext,
  webSearch: boolean = false
) {
  const contextMessages: ModelMessage[] = [];

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
    tools: {
      ...(webSearch && {
        webSearch: webSearchTool,
      }),
    },
  });

  return result.toTextStreamResponse();
}