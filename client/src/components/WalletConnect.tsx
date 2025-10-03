import { Wallet, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useFarcaster } from "@/lib/farcaster";

interface WalletConnectProps {
  onConnect?: (address: string, network: string) => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const { context } = useFarcaster();
  const [baseConnected, setBaseConnected] = useState(false);
  const [monadConnected, setMonadConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnect = async (network: "base" | "monad") => {
    let address = "";
    
    if (context?.user?.connectedAddress) {
      address = context.user.connectedAddress;
    } else {
      address = "0x" + Math.random().toString(16).substring(2, 10);
    }
    
    setWalletAddress(address);
    
    if (network === "base") {
      setBaseConnected(true);
      onConnect?.(address, "base");
    } else {
      setMonadConnected(true);
      onConnect?.(address, "monad");
    }
  };

  const displayAddress = walletAddress || context?.user?.connectedAddress;

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

      {displayAddress && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-xs" data-testid="text-wallet-address">
            {displayAddress.slice(0, 6)}...{displayAddress.slice(-4)}
          </Badge>
          {context?.user?.fid && (
            <Badge variant="secondary" className="text-xs">
              FID: {context.user.fid}
            </Badge>
          )}
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
