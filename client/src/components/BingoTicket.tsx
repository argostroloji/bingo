import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BingoTicketProps {
  ticketId: string;
  numbers: number[];
  markedNumbers?: number[];
  network: "base" | "monad";
  isWinner?: boolean;
}

export default function BingoTicket({ 
  ticketId, 
  numbers, 
  markedNumbers = [], 
  network,
  isWinner = false 
}: BingoTicketProps) {
  const gridNumbers = numbers.slice(0, 25);

  return (
    <Card 
      className={cn(
        "p-4 relative overflow-visible",
        isWinner && "ring-2 ring-accent"
      )}
      data-testid={`ticket-${ticketId}`}
    >
      <div className="flex items-center justify-between mb-3">
        <Badge variant="outline" className="font-mono text-xs">
          #{ticketId.slice(0, 6)}
        </Badge>
        <Badge 
          variant={network === "base" ? "default" : "secondary"}
          className="text-xs"
        >
          {network.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {gridNumbers.map((num, idx) => {
          const isMarked = markedNumbers.includes(num);
          const isFree = idx === 12;
          
          return (
            <div
              key={idx}
              data-testid={`ticket-cell-${idx}`}
              className={cn(
                "aspect-square rounded-sm flex items-center justify-center font-mono text-sm font-semibold transition-colors",
                isFree 
                  ? "bg-muted text-muted-foreground"
                  : isMarked
                  ? "bg-primary text-primary-foreground"
                  : "bg-card-foreground/5 text-foreground hover-elevate"
              )}
            >
              {isFree ? "★" : num}
            </div>
          );
        })}
      </div>

      {isWinner && (
        <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
          WIN
        </div>
      )}
    </Card>
  );
}
