import "../style/MessageBubble.css";

type MessageBubbleProps = {
  text: string;
  sender: "user" | "bot";
  isTyping?: boolean;
};

export default function MessageBubble({ text, sender, isTyping }: MessageBubbleProps) {
  const emoji = sender === "user" ? "👤" : "🤖";

  return (
    <div className={`message-container ${sender}`}>
      <div className="message-avatar">
        {emoji}
      </div>
      <div className={`message-bubble ${sender}`}>
        {text}
        {isTyping && sender === "bot" && <span className="typing-cursor">|</span>}
      </div>
    </div>
  );
}
