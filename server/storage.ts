import { type Ticket, type InsertTicket, type Round, type InsertRound, type UserProfile, type InsertUserProfile } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUserProfile(walletAddress: string): Promise<UserProfile | undefined>;
  createUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  getTickets(userId: string): Promise<Ticket[]>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  getCurrentRound(): Promise<Round | undefined>;
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

  async getTickets(userId: string): Promise<Ticket[]> {
    return Array.from(this.tickets.values()).filter(
      (ticket) => ticket.userId === userId,
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
    return ticket;
  }

  async getCurrentRound(): Promise<Round | undefined> {
    const rounds = Array.from(this.rounds.values());
    return rounds.find(round => round.status === 'active') || rounds[rounds.length - 1];
  }
}

export const storage = new MemStorage();
