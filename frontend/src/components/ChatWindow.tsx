import { useState, useEffect, useRef } from "react";
import "../style/ChatWindow.css";
import MessageBubble from "./MessageBubble";
import InputBar from "./InputBar";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  isTyping?: boolean;
};

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const typeMessage = (fullText: string, messageId: number) => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? { ...msg, text: fullText.substring(0, currentIndex), isTyping: true }
              : msg
          )
        );
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, isTyping: false } : msg
          )
        );
      }
    }, 25); // Vitesse de typing (25ms par caractère)
  };

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

      const botMessageId = Date.now() + 1;
      const botMessage: Message = {
        id: botMessageId,
        text: "",
        sender: "bot",
        isTyping: true,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Démarrer l'effet de typing
      typeMessage(data.response, botMessageId);
    } catch (err) {
      console.error("Erreur :", err);
    }
  };

  return (
    <div className="chat-window">
      {/* Zone des messages */}
      <div className="messages">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            text={msg.text}
            sender={msg.sender}
            isTyping={msg.isTyping}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Zone d'input */}
      <InputBar input={input} setInput={setInput} onSend={sendMessage} />
    </div>
  );
}
