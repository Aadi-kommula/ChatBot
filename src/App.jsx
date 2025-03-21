import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaUser, FaRobot, FaPaperPlane } from "react-icons/fa";

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_API_KEY
  const handleSend = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(input);
    const botResponse = result.response.text();

    setChat([...chat, { userinput: input, chatbot: botResponse }]);
    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-screen w-auto justify-center items-center bg-gray-200 ">
      <h1 className="text-2xl m-2">Simple ChatBot</h1>
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {chat.map((msg, index) => (
          <div key={index} className="flex flex-col space-y-2">

            {/* User Message */}
            <div className="flex justify-end items-center  space-x-2">
              <div className="bg-cyan-600 text-white px-4 py-2 rounded-lg max-w-xs">
                {msg.userinput}
              </div>
              <FaUser className="text-cyan-600" />
            </div>

            {/* Chatbot Response */}
            <div className="flex justify-start items-center space-x-2">
              <FaRobot className="text-gray-500" />
              <div className="bg-gray-300 px-4 py-2 rounded-lg max-w-xs">
                {msg.chatbot}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Animation */}
        {loading && (
          <div className="flex justify-start items-center space-x-2">
            <FaRobot className="text-gray-500" />
            <div className="bg-gray-300 px-4 py-2 rounded-lg max-w-xs">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="bg-gray-300 w-96 mb-5 p-4 flex items-center rounded-2xl">
        <input
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none"
          type="text"
          placeholder="Ask Anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="ml-3 bg-cyan-600 text-white p-2 rounded-lg"
          onClick={handleSend}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

export default App;
