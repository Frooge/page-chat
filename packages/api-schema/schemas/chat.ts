import { z } from "zod";

export const ChatMessage = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
});