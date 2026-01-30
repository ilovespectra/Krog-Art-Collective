# Krog Art Collective - Ljubljana Art Supplies Thrift Store

A modern, creative web application for Krog Art Collective - a community-driven art supplies thrift store in Ljubljana, Slovenia. Accepting donated art supplies, offering semantic search, inventory browsing, and supporting local art initiatives.

## 🎨 Features

### Core Functionality
- **Semantic Search**: Search art supplies by description with intelligent similarity scoring
- **Category Browsing**: Filter supplies by type (Paints, Drawing, Surfaces, Brushes, Specialty)
- **Shopping Cart**: Add items to cart with quantity management
- **Inventory Management**: Track donated supplies with condition ratings

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
- **POS System** (`/pos`): Placeholder for future point-of-sale implementation

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home/browse page
│   ├── about/
│   ├── contact/
│   ├── cart/
│   ├── pos/
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
│   └── inventory.ts       # 40+ art supply items mock data
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
- MongoDB 4.4+ (for backend - local or Atlas)

### Installation

```bash
# Clone the repository
cd /Users/tanny/Documents/github/Krog-Art-Collective

# Install frontend dependencies
npm install

# Start frontend development server
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB connection and settings

# Seed database with 10 tools
npm run seed

# Start backend development server
npm run dev
```

The backend API will be available at [http://localhost:5000](http://localhost:5000)

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

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Internationalization**: Custom i18n implementation (en/sl)

### Backend
- **Framework**: Express.js 4.18
- **Database**: MongoDB 8.0 with Mongoose
- **Language**: TypeScript
- **Authentication**: JWT + bcryptjs
- **API Features**: CORS, JSON parsing, error handling

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
- CLIP embeddings from Python backend
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
2. Connect to backend database (local MongoDB/PostgreSQL)
3. Implement user authentication
4. Add product detail pages with images
5. Enhance POS system with barcode scanning
6. Payment integration (Stripe, PayPal)

### Advanced Features
1. Real-time inventory sync with backend
2. Donation submission form with image uploads
3. Admin dashboard for inventory management
4. Analytics and sales reporting
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
