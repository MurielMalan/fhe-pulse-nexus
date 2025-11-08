import { Shield } from "lucide-react";

export const EncryptionLogo = () => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Outer rings */}
      <div className="absolute inset-0 rounded-full border-2 border-primary opacity-20 encryption-pulse" />
      <div className="absolute inset-1 rounded-full border-2 border-accent opacity-30 encryption-pulse" style={{ animationDelay: "0.5s" }} />
      
      {/* Center shield */}
      <div className="relative z-10 bg-gradient-to-br from-primary to-accent rounded-full p-2">
        <Shield className="w-5 h-5 text-background" />
      </div>
      
      {/* Encryption waves */}
      <div className="absolute -inset-2 rounded-full border border-encryption-pulse opacity-40 encryption-wave" />
      <div className="absolute -inset-3 rounded-full border border-encryption-glow opacity-20 encryption-wave" style={{ animationDelay: "1s" }} />
    </div>
  );
};
