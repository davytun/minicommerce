```
# Mini-Commerce - E-Commerce Prototype

![Demo Screenshot]https://minicommerce-seven.vercel.app/screenshot.png

A client-side e-commerce prototype built with Next.js 14 (App Router) featuring product browsing, cart management, and mock checkout.

[Live Demo](https://minicommerce-seven.vercel.app/) 
| [GitHub Repo](https://github.com/davytun/minicommerce)

## Project Overview

Mini-Commerce is a front-end prototype demonstrating:
- Product catalogue from local JSON → localStorage
- Persistent cart management with Zustand
- Mock checkout flow
- Full client-side state persistence

Key technical features:
- Next.js 14 App Router
- TypeScript (strict mode)
- React Query for data fetching
- Zustand + localStorage persistence
- Tailwind CSS styling
- Responsive mobile-first layout

### Accessibility
- Semantic HTML5 tags (`main`, `section`, `article`)
- Keyboard-navigable interactive elements
- ARIA labels for cart actions
- `next/image` with optimized alt texts

## Tools & Techniques

### Core Stack
- *Next.js 14*: App Router, dynamic routes (`/product/[slug]`)
- *React Query*: Catalogue data fetching with `useQuery`
- *Zustand*: Cart store with `persist` middleware
- *TypeScript*: Strict typing with zero `any` usage

### State Management
```typescript
interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}
```

## SEO Strategy

### Optimizations
- Next.js default optimization for:
  - Automatic image optimization (`next/image`)
  - Prefetching for client-side navigation
- Metadata in `layout.tsx`:
  ```typescript
  export const metadata = {
    title: "Mini-Commerce | Modern E-Commerce Prototype",
    description: "A demo e-commerce site built with Next.js",
    openGraph: { }
  }
  ```

## Error Handling

### Scenarios Covered
1. *Catalogue Fetch Failure*:
   - React Query `error` state shows graceful message
   - Auto-retry with exponential backoff

2. *Cart Operations*:
   - Quantity validation (min: 1, max: 10)
   - Empty cart state UI

3. *Routing*:
   - 404 page for unknown routes
   - Loading states during transitions

## Development Setup

1. Install dependencies:
```bash
pnpm install
```

2. Run development server:
```bash
pnpm run dev
```

3. Run tests:
```bash
pnpm lint
```

## CI/CD
- Pre-commit hooks (Husky) for:
  - Type checking
  - Linting (ESLint)
  - Formatting (Prettier)

```
