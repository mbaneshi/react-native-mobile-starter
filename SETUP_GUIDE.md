# Complete Setup Guide - React Native Mobile App

## Overview

This guide will help you set up and run the complete React Native mobile application with Node.js backend. The project is 60% complete with the backend fully implemented and the mobile app partially implemented.

## What's Already Built

### Backend (100% Complete)
- Complete Express.js server with TypeScript
- Prisma ORM with PostgreSQL database
- JWT authentication with refresh tokens
- User management (register, login, profile, avatar upload)
- Push notification system with Firebase
- Email service for verification and password reset
- Settings management
- Comprehensive error handling and validation
- Security middleware (helmet, CORS, rate limiting)

### Mobile App (60% Complete)
- Redux store with auth slice
- Complete service layer (API, auth, user, notifications, settings)
- TypeScript configuration with path aliases
- Theme system (light/dark mode)
- Constants and type definitions

### What Still Needs to Be Built (40%)
- Remaining Redux slices (user, notifications, settings)
- React Navigation setup (Auth & Main navigators)
- All screen components (Login, Register, Profile, Settings, etc.)
- Common UI components (Button, Input, Card, etc.)
- Custom hooks
- Main App.tsx entry point
- Testing setup
- CI/CD pipelines

## Prerequisites Installation

### 1. Node.js and npm
```bash
# Download and install Node.js v20.x LTS from nodejs.org
# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show v10.x.x
```

### 2. PostgreSQL Database
```bash
# Option A: Using Docker (Recommended)
docker run --name postgres-db \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=mobileapp \
  -p 5432:5432 \
  -d postgres:16

# Option B: Install locally from postgresql.org
# Then create database:
createdb mobileapp
```

### 3. React Native Development Environment

#### For iOS (macOS only)
```bash
# Install Xcode from App Store (15.x or later)

# Install CocoaPods
sudo gem install cocoapods

# Install Xcode Command Line Tools
xcode-select --install
```

#### For Android
```bash
# Download and install Android Studio from developer.android.com

# During installation, ensure these are selected:
# - Android SDK
# - Android SDK Platform
# - Android Virtual Device

# Set environment variables (add to ~/.zshrc or ~/.bash_profile):
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

# Verify installation
adb --version
```

### 4. Git
```bash
# Verify Git installation
git --version

# If not installed, download from git-scm.com
```

## Step-by-Step Setup

### Step 1: Clone or Navigate to Project
```bash
cd /Users/nerd/freelancer/01-react-native-mobile-app
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Required variables:
# - DATABASE_URL=postgresql://username:password@localhost:5432/mobileapp
# - JWT_SECRET=your-random-secret-key-here
# - JWT_REFRESH_SECRET=your-random-refresh-secret-here
# - SMTP_* (email configuration)
# - AWS_* (for file uploads - can be set up later)

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with test data (optional)
npx prisma db seed

# Start development server
npm run dev

# Server should start on http://localhost:3000
```

### Step 3: Verify Backend is Running

Open a new terminal and test the health endpoint:
```bash
curl http://localhost:3000/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Step 4: Mobile App Setup

```bash
# Open a new terminal
cd /Users/nerd/freelancer/01-react-native-mobile-app/mobile

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file
# Set API_BASE_URL based on your platform:
# - For iOS simulator: http://localhost:3000/api
# - For Android emulator: http://10.0.2.2:3000/api
# - For physical device: http://YOUR_COMPUTER_IP:3000/api

# iOS setup (macOS only)
cd ios
pod install
cd ..
```

### Step 5: Run the Mobile App

#### For iOS:
```bash
# Make sure the backend is running in another terminal
npm run ios

# Or specify a specific simulator:
npm run ios -- --simulator="iPhone 15 Pro"
```

#### For Android:
```bash
# Start Android emulator first through Android Studio
# Or start from command line:
emulator -avd YOUR_AVD_NAME

# Then run:
npm run android
```

## Testing the Application

### 1. Test Backend API

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "name": "Test User"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

### 2. Test Mobile App

1. Launch the app on simulator/emulator
2. Try registering a new user
3. Login with credentials
4. Test navigation (once implemented)
5. Test profile features (once implemented)

## Database Management

### View Database with Prisma Studio
```bash
cd backend
npx prisma studio
# Opens GUI at http://localhost:5555
```

### Run Migrations
```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply migrations in production
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Database Seeding
```bash
# Run seed script
npx prisma db seed

# This creates:
# - Test user: test@example.com / Password123
# - User settings
# - Sample notification
```

