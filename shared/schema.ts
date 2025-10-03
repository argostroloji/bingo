import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const tickets = pgTable("tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  network: varchar("network", { length: 20 }).notNull(),
  numbers: integer("numbers").array().notNull(),
  roundId: varchar("round_id").notNull(),
  isWinner: boolean("is_winner").default(false),
  markedNumbers: integer("marked_numbers").array().default(sql`ARRAY[]::integer[]`),
});

export const rounds = pgTable("rounds", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  drawnNumbers: integer("drawn_numbers").array().default(sql`ARRAY[]::integer[]`),
  status: varchar("status", { length: 20 }).notNull().default('upcoming'),
});

export const userProfiles = pgTable("user_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  walletAddress: varchar("wallet_address").notNull().unique(),
  points: integer("points").default(0),
  baseTickets: integer("base_tickets").default(0),
  monadTickets: integer("monad_tickets").default(0),
});

export const insertTicketSchema = createInsertSchema(tickets).omit({
  id: true,
  isWinner: true,
  markedNumbers: true,
});

export const insertRoundSchema = createInsertSchema(rounds).omit({
  id: true,
  drawnNumbers: true,
  status: true,
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).omit({
  id: true,
  points: true,
  baseTickets: true,
  monadTickets: true,
});

export type InsertTicket = z.infer<typeof insertTicketSchema>;
export type Ticket = typeof tickets.$inferSelect;

export type InsertRound = z.infer<typeof insertRoundSchema>;
export type Round = typeof rounds.$inferSelect;

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
