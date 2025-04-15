import OpenAI from "openai";
import { ChatMessage } from "../schemas/chat";

// Check if OpenAI API key is configured
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

// Create OpenAI client instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

export async function generateChatResponse(
  messages: ChatMessage[]
): Promise<string> {
  try {
    // Convert messages to OpenAI format
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "developer",
          content: SYSTEM_PROMPT,
        },
        ...formattedMessages,
      ],
      temperature: 0.7, // 0 - not creative, 1 - more creative
      max_tokens: 500,
    });

    // Extract and return the response
    const responseMessage = completion.choices[0]?.message?.content;

    if (!responseMessage) {
      throw new Error("No response generated");
    }

    return responseMessage;
  } catch (error) {
    // Handle potential errors
    console.error("Error generating chat response:", error);

    if (error instanceof OpenAI.APIError) {
      // Handle API-specific errors
      throw new Error(`OpenAI API Error: ${error.message}`);
    }

    // Handle other types of errors
    throw new Error("Failed to generate chat response");
  }
}
