# Glockery Frontend - AI Development Guide

## Architecture Overview
- **Type**: Single Page Application (SPA) built with React 17 and TypeScript.
- **Routing**: `react-router-dom` v5. Centralized routing in `src/index.tsx`.
- **State Management**: 
  - **Cart**: Managed via `CartContext` using `useReducer` for atomic updates.
  - **Persistence**: Synced to `localStorage` on every change via `useEffect` in `CartProvider`.
- **Styling**: Strict adherence to a single global stylesheet (`src/styles/globals.css`). 
  - Uses CSS custom properties for a design system (colors, spacing, shadows).
  - Avoid CSS-in-JS or CSS Modules; stick to standard CSS classes.

## Critical Workflows & Commands
- **Local Development**: `npm start`.
- **Node.js Versioning**: This project requires Node 16 or lower, or the `--openssl-legacy-provider` flag for Node 17+.
- **Build**: `npm run build`. On modern Node versions, use:
  ```bash
  NODE_OPTIONS=--openssl-legacy-provider npm run build
  ```
- **Vercel Deployment**: Configured via `vercel.json`. The `buildCommand` is explicitly set to use the legacy OpenSSL provider to prevent `ERR_OSSL_EVP_UNSUPPORTED` errors.

## Key Patterns & Conventions
- **Data Fetching/Sourcing**: Currently, products are static arrays defined directly in `src/pages/index.tsx`. 
- **WhatsApp Checkout**: The "Buy Now" button in `ProductCard.tsx` bypasses the cart and initiates a direct WhatsApp message to `+919207232303`.
- **Component Pattern**: Use Functional Components with `React.FC`. 
- **Cart Hook**: Always access cart state/actions via the `useCart` hook, never `useContext(CartContext)` directly.

## Directory Structure
- `src/components/`: Pure and semi-pure UI components.
- `src/contexts/`: Context providers for global state.
- `src/hooks/`: Custom hooks (logic encapsulation).
- `src/pages/`: Route-level components.
- `src/types/`: Centralized TypeScript interfaces (e.g., `Product`, `CartItem`).

## Design Tokens (from globals.css)
- Primary Colors: `--blue` (#2563eb), `--red` (#dc2626).
- Backgrounds: `--bg` (#f6f7f8), `--card-bg` (#ffffff).
- UI Elements: `--radius` (14px), `--shadow-soft`.
