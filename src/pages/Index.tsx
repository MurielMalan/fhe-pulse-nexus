import { useState } from "react";
import { EncryptionLogo } from "@/components/EncryptionLogo";
import { ConnectionStatus } from "@/components/ConnectionStatus";
import { ContactList } from "@/components/ContactList";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { MessageInput } from "@/components/MessageInput";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

const mockContacts = [
  {
    id: "1",
    name: "Alice.eth",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    lastMessage: "Encrypted document received",
    timestamp: "2m ago",
    unread: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Bob.eth",
    address: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    lastMessage: "Ready for secure transfer",
    timestamp: "1h ago",
    isOnline: true,
  },
  {
    id: "3",
    name: "Charlie.eth",
    address: "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC",
    lastMessage: "Thanks for the secure chat!",
    timestamp: "3h ago",
    isOnline: false,
  },
];

const mockMessages = [
  {
    id: "1",
    message: "Hey! Ready to test the encrypted channel?",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    message: "Absolutely! This FHE implementation is amazing.",
    timestamp: "10:31 AM",
    isOwn: true,
  },
  {
    id: "3",
    message: "Sending you an encrypted document now.",
    timestamp: "10:32 AM",
    isOwn: false,
  },
];

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeContactId, setActiveContactId] = useState("1");
  const [messages, setMessages] = useState(mockMessages);

  const activeContact = mockContacts.find(c => c.id === activeContactId);

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
    toast.success("Rainbow Wallet connected successfully!");
  };

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
  };

  const handleAttachFile = () => {
    toast.info("Document encryption feature coming soon!");
  };

  const handleDocumentShare = () => {
    toast.info("Opening secure document exchange...");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <EncryptionLogo />
            <div>
              <h1 className="text-xl font-bold text-foreground">EncodedComm Hub</h1>
              <p className="text-sm text-muted-foreground">Talk Smart. Stay Private.</p>
            </div>
          </div>

          {!isWalletConnected ? (
            <Button
              onClick={handleWalletConnect}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Connect Rainbow Wallet
            </Button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
              <div className="w-2 h-2 rounded-full bg-secure-green encryption-pulse" />
              <span className="text-sm font-medium">Wallet Connected</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 border-r border-border bg-card overflow-hidden">
          <ContactList
            contacts={mockContacts}
            activeContactId={activeContactId}
            onContactSelect={setActiveContactId}
          />
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col">
          {activeContact ? (
            <>
              <ChatHeader
                contactName={activeContact.name}
                contactAddress={activeContact.address}
                isOnline={activeContact.isOnline}
                onDocumentShare={handleDocumentShare}
              />

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 bg-background">
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    message={msg.message}
                    timestamp={msg.timestamp}
                    isOwn={msg.isOwn}
                  />
                ))}
              </div>

              {/* Input */}
              <MessageInput
                onSendMessage={handleSendMessage}
                onAttachFile={handleAttachFile}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <EncryptionLogo />
                <h2 className="mt-4 text-xl font-semibold text-foreground">
                  Select a channel to start
                </h2>
                <p className="text-muted-foreground">
                  All communications are encrypted with FHE
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <ConnectionStatus
        isConnected={isWalletConnected}
        walletAddress={isWalletConnected ? "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" : undefined}
      />
    </div>
  );
};

export default Index;
