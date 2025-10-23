import { google } from '@ai-sdk/google';
import { stepCountIs, streamText, type ModelMessage } from 'ai';
import { getSystemPrompt, type PageContext } from '../prompts/prompt.js';
import { webSearchTool } from '../tools/web-search.js';
import { webFetchTool } from '../tools/web-fetch.js';

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

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: [
      ...contextMessages,
      ...messages,
      { role: 'user', content: prompt }
    ],
    tools: {
      webFetch: webFetchTool,
      ...(webSearch && {
        webSearch: webSearchTool,
      }),
    },
    maxRetries: 3,
    stopWhen: stepCountIs(5)
  });

  return result.toTextStreamResponse();
}