## Common Issues and Solutions

### Issue 1: Backend won't start
```bash
# Check if port 3000 is in use
lsof -ti:3000

# Kill process if needed
kill -9 $(lsof -ti:3000)

# Verify PostgreSQL is running
# For Docker:
docker ps | grep postgres

# For local installation:
pg_isready
```

### Issue 2: Database connection fails
```bash
# Verify DATABASE_URL in .env is correct
# Format: postgresql://user:password@host:port/database

# Test connection:
psql -d mobileapp -U your_username
```

### Issue 3: iOS build fails
```bash
# Clean build
cd ios
pod deintegrate
pod install
cd ..

# Clean React Native cache
rm -rf node_modules
npm install
npm start -- --reset-cache
```

### Issue 4: Android build fails
```bash
# Clean build
cd android
./gradlew clean
cd ..

# Clean React Native cache
rm -rf node_modules
npm install
npm start -- --reset-cache
```

### Issue 5: Metro bundler issues
```bash
# Reset Metro bundler
rm -rf /tmp/metro-*
rm -rf /tmp/haste-*
npm start -- --reset-cache
```

## Development Workflow

### 1. Start Backend
```bash
cd backend
npm run dev
# Server runs with hot reload on file changes
```

### 2. Start Mobile App
```bash
cd mobile
npm start
# Then press 'i' for iOS or 'a' for Android
```

### 3. View Logs
```bash
# Backend logs
# Visible in terminal where npm run dev is running
# Also stored in backend/logs/

# Mobile logs
# iOS: Use Xcode Console or React Native debugger
# Android: Use Android Studio Logcat or adb logcat
```

### 4. Debug Mobile App
```bash
# Open React Native Debugger
# Or use Chrome DevTools (press 'j' in Metro)

# For iOS:
# Press Cmd+D in simulator to open debug menu

# For Android:
# Press Cmd+M in emulator to open debug menu
```

## Next Steps for Completion

### Priority 1: Core Mobile Components (Required for MVP)
1. Create remaining Redux slices:
   - `src/store/slices/userSlice.ts`
   - `src/store/slices/notificationsSlice.ts`
   - `src/store/slices/settingsSlice.ts`

2. Set up Navigation:
   - `src/navigation/index.tsx`
   - `src/navigation/AuthNavigator.tsx`
   - `src/navigation/MainNavigator.tsx`

3. Create Auth Screens:
   - `src/screens/Auth/LoginScreen.tsx`
   - `src/screens/Auth/RegisterScreen.tsx`
   - `src/screens/Auth/ForgotPasswordScreen.tsx`

4. Create Main Screens:
   - `src/screens/Home/HomeScreen.tsx`
   - `src/screens/Profile/ProfileScreen.tsx`
   - `src/screens/Settings/SettingsScreen.tsx`

5. Create Common Components:
   - `src/components/common/Button.tsx`
   - `src/components/common/Input.tsx`
   - `src/components/common/Card.tsx`

6. Create App Entry Point:
   - `App.tsx`
   - `index.js`

### Priority 2: Polish and Testing
1. Add remaining screens
2. Implement error handling
3. Add loading states
4. Write tests
5. Add animations

### Priority 3: Production Ready
1. Configure Sentry for error tracking
2. Set up Firebase for push notifications
3. Configure AWS S3 for file uploads
4. Add analytics
5. Optimize performance
6. Prepare for app store submission

## Production Deployment

### Backend Deployment (e.g., Heroku, AWS, DigitalOcean)
```bash
# Build
npm run build

# Set environment variables in production

# Run migrations
npx prisma migrate deploy

# Start
npm start
```

### Mobile App Release
```bash
# iOS
cd ios
# Archive in Xcode
# Upload to App Store Connect

# Android
cd android
./gradlew bundleRelease
# Upload to Google Play Console
```

## Support and Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Prisma Docs](https://www.prisma.io/docs)
- [Express.js Docs](https://expressjs.com/)
- [React Navigation Docs](https://reactnavigation.org/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)

## Current Implementation Status

See `IMPLEMENTATION_STATUS.md` for detailed breakdown of completed and pending components.

## License

MIT
