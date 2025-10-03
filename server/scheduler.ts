import cron from 'node-cron';
import { storage } from './storage';
import { WebSocket } from 'ws';

export function startDrawScheduler(broadcastToClients: (message: any) => void) {
  console.log('Starting draw scheduler...');

  cron.schedule('0 * * * *', async () => {
    console.log('Creating new hourly round...');
    try {
      const previousRound = await storage.getCurrentRound();
      if (previousRound && previousRound.status === 'active') {
        await storage.completeRound(previousRound.id);
        broadcastToClients({
          type: 'round_complete',
          roundId: previousRound.id
        });
      }

      const newRound = await storage.createRound();
      console.log(`New round created: ${newRound.id}`);
      
      broadcastToClients({
        type: 'new_round',
        round: newRound
      });

      startAutoDraw(newRound.id, broadcastToClients);
    } catch (error) {
      console.error('Failed to create new round:', error);
    }
  });

  (async () => {
    const currentRound = await storage.getCurrentRound();
    if (!currentRound || currentRound.status !== 'active') {
      const newRound = await storage.createRound();
      console.log(`Initial round created: ${newRound.id}`);
      startAutoDraw(newRound.id, broadcastToClients);
    } else {
      console.log(`Resuming round: ${currentRound.id}`);
      startAutoDraw(currentRound.id, broadcastToClients);
    }
  })();

  console.log('Draw scheduler started successfully');
}

function startAutoDraw(roundId: string, broadcastToClients: (message: any) => void) {
  const drawInterval = setInterval(async () => {
    try {
      const round = await storage.getRound(roundId);
      
      if (!round || round.status !== 'active') {
        clearInterval(drawInterval);
        return;
      }

      const drawnNumbers = round.drawnNumbers || [];
      if (drawnNumbers.length >= 75) {
        await storage.completeRound(roundId);
        clearInterval(drawInterval);
        broadcastToClients({
          type: 'round_complete',
          roundId
        });
        return;
      }

      let newNumber: number;
      do {
        newNumber = Math.floor(Math.random() * 75) + 1;
      } while (drawnNumbers.includes(newNumber));

      await storage.addDrawnNumber(roundId, newNumber);
      
      const updatedRound = await storage.getRound(roundId);
      broadcastToClients({
        type: 'number_drawn',
        roundId,
        number: newNumber,
        drawnNumbers: updatedRound?.drawnNumbers || []
      });

      console.log(`Drew number ${newNumber} for round ${roundId}`);
    } catch (error) {
      console.error('Auto-draw error:', error);
    }
  }, 3000);

  setTimeout(() => {
    clearInterval(drawInterval);
  }, 3600000);
}

export { startAutoDraw };
