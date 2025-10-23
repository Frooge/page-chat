import { z } from "zod";

export const ChatMessage = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});

export const PageContext = z.object({
  url: z.string(),
  title: z.string(),
  content: z.string(),
});

export const ChatStreamRequest = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty"),
  messages: z.array(ChatMessage).optional().default([]),
  pageContext: PageContext.optional(),
});

export const ChatStreamErrorResponse = z.object({
  error: z.string(),
});

export type ChatMessage = z.infer<typeof ChatMessage>;
export type PageContext = z.infer<typeof PageContext>;
export type ChatStreamRequest = z.infer<typeof ChatStreamRequest>;
export type ChatStreamErrorResponse = z.infer<typeof ChatStreamErrorResponse>;