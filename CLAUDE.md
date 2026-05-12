# OroSwap — Codebase Reference

Bitcoin-native DEX UI. React 19 + Vite + Tailwind v3. Fully client-side rendered; no backend calls — all data is mocked.

---

## Project Structure

```
/
├── index.html               # Entry HTML; theme flash-prevention script; Google Fonts preload
├── package.json             # deps listed below
├── tailwind.config.js       # theme tokens mapped to CSS vars; custom keyframes/animations
├── postcss.config.js        # autoprefixer
├── vite.config.js           # @vitejs/plugin-react
├── eslint.config.js
├── vercel.json
└── src/
    ├── main.jsx             # ReactDOM root; BrowserRouter
    ├── App.jsx              # Route shell: /landing → Landing; * → AppShell
    ├── App.css              # LEFTOVER Vite scaffold — not used by any component
    ├── index.css            # CSS variables (light + dark), base styles, skeleton, scrollbar, focus ring
    │
    ├── pages/
    │   ├── Swap.jsx         # Token swap form with confirm/success modals
    │   ├── Pools.jsx        # Liquidity pools list + My Positions tab + AddLiquidity modal
    │   ├── Portfolio.jsx    # Connected-wallet dashboard: assets, transactions, LP summary
    │   ├── Market.jsx       # Market table + pair detail view + live trades feed + PriceChart
    │   ├── Landing.jsx      # Marketing landing page (route: /landing)
    │   └── Landing.css      # Landing-only styles; always-dark, CSS-variable-based
    │
    ├── components/
    │   ├── layout/
    │   │   └── Header.jsx   # Sticky nav; OroSwapLogo, nav buttons, ThemeToggle, WalletButton
    │   ├── market/
    │   │   └── PriceChart.jsx  # SVG price chart with catmull-rom curves + hover crosshair
    │   ├── onboarding/
    │   │   ├── OnboardingOverlay.jsx   # Spotlight renderer; box-shadow dim trick
    │   │   ├── OnboardingCard.jsx      # Floating card; smart positioning; SkipConfirmModal
    │   │   ├── Confetti.jsx            # Canvas confetti; fires on step 5 (ready)
    │   │   └── steps/
    │   │       ├── Step1Welcome.jsx    # Pulsing logo animation
    │   │       ├── Step2Wallet.jsx     # Inline connect-wallet CTA
    │   │       ├── Step3Swap.jsx       # 3 feature callout rows
    │   │       ├── Step4Pools.jsx      # 2-pool preview cards
    │   │       └── Step5Ready.jsx      # Staggered checklist + tip callout
    │   └── ui/
    │       ├── Badge.jsx       # Inline badge: variant + size props
    │       ├── Modal.jsx       # Accessible backdrop modal; Escape closes; scroll-lock
    │       ├── Skeleton.jsx    # SkeletonLine, SkeletonCard, default Skeleton (rows)
    │       └── TokenIcon.jsx   # Single token circle; TokenPair (overlapping duo)
    │
    ├── context/
    │   ├── AppContext.jsx      # Wallet state + mock connect/disconnect/balance
    │   ├── OnboardingContext.jsx  # 5-step onboarding state machine
    │   ├── useApp.js           # Hook wrapper for AppContext
    │   ├── useOnboarding.js    # Hook wrapper for OnboardingContext
    │   └── useTheme.js         # isDark + toggleTheme; persists to localStorage
    │
    ├── data/
    │   └── mock.js             # All mock data + helper functions (see below)
    │
    └── assets/
        ├── hero.png
        ├── react.svg
        └── vite.svg
```

---

## Dependencies

| Package | Version | Role |
|---|---|---|
| react | ^19.2.6 | UI |
| react-dom | ^19.2.6 | DOM |
| react-router-dom | ^7.15.0 | Routing |
| tailwindcss | ^3.4.19 | Styling |
| vite | ^8.0.12 | Build |
| @vitejs/plugin-react | ^6.0.1 | JSX transform |
| autoprefixer | ^10.5.0 | PostCSS |

---

## Design Tokens & CSS Variables

All values are stored as space-separated RGB channels (not hex) so Tailwind opacity modifiers work: `rgb(var(--bg-base) / 0.9)`.

