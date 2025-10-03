import BallDraw from '../BallDraw';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function BallDrawExample() {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDraw = () => {
    setIsDrawing(true);
    const interval = setInterval(() => {
      const newNum = Math.floor(Math.random() * 75) + 1;
      setDrawnNumbers(prev => [...prev, newNum]);
    }, 2500);

    setTimeout(() => {
      clearInterval(interval);
      setIsDrawing(false);
    }, 15000);
  };

  return (
    <div className="p-4">
      <BallDraw 
        drawnNumbers={drawnNumbers} 
        isDrawing={isDrawing}
        onNumberDrawn={(num) => console.log('Drew:', num)}
      />
      <div className="mt-4 text-center">
        <Button onClick={startDraw} disabled={isDrawing} data-testid="button-start-draw">
          {isDrawing ? 'Drawing...' : 'Start Demo Draw'}
        </Button>
      </div>
    </div>
  );
}
