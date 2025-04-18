import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { chatMessageSchema } from "@/app/schemas/chat";
import { processChatRequest } from "@/app/libs/processor";

const requestBodySchema = z.object({
  messages: z.array(chatMessageSchema),
});

export async function POST(request: NextRequest) {
  const res = await request.json();
  const parsedBody = requestBodySchema.safeParse(res);

  if (!parsedBody.success) {
    console.error("Invalid request body", parsedBody.error);
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }

  const { messages } = parsedBody.data;

  const content = await processChatRequest(messages);

  return NextResponse.json({ message: content.response });
}
