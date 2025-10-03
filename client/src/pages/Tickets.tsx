import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import NetworkSelector from "@/components/NetworkSelector";
import BingoTicket from "@/components/BingoTicket";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";

export default function Tickets() {
  const [network, setNetwork] = useState<"base" | "monad">("base");
  const [quantity, setQuantity] = useState(1);
  const [myTickets] = useState([
    { id: "abc123", numbers: Array.from({length: 25}, () => Math.floor(Math.random() * 75)), network: "base" as const, marked: [12, 23, 45] },
    { id: "def456", numbers: Array.from({length: 25}, () => Math.floor(Math.random() * 75)), network: "base" as const, marked: [] },
    { id: "ghi789", numbers: Array.from({length: 25}, () => Math.floor(Math.random() * 75)), network: "monad" as const, marked: [5, 18, 34] },
  ]);

  const baseCount = myTickets.filter(t => t.network === "base").length;
  const monadCount = myTickets.filter(t => t.network === "monad").length;
  const canBuyMore = network === "base" ? baseCount < 5 : monadCount < 5;
  const maxQuantity = network === "base" ? 5 - baseCount : 5 - monadCount;

  const handlePurchase = () => {
    console.log(`Purchasing ${quantity} tickets on ${network}`);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Buy Tickets</h1>
          <p className="text-muted-foreground">Maximum 5 tickets per network</p>
        </div>

        <Card className="p-6 space-y-6">
          <div>
            <label className="text-sm font-semibold mb-3 block">Select Network</label>
            <NetworkSelector 
              selected={network} 
              onChange={setNetwork}
              baseDisabled={baseCount >= 5}
              monadDisabled={monadCount >= 5}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold">Quantity</label>
              <span className="text-lg font-bold" data-testid="text-quantity">{quantity}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                data-testid="button-decrease-quantity"
              >
                <Minus className="w-4 h-4" />
              </Button>
              
              <Slider
                value={[quantity]}
                onValueChange={([val]) => setQuantity(val)}
                max={maxQuantity}
                min={1}
                step={1}
                className="flex-1"
                data-testid="slider-quantity"
              />
              
              <Button
                size="icon"
                variant="outline"
                onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                disabled={quantity >= maxQuantity}
                data-testid="button-increase-quantity"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              {network === "base" ? baseCount : monadCount} of 5 tickets used on {network.toUpperCase()}
            </p>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-2xl font-bold">FREE</span>
            </div>
            
            <Button 
              onClick={handlePurchase}
              disabled={!canBuyMore}
              className="w-full"
              size="lg"
              data-testid="button-purchase-tickets"
            >
              {canBuyMore ? `Get ${quantity} Ticket${quantity > 1 ? 's' : ''}` : 'Max Tickets Reached'}
            </Button>
          </div>
        </Card>

        <div>
          <h2 className="text-xl font-bold mb-4">My Tickets ({myTickets.length})</h2>
          <div className="space-y-4">
            {myTickets.map(ticket => (
              <BingoTicket
                key={ticket.id}
                ticketId={ticket.id}
                numbers={ticket.numbers}
                markedNumbers={ticket.marked}
                network={ticket.network}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
