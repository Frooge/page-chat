import { google } from '@ai-sdk/google';
import { streamText, type CoreMessage } from 'ai';

export async function createAIStream(prompt: string, messages: CoreMessage[] = []) {
  const result = await streamText({
    model: google('gemini-2.5-flash'),
    messages: [
      ...messages,
      { role: 'user', content: prompt }
    ],
  });

  return result.toTextStreamResponse();
}