### Light mode (`:root`)
| Variable | Value | Hex |
|---|---|---|
| `--bg-base` | `249 250 251` | #F9FAFB |
| `--bg-surface` | `255 255 255` | #FFFFFF |
| `--bg-elevated` | `243 244 246` | #F3F4F6 |
| `--accent-muted` | `255 247 237` | #FFF7ED (orange-50) |
| `--text-primary` | `17 24 39` | #111827 |
| `--text-secondary` | `55 65 81` | #374151 |
| `--text-muted` | `107 114 128` | #6B7280 |
| `--border` | `229 231 235` | #E5E7EB |
| `--skeleton-mid` | `#E5E7EB` | (plain hex, not RGB tuple) |

### Dark mode (`.dark`)
| Variable | Value | Hex |
|---|---|---|
| `--bg-base` | `13 13 20` | #0D0D14 |
| `--bg-surface` | `19 19 31` | #13131F |
| `--bg-elevated` | `26 26 46` | #1A1A2E |
| `--accent-muted` | `124 61 18` | #7C3D12 |
| `--text-primary` | `249 250 251` | #F9FAFB |
| `--text-secondary` | `156 163 175` | #9CA3AF |
| `--text-muted` | `75 85 99` | #4B5563 |
| `--border` | `31 41 55` | #1F2937 |
| `--skeleton-mid` | `#252540` | (plain hex) |

### Fixed colors (same in both themes, registered in Tailwind)
| Tailwind token | Value | Use |
|---|---|---|
| `accent` | `#F97316` | Primary orange — CTAs, active states, highlights |
| `success` | `#10B981` | Green — positive change, completed states |
| `danger` | `#EF4444` | Red — negative change, warnings |
| `btc` | `#F7931A` | Bitcoin orange |

### Tailwind theme-adaptive color names
These are mapped to CSS vars in `tailwind.config.js` and used throughout:
`bg-base`, `bg-surface`, `bg-elevated`, `accent-muted`, `text-primary`, `text-secondary`, `text-muted`, `border`

### Typography
| Font | Family | Use |
|---|---|---|
| Syne | `font-syne` | Headings, logos, large numbers, nav brand |
| DM Sans | `font-dm` | Body text, labels, buttons |
| DM Mono | inline style or Landing CSS | Monospace — addresses, tickers, labels |

### Tailwind animations
| Class | Keyframe | Duration |
|---|---|---|
| `animate-fade-in` | translateY(8px)→0, opacity 0→1 | 0.3s ease-out |
| `animate-slide-up` | translateY(20px)→0, opacity 0→1 | 0.4s ease-out |
| `animate-scale-in` | scale(0.95)→1, opacity 0→1 | 0.2s ease-out |
| `animate-shimmer` | backgroundPosition sweep | 1.5s infinite linear |
| `animate-pulse-slow` | Tailwind pulse | 2s ease-in-out infinite |
| `animate-success-pop` | scale(0.8)→1.1→1, opacity 0→1 | 0.5s cubic-bezier bounce |

---

## Components

### `src/App.jsx`
Route shell. Two routes: `/landing` → `<Landing>`, `*` → `<AppShell>`.

`AppShell` owns `activePage` state (string: `'swap' | 'pools' | 'portfolio' | 'market'`) and `useTheme`. It wraps everything in `OnboardingProvider` (passing `setActivePage` as `navigateTo`). `PageTransition` handles the `animKey` counter that re-mounts pages on navigation to trigger entry animations.

### `src/components/layout/Header.jsx`
Sticky header (`z-40`). Contains:
- `OroSwapLogo` — SVG hexagon + gradient + wordmark with `data-onboarding="header-logo"`
- `<nav>` — maps `NAV_ITEMS` (`swap`, `pools`, `portfolio`, `market`); Pools item gets `data-onboarding="nav-pools"`
- `ThemeToggle` — sun/moon SVG button
- `WalletButton` — three states: not connected (orange CTA), connecting (spinner), connected (address pill + dropdown menu with copy/tour/disconnect)
- Mobile hamburger menu

### `src/components/market/PriceChart.jsx`
Pure SVG chart. Props: `prices: number[]`, `isUp: boolean`, `height: number` (default 280). Uses catmull-rom→cubic-bezier path conversion for smooth curves. Area fill uses `<linearGradient>` with `useId`. Interactive crosshair on `mousemove`. Y-axis ticks (5) on the right; X-axis ticks (5) along the bottom. Color is green (`#22c55e`) or red (`#ef4444`) based on `isUp`.

