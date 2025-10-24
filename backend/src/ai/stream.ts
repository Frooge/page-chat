import { google } from '@ai-sdk/google';
import { stepCountIs, streamText, type ModelMessage } from 'ai';
import { getSystemPrompt, type PageContext } from '../prompts/prompt.js';
import { webSearchTool } from '../tools/web-search.js';
import { webFetchTool } from '../tools/web-fetch.js';

export async function createAIStream(
  messages: ModelMessage[] = [],
  pageContext?: PageContext,
  webSearch: boolean = false
) {
  const options = {
    pageContext,
    webSearch
  }

  const systemMessage: ModelMessage = {
    role: 'system',
    content: getSystemPrompt(options)
  };

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: [
      systemMessage,
      ...messages
    ],
    tools: {
      webFetch: webFetchTool,
      ...(webSearch && {
        webSearch: webSearchTool,
      }),
    },
    maxRetries: 3,
    stopWhen: stepCountIs(10)
  });

  return result.toUIMessageStreamResponse();
}