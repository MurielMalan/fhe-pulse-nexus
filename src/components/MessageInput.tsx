import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onAttachFile: () => void;
}

export const MessageInput = ({ onSendMessage, onAttachFile }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onAttachFile}
          className="text-muted-foreground hover:text-foreground"
        >
          <Paperclip className="w-5 h-5" />
        </Button>
        
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type an encrypted message..."
          className="flex-1 bg-input border-border"
        />
        
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim()}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-secure-green encryption-pulse" />
        All messages encrypted with FHE
      </p>
    </form>
  );
};
