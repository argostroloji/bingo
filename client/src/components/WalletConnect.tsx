import { Wallet, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface WalletConnectProps {
  onConnect?: (address: string, network: string) => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [baseConnected, setBaseConnected] = useState(false);
  const [monadConnected, setMonadConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnect = (network: "base" | "monad") => {
    const mockAddress = "0x" + Math.random().toString(16).substring(2, 10);
    setWalletAddress(mockAddress);
    
    if (network === "base") {
      setBaseConnected(true);
      onConnect?.(mockAddress, "base");
    } else {
      setMonadConnected(true);
      onConnect?.(mockAddress, "monad");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => handleConnect("base")}
          disabled={baseConnected}
          data-testid="button-connect-base"
          variant={baseConnected ? "secondary" : "default"}
          className="flex-1"
        >
          {baseConnected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Base Connected
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Base
            </>
          )}
        </Button>

        <Button
          onClick={() => handleConnect("monad")}
          disabled={monadConnected}
          data-testid="button-connect-monad"
          variant={monadConnected ? "secondary" : "default"}
          className="flex-1"
        >
          {monadConnected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Monad Connected
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Monad
            </>
          )}
        </Button>
      </div>

      {(baseConnected || monadConnected) && walletAddress && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs" data-testid="text-wallet-address">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </Badge>
          {baseConnected && (
            <Badge variant="secondary" className="text-xs">
              Base
            </Badge>
          )}
          {monadConnected && (
            <Badge variant="secondary" className="text-xs">
              Monad
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
