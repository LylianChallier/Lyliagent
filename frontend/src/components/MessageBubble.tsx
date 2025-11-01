import "../style/MessageBubble.css";

type MessageBubbleProps = {
  text: string;
  sender: "user" | "bot";
};

export default function MessageBubble({ text, sender }: MessageBubbleProps) {
  return (
    <div className={`message-bubble ${sender}`}>
      {text}
    </div>
  );
}
