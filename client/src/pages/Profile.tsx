import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PointsDisplay from "@/components/PointsDisplay";
import StatsCard from "@/components/StatsCard";
import { Wallet, Ticket, Trophy, BarChart3 } from "lucide-react";

export default function Profile() {
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb";
  const userStats = {
    totalPoints: 2450,
    totalTickets: 24,
    baseTickets: 15,
    monadTickets: 9,
    winRate: 22,
    gamesPlayed: 18,
  };

  const recentGames = [
    { id: 1, date: "2 hours ago", tickets: 3, won: true, points: 150 },
    { id: 2, date: "1 day ago", tickets: 2, won: false, points: 20 },
    { id: 3, date: "2 days ago", tickets: 5, won: true, points: 250 },
  ];

  return (
    <div className="min-h-screen pb-20 bg-background">
      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {walletAddress.slice(2, 4).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">My Profile</h1>
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-muted-foreground" />
              <Badge variant="outline" className="font-mono text-xs" data-testid="text-wallet">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </Badge>
            </div>
          </div>
        </div>

        <PointsDisplay points={userStats.totalPoints} animated />

        <div>
          <h2 className="text-xl font-bold mb-4">Statistics</h2>
          <div className="grid gap-3">
            <StatsCard 
              icon={Ticket} 
              label="Total Tickets" 
              value={userStats.totalTickets}
              subtitle={`${userStats.baseTickets} Base, ${userStats.monadTickets} Monad`}
            />
            <StatsCard 
              icon={Trophy} 
              label="Win Rate" 
              value={`${userStats.winRate}%`}
              subtitle={`${Math.floor(userStats.gamesPlayed * userStats.winRate / 100)} wins`}
            />
            <StatsCard 
              icon={BarChart3} 
              label="Games Played" 
              value={userStats.gamesPlayed}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Recent Games</h2>
          <div className="space-y-3">
            {recentGames.map(game => (
              <Card key={game.id} className="p-4" data-testid={`game-${game.id}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{game.tickets} Tickets</p>
                    <p className="text-xs text-muted-foreground">{game.date}</p>
                  </div>
                  <div className="text-right">
                    {game.won ? (
                      <Badge variant="default" className="mb-1">Won</Badge>
                    ) : (
                      <Badge variant="secondary" className="mb-1">Played</Badge>
                    )}
                    <p className="text-sm font-mono">+{game.points} pts</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
