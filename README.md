# Krog Art Collective - Ljubljana Art Supplies Thrift Store

A modern, creative web application for Krog Art Collective - a community-driven art supplies thrift store in Ljubljana, Slovenia. Accepting donated art supplies, offering semantic search, inventory browsing, and supporting local art initiatives.

## 🎨 Features

### Core Functionality
- **Semantic Search**: Search art supplies by description with intelligent similarity scoring
- **Category Browsing**: Filter supplies by type (Paints, Drawing, Surfaces, Brushes, Specialty)
- **Shopping Cart**: Add items to cart with quantity management
- **Inventory Display**: Browse donated supplies with condition ratings and pricing

### User Experience
- **Dark/Light Theme Toggle**: User preference persistence with local storage
- **English/Slovene Language Support**: Bilingual interface with i18n
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Purple and blue gradient accent colors, smooth transitions

### Pages
- **Home** (`/`): Browse and search inventory with filters
- **Tool Library** (`/tools`): Community tool library with calendar booking system
- **Donate** (`/donate`): Three-way donation form (supplies, tools, monetary)
- **About** (`/about`): Mission statement, values, and community impact
- **Contact** (`/contact`): Contact information and donation requests
- **Cart** (`/cart`): Shopping cart with checkout preview
- **Join** (`/join`): Membership application for Kolektiv Krog 

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (contact, join forms)
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home/browse page
│   ├── about/
│   ├── contact/
│   ├── cart/
│   ├── tools/
│   ├── donate/
│   ├── join/
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   ├── LanguageToggle.tsx
│   ├── SearchBar.tsx
│   ├── CategoryFilter.tsx
│   └── InventoryCard.tsx
├── hooks/                 # Custom React hooks
│   └── useTranslation.ts  # i18n hook with en/sl translations
├── store/                 # Zustand state management
│   ├── useTheme.ts        # Dark/light mode state
│   ├── useLanguage.ts     # Language selection state
│   └── useCart.ts         # Shopping cart state
├── types/                 # TypeScript type definitions
│   └── inventory.ts       # Inventory and cart types
├── data/                  # Static data
│   └── inventory.ts       # Art supply items (manually maintained)
└── utils/                 # Utility functions
    └── search.ts          # Semantic search & filtering logic
```

## 🎨 Art Supply Categories

The inventory includes items across 5 main categories:

1. **Paints & Mediums**: Acrylics, watercolours, oils, gouache
2. **Drawing & Marking**: Colored pencils, fine liners, inks, charcoal, pastels
3. **Surfaces & Substrates**: Canvases, panels, papers, sketchbooks
4. **Brushes & Application Tools**: Watercolour, oil/acrylic, palette knives, airbrushing
5. **Specialty Process Supplies**: Printmaking, calligraphy, textiles, sculpture

Each item includes:
- High-quality brand examples (Golden, Schmincke, Faber-Castell, etc.)
- Description and category
- Price
- Stock quantity
- Condition rating (excellent/good/fair)
- Donation date

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (npm/yarn/pnpm)

### Installation

```bash
# Clone the repository
cd /Users/tanny/Documents/github/Krog-Art-Collective

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deployment

### Development
```bash
npm run dev      # Start Turbopack dev server
```

### Production
```bash
npm run build    # Create optimized production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🔧 Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Internationalization**: Custom i18n implementation (en/sl)

### Development
- **Build**: Turbopack (2.1s)
- **Dev Server**: Hot reload with ts-node-dev
- **Linting**: ESLint

## 🌍 Localization

The application supports two languages with persistent user preference:
- **English** (en) - Default
- **Slovenian** (sl)

Translations are managed in `src/hooks/useTranslation.ts` with a hook-based API:

```tsx
const { t } = useTranslation();
<h1>{t('browse.title')}</h1>
```

## 🎯 Search Implementation

The semantic search uses text similarity scoring across:
- Item names (40% weight)
- Descriptions (30% weight)
- Category (15% weight)
- Subcategory (15% weight)

**Note**: The current implementation uses simple similarity scoring. For production, integrate with:
- CLIP embeddings from machine learning service
- Vector database (Pinecone, Weaviate, Milvus)
- Proper image embedding pipeline

## 🛒 Shopping Cart

The cart system features:
- Add/remove items
- Quantity management
- Real-time total calculation
- Persistent cart state (requires Zustand localStorage middleware enhancement)
- Checkout placeholder

## 📋 State Management

Using Zustand for client-side state:

```tsx
// Theme (persisted)
const { isDark, toggleTheme } = useTheme();

// Language (persisted)
const { locale, setLanguage } = useLanguage();

// Shopping cart
const { items, total, addItem, removeItem } = useCart();
```

## 📝 Inventory Management

Currently, inventory is manually maintained in `src/data/inventory.ts`. To update inventory:

1. Edit the `inventory.ts` file directly
2. Add or modify items with required fields (name, description, price, quantity, condition, etc.)
3. Redeploy the application

As demand grows and the inventory scales, a proper database and admin dashboard will be implemented.

## 🎨 Design System

### Colors
- **Primary**: Purple (#9333ea)
- **Accent**: Blue (#3b82f6)
- **Dark Mode**: Slate 950 background
- **Light Mode**: White background

### Components
- Rounded corners (lg rounded-lg)
- Soft shadows (shadow, shadow-lg)
- Smooth transitions (duration-200)
- Hover states on interactive elements

## 🚧 Future Development

### Immediate Priorities
1. Integrate CLIP embeddings for image-based search
2. Implement user authentication
3. Add product detail pages with images
4. Payment integration (Stripe, PayPal)
5. Enhance Tool Library booking system

### Advanced Features (When Demand Requires)
1. Backend database and admin inventory management system
2. Real-time inventory sync
3. Donation submission form with image uploads
4. Admin dashboard for inventory and analytics
5. User accounts with order history
6. Community forum/gallery
7. Integration with local art initiatives

## 📝 Notes

### Build Warning
The project may show a warning about multiple lockfiles. This is due to a global yarn.lock in the parent directory. To silence:

```json
// next.config.ts
export default {
  experimental: {
    turbopack: {
      root: 'Documents/github/Krog-Art-Collective'
    }
  }
}
```

### Performance
- Uses Next.js Turbopack for fast builds (2.1s)
- Static pre-rendering for all pages
- CSS modules and Tailwind optimization
- Image optimization ready (placeholder emoji assets)

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast dark/light modes
- Language toggle for non-English speakers

## 📞 Contact & Support

**Krog Art Collective**
- Email: info@kolektivkrog.si
- Location: Ljubljana, Slovenia 🇸🇮
- Community: Supporting local artists through donated supplies

## 📄 License

Community project - Open for collaboration and contribution
