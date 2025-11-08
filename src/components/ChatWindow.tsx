import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Send, Paperclip, User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  address: string;
  lastActive: string;
  status: "online" | "offline";
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatWindowProps {
  selectedContactId: string | null;
  contacts: Contact[];
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hey! How's the new encryption working?",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    text: "It's fantastic! Super secure and fast.",
    timestamp: "10:31 AM",
    isOwn: true,
  },
  {
    id: "3",
    text: "Can you send me that document we discussed?",
    timestamp: "10:32 AM",
    isOwn: false,
  },
];

export const ChatWindow = ({ selectedContactId, contacts }: ChatWindowProps) => {
  const [messages, setMessages] = useState(mockMessages);
  const [inputMessage, setInputMessage] = useState("");

  const selectedContact = contacts.find(c => c.id === selectedContactId);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  if (!selectedContact) {
    return (
      <Card className="p-12 text-center bg-gradient-to-br from-card to-card/50">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-primary encryption-pulse" />
          </div>
          <h3 className="text-xl font-semibold">Select a Contact</h3>
          <p className="text-muted-foreground">
            Choose a contact from the Contacts tab to start a secure, encrypted conversation
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[600px] bg-gradient-to-br from-card to-card/50">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className={cn(
              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card",
              selectedContact.status === "online" ? "bg-secure-green encryption-pulse" : "bg-muted-foreground"
            )} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{selectedContact.name}</h3>
            <p className="text-xs text-muted-foreground font-mono">
              {selectedContact.address.slice(0, 10)}...{selectedContact.address.slice(-6)}
            </p>
          </div>
          <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
            <Shield className="w-3 h-3 mr-1" />
            Encrypted
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-3 fade-in-up",
              msg.isOwn ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "max-w-[70%] rounded-2xl px-4 py-3",
                msg.isOwn
                  ? "bg-gradient-to-br from-primary to-accent text-white rounded-tr-sm"
                  : "bg-secondary text-foreground rounded-tl-sm"
              )}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <span className={cn(
                "text-xs mt-1 block",
                msg.isOwn ? "text-white/70" : "text-muted-foreground"
              )}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your encrypted message..."
            className="flex-1 bg-background border-border"
          />
          <Button
            onClick={handleSend}
            disabled={!inputMessage.trim()}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
          <Shield className="w-3 h-3 text-secure-green encryption-pulse" />
          Messages are encrypted end-to-end
        </p>
      </div>
    </Card>
  );
};
