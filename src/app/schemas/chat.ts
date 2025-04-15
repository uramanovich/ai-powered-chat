import z from "zod";

export const chatMessageSchema = z.object({
  id: z.number(),
  content: z.string(),
  role: z.enum(["user", "assistant"]),
  name: z.string().optional(),
});

type ChatMessage123 = {
  id: number;
  content: string;
  role: "user" | "assistant";
  name?: string;
};

export type ChatMessage = z.TypeOf<typeof chatMessageSchema>;
