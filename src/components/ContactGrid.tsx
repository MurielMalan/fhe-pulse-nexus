import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { User, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  address: string;
  lastActive: string;
  unread: number;
  status: "online" | "offline";
}

interface ContactGridProps {
  contacts: Contact[];
  onContactSelect: (id: string) => void;
}

export const ContactGrid = ({ contacts, onContactSelect }: ContactGridProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {contacts.map((contact) => (
        <Card 
          key={contact.id} 
          className="p-6 bg-gradient-to-br from-card to-card/50 hover:shadow-lg hover:shadow-primary/10 transition-all border-border hover:border-primary/30 cursor-pointer group"
          onClick={() => onContactSelect(contact.id)}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div className={cn(
                "absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-card",
                contact.status === "online" ? "bg-secure-green encryption-pulse" : "bg-muted-foreground"
              )} />
            </div>

            <div className="space-y-1 w-full">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {contact.name}
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                {contact.address.slice(0, 10)}...{contact.address.slice(-6)}
              </p>
              <p className="text-xs text-muted-foreground">
                Active {contact.lastActive}
              </p>
            </div>

            {contact.unread > 0 && (
              <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
                {contact.unread} new message{contact.unread > 1 ? 's' : ''}
              </Badge>
            )}

            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
              onClick={(e) => {
                e.stopPropagation();
                onContactSelect(contact.id);
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
