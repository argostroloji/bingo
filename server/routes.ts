import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertUserProfileSchema, insertTicketSchema } from "@shared/schema";
import { z } from "zod";
import { startDrawScheduler } from "./scheduler";

const broadcastClients = new Set<WebSocket>();

function broadcastToClients(message: any) {
  broadcastClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User Profile Routes
  app.get("/api/profile/:walletAddress", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const profile = await storage.getUserProfile(walletAddress);
      
      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  app.post("/api/profile", async (req, res) => {
    try {
      const data = insertUserProfileSchema.parse(req.body);
      
      const existing = await storage.getUserProfile(data.walletAddress);
      if (existing) {
        return res.json(existing);
      }
      
      const profile = await storage.createUserProfile(data);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create profile" });
    }
  });

  app.patch("/api/profile/:walletAddress/points", async (req, res) => {
    try {
      const { walletAddress } = req.params;
      const { points } = req.body;
      
      await storage.updateUserPoints(walletAddress, points);
      const profile = await storage.getUserProfile(walletAddress);
      
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Failed to update points" });
    }
  });

  // Ticket Routes
  app.get("/api/tickets/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const tickets = await storage.getTickets(userId);
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tickets" });
    }
  });

  app.get("/api/tickets/:userId/:network", async (req, res) => {
    try {
      const { userId, network } = req.params;
      const tickets = await storage.getTicketsByNetwork(userId, network);
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tickets" });
    }
  });

  app.post("/api/tickets", async (req, res) => {
    try {
      const data = insertTicketSchema.parse(req.body);
      
      const networkTickets = await storage.getTicketsByNetwork(data.userId, data.network);
      if (networkTickets.length >= 5) {
        return res.status(400).json({ error: `Maximum 5 tickets per ${data.network} network` });
      }
      
      const ticket = await storage.createTicket(data);
      
      const profile = await storage.getUserProfile(data.userId);
      if (profile) {
        const pointsToAdd = 10;
        await storage.updateUserPoints(data.userId, (profile.points || 0) + pointsToAdd);
      }
      
      res.status(201).json(ticket);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create ticket" });
    }
  });

  // Round Routes
  app.get("/api/rounds/current", async (req, res) => {
    try {
      const round = await storage.getCurrentRound();
      
      if (!round) {
        return res.status(404).json({ error: "No active round" });
      }
      
      res.json(round);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch current round" });
    }
  });

  app.get("/api/rounds/:roundId", async (req, res) => {
    try {
      const { roundId } = req.params;
      const round = await storage.getRound(roundId);
      
      if (!round) {
        return res.status(404).json({ error: "Round not found" });
      }
      
      res.json(round);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch round" });
    }
  });

  app.post("/api/rounds/create", async (req, res) => {
    try {
      const round = await storage.createRound();
      res.status(201).json(round);
    } catch (error) {
      res.status(500).json({ error: "Failed to create round" });
    }
  });

  app.post("/api/rounds/:roundId/draw", async (req, res) => {
    try {
      const { roundId } = req.params;
      const { number } = req.body;
      
      await storage.addDrawnNumber(roundId, number);
      const round = await storage.getRound(roundId);
      
      broadcastToClients({
        type: 'number_drawn',
        roundId,
        number,
        drawnNumbers: round?.drawnNumbers || []
      });
      
      res.json(round);
    } catch (error) {
      res.status(500).json({ error: "Failed to draw number" });
    }
  });

  app.post("/api/rounds/:roundId/complete", async (req, res) => {
    try {
      const { roundId } = req.params;
      await storage.completeRound(roundId);
      
      broadcastToClients({
        type: 'round_complete',
        roundId
      });
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to complete round" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket Server
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    broadcastClients.add(ws);

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message.toString());
        
        if (data.type === 'subscribe_round') {
          const round = await storage.getCurrentRound();
          ws.send(JSON.stringify({
            type: 'round_state',
            round
          }));
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket client disconnected');
      broadcastClients.delete(ws);
    });
  });

  // Start automated draw scheduler
  startDrawScheduler(broadcastToClients);

  return httpServer;
}
