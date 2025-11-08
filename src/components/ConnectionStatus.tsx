import { Wifi, WifiOff } from "lucide-react";

interface ConnectionStatusProps {
  isConnected: boolean;
  walletAddress?: string;
}

export const ConnectionStatus = ({ isConnected, walletAddress }: ConnectionStatusProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-card border-t border-border">
      <div className={`flex items-center gap-2 ${isConnected ? 'text-secure-green' : 'text-muted-foreground'}`}>
        {isConnected ? (
          <Wifi className="w-4 h-4 encryption-pulse" />
        ) : (
          <WifiOff className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      
      {walletAddress && (
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-2 h-2 rounded-full bg-secure-green encryption-pulse" />
          <span className="text-xs text-muted-foreground font-mono">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
        </div>
      )}
    </div>
  );
};
