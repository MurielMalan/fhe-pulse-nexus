import { User, FileText, MoreVertical } from "lucide-react";
import { Button } from "./ui/button";

interface ChatHeaderProps {
  contactName: string;
  contactAddress: string;
  isOnline: boolean;
  onDocumentShare: () => void;
}

export const ChatHeader = ({ contactName, contactAddress, isOnline, onDocumentShare }: ChatHeaderProps) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-border bg-card">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
        {isOnline && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-secure-green rounded-full border-2 border-card encryption-pulse" />
        )}
      </div>
      
      <div className="flex-1">
        <h2 className="font-semibold text-foreground">{contactName}</h2>
        <p className="text-xs text-muted-foreground font-mono">
          {contactAddress.slice(0, 10)}...{contactAddress.slice(-8)}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDocumentShare}
          className="text-muted-foreground hover:text-foreground"
        >
          <FileText className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
