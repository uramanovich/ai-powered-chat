import { ChatMessage } from "@/app/schemas/chat";
import { ProcessResult } from "./types";
import { generateResponse } from "./response/generateResponse";

export async function processChatRequest(
  messages: ChatMessage[]
): Promise<ProcessResult> {
  // Generate a response
  const { response } = await generateResponse(messages);

  // Return the successful response
  return {
    response: response,
  };
}
