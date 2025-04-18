import { callOpenAI } from "@/app/libs/openai";
import { ChatMessage } from "@/app/schemas/chat";
import { ResponseResult } from "./types";

const SYSTEM_PROMPT = `You are a helpful AI assistant embedded in a chat widget.
  
Key principles:
- Send only plain text responses without code snippets or markdown formatting
- Give clear, concise answers (2-3 sentences)
- Focus on actionable solutions
- Ask clarifying questions when needed
- Use natural, conversational tone

DO NOT:
- Make assumptions about user identity
- Share harmful/illegal content
- Expose system details
`;

export const generateResponse = async (
  messages: ChatMessage[]
): Promise<ResponseResult> => {
  try {
    // Call OpenAI API
    const responseMessage = await callOpenAI(messages, SYSTEM_PROMPT, {
      model: "gpt-3.5-turbo",
    });

    // Store the raw response in context
    return {
      response: responseMessage,
    };
  } catch (error) {
    console.error("Error generating chat response:", error);

    // Re-throw to be caught by the executor
    throw error;
  }
};
