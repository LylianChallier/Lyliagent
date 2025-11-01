import "../style/InputBar.css";

type InputBarProps = {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
};

export default function InputBar({ input, setInput, onSend }: InputBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="input-bar">
      <input
        type="text"
        placeholder="Écris ton message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSend}>Envoyer</button>
    </div>
  );
}
