import { z } from "zod";

export const PageContext = z.object({
  url: z.string(),
  title: z.string(),
  content: z.string(),
});

export const ChatStreamRequest = z.object({
  messages: z.array(z.any()),
  pageContext: PageContext.optional(),
  webSearch: z.boolean().optional().default(false),
});

export const ChatStreamErrorResponse = z.object({
  error: z.string(),
});

export type PageContext = z.infer<typeof PageContext>;
export type ChatStreamRequest = z.infer<typeof ChatStreamRequest>;
export type ChatStreamErrorResponse = z.infer<typeof ChatStreamErrorResponse>;