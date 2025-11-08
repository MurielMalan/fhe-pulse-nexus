import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, Users, MessageSquare, TrendingUp, Lock, Send, Zap } from "lucide-react";
import { toast } from "sonner";
import { ChatWindow } from "@/components/ChatWindow";
import { ContactGrid } from "@/components/ContactGrid";
import { StatsPanel } from "@/components/StatsPanel";

const mockContacts = [
  {
    id: "1",
    name: "Alex Morgan",
    address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    lastActive: "2 min ago",
    unread: 3,
    status: "online" as const,
  },
  {
    id: "2",
    name: "Sam Rivera",
    address: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    lastActive: "1 hour ago",
    unread: 0,
    status: "online" as const,
  },
  {
    id: "3",
    name: "Jordan Lee",
    address: "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC",
    lastActive: "5 hours ago",
    unread: 1,
    status: "offline" as const,
  },
  {
    id: "4",
    name: "Taylor Kim",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    lastActive: "1 day ago",
    unread: 0,
    status: "offline" as const,
  },
];

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
    toast.success("Wallet Connected Successfully!");
  };

  const handleContactSelect = (contactId: string) => {
    setSelectedContact(contactId);
    setActiveTab("messages");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-secure-green rounded-full encryption-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  SecureChat
                </h1>
                <p className="text-xs text-muted-foreground">Encrypted Communication Platform</p>
              </div>
            </div>

            {!isWalletConnected ? (
              <Button
                onClick={handleWalletConnect}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-secure-green encryption-pulse" />
                <span className="text-sm font-medium">Connected</span>
                <Badge variant="secondary" className="ml-2">
                  0x742...0bEb
                </Badge>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-card/50 backdrop-blur">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 fade-in-up">
            <StatsPanel isConnected={isWalletConnected} />
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary/40 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-secure-green/20 text-secure-green">Active</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  All messages secured with military-grade encryption protocols
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary/40 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                    <Zap className="w-6 h-6 text-accent" />
                  </div>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">Instant</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">Real-time Messaging</h3>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast peer-to-peer communication network
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:border-primary/40 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-accent/20 text-accent">Available</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure File Sharing</h3>
                <p className="text-sm text-muted-foreground">
                  Share documents and media with complete privacy
                </p>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/20">
              <div className="flex items-center gap-4">
                <Shield className="w-12 h-12 text-primary encryption-pulse" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Privacy First, Always</h3>
                  <p className="text-sm text-muted-foreground">
                    Your conversations are encrypted end-to-end. No one can read your messages except you and your recipient.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="fade-in-up">
            <ContactGrid 
              contacts={mockContacts} 
              onContactSelect={handleContactSelect}
            />
          </TabsContent>

          <TabsContent value="messages" className="fade-in-up">
            <ChatWindow 
              selectedContactId={selectedContact}
              contacts={mockContacts}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
