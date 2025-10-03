import StatsCard from '../StatsCard';
import { Ticket, Trophy, TrendingUp } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="p-4 space-y-4 max-w-md">
      <StatsCard icon={Ticket} label="My Tickets" value="12" subtitle="8 Base, 4 Monad" />
      <StatsCard icon={Trophy} label="Total Points" value="1,250" />
      <StatsCard icon={TrendingUp} label="Win Rate" value="18%" subtitle="3 of 16 games" />
    </div>
  );
}