### `src/components/onboarding/OnboardingOverlay.jsx`
Reads `isActive` and `currentStep` from `useOnboarding`. Uses `STEP_TARGETS` array of CSS selectors (indexed 0–4) to find spotlight elements via `document.querySelector`. Measures element rect with double-RAF to flush any navigation re-renders. Renders spotlight using a box-shadow trick: `box-shadow: 0 0 0 9999px rgba(0,0,0,0.72), 0 0 0 2px #F97316, ...` on a positioned div. Step 4 (`currentStep === 4`) skips spotlight and shows `<Confetti>` instead.

`STEP_TARGETS` array (index → selector):
- 0 → `[data-onboarding="header-logo"]`
- 1 → `[data-onboarding="wallet-button"]`
- 2 → `[data-onboarding="swap-card"]`
- 3 → `[data-onboarding="nav-pools"]`
- 4 → `null` (full reveal)

### `src/components/onboarding/OnboardingCard.jsx`
Floating card `z-index: 1003`. Smart positioning: mobile → pinned bottom sheet; desktop → prefers below spotlight, then above, then centered. Falls back to viewport-centered when `spotlightRect` is null (step 5). Fixed width `CARD_W = 364px`. Contains: step title, `<Content />` (the step component), progress dots, Back/Next/Complete buttons.

`SkipConfirmModal` is rendered at `z-index: 1020` when `showSkipConfirm` is true.

### `src/components/onboarding/Confetti.jsx`
Canvas-based, 90 particles, 2200ms duration. Colors: `['#F97316', '#EAB308', '#FFFFFF', '#FED7AA', '#FEF3C7', '#FB923C']`. Gravity applied per frame. Returns `null` when `active` is false.

### `src/components/onboarding/steps/Step1Welcome.jsx`
Centered OroSwap logo with pulse + ping animation. Intro copy.

### `src/components/onboarding/steps/Step2Wallet.jsx`
Consumes `useApp`. Shows success state if already connected; otherwise shows inline "Connect demo wallet" button. Useful for testing the wallet connection flow mid-tour.

### `src/components/onboarding/steps/Step3Swap.jsx`
Static list of 3 feature callouts (Fast settlement, Fees shown upfront, MEV protected). No interactivity.

### `src/components/onboarding/steps/Step4Pools.jsx`
Static list of 2 pool previews with APR. Hard-coded data (not from mock.js).

### `src/components/onboarding/steps/Step5Ready.jsx`
Staggered checklist: 4 items appear with `150 + i * 320ms` delays using `setTimeout` + state. Finishes with a tip callout.

### `src/components/ui/Badge.jsx`
Props: `variant` (`default | accent | success | danger | warning | gold | purple | btc`), `size` (`xs | sm | md`). Renders a `<span>` with Tailwind classes. Uses `font-dm font-medium`.

### `src/components/ui/Modal.jsx`
Props: `isOpen`, `onClose`, `title?`, `children`, `size` (`sm | md | lg | xl`). Listens for `Escape`, sets `document.body.style.overflow = 'hidden'` while open. Clicking the backdrop closes. Animates with `animate-scale-in`.

### `src/components/ui/Skeleton.jsx`
Three exports:
- `SkeletonLine({ width, height, className })` — single shimmer line
- `SkeletonCard({ className })` — card-shaped skeleton with icon + lines
- `Skeleton({ rows, className })` — default export; stacked rows with decreasing opacity

Uses the `.skeleton` CSS class from `index.css`.

### `src/components/ui/TokenIcon.jsx`
Two exports:
- `TokenIcon({ tokenId, size, className })` — circular token badge sized `xs/sm/md/lg/xl`; uses `token.bgColor` + `token.color`; displays first letter of symbol in Syne font
- `TokenPair({ tokenA, tokenB, size })` — two overlapping circles with `ring-2 ring-bg-surface`; first token has `z-10`

### `src/pages/Swap.jsx`
Main swap form. `data-onboarding="swap-card"` on the card container.

Internal components (not exported):
- `SwapArrowButton` — rotates 180° on hover
- `TokenSelectorModal` — wraps `<Modal>`; searchable token list; disables `comingSoon` tokens
- `TokenInput` — token selector button + amount input/display; Max button
- `SettlementToggle` — Fast/Standard toggle buttons
- `PriceImpactBadge` — color-coded: green <1%, yellow <3%, red ≥3%
- `ConfirmModal` — swap review before execution
- `SuccessModal` — post-swap confirmation with tx hash + copy button

Demo mode (`isDemoMode = isActive && currentStep === 2`): ghost-types values (1→10→100→output) via a `setTimeout` sequence; disables actual interactions.

Settlement fee: Fast = $0.02, Standard = $0.08 (from `SETTLEMENT_OPTIONS` in mock.js).

ORO "Coming soon" banner rendered below the swap card.

### `src/pages/Pools.jsx`
Two tabs: "All Pools" and "My Positions". `MY_POSITIONS` only shown when `isConnected`.

Internal components:
- `StatPill` — label + value pair
- `PoolCard` — shows top-pool star indicator, dual-yield breakdown (fee APR + RWA APR), TVL/volume, Add Liquidity button
- `PositionCard` — deposited/fees/total grid; Add/Remove buttons (Remove is UI-only, no action)
- `AddLiquidityModal` — 3 steps: input → confirming (1500ms mock) → success

### `src/pages/Portfolio.jsx`
Requires `isConnected`; shows connect CTA otherwise.

Internal components:
- `ChangeChip` — directional arrow + percentage, green/red
- `AssetRow` — token icon, name, balance, USD value, 24h change
- `TxRow` — icon by type (swap/add_liquidity/receive), formatted label, settlement badge, copy-hash button
- `SettlementSplit` — bar chart of fast vs standard settlement counts

Portfolio balance hero shows a blurred accent orb decoration. LP summary sidebar uses hardcoded values ($2000 deposited, $79.7 fees — not derived from `MY_POSITIONS`).

### `src/pages/Market.jsx`
Two views: market table and pair detail (drill-in).

Internal components:
- `MiniSparkline` — inline SVG sparkline (72×28px) using 1D price history
- `ChangeChip` — same pattern as Portfolio's
- `MarketTable` — sortable columns (pair/price/change/volume/tvl/apr); search filter; responsive column hiding
- `TradesFeed` — live-simulated trades at 2200ms interval; shows last 50; new trades flash green/red; keeps `secsAgo` counter
- `PairDetail` — back button, OHLCV stats, `PriceChart` with timeframe selector, `TradesFeed` panel, market info + pool liquidity cards, trade CTA banner
- `MarketStats` — aggregated 4-stat bar at top of table view

### `src/pages/Landing.jsx`
Separate route (`/landing`). Always dark (Landing.css uses its own `--bg: #0D0D14` etc., ignoring the app theme). Uses plain CSS classes, not Tailwind (except through `className` where nothing from the app theme is needed).

Sections: nav → hero (fullscreen) → marquee ticker → what → how (3 steps) → features grid (4 cells) → earn/pools → final CTA → footer.

Features:
- Custom cursor dot (`oro-cursor`) that enlarges on interactive elements
- `IntersectionObserver` scroll fade-in via `.oro-fade-in` → `.visible` class
- Clicking "Watch how it works" clears `oroswap_onboarded` and navigates to `/` (triggers onboarding)

---

## `src/data/mock.js` — Data Shapes

### `TOKENS: Token[]`
```js
{
  id: string,          // lowercase short key: 'xrb' | 'btc' | 'gold' | 'usdt' | 'usdc' | 'oro'
  symbol: string,      // display symbol: 'XRB' | 'BTC' | 'GOLD' | 'USDT' | 'USDC' | 'ORO'
  name: string,        // full name
  color: string,       // hex — foreground color for TokenIcon
  bgColor: string,     // hex — background color for TokenIcon
  price: number,       // USD price
  priceChange24h: number, // % change, can be negative
  decimals: number,    // 6 or 8
  comingSoon: boolean, // true only for ORO
  isRWA?: boolean,     // true only for GOLD
}
```

### `WALLET_BALANCES: Record<tokenId, Balance>`
```js
{ amount: number, usdValue: number }
```

### `MOCK_WALLET`
```js
{ address: string, addressFull: string, totalUsd: number }
// address is truncated: '0x3f8a...a912'
```

