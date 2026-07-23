# Orebi Customer Storefront

Orebi is the customer-facing React frontend for a MERN e-commerce application. It provides the shopping experience for browsing products, viewing product details, managing a cart, applying coupons, checking out, and reviewing customer orders.

This repository is intentionally focused on the storefront only. The backend API and admin dashboard live in separate projects.

## Project Overview

Orebi is built as a modern Vite + React single-page application. It communicates with the e-commerce backend through a centralized Axios client and keeps cart state locally with Zustand persistence.

The application includes:

- Public storefront pages
- Product listing and product details
- Variant-aware cart behavior
- Coupon-enabled cart and checkout flows
- Checkout order creation
- Order success confirmation
- Customer order history and order details
- Responsive layout with reusable UI and layout components

## Key Features

- Home page with banner, promotional sections, new arrivals, best sellers, and special offers
- Shop page for browsing products
- Product details page with product variant support
- Persistent shopping cart using Zustand
- Add to cart, remove from cart, increase quantity, and decrease quantity
- Coupon application from cart and checkout
- Checkout page with billing details, shipping method, payment method, and order summary
- Order success page with order number, order ID, status, item summary, and receipt details
- Customer order history page
- Customer order details page
- Account dropdown link to customer orders
- Light/dark theme toggle persisted in local storage
- Scroll-to-top behavior on route changes
- Responsive page layouts and mobile-friendly cart/order views
- Toast notifications for user feedback

## Tech Stack

- React 19
- Vite
- React Router
- Zustand
- Axios
- Tailwind CSS
- Base UI
- shadcn-style UI primitives
- Lucide React
- React Icons
- React Hot Toast
- React Slick
- Framer Motion

## Project Structure

```txt
Orebi/
  public/
    favicon.svg
    vite.svg

  src/
    assets/
      icons/                 # Custom icon components and SVG assets
      *.png                  # Storefront image assets

    components/
      layouts/               # Header, footer, banner, ads, product sections, filters
      pages/                 # Route-level pages
      ui/                    # Shared UI primitives
      *.jsx                  # Reusable storefront components

    lib/
      apiClient.js           # Central Axios instance
      productApi.js          # API base URL, API paths, external feed URLs
      cartUtils.js           # Cart line helpers
      productUtils.js        # Product normalization/helpers
      utils.js               # Shared utility helpers

    services/
      productService.js      # Product API service functions

    store/
      cart.js                # Persisted Zustand cart store

    App.jsx                  # Application routes
    main.jsx                 # React entry point
    index.css                # Global styles
    App.css                  # App-level styles

  components.json
  eslint.config.js
  jsconfig.json
  package.json
  vite.config.js
```

## Installation & Setup

### Prerequisites

- Node.js 20 or newer
- npm
- Running backend API for full cart, checkout, coupon, product, and order functionality

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_NEW_ARRIVALS_API_URL=<public-product-feed-url>
VITE_BEST_SELLERS_API_URL=<public-product-feed-url>
VITE_SPECIAL_OFFERS_API_URL=<public-product-feed-url>
```

### Variables

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Base URL for the MERN backend API. |
| `VITE_NEW_ARRIVALS_API_URL` | Yes | External/public feed used by the new arrivals section. |
| `VITE_BEST_SELLERS_API_URL` | Yes | External/public feed used by the best sellers section. |
| `VITE_SPECIAL_OFFERS_API_URL` | Yes | External/public feed used by the special offers section. |

The app validates these variables during startup and throws a clear error if any required variable is missing.

## Backend API Integration

Orebi uses a centralized Axios client in `src/lib/apiClient.js`.

```js
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 60000,
});
```

API paths are centralized in `src/lib/productApi.js`.

Implemented backend integrations include:

| Area | Endpoint Used |
| --- | --- |
| Product list | `/product/getproduct` |
| Product details | `/product/singleproduct/:id` |
| Product variants | `/product/:id/variants` |
| Categories | `/category/getallcategory` |
| Cart add | `/cart/addtocart` |
| Coupon apply | `/coupon/apply-coupon` |
| Create order | `/order/create` |
| Customer orders | `/order/mine` |
| Order details | `/order/:id` |

The app sends credentials with API requests so session-based backend features can work when the backend is configured for cookies and CORS.

## State Management

Cart state is managed with Zustand in `src/store/cart.js`.

The cart store supports:

- `items`
- `addToCart`
- `removeFromCart`
- `increaseQuantity`
- `decreaseQuantity`
- `clearCart`

Cart data is persisted with Zustand middleware using the `cart-storage` key, so the cart survives page refreshes.

Cart item identity is based on helper logic from `src/lib/cartUtils.js`, allowing variant-specific cart lines.

## Routing

Routes are defined in `src/App.jsx` using React Router.

| Route | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Shop |
| `/about` | About |
| `/contacts` | Contacts |
| `/journal` | Journal |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/order-success` | Order Success |
| `/orders` | Customer Order History |
| `/orders/:id` | Customer Order Details |
| `/productdetails/:id` | Product Details |
| `/signup` | Signup |
| `/login` | Login |
| `*` | Error / Not Found |

All routes render inside the shared `RootLayout`, which provides the storefront header and footer.

## Responsive Design

Orebi uses Tailwind CSS utility classes to support responsive layouts across storefront pages.

Responsive areas include:

- Header and navigation layout
- Product cards and product sections
- Cart item layout
- Checkout form and sticky order summary
- Order history cards
- Order details layout
- Footer and content containers

## UI/UX Highlights

- Clean e-commerce storefront layout with reusable sections
- Persistent cart dropdown in the header
- Product cards with visual assets and interaction controls
- Coupon feedback with success/error toast messages
- Checkout form with inline validation
- Order success page that confirms order creation and receipt details
- Customer order history with loading, empty, and error states
- Status badges for order fulfillment state
- Dark mode toggle persisted through local storage
- Scroll restoration on route changes

## Screenshots

Add screenshots to a `docs/screenshots/` folder or update these placeholders with hosted image URLs.

| Screen | Preview |
| --- | --- |
| Home | `docs/screenshots/home.png` |
| Shop | `docs/screenshots/shop.png` |
| Product Details | `docs/screenshots/product-details.png` |
| Cart | `docs/screenshots/cart.png` |
| Checkout | `docs/screenshots/checkout.png` |
| Order Success | `docs/screenshots/order-success.png` |
| Order History | `docs/screenshots/orders.png` |
| Order Details | `docs/screenshots/order-details.png` |

## Live Demo

Live demo URL:

```txt
Coming soon
```

## GitHub Repository

Repository URL:

```txt
Coming soon
```

## Future Improvements

- Connect the login/signup pages to the production authentication flow
- Add protected route handling for customer-only pages
- Add product search and filter controls using the backend product search API
- Add wishlist functionality
- Add customer profile management
- Add payment gateway integration
- Add automated tests for cart, checkout, and order flows
- Improve bundle splitting for a smaller production JavaScript payload

## License

This project is currently private/unlicensed. Add a license file before publishing as an open-source repository.
