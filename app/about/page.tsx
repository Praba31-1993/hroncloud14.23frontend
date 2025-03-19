"use client"
import React, { useState } from "react";
import "./Chatbot.css"; // Import chatbot styles
import { chatbotapi } from "../api/Listingapis";

const Chatbot = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      const botReply = { sender: "bot", text: "Hello! How can I assist you today?" };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);
  };

  console.log('inots',input);
  

  return (
    <div className="chatbot-container">
      {/* Floating chat button */}
      {!isOpen && (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="chatbox">
          <div className="chat-header">
            Chatbot
            <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.sender === "bot" && <img src="/bot-avatar.png" alt="Bot" className="avatar" />}
                <span className="message-text">{msg.text}</span>
                {msg.sender === "user" && <img src="/user-avatar.png" alt="User" className="avatar" />}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button className="send-btn" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
