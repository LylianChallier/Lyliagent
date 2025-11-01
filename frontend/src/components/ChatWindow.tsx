import { useState } from "react";
import "../style/ChatWindow.css";
import MessageBubble from "./MessageBubble";
import InputBar from "./InputBar";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, session_id: "default" }),
      });

      const data = await res.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.response,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Erreur :", err);
    }
  };

  return (
    <div className="chat-window">
      {/* Zone des messages */}
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} text={msg.text} sender={msg.sender} />
        ))}
      </div>

      {/* Zone d'input */}
      <InputBar input={input} setInput={setInput} onSend={sendMessage} />
    </div>
  );
}
