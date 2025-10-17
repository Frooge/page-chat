import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function createAIStream(prompt: string) {
  const result = await streamText({
    model: google('gemini-2.5-flash'),
    prompt,
  });

  return result.toTextStreamResponse();
}