import { Ticket, Trophy, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer";
import StatsCard from "@/components/StatsCard";
import WalletConnect from "@/components/WalletConnect";
import { useLocation } from "wouter";
import heroImage from "@assets/generated_images/Web3_bingo_hero_background_616bbb59.png";

export default function Home() {
  const [, setLocation] = useLocation();
  const nextDrawTime = new Date(Date.now() + 45 * 60 * 1000);

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-[60vh] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Bingo Game" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Web3 Bingo
          </h1>
          <p className="text-lg text-white/90 mb-6">
            Play on Base & Monad • Earn Points • Win Prizes
          </p>
          
          <div className="w-full max-w-sm">
            <WalletConnect onConnect={(addr, net) => console.log('Connected:', addr, net)} />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 -mt-12">
        <div className="bg-card rounded-lg p-6 shadow-xl border border-card-border mb-6">
          <CountdownTimer 
            targetTime={nextDrawTime} 
            onComplete={() => console.log('Draw starting!')}
          />
        </div>

        <div className="space-y-4 mb-6">
          <h2 className="text-xl font-bold">Quick Stats</h2>
          <div className="grid gap-3">
            <StatsCard icon={Ticket} label="My Tickets" value="8" subtitle="5 Base, 3 Monad" />
            <StatsCard icon={Trophy} label="Total Points" value="1,250" />
            <StatsCard icon={TrendingUp} label="Next Draw" value="45:00" subtitle="Get tickets now" />
          </div>
        </div>

        <Button 
          onClick={() => setLocation('/tickets')} 
          className="w-full"
          size="lg"
          data-testid="button-buy-tickets"
        >
          Buy Tickets
        </Button>
      </div>
    </div>
  );
}