### `POOLS: Pool[]`
```js
{
  id: string,          // 'tokenA-tokenB'
  tokenA: string,      // token id
  tokenB: string,      // token id
  tvl: number,         // USD
  apr: number,         // total % APR
  feeApr: number,      // % from swap fees
  rwaApr: number,      // % from RWA yield (0 unless isDualYield)
  volume24h: number,   // USD
  isDualYield: boolean,
  isTop: boolean,      // marks the featured pool
}
```

### `MY_POSITIONS: Position[]`
```js
{
  id: string,          // 'pos-tokenA-tokenB'
  poolId: string,      // matches a Pool.id
  tokenA: string,
  tokenB: string,
  deposited: number,   // USD deposited
  feesEarned: number,  // USD fees earned
  sharePercent: number,// % share of pool
  tokenAAmount: number,
  tokenBAmount: number,
}
```

### `RECENT_TRANSACTIONS: Transaction[]`
```js
// Swap
{
  id: string, type: 'swap',
  fromToken: string, toToken: string,
  fromAmount: number, toAmount: number,
  settlement: 'fast' | 'standard',
  status: 'completed',
  timeAgo: string, txHash: string,
}
// Add liquidity
{
  id: string, type: 'add_liquidity',
  poolId: string, tokenA: string, tokenB: string,
  usdAmount: number, settlement: null,
  status: 'completed', timeAgo: string, txHash: string,
}
// Receive
{
  id: string, type: 'receive',
  token: string, amount: number,
  settlement: null, status: 'completed',
  timeAgo: string, txHash: string,
}
```

### `DEX_STATS`
```js
{ totalTvl: number, volume24h: number, totalPairs: number, totalUsers: number }
```

### `SPARKLINES: Record<tokenId, number[]>`
7-element arrays of relative values (0–100) for mini sparkline rendering.

### `SETTLEMENT_OPTIONS: SettlementOption[]`
```js
{
  id: 'fast' | 'standard',
  label: string, sublabel: string,
  iconType: 'lightning' | 'bitcoin',
  fee: number,       // USD: 0.02 (fast) | 0.08 (standard)
  estimatedTime: string,
}
```

### `FEE_TIERS`
```js
[{ bps: 5 | 30 | 100, label: string, bestFor: string }]
// Currently unused in UI (all pools display hardcoded '0.30%')
```

### `MARKET_PAIRS: MarketPair[]`
```js
{
  id: string,          // 'xrb-usdt' etc.
  base: string,        // 'XRB'
  quote: string,       // 'USDT'
  baseIcon: string,    // emoji
  price: number,
  change24h: number,
  high24h: number, low24h: number,
  volume24h: number,
  tvl: number,
  apr: number,
  trades24h: number,
}
```

### `PRICE_HISTORIES: Record<pairId, Record<timeframe, number[]>>`
Deterministically generated with `mulberry32` PRNG. Timeframes: `'1H' | '4H' | '1D' | '1W' | '1M'`. Point counts: 60, 96, 288, 168, 180.

### `INITIAL_TRADES: Record<pairId, Trade[]>`
```js
{
  id: string,
  side: 'buy' | 'sell',
  price: number, size: number, value: number,
  secsAgo: number,
}
```

### Helper functions (all exported)
| Function | Signature | Notes |
|---|---|---|
| `formatUsd` | `(amount, compact?)` | compact: `$1.2M`, `$340K`; else Intl |
| `formatAmount` | `(amount)` | 8dp for tiny, 4dp <1, 2dp <1000, Intl otherwise |
| `truncateAddress` | `(addr)` | 6 chars + `...` + 4 chars |
| `getToken` | `(id)` | `TOKENS.find(t => t.id === id)` |
| `calculateSwapOutput` | `(fromId, toId, fromAmount)` | 0.3% slippage applied |
| `calculatePriceImpact` | `(fromId, toId, fromAmount)` | tiered: 0.12% / 0.8% / 2.4% / 5.1% |

---

## OnboardingContext API

Provider: `<OnboardingProvider navigateTo={fn}>` — `navigateTo` is a function that switches the active page in `AppShell`.

### State values
| Value | Type | Description |
|---|---|---|
| `isActive` | `boolean` | Whether the overlay is currently showing |
| `currentStep` | `number` | 0-indexed step (0–4) |
| `showSkipConfirm` | `boolean` | Whether the skip confirmation modal is open |

