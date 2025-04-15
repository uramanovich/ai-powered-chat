"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { ChatMessage } from "../schemas/chat";
import { Typing } from "./typing.component";
import { Message } from "./message.component";

export const ChatWidget = () => {
  const contianerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      content: input,
      role: "user" as const,
    };
    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    const response = await fetch("/api/assistance", {
      method: "POST",
      body: JSON.stringify({ messages: newMessages }),
    });

    if (!response.ok) {
      console.error("Failed to fetch assistance");
      return;
    }

    const data = await response.json();

    const aiMessage = {
      id: Date.now(),
      content: data.message,
      role: "assistant" as const,
    };

    const updatedMessages = [...newMessages, aiMessage];

    setMessages(updatedMessages);
    setIsTyping(false);
  };

  useEffect(() => {
    if (contianerRef.current) {
      contianerRef.current.scrollTo({
        top: contianerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-[700px] w-96 border rounded-lg shadow-lg bg-white text-black">
      <div className="flex items-center p-4 border-b bg-blue-500 text-white rounded-t-lg">
        <MessageCircle className="w-5 h-5 mr-2" />
        <h2 className="font-semibold">AI Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={contianerRef}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isTyping && <Typing />}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isTyping}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isTyping ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
