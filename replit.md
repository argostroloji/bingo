# Web3 Bingo Game - Farcaster Integration

A Web3-based bingo game built for Farcaster with support for Base and Monad networks.

## Overview

This is a mobile-first bingo game that integrates with Farcaster and allows users to:
- Connect their wallets on Base and Monad networks
- Purchase up to 5 tickets per network (free to play)
- Participate in automated hourly draws
- Earn points for ticket purchases and gameplay
- Watch live draws with real-time animations

## Architecture

### Frontend
- **Framework**: React + TypeScript + Vite
- **UI Components**: Shadcn/UI with Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Animations**: Framer Motion
- **Farcaster Integration**: @farcaster/frame-sdk

### Backend
- **Server**: Express.js
- **Real-time**: WebSocket (ws)
- **Storage**: In-memory storage
- **Scheduler**: Node-cron for automated hourly draws
- **API**: RESTful endpoints for profiles, tickets, and rounds

## Key Features

### 1. Farcaster Integration
- Frame v2 metadata in HTML head for social sharing
- Manifest file at `/.well-known/farcaster.json`
- SDK integration for user context and FID

### 2. Wallet Connection
- Support for Base and Monad networks
- Mock wallet integration (ready for Web3 providers)
- Display connected wallet address and FID

### 3. Ticket System
- Maximum 5 tickets per network per user
- Auto-generated 5x5 bingo cards with random numbers
- Real-time marking when numbers are drawn
- Points awarded for each ticket purchase

### 4. Automated Draws
- Hourly draws scheduled via cron (every hour at :00)
- Auto-draw system draws one number every 3 seconds
- Maximum 75 numbers per round
- WebSocket broadcasting for real-time updates

### 5. Live Draw Experience
- Animated ball drop with physics
- Real-time number marking on tickets
- Drawn numbers history display
- Winner detection and celebration

## API Endpoints

### User Profiles
- `GET /api/profile/:walletAddress` - Get user profile
- `POST /api/profile` - Create user profile
- `PATCH /api/profile/:walletAddress/points` - Update points

### Tickets
- `GET /api/tickets/:userId` - Get all user tickets
- `GET /api/tickets/:userId/:network` - Get tickets by network
- `POST /api/tickets` - Create new ticket

### Rounds
- `GET /api/rounds/current` - Get current active round
- `GET /api/rounds/:roundId` - Get specific round
- `POST /api/rounds/create` - Create new round
- `POST /api/rounds/:roundId/draw` - Draw a number
- `POST /api/rounds/:roundId/complete` - Complete round

### WebSocket
- Connection: `ws://[host]/ws`
- Messages:
  - `subscribe_round` - Subscribe to round updates
  - `number_drawn` - Number drawn event
  - `round_complete` - Round completed event
  - `new_round` - New round created event

## Project Structure

```
├── client/               # Frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   └── lib/          # Utilities and contexts
│   └── index.html        # Entry point with Farcaster metadata
├── server/               # Backend application
│   ├── routes.ts         # API routes and WebSocket
│   ├── storage.ts        # In-memory data storage
│   └── scheduler.ts      # Automated draw scheduler
├── shared/               # Shared types and schemas
│   └── schema.ts         # Drizzle schemas and Zod validation
└── public/               # Static assets
    └── .well-known/
        └── farcaster.json # Farcaster manifest
```

## Design System

- **Primary Color**: Purple (#A78BFA) - Farcaster-aligned
- **Accent Color**: Teal (#4ECDC4) - For wins and actions
- **Typography**: Inter (body) + JetBrains Mono (numbers)
- **Mobile-First**: Optimized for 375-428px screens
- **Dark Mode**: Primary theme with purple-tinted backgrounds

## Development

The application runs on port 5000 with both frontend and backend on the same server.

### Key Technologies
- Vite for fast development and HMR
- TypeScript for type safety
- Tailwind CSS for styling
- WebSocket for real-time updates
- Node-cron for scheduled tasks

## Future Enhancements

1. **Blockchain Integration**
   - Real wallet connections via Wagmi/Viem
   - On-chain transactions for Base and Monad
   - Smart contract deployment for prizes

2. **Game Features**
   - Winner prize distribution
   - Leaderboards
   - Achievement badges
   - Multiple game modes (coverall, patterns)

3. **Social Features**
   - Share wins on Farcaster
   - Invite friends
   - Group play rooms

## Deployment Notes

### For Production Deployment

1. **Update Farcaster Configuration**
   - Replace placeholder URLs in `public/.well-known/farcaster.json` with your deployed domain
   - Generate a proper Farcaster account association signature
   - Update all frame metadata URLs in `client/index.html` to match your deployment

2. **Environment Variables**
   - Set up proper environment variables for production
   - Configure database connection (currently using in-memory storage)
   - Add API keys for Web3 providers

3. **Database Migration**
   - Replace in-memory storage with PostgreSQL or another persistent database
   - Run database migrations for the schema defined in `shared/schema.ts`

## Notes

- The current implementation uses mock wallet addresses for development
- WebSocket automatically broadcasts draw updates to all connected clients
- Draws happen every 3 seconds during active rounds
- New rounds are created automatically every hour
- Points system is implemented but can be extended for rewards
- Farcaster manifest uses placeholder values - update with your deployed domain before publishing
