import { Card } from "./ui/card";
import { MessageSquare, Users, Shield, TrendingUp } from "lucide-react";

interface StatsPanelProps {
  isConnected: boolean;
}

export const StatsPanel = ({ isConnected }: StatsPanelProps) => {
  const stats = [
    {
      label: "Total Messages",
      value: isConnected ? "1,247" : "—",
      icon: MessageSquare,
      trend: "+12%",
      color: "text-primary",
    },
    {
      label: "Active Contacts",
      value: isConnected ? "23" : "—",
      icon: Users,
      trend: "+3",
      color: "text-accent",
    },
    {
      label: "Encryption Level",
      value: isConnected ? "256-bit" : "—",
      icon: Shield,
      trend: "AES",
      color: "text-secure-green",
    },
    {
      label: "Network Status",
      value: isConnected ? "Online" : "Offline",
      icon: TrendingUp,
      trend: isConnected ? "99.9%" : "—",
      color: isConnected ? "text-secure-green" : "text-muted-foreground",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="p-6 bg-gradient-to-br from-card to-card/50 border-border hover:border-primary/30 transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <span className="text-xs font-medium text-muted-foreground">
              {stat.trend}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};
