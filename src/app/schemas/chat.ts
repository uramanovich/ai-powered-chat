import z from "zod";

export const chatMessageSchema = z.object({
  id: z.number(),
  content: z.string(),
  role: z.enum(["user", "assistant"]),
  name: z.string().optional(),
});

export type ChatMessage = z.TypeOf<typeof chatMessageSchema>;
