import ReactMarkdown from "react-markdown";
import "../style/MessageBubble.css";

type MessageBubbleProps = {
  text: string;
  sender: "user" | "bot";
  isTyping?: boolean;
};

export default function MessageBubble({ text, sender, isTyping }: MessageBubbleProps) {
  const emoji = sender === "user" ? "👤" : "🤖";

  // Ajoute le curseur de saisie, pour un effet de saisie en cours
  const displayText = isTyping && sender === "bot" ? text + "|" : text;

  return (
    <div className={`message-container ${sender}`}>
      <div className="message-avatar">
        <ReactMarkdown>{emoji}</ReactMarkdown>
      </div>
      <div className={`message-bubble ${sender}`}>
        <ReactMarkdown>{displayText}</ReactMarkdown>
      </div>
    </div>
  );
}
