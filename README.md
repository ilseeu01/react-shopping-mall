# React Shopping Mall

A modern e-commerce shopping mall application built with React, TypeScript, Redux Toolkit, and Firebase.

## Features

- **Product Listing**: Browse products from FakeStore API
- **Category Filtering**: Filter products by categories
- **Product Details**: View detailed product information
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Sign up and sign in using Firebase Auth
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **State Management**: Redux Toolkit for efficient state management

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Auth
- **API**: FakeStore API
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-shopping-mall
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and configure email/password provider
   - Copy your Firebase config and update `src/config/firebase.ts`

4. Start the development server:
```bash
npm run dev
```

### Firebase Configuration

Update the Firebase configuration in `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── ProductList.tsx  # Product listing page
│   ├── ProductCard.tsx  # Individual product card
│   ├── ProductDetail.tsx # Product details page
│   ├── Cart.tsx         # Shopping cart page
│   └── Login.tsx        # Authentication page
├── store/               # Redux store setup
│   ├── index.ts         # Store configuration
│   └── slices/          # Redux slices
│       ├── authSlice.ts # Authentication state
│       ├── cartSlice.ts # Shopping cart state
│       └── productsSlice.ts # Products state
├── services/            # API services
│   └── authService.ts   # Firebase auth services
├── hooks/               # Custom hooks
│   └── redux.ts         # Typed Redux hooks
├── config/              # Configuration files
│   └── firebase.ts      # Firebase config
└── App.tsx              # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API

This application uses the [FakeStore API](https://fakestoreapi.com/) for product data:

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch single product
- `GET /products/categories` - Fetch all categories

## Authentication

Firebase Authentication is used for user management with email/password authentication. Users can:

- Sign up with email and password
- Sign in with existing credentials
- Sign out
- Maintain authentication state across sessions

## State Management

Redux Toolkit is used for state management with the following slices:

- **Auth Slice**: User authentication state
- **Cart Slice**: Shopping cart items and totals
- **Products Slice**: Product data and categories

## Deployment

This project is configured for deployment to GitHub Pages with automatic CI/CD.

### Automatic Deployment (Recommended)

1. Push your code to GitHub repository
2. GitHub Actions will automatically build and deploy to GitHub Pages
3. Your site will be available at: `https://[username].github.io/react-shopping-mall/`

### Manual Deployment

If you prefer to deploy manually:

```bash
# Build and deploy to gh-pages branch
npm run deploy
```

### GitHub Pages Setup

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. The deployment workflow will automatically run on push to main branch

### Local Testing

Before deployment, test your build locally:

```bash
npm run build
npm run preview
```

### Deployment Configuration

- Base URL is set to `/react-shopping-mall/` in `vite.config.ts`
- GitHub Actions workflow is configured in `.github/workflows/deploy.yml`
- Deployment artifacts are built to `dist/` directory

## Test Account

For testing the application, use the following credentials:

- **Email**: admin@gmail.com
- **Password**: 0000

You can also click the "자동 입력" (Auto Fill) button on the login page for quick access.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
