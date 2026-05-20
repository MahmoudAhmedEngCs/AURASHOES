# AURA.KICKS - Project Documentation (English)

## Overview

Modern sneaker store UI built with React + Vite, featuring animated hero, store/product/cart/wishlist pages, and Firebase integration for authentication and database.

## Tools and Libraries

- React 19
- Vite 8
- React Router DOM
- Firebase (Authentication + Firestore)
- GSAP (animations)
- Lucide React (icons)
- React Hot Toast (notifications)
- Paper.js (interactive visual effects)

## Local Development

1. Install dependencies:

```
npm install
```

2. Run dev server:

```
npm run dev
```

3. Production build:

```
npm run build
```

4. Preview production build:

```
npm run preview
```

## Environment Variables

Create a `.env` file at the project root and add:

```
VITE_RAPIDAPI_KEY=YOUR_API_KEY
```

## Database (Firestore)

Firestore collections used by the app:

- `products`: product catalog data
- `users`: user data storing `cartItems` and `wishlistItems`

## Authentication

Firebase Authentication is enabled with Google provider. A user document is created in `users` on first login.

## Product Seeding

Seed logic lives in `src/services/db.js` and pulls sneaker data from RapidAPI, then stores it in Firestore. Requires `VITE_RAPIDAPI_KEY` in `.env`.

## Project Structure

- `src/pages`: app pages (Home, Store, ProductDetails, Cart, Wishlist, Login)
- `src/components`: UI components (Navbar, Cards, Animations)
- `src/context`: app state contexts (Auth, Cart, Wishlist)
- `src/services`: Firebase + Firestore services
# AURASHOES
