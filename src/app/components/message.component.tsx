import { ChatMessage } from "../../chat-widget.type";

type Props = {
  message: ChatMessage;
};

export const Message = ({ message }: Props) => {
  return (
    <div
      key={message.id}
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.role === "user"
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-100 rounded-bl-none"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};
