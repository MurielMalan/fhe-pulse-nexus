import { User, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Contact {
  id: string;
  name: string;
  address: string;
  lastMessage?: string;
  timestamp?: string;
  unread?: number;
  isOnline?: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  activeContactId?: string;
  onContactSelect: (id: string) => void;
}

export const ContactList = ({ contacts, activeContactId, onContactSelect }: ContactListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Channels</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onContactSelect(contact.id)}
            className={cn(
              "w-full p-4 flex items-start gap-3 border-b border-border hover:bg-secondary/50 transition-colors",
              activeContactId === contact.id && "bg-secondary"
            )}
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
              {contact.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secure-green rounded-full border-2 border-background encryption-pulse" />
              )}
            </div>
            
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-foreground truncate">{contact.name}</h3>
                {contact.timestamp && (
                  <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                )}
              </div>
              
              {contact.lastMessage && (
                <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
              )}
              
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground font-mono">
                  {contact.address.slice(0, 6)}...{contact.address.slice(-4)}
                </span>
                {contact.unread && contact.unread > 0 && (
                  <span className="px-2 py-0.5 bg-primary rounded-full text-xs text-primary-foreground font-medium">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