### Methods
| Method | Signature | Description |
|---|---|---|
| `start` | `() => void` | Reset to step 0 and show overlay |
| `next` | `() => void` | Advance one step (clamps at 4) |
| `back` | `() => void` | Go back one step (clamps at 0) |
| `skip` | `() => void` | Show the skip confirmation modal |
| `cancelSkip` | `() => void` | Dismiss skip modal, stay in tour |
| `confirmSkip` | `() => void` | Write `oroswap_onboarded=true` to localStorage, close overlay |
| `complete` | `(goToSwap?: boolean) => void` | Same as confirmSkip; optionally navigate to swap page |
| `restartOnboarding` | `() => void` | Remove `oroswap_onboarded`, reset to step 0, show overlay |

### Side effects
- Auto-launches 600ms after first mount if `localStorage.getItem('oroswap_onboarded')` is falsy.
- When `isActive && currentStep === 2`, calls `navigateTo('swap')` to ensure the swap card is in the DOM for spotlighting.

### localStorage keys
| Key | Value | Purpose |
|---|---|---|
| `oroswap_onboarded` | `'true'` | Prevents auto-launch on repeat visits. Note: underscore separator |
| `oroswap-theme` | `'dark' \| 'light'` | Theme preference. Note: hyphen separator |

---

## AppContext API

Provider: `<AppProvider>` — wraps the entire app at the root.

### State + methods
| Value | Type | Description |
|---|---|---|
| `isConnected` | `boolean` | Wallet connected state |
| `isConnecting` | `boolean` | Loading state during mock 1400ms connect delay |
| `wallet` | `MOCK_WALLET \| null` | Wallet info when connected |
| `balances` | `Record<tokenId, Balance>` | Token balances when connected |
| `connectWallet` | `() => Promise<void>` | Mock 1400ms delay, then sets wallet + balances |
| `disconnectWallet` | `() => void` | Clears wallet + balances |
| `getBalance` | `(tokenId) => Balance` | Returns `{amount:0, usdValue:0}` if not found |

---

## Confirmed vs Proposed

### Confirmed (live in app)
- **XRB (Xerobit)** — primary native token; featured in most pools and the default "You pay" token in Swap
- **BTC (Bitcoin)** — supported as a pool token and swap target
- **GOLD (GoldGram)** — RWA tokenized gold; `isRWA: true`; enabled in dual-yield pools
- **USDT (Tether USD)** — stable
- **USDC (USD Coin)** — stable
- All 5 pools: `xrb-btc`, `xrb-usdt`, `xrb-usdc`, `gold-usdt`, `gold-xrb`
- Both settlement modes: Fast (Lightning, ~5s, $0.02) and Standard (Bitcoin L1, ~10m, $0.08)
- Onboarding tour (5 steps)
- Light + dark theme
- Landing page at `/landing`

### Proposed / Under Review
- **ORO (ORO Stable)** — Bitcoin-backed stablecoin. Status markers in codebase:
  - `comingSoon: true` in `TOKENS`
  - Disabled in `TokenSelectorModal` (not selectable, `cursor-not-allowed`, 40% opacity)
  - Badge shows `<Badge variant="purple" size="xs">Coming soon</Badge>`
  - Displayed as a teaser card below the swap form with a "Join waitlist" button (no action wired)
  - WALLET_BALANCES has `oro: { amount: 0, usdValue: 0 }`
  - No pools exist for ORO
- **`FEE_TIERS`** — exported from mock.js (5bps / 30bps / 100bps) but not rendered anywhere in the current UI (all pools show hardcoded "0.30% fee tier")
- **"Swap Now" and "Add Liquidity" buttons in Market pair detail** — rendered but not wired to navigation or modals
- **Remove liquidity** — button exists in `PositionCard` but has no action handler
- **Footer links** (Docs, Twitter, Discord, Orobit.ai) in Landing — rendered as `<button>` elements with no `onClick`

---

## Naming Conventions

### Files
- **Components**: PascalCase `.jsx` — `Header.jsx`, `TokenIcon.jsx`
- **Hooks/utilities**: camelCase `.js` — `useApp.js`, `useTheme.js`
- **Pages**: PascalCase `.jsx` — `Swap.jsx`, `Market.jsx`
- **CSS**: same name as the component it belongs to — `Landing.css`

