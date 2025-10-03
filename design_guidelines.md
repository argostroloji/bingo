# Web3 Bingo Game Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Coinbase (Web3 clarity), Duolingo (gamification), and Farcaster's purple brand ecosystem. The design balances crypto functionality with playful gaming elements while maintaining mobile-first simplicity.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**
- Background: 222 20% 12% (deep purple-tinted charcoal)
- Surface: 222 18% 18% (elevated cards/panels)
- Primary: 270 70% 65% (vibrant purple - Farcaster-aligned)
- Accent: 170 75% 55% (energetic teal for wins/actions)
- Success: 142 70% 50% (green for confirmations)
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%

**Light Mode**
- Background: 270 30% 98%
- Surface: 0 0% 100%
- Primary: 270 65% 55%
- Accent: 170 70% 45%

### B. Typography
**Fonts**: 
- Headings: 'Inter' (Google Fonts) - weights 700, 800
- Body: 'Inter' - weights 400, 500, 600
- Numbers/Stats: 'JetBrains Mono' - weight 600 (monospace for bingo numbers)

**Scale**:
- Hero: text-4xl/text-5xl (36-48px)
- Headings: text-2xl/text-3xl (24-30px)
- Body: text-base (16px)
- Small: text-sm (14px)
- Bingo Numbers: text-6xl/text-7xl (60-72px, monospace)

### C. Layout System
**Spacing Units**: Consistently use 4, 6, 8, 12, 16, 20, 24 (p-4, gap-6, space-y-8, etc.)

**Mobile-First Grid**: 
- Single column default
- max-w-md container (448px) for optimal mobile readability
- 16px horizontal padding (px-4)

### D. Component Library

**Navigation**
- Bottom tab bar (4 icons): Home, Tickets, Live Draw, Profile
- Fixed positioning with blur backdrop
- Active state: primary color with subtle glow

**Wallet Connection**
- Dual network pills: Base (blue accent) and Monad (green accent)
- Connection status: Connected (dot indicator) / Disconnected
- Compact wallet address display (0x1234...5678)

**Ticket Cards**
- 5x5 bingo grid with rounded corners
- Cell states: Empty, Marked (primary color), Winning (accent glow)
- Ticket number badge in corner
- Network badge (Base/Monad logo)

**Purchase Flow**
- Network selector (toggle between Base/Monad)
- Quantity slider (1-5 tickets) with live count
- Price display with USD equivalent
- CTA button with loading states during blockchain confirmation

**Draw Countdown**
- Large circular progress ring
- Time remaining in center (monospace font)
- Pulsing animation in final 60 seconds

**Live Draw Screen**
- Full-screen animated ball drop area
- Called numbers grid (scrollable history)
- User's active tickets at bottom (mini view)
- Confetti animation for winners

**Points Display**
- Prominent counter with animated increment
- Progress bar to next tier/reward
- Badge collection showcase

**Stats Cards**
- Total tickets purchased
- Win rate percentage
- Network distribution chart
- Recent draws history

### E. Animations

**Strategic Use Only**:
- Ball drop: Smooth gravity physics during live draws
- Number marking: Scale + color pulse on match
- Win celebration: Confetti burst + card highlight glow
- Loading states: Subtle spinner for blockchain confirmations
- Countdown pulse: Final 10 seconds only

**NO animations for**: Standard navigation, scrolling, tab switches

### F. Images

**Hero Section (Main Screen)**
- Large hero image: Vibrant 3D rendered bingo balls floating in purple-teal gradient space (abstract, modern, Web3-aesthetic)
- Placement: Top of main screen, 60vh height
- Overlay: Semi-transparent gradient with welcome message
- Buttons on hero: Use blurred background (backdrop-blur-md bg-white/10)

**Profile Screen**
- Avatar placeholder with geometric patterns (Web3 style)
- Optional: Trophy/badge icons for achievements

**Ticket Purchase Screen**
- Network logos: Base and Monad chain icons
- Background: Subtle geometric pattern (low opacity)

**NO images needed for**: Live draw (pure animation), stats screens, navigation

## Screen-Specific Guidelines

**Main Dashboard**: Hero with countdown timer, quick stats (3 cards: tickets owned, next draw, total points), recent activity feed, network status indicators

**Ticket Purchase**: Network selector at top, visual ticket preview (3D card flip on purchase), quantity controls, price breakdown, purchase button with wallet signature flow

**Live Draw**: Immersive full-screen experience, ball machine animation center, called numbers ribbon at top, user tickets dock at bottom (swipeable), real-time marking with celebratory micro-interactions

**Profile**: Header with wallet connection status, points balance prominently displayed, ticket history (filterable by network), stats grid (2x2), settings access

## Accessibility & Polish
- High contrast maintained throughout (WCAG AA minimum)
- Touch targets minimum 44x44px
- Haptic feedback on ticket marking and wins
- Clear loading states for all blockchain interactions
- Error states with actionable recovery options
- Smooth transitions between screens (300ms ease-in-out)