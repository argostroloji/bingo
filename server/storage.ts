import { type Ticket, type InsertTicket, type Round, type InsertRound, type UserProfile, type InsertUserProfile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUserProfile(walletAddress: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  updateUserPoints(walletAddress: string, points: number): Promise<void>;
  
  getTickets(userId: string): Promise<Ticket[]>;
  getTicketsByNetwork(userId: string, network: string): Promise<Ticket[]>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  updateTicketMarked(ticketId: string, markedNumbers: number[]): Promise<void>;
  
  getCurrentRound(): Promise<Round | undefined>;
  getRound(roundId: string): Promise<Round | undefined>;
  createRound(): Promise<Round>;
  addDrawnNumber(roundId: string, number: number): Promise<void>;
  completeRound(roundId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private userProfiles: Map<string, UserProfile>;
  private tickets: Map<string, Ticket>;
  private rounds: Map<string, Round>;

  constructor() {
    this.userProfiles = new Map();
    this.tickets = new Map();
    this.rounds = new Map();
  }

  async getUserProfile(walletAddress: string): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(
      (profile) => profile.walletAddress === walletAddress,
    );
  }

  async createUserProfile(insertProfile: InsertUserProfile): Promise<UserProfile> {
    const id = randomUUID();
    const profile: UserProfile = { 
      ...insertProfile, 
      id,
      points: 0,
      baseTickets: 0,
      monadTickets: 0,
    };
    this.userProfiles.set(id, profile);
    return profile;
  }

  async updateUserPoints(walletAddress: string, points: number): Promise<void> {
    const profile = await this.getUserProfile(walletAddress);
    if (profile) {
      profile.points = points;
      this.userProfiles.set(profile.id, profile);
    }
  }

  async getTickets(userId: string): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(
      (ticket) => ticket.userId === userId,
    );
  }

  async getTicketsByNetwork(userId: string, network: string): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(
      (ticket) => ticket.userId === userId && ticket.network === network,
    );
  }

  async createTicket(insertTicket: InsertTicket): Promise<Ticket> {
    const id = randomUUID();
    const ticket: Ticket = { 
      ...insertTicket, 
      id,
      isWinner: false,
      markedNumbers: [],
    };
    this.tickets.set(id, ticket);
    
    const profile = await this.getUserProfile(insertTicket.userId);
    if (profile) {
      if (insertTicket.network === 'base') {
        profile.baseTickets = (profile.baseTickets || 0) + 1;
      } else if (insertTicket.network === 'monad') {
        profile.monadTickets = (profile.monadTickets || 0) + 1;
      }
      this.userProfiles.set(profile.id, profile);
    }
    
    return ticket;
  }

  async updateTicketMarked(ticketId: string, markedNumbers: number[]): Promise<void> {
    const ticket = this.tickets.get(ticketId);
    if (ticket) {
      ticket.markedNumbers = markedNumbers;
      this.tickets.set(ticketId, ticket);
    }
  }

  async getCurrentRound(): Promise<Round | undefined> {
    const rounds = Array.from(this.rounds.values());
    return rounds.find(round => round.status === 'active') || rounds.sort((a, b) => 
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    )[0];
  }

  async getRound(roundId: string): Promise<Round | undefined> {
    return this.rounds.get(roundId);
  }

  async createRound(): Promise<Round> {
    const id = randomUUID();
    const now = new Date();
    const endTime = new Date(now.getTime() + 60 * 60 * 1000);
    
    const round: Round = {
      id,
      startTime: now,
      endTime,
      drawnNumbers: [],
      status: 'active',
    };
    
    this.rounds.set(id, round);
    return round;
  }

  async addDrawnNumber(roundId: string, number: number): Promise<void> {
    const round = this.rounds.get(roundId);
    if (round) {
      const drawnNumbers = round.drawnNumbers || [];
      if (!drawnNumbers.includes(number)) {
        round.drawnNumbers = [...drawnNumbers, number];
        this.rounds.set(roundId, round);
      }
    }
  }

  async completeRound(roundId: string): Promise<void> {
    const round = this.rounds.get(roundId);
    if (round) {
      round.status = 'completed';
      this.rounds.set(roundId, round);
    }
  }
}

export const storage = new MemStorage();