### Identifiers
- **Token IDs**: lowercase short string — `'xrb'`, `'btc'`, `'gold'`, `'usdt'`, `'usdc'`, `'oro'`
- **Pool IDs**: `tokenA-tokenB` hyphenated — `'xrb-btc'`, `'gold-usdt'`
- **Position IDs**: `pos-tokenA-tokenB` — `'pos-xrb-usdt'`
- **Transaction IDs**: `tx1`, `tx2`, ... (sequential)
- **Market pair IDs**: `base-quote` lowercase — `'xrb-usdt'`

### Onboarding data attributes
Elements that the spotlight system targets use `data-onboarding="<name>"`:
- `"header-logo"` — logo element in Header
- `"wallet-button"` — wallet button wrapper in Header
- `"swap-card"` — the main swap form container in Swap.jsx
- `"nav-pools"` — the Pools nav button in Header

### localStorage keys (inconsistent — note for future cleanup)
- `oroswap-theme` (hyphen)
- `oroswap_onboarded` (underscore)

### CSS
- Tailwind utility classes throughout the app
- Landing page uses BEM-ish CSS classes in `Landing.css` (`.oro-landing`, `.hero-headline`, `.pool-row`, etc.)
- CSS variables use `--kebab-case`

### Context pattern
Context object is created in `*Context.jsx`, consumed via a hook in `use*.js`. The hook throws if used outside its provider.

---

## Do's

- **Use `useApp()`** to access wallet state everywhere — never import `AppContext` directly in components.
- **Use `useOnboarding()`** similarly — never import `OnboardingContext` directly.
- **Use the Tailwind theme-adaptive color names** (`bg-surface`, `text-primary`, `border`, etc.) rather than hardcoding dark-mode hex values — they switch automatically.
- **Use `Token.color` and `Token.bgColor` from `getToken(id)`** for token-specific colors — don't hardcode per-token colors in components.
- **Use `formatUsd()` and `formatAmount()`** from `mock.js` for all number display — they handle edge cases (tiny amounts, large numbers, compacting).
- **Add `data-onboarding="..."` attributes** to any new element the onboarding tour needs to spotlight.
- **Apply `animate-fade-in`** to page-level containers — all four pages use it for entry animation.
- **Keep `comingSoon: true` tokens** disabled in selectors — the pattern is already established in `TokenSelectorModal`.
- **Use `<Badge>`** for status labels (RWA, Coming soon, Dual yield, Top) — it has the right variants and sizing.
- **Use `<Modal>`** for all overlay dialogs — it handles Escape, body scroll lock, and backdrop click.
- **Use the Syne font** (`font-syne`) for headings, large numbers, and the logo — DM Sans (`font-dm`) for body/UI text.

## Don'ts

- **Don't use `App.css`** — it contains leftover Vite scaffold styles (`.counter`, `.hero .framework`, etc.) that are not used anywhere. Treat it as dead code.
- **Don't import `AppContext` or `OnboardingContext` directly** in components — always use the hook wrappers (`useApp`, `useOnboarding`).
- **Don't hardcode token colors** in components — always derive from `getToken(id).color` / `.bgColor`.
- **Don't add new localStorage keys with inconsistent separators** — pick one (`-` or `_`) and stay consistent. The current codebase has both (`oroswap-theme` vs `oroswap_onboarded`).
- **Don't wire up ORO** as a fully functional token without removing its `comingSoon: true` flag and the "Coming soon" teaser card — the two states would conflict.
- **Don't use the Landing page CSS variables** (`--bg`, `--surface`, `--accent`, etc. inside `.oro-landing`) outside of `Landing.css` — they shadow the global variables only within `.oro-landing` scope.
- **Don't mix the app navigation system with React Router** — the main app uses state-based navigation (`activePage`), not URL routes. Only `/landing` uses a real route. Adding new URL routes requires understanding this split.
- **Don't expect `FEE_TIERS`** to have any UI representation yet — it's exported from mock.js but no component consumes it.
- **Don't remove `data-onboarding` attributes** from `Header.jsx` or `Swap.jsx` without updating `STEP_TARGETS` in `OnboardingOverlay.jsx` — the spotlight system queries these selectors directly.
- **Don't call `setActivePage` directly** inside components — use `navigateTo` from `useOnboarding()` when the navigation should happen in the context of onboarding, or pass it down as a prop if needed at a higher level.
