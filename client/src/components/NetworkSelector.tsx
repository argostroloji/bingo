import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NetworkSelectorProps {
  selected: "base" | "monad";
  onChange: (network: "base" | "monad") => void;
  baseDisabled?: boolean;
  monadDisabled?: boolean;
}

export default function NetworkSelector({ 
  selected, 
  onChange, 
  baseDisabled = false,
  monadDisabled = false 
}: NetworkSelectorProps) {
  return (
    <div className="flex gap-3">
      <Button
        onClick={() => onChange("base")}
        disabled={baseDisabled}
        data-testid="button-select-base"
        variant={selected === "base" ? "default" : "outline"}
        className={cn(
          "flex-1",
          selected === "base" && "toggle-elevate toggle-elevated"
        )}
      >
        Base Network
      </Button>
      
      <Button
        onClick={() => onChange("monad")}
        disabled={monadDisabled}
        data-testid="button-select-monad"
        variant={selected === "monad" ? "default" : "outline"}
        className={cn(
          "flex-1",
          selected === "monad" && "toggle-elevate toggle-elevated"
        )}
      >
        Monad Network
      </Button>
    </div>
  );
}
