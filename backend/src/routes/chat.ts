import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { ChatStreamRequest, ChatStreamErrorResponse } from '../schema/chat.js';
import { createAIStream } from '../ai/stream.js';
import { convertToModelMessages, type UIMessage } from 'ai';

const chat = new Hono();

chat.post(
  '/stream',
  zValidator('json', ChatStreamRequest, (result, c) => {
    if (!result.success) {
      const error: ChatStreamErrorResponse = {
        error: result.error.issues[0]?.message || 'Invalid request',
      };
      return c.json(error, 400);
    }
  }),
  async (c) => {
    const { messages, pageContext, webSearch } = c.req.valid('json');

    // Convert UIMessages to ModelMessages for the AI SDK
    // Using 'unknown' first to avoid type issues with Zod validated data
    const modelMessages = convertToModelMessages(messages as unknown as UIMessage[]);

    // Get the AI stream response
    const response = await createAIStream(modelMessages, pageContext, webSearch);
    
    // Return the stream response directly
    return response;
  }
);

export default chat;
