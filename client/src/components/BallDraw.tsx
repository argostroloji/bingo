import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface BallDrawProps {
  drawnNumbers: number[];
  isDrawing: boolean;
  onNumberDrawn?: (number: number) => void;
}

export default function BallDraw({ drawnNumbers, isDrawing, onNumberDrawn }: BallDrawProps) {
  const [currentBall, setCurrentBall] = useState<number | null>(null);

  useEffect(() => {
    if (isDrawing && drawnNumbers.length > 0) {
      const latestNumber = drawnNumbers[drawnNumbers.length - 1];
      setCurrentBall(latestNumber);
      onNumberDrawn?.(latestNumber);

      const timer = setTimeout(() => {
        setCurrentBall(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [drawnNumbers, isDrawing, onNumberDrawn]);

  return (
    <div className="relative h-64 flex items-center justify-center" data-testid="ball-draw-area">
      <AnimatePresence>
        {currentBall !== null && (
          <motion.div
            initial={{ y: -200, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: 1,
              transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
              }
            }}
            exit={{ 
              y: 200, 
              opacity: 0,
              scale: 0.5,
              transition: { duration: 0.5 }
            }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl"
            data-testid="current-ball"
          >
            <span className="text-5xl font-mono font-bold text-primary-foreground">
              {currentBall}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {!isDrawing && drawnNumbers.length === 0 && (
        <div className="text-center text-muted-foreground">
          <p className="text-lg">Waiting for draw to begin...</p>
        </div>
      )}
    </div>
  );
}
