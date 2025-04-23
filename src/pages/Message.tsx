import { useState } from "react";
import { FiMessageCircle, FiSettings } from "react-icons/fi";

const MessagePage = () => {
  const [chats] = useState<string[]>([]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Chats</h1>
        <div className="flex items-center gap-2">
          <FiSettings className="w-5 h-5 text-gray-400 cursor-pointer" />
          <button className="bg-blue-600 px-4 py-2 text-sm rounded-lg hover:bg-blue-500">
            + New chat
          </button>
        </div>
      </div>

      {/* Chat Requests */}
      <div className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
        <span className="text-gray-300">📩 Chat requests</span>
      </div>

      {/* Empty State */}
      {chats.length === 0 && (
        <div className="flex flex-col items-center justify-center flex-grow text-center">
          <FiMessageCircle className="w-10 h-10 text-blue-500 mb-4" />
          <h2 className="text-lg font-semibold">Nothing here</h2>
          <p className="text-gray-400">You have no conversations yet. Start one!</p>
        </div>
      )}
    </div>
  );
};

export default MessagePage;
