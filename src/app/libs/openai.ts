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

type OpenAICallOptions = {
  model?: OpenAI.Chat.ChatModel;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
};

const defaultOptions = {
  model: "gpt-3.5-turbo" as OpenAI.Chat.ChatModel,
  temperature: 0.7,
  max_tokens: 500,
};

export async function callOpenAI(
  messages: ChatMessage[],
  prompt: string,
  options: OpenAICallOptions = {}
): Promise<string> {
  try {
    const callOptions = { ...defaultOptions, ...options };

    // Convert messages to OpenAI format
    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: callOptions.model,
      messages: [
        {
          role: "developer",
          content: prompt,
        },
        ...formattedMessages,
      ],
      temperature: callOptions.temperature,
      max_tokens: callOptions.max_tokens,
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
