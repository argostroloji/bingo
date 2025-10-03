import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import sdk from '@farcaster/frame-sdk';

interface FarcasterContextType {
  context: any | null;
  isSDKLoaded: boolean;
  addFrame: () => void;
}

const FarcasterContext = createContext<FarcasterContextType>({
  context: null,
  isSDKLoaded: false,
  addFrame: () => {},
});

export function FarcasterProvider({ children }: { children: ReactNode }) {
  const [context, setContext] = useState<any | null>(null);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const ctx = await sdk.context;
        setContext(ctx);
        setIsSDKLoaded(true);
        sdk.actions.ready();
      } catch (error) {
        console.error('Failed to load Farcaster SDK:', error);
        setIsSDKLoaded(true);
      }
    };
    load();
  }, []);

  const addFrame = () => {
    if (isSDKLoaded) {
      sdk.actions.addFrame();
    }
  };

  return (
    <FarcasterContext.Provider value={{ context, isSDKLoaded, addFrame }}>
      {children}
    </FarcasterContext.Provider>
  );
}

export function useFarcaster() {
  const context = useContext(FarcasterContext);
  if (!context) {
    throw new Error('useFarcaster must be used within FarcasterProvider');
  }
  return context;
}
