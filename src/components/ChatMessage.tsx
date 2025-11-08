import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  timestamp: string;
  isOwn: boolean;
  isEncrypted?: boolean;
}

export const ChatMessage = ({ message, timestamp, isOwn, isEncrypted = true }: ChatMessageProps) => {
  return (
    <div className={cn("flex gap-3 mb-4 fade-in-up", isOwn ? "flex-row-reverse" : "flex-row")}>
      <div className={cn(
        "max-w-[70%] rounded-2xl px-4 py-3 relative",
        isOwn 
          ? "bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-tr-sm" 
          : "bg-card text-card-foreground rounded-tl-sm border border-border"
      )}>
        {isEncrypted && (
          <div className={cn(
            "absolute -top-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
            isOwn ? "-right-2 bg-accent" : "-left-2 bg-muted"
          )}>
            <Lock className="w-3 h-3" />
            <span>FHE</span>
          </div>
        )}
        
        <p className="text-sm leading-relaxed">{message}</p>
        <span className={cn(
          "text-xs mt-1 block",
          isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};
