import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { ChatStreamRequest, ChatStreamErrorResponse } from '@page-chat/api-schema';
import { createAIStream } from '../ai/stream.js';

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
    const { prompt, messages } = c.req.valid('json');

    // Get the AI stream response
    const response = await createAIStream(prompt, messages);
    
    // Return the stream response directly
    return response;
  }
);

export default chat;
