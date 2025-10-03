import { useState, useEffect } from "react";
import BallDraw from "@/components/BallDraw";
import DrawnNumbersGrid from "@/components/DrawnNumbersGrid";
import BingoTicket from "@/components/BingoTicket";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause } from "lucide-react";

export default function Live() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [myTickets] = useState([
    { id: "abc123", numbers: Array.from({length: 25}, () => Math.floor(Math.random() * 75)), network: "base" as const },
    { id: "def456", numbers: Array.from({length: 25}, () => Math.floor(Math.random() * 75)), network: "monad" as const },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isDrawing) {
      interval = setInterval(() => {
        const newNum = Math.floor(Math.random() * 75) + 1;
        if (!drawnNumbers.includes(newNum)) {
          setDrawnNumbers(prev => [...prev, newNum]);
        }
      }, 2500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDrawing, drawnNumbers]);

  const toggleDraw = () => {
    if (!isDrawing) {
      setDrawnNumbers([]);
    }
    setIsDrawing(!isDrawing);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Live Draw</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isDrawing ? "Drawing in progress..." : "Draw not started"}
            </p>
          </div>
          {isDrawing ? (
            <Badge variant="destructive" className="animate-pulse">
              LIVE
            </Badge>
          ) : (
            <Badge variant="secondary">Waiting</Badge>
          )}
        </div>

        <div className="bg-card rounded-lg p-6 border border-card-border">
          <BallDraw 
            drawnNumbers={drawnNumbers}
            isDrawing={isDrawing}
            onNumberDrawn={(num) => console.log('Drew:', num)}
          />
        </div>

        <DrawnNumbersGrid drawnNumbers={drawnNumbers} />

        <div className="text-center">
          <Button
            onClick={toggleDraw}
            size="lg"
            variant={isDrawing ? "destructive" : "default"}
            data-testid="button-toggle-draw"
          >
            {isDrawing ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Stop Draw
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Demo Draw
              </>
            )}
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Active Tickets</h2>
          <div className="space-y-3">
            {myTickets.map(ticket => (
              <BingoTicket
                key={ticket.id}
                ticketId={ticket.id}
                numbers={ticket.numbers}
                markedNumbers={ticket.numbers.filter(n => drawnNumbers.includes(n))}
                network={ticket.network}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
