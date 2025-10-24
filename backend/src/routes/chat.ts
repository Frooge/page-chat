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

    const modelMessages = convertToModelMessages(messages as unknown as UIMessage[]);

    const response = await createAIStream(modelMessages, pageContext, webSearch);
    
    return response;
  }
);

export default chat;
