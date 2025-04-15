import { Send, MessageCircle } from "lucide-react";

export const ChatWidget = () => {
  return (
    <div className="flex flex-col h-[700px] w-96 border rounded-lg shadow-lg bg-white text-black">
      <div className="flex items-center p-4 border-b bg-blue-500 text-white rounded-t-lg">
        <MessageCircle className="w-5 h-5 mr-2" />
        <h2 className="font-semibold">AI Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* messages */}
      </div>

      <form className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
