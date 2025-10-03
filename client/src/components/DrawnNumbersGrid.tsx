import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DrawnNumbersGridProps {
  drawnNumbers: number[];
}

export default function DrawnNumbersGrid({ drawnNumbers }: DrawnNumbersGridProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground">Called Numbers</h3>
      <ScrollArea className="h-32 w-full">
        <div className="flex flex-wrap gap-2 pr-4">
          {drawnNumbers.map((num, idx) => (
            <Badge 
              key={idx} 
              variant="secondary" 
              className="font-mono"
              data-testid={`drawn-number-${num}`}
            >
              {num}
            </Badge>
          ))}
          {drawnNumbers.length === 0 && (
            <p className="text-sm text-muted-foreground">No numbers drawn yet</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
