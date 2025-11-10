# React Native Mobile App - Technical Requirements Document

## Table of Contents
1. [Technical Specifications](#1-technical-specifications)
2. [Functional Requirements](#2-functional-requirements)
3. [Implementation Guide](#3-implementation-guide)
4. [Testing Requirements](#4-testing-requirements)
5. [Build & Deployment](#5-build--deployment)

---

## 1. TECHNICAL SPECIFICATIONS

### 1.1 Tech Stack

#### Frontend (Mobile Application)
- **Framework:** React Native v0.73.x
- **Language:** TypeScript v5.3.x
- **Navigation:** React Navigation v6.x
- **State Management:** Redux Toolkit v2.0.x
- **UI Components:** React Native Paper v5.x
- **Forms:** React Hook Form v7.x
- **HTTP Client:** Axios v1.6.x
- **Date Handling:** date-fns v3.x

#### Backend
- **Runtime:** Node.js v20.x (LTS)
- **Framework:** Express.js v4.18.x
- **Language:** TypeScript v5.3.x
- **Database:** PostgreSQL v16.x
- **ORM:** Prisma v5.x
- **Authentication:** JWT with refresh tokens
- **Password Hashing:** bcrypt v5.x
- **Validation:** Zod v3.x
- **File Upload:** Multer v1.4.x

#### Cloud Infrastructure
- **Hosting:** AWS (or Firebase as alternative)
- **Storage:** AWS S3 (or Firebase Storage)
- **Database:** AWS RDS PostgreSQL (or Supabase)
- **Push Notifications:** Firebase Cloud Messaging (FCM)
- **Analytics:** Firebase Analytics + Mixpanel
- **Error Tracking:** Sentry

#### Development Tools
- **Package Manager:** npm v10.x or yarn v1.22.x
- **Version Control:** Git with GitHub/GitLab
- **Code Formatting:** Prettier v3.x
- **Linting:** ESLint v8.x with Airbnb config
- **Testing:** Jest v29.x + React Native Testing Library
- **E2E Testing:** Detox v20.x
- **CI/CD:** GitHub Actions or GitLab CI
- **API Documentation:** Swagger/OpenAPI v3.x

### 1.2 Project Structure

```
react-native-mobile-app/
├── mobile/                          # React Native application
│   ├── android/                     # Android native code
│   ├── ios/                         # iOS native code
│   ├── src/
│   │   ├── components/              # Reusable UI components
│   │   │   ├── common/              # Generic components (Button, Input, etc.)
│   │   │   ├── forms/               # Form components
│   │   │   └── layout/              # Layout components
│   │   ├── screens/                 # Screen components
│   │   │   ├── Auth/                # Authentication screens
│   │   │   ├── Home/                # Home screen
│   │   │   ├── Profile/             # Profile screens
│   │   │   └── Settings/            # Settings screens
│   │   ├── navigation/              # Navigation configuration
│   │   ├── store/                   # Redux store setup
│   │   │   ├── slices/              # Redux slices
│   │   │   └── middleware/          # Custom middleware
│   │   ├── services/                # API services
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── utils/                   # Utility functions
│   │   ├── constants/               # Constants and configs
│   │   ├── types/                   # TypeScript type definitions
│   │   ├── assets/                  # Images, fonts, etc.
│   │   └── theme/                   # Theme configuration
│   ├── __tests__/                   # Test files
│   ├── .env.example                 # Environment variables template
│   ├── app.json                     # React Native config
│   ├── package.json
│   ├── tsconfig.json
│   └── babel.config.js
│
├── backend/                         # Node.js backend
│   ├── src/
│   │   ├── controllers/             # Route controllers
│   │   ├── services/                # Business logic
│   │   ├── models/                  # Data models
│   │   ├── routes/                  # API routes
│   │   ├── middleware/              # Express middleware
│   │   ├── utils/                   # Utility functions
│   │   ├── validators/              # Request validators
│   │   ├── config/                  # Configuration files
│   │   └── types/                   # TypeScript types
│   ├── prisma/
│   │   ├── schema.prisma            # Database schema
│   │   ├── migrations/              # Database migrations
│   │   └── seed.ts                  # Database seeding
│   ├── tests/                       # Test files
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                            # Documentation
│   ├── API.md                       # API documentation
│   ├── ARCHITECTURE.md              # Architecture overview
│   ├── DEPLOYMENT.md                # Deployment guide
│   └── MAINTENANCE.md               # Maintenance guidelines
│
├── .github/
│   └── workflows/                   # CI/CD workflows
│       ├── mobile-ci.yml
│       └── backend-ci.yml
│
└── README.md
```

### 1.3 Dependencies

#### Mobile App (package.json)
```json
{
  "dependencies": {
    "react": "18.2.0",
    "react-native": "0.73.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@reduxjs/toolkit": "^2.0.1",
    "react-redux": "^9.0.4",
    "react-native-paper": "^5.11.3",
    "react-hook-form": "^7.49.2",
    "axios": "^1.6.2",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "react-native-vector-icons": "^10.0.3",
    "react-native-safe-area-context": "^4.8.2",
    "react-native-screens": "^3.29.0",
    "date-fns": "^3.0.6",
    "@react-native-firebase/app": "^19.0.0",
    "@react-native-firebase/messaging": "^19.0.0",
    "@react-native-firebase/analytics": "^19.0.0",
    "@sentry/react-native": "^5.15.0"
  },
  "devDependencies": {
    "@babel/core": "^7.23.6",
    "@babel/preset-env": "^7.23.6",
    "@babel/runtime": "^7.23.6",
    "@react-native/babel-preset": "^0.73.0",
    "@react-native/eslint-config": "^0.73.0",
    "@react-native/metro-config": "^0.73.0",
    "@react-native/typescript-config": "^0.73.0",
    "@testing-library/react-native": "^12.4.2",
    "@types/react": "^18.2.45",
    "@types/react-test-renderer": "^18.0.7",
    "babel-jest": "^29.7.0",
    "detox": "^20.15.1",
    "eslint": "^8.56.0",
    "jest": "^29.7.0",
    "prettier": "^3.1.1",
    "react-test-renderer": "18.2.0",
    "typescript": "^5.3.3"
  }
}
```

#### Backend (package.json)
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "@prisma/client": "^5.7.1",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5",
    "multer": "^1.4.5-lts.1",
    "aws-sdk": "^2.1520.0",
    "nodemailer": "^6.9.7",
    "dotenv": "^16.3.1",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/cors": "^2.8.17",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.10.6",
    "prisma": "^5.7.1",
    "typescript": "^5.3.3",
    "ts-node": "^10.9.2",
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "@types/jest": "^29.5.11",
    "@types/supertest": "^6.0.2",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1"
  }
}
```

### 1.4 Development Environment Setup

#### Prerequisites
1. **Node.js & npm:** Install Node.js v20.x LTS
2. **React Native CLI:** `npm install -g react-native-cli`
3. **iOS Development (macOS only):**
   - Xcode 15.x or later
   - CocoaPods: `sudo gem install cocoapods`
4. **Android Development:**
   - Android Studio (latest stable)
   - Android SDK (API 33+)
   - Java JDK 17
5. **Database:** PostgreSQL 16.x installed locally or Docker
6. **Git:** Latest version

#### Environment Setup Steps

**1. Clone Repository**
```bash
git clone <repository-url>
cd react-native-mobile-app
```

**2. Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

**3. Mobile App Setup**
```bash
cd mobile
npm install
cp .env.example .env
# Edit .env with backend API URL

# iOS setup
cd ios
pod install
cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android
```

---

## 2. FUNCTIONAL REQUIREMENTS

### 2.1 User Authentication Module

#### User Story 1: User Registration
**As a** new user
**I want to** create an account
**So that** I can access the app features

**Acceptance Criteria:**
- User can register with email and password
- Email must be valid format and unique
- Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number
- User receives email verification link
- Account is created in pending state until verified
- User sees success message after registration

**API Endpoints:**
- `POST /api/auth/register`
  - Request: `{ email: string, password: string, name: string }`
  - Response: `{ message: string, userId: string }`

#### User Story 2: User Login
**As a** registered user
**I want to** log in with my credentials
**So that** I can access my account

**Acceptance Criteria:**
- User can log in with email and password
- Invalid credentials show appropriate error
- Successful login returns JWT access token and refresh token
- Tokens are stored securely on device
- User is redirected to home screen after login
- Failed login attempts are rate-limited (max 5 attempts per 15 minutes)

**API Endpoints:**
- `POST /api/auth/login`
  - Request: `{ email: string, password: string }`
  - Response: `{ accessToken: string, refreshToken: string, user: User }`

#### User Story 3: Password Reset
**As a** user who forgot their password
**I want to** reset my password
**So that** I can regain access to my account

**Acceptance Criteria:**
- User can request password reset via email
- Reset link expires after 1 hour
- User can set new password via reset link
- Old password is invalidated after reset
- User receives confirmation email after reset

**API Endpoints:**
- `POST /api/auth/forgot-password`
  - Request: `{ email: string }`
  - Response: `{ message: string }`
- `POST /api/auth/reset-password`
  - Request: `{ token: string, newPassword: string }`
  - Response: `{ message: string }`

#### User Story 4: Token Refresh
**As a** logged-in user
**I want** my session to remain active
**So that** I don't need to log in frequently

**Acceptance Criteria:**
- Access token expires after 15 minutes
- Refresh token expires after 7 days
- App automatically refreshes access token using refresh token
- User is logged out if refresh token is invalid/expired

**API Endpoints:**
- `POST /api/auth/refresh`
  - Request: `{ refreshToken: string }`
  - Response: `{ accessToken: string, refreshToken: string }`

#### User Story 5: Logout
**As a** logged-in user
**I want to** log out
**So that** my account is secure

**Acceptance Criteria:**
- User can log out from app
- Tokens are removed from device
- Refresh token is invalidated on server
- User is redirected to login screen

**API Endpoints:**
- `POST /api/auth/logout`
  - Request: `{ refreshToken: string }`
  - Response: `{ message: string }`

### 2.2 User Profile Module

#### User Story 6: View Profile
**As a** logged-in user
**I want to** view my profile
**So that** I can see my account information

**Acceptance Criteria:**
- User can view their profile information
- Profile shows: name, email, avatar, created date
- Profile is fetched on app launch

**API Endpoints:**
- `GET /api/users/me`
  - Response: `{ user: User }`

#### User Story 7: Edit Profile
**As a** logged-in user
**I want to** edit my profile
**So that** I can keep my information up to date

**Acceptance Criteria:**
- User can update name and avatar
- Changes are saved to server
- Profile is updated immediately in app
- User sees success/error feedback

**API Endpoints:**
- `PATCH /api/users/me`
  - Request: `{ name?: string, avatar?: string }`
  - Response: `{ user: User }`

#### User Story 8: Upload Profile Picture
**As a** logged-in user
**I want to** upload a profile picture
**So that** I can personalize my account

**Acceptance Criteria:**
- User can select image from camera or gallery
- Image is uploaded to cloud storage
- Image URL is saved to user profile
- Max file size: 5MB
- Supported formats: JPG, PNG

**API Endpoints:**
- `POST /api/users/avatar`
  - Request: `multipart/form-data with image file`
  - Response: `{ avatarUrl: string }`

#### User Story 9: Change Password
**As a** logged-in user
**I want to** change my password
**So that** I can maintain account security

**Acceptance Criteria:**
- User must provide current password
- New password must meet strength requirements
- User is logged out from all devices after change
- User receives email confirmation

**API Endpoints:**
- `POST /api/users/change-password`
  - Request: `{ currentPassword: string, newPassword: string }`
  - Response: `{ message: string }`

#### User Story 10: Delete Account
**As a** logged-in user
**I want to** delete my account
**So that** my data is removed from the system

**Acceptance Criteria:**
- User must confirm deletion
- User must provide password for confirmation
- All user data is deleted or anonymized
- User is logged out immediately
- Account cannot be recovered after deletion

**API Endpoints:**
- `DELETE /api/users/me`
  - Request: `{ password: string }`
  - Response: `{ message: string }`

### 2.3 Push Notifications Module

#### User Story 11: Receive Push Notifications
**As a** logged-in user
**I want to** receive push notifications
**So that** I stay updated with app activity

**Acceptance Criteria:**
- User is prompted to enable notifications on first launch
- Device token is registered with server
- User receives notifications when app is in background/foreground
- Tapping notification opens relevant screen
- User can view notification history in app

**API Endpoints:**
- `POST /api/notifications/register`
  - Request: `{ deviceToken: string, platform: 'ios' | 'android' }`
  - Response: `{ message: string }`
- `GET /api/notifications`
  - Response: `{ notifications: Notification[] }`

#### User Story 12: Manage Notification Preferences
**As a** logged-in user
**I want to** manage notification settings
**So that** I control what notifications I receive

**Acceptance Criteria:**
- User can toggle notification categories (email, push, SMS)
- User can set quiet hours
- Changes are saved immediately
- Notification preferences are synced across devices

**API Endpoints:**
- `GET /api/notifications/preferences`
  - Response: `{ preferences: NotificationPreferences }`
- `PATCH /api/notifications/preferences`
  - Request: `{ preferences: Partial<NotificationPreferences> }`
  - Response: `{ preferences: NotificationPreferences }`

### 2.4 Settings Module

#### User Story 13: App Settings
**As a** logged-in user
**I want to** configure app settings
**So that** I can customize my experience

**Acceptance Criteria:**
- User can toggle dark mode
- User can change language (if multi-language support)
- User can clear cache
- Settings are persisted locally
- Settings sync to server (optional)

**API Endpoints:**
- `GET /api/settings`
  - Response: `{ settings: UserSettings }`
- `PATCH /api/settings`
  - Request: `{ settings: Partial<UserSettings> }`
  - Response: `{ settings: UserSettings }`

### 2.5 Database Schema

#### Users Table
```prisma
model User {
  id                String   @id @default(uuid())
  email             String   @unique
  passwordHash      String
  name              String
  avatarUrl         String?
  emailVerified     Boolean  @default(false)
  emailVerifyToken  String?
  resetPasswordToken String?
  resetPasswordExpires DateTime?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  refreshTokens     RefreshToken[]
  notifications     Notification[]
  deviceTokens      DeviceToken[]
  settings          UserSettings?
}
```

#### RefreshToken Table
```prisma
model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  expiresAt DateTime
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

#### Notification Table
```prisma
model Notification {
  id        String   @id @default(uuid())
  userId    String
  title     String
  body      String
  data      Json?
  read      Boolean  @default(false)
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([createdAt])
}
```

#### DeviceToken Table
```prisma
model DeviceToken {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  platform  String   // 'ios' | 'android'
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
```

#### UserSettings Table
```prisma
model UserSettings {
  id                    String   @id @default(uuid())
  userId                String   @unique
  darkMode              Boolean  @default(false)
  language              String   @default("en")
  emailNotifications    Boolean  @default(true)
  pushNotifications     Boolean  @default(true)
  smsNotifications      Boolean  @default(false)
  quietHoursStart       String?  // "22:00"
  quietHoursEnd         String?  // "08:00"
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  user                  User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

---

## 3. IMPLEMENTATION GUIDE

### 3.1 Step-by-Step Implementation Order

#### Phase 1: Project Setup (Days 1-2)
1. Initialize Git repository
2. Create React Native project with TypeScript
3. Set up backend Express.js project with TypeScript
4. Configure ESLint, Prettier, and Git hooks
5. Set up project structure and folders
6. Initialize Prisma and create database schema
7. Configure environment variables
8. Set up CI/CD pipelines

#### Phase 2: Backend Core (Days 3-5)
1. Implement database models with Prisma
2. Create authentication middleware
3. Implement JWT token generation/validation
4. Build authentication endpoints (register, login, refresh, logout)
5. Implement password hashing and validation
6. Set up email service for verification/reset
7. Create error handling middleware
8. Implement request validation with Zod
9. Set up logging with Winston
10. Add rate limiting

#### Phase 3: Backend User Management (Days 6-7)
1. Implement user profile endpoints
2. Set up file upload with Multer
3. Integrate AWS S3 for avatar storage
4. Create password change endpoint
5. Implement account deletion endpoint
6. Build settings management endpoints
7. Write API documentation with Swagger

#### Phase 4: Mobile App Core (Days 8-10)
1. Set up React Navigation
2. Configure Redux Toolkit store
3. Create authentication slices
4. Implement API service layer with Axios
5. Create token management system
6. Build authentication screens (Login, Register, Forgot Password)
7. Implement form validation with React Hook Form
8. Create common UI components (Button, Input, Card, etc.)
9. Set up theme configuration

#### Phase 5: Mobile App Features (Days 11-13)
1. Build home screen
2. Implement profile screen with edit functionality
3. Create settings screen
4. Build notification list screen
5. Implement image picker for avatar upload
6. Create loading states and error handling
7. Implement offline support with AsyncStorage
8. Add pull-to-refresh functionality

#### Phase 6: Push Notifications (Days 14-15)
1. Set up Firebase project
2. Configure FCM for iOS and Android
3. Implement device token registration
4. Build notification backend service
5. Create notification handlers in mobile app
6. Implement deep linking for notifications
7. Add notification preferences UI

#### Phase 7: Testing (Days 16-18)
1. Write unit tests for backend services
2. Write integration tests for API endpoints
3. Write unit tests for Redux slices
4. Write component tests for React Native
5. Set up Detox for E2E testing
6. Write E2E test scenarios
7. Perform manual testing on physical devices
8. Fix bugs and optimize performance

#### Phase 8: UI/UX Polish (Days 19-20)
1. Implement animations and transitions
2. Add loading skeletons
3. Optimize images and assets
4. Implement accessibility features
5. Test on various screen sizes
6. Add haptic feedback (iOS)
7. Implement dark mode (if required)
8. Conduct usability testing

#### Phase 9: App Store Preparation (Days 21-23)
1. Create app icons for iOS and Android
2. Design launch screens
3. Take screenshots for app stores
4. Write app store descriptions
5. Configure app signing for iOS
6. Configure app signing for Android
7. Build release versions
8. Test release builds thoroughly
9. Submit to TestFlight (iOS)
10. Submit to Google Play Internal Testing (Android)

#### Phase 10: Documentation & Handoff (Days 24-25)
1. Write API documentation
2. Create architecture overview
3. Write deployment guide
4. Create maintenance guidelines
5. Document environment setup
6. Create troubleshooting guide
7. Prepare handoff materials
8. Conduct knowledge transfer session

### 3.2 Code Structure and Architecture

#### Mobile App Architecture

**State Management Pattern:**
```typescript
// store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/auth.service';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
```

**API Service Pattern:**
```typescript
// services/api.service.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await axios.post(`${process.env.API_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        await AsyncStorage.clear();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

**Screen Component Pattern:**
```typescript
// screens/Auth/LoginScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, TextInput, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/slices/authSlice';
import { RootState } from '../../store';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginScreen: React.FC = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    await dispatch(login(data));
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome Back
      </Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: 'Password is required' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {error && <Text style={styles.error}>{error.message}</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Login
      </Button>

      <Button
        mode="text"
        onPress={() => navigation.navigate('Register')}
      >
        Don't have an account? Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    marginTop: 20,
    marginBottom: 10,
  },
});
```

#### Backend Architecture

**Controller Pattern:**
```typescript
// controllers/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validators/auth.validator';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await authService.register(validatedData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await authService.login(validatedData);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshToken(refreshToken);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }
}
```

**Service Pattern:**
```typescript
// services/auth.service.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { AppError } from '../utils/errors';
import { emailService } from './email.service';

export class AuthService {
  async register(data: { email: string; password: string; name: string }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError('Email already exists', 400);
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const emailVerifyToken = this.generateVerificationToken();

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        emailVerifyToken,
      },
    });

    await emailService.sendVerificationEmail(user.email, emailVerifyToken);

    return {
      message: 'Registration successful. Please check your email to verify your account.',
      userId: user.id,
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    if (!user.emailVerified) {
      throw new AppError('Please verify your email before logging in', 401);
    }

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = await this.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    const tokenRecord = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new AppError('Invalid refresh token', 401);
    }

    // Delete old refresh token
    await prisma.refreshToken.delete({
      where: { id: tokenRecord.id },
    });

    // Generate new tokens
    const accessToken = this.generateAccessToken(tokenRecord.userId);
    const newRefreshToken = await this.generateRefreshToken(tokenRecord.userId);

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(refreshToken: string) {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }

  private generateAccessToken(userId: string): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });
  }

  private async generateRefreshToken(userId: string): Promise<string> {
    const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: '7d',
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
      data: {
        token,
        userId,
        expiresAt,
      },
    });

    return token;
  }

  private generateVerificationToken(): string {
    return jwt.sign({ random: Math.random() }, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });
  }
}

export const authService = new AuthService();
```

**Middleware Pattern:**
```typescript
// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors';
import { prisma } from '../config/database';

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true },
    });

    if (!user) {
      throw new AppError('User not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Invalid token', 401));
    } else {
      next(error);
    }
  }
};
```

### 3.3 File Organization

#### Mobile App Key Files

**1. Navigation Setup (navigation/index.tsx)**
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';

const Stack = createStackNavigator();

export const RootNavigator: React.FC = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      {accessToken ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
```

**2. Redux Store Setup (store/index.ts)**
```typescript
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import notificationsReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**3. Theme Configuration (theme/index.ts)**
```typescript
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    secondary: '#03dac6',
    background: '#ffffff',
    surface: '#ffffff',
    error: '#b00020',
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',
    secondary: '#03dac6',
    background: '#121212',
    surface: '#121212',
    error: '#cf6679',
  },
};
```

#### Backend Key Files

**1. Server Entry Point (src/index.ts)**
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { errorHandler } from './middleware/error.middleware';
import { logger } from './utils/logger';
import routes from './routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

const PORT = config.port || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
```

**2. Route Setup (src/routes/index.ts)**
```typescript
import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import notificationRoutes from './notification.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/notifications', notificationRoutes);

export default router;
```

**3. Database Configuration (src/config/database.ts)**
```typescript
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export const prisma = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'error' },
    { emit: 'event', level: 'warn' },
  ],
});

prisma.$on('query', (e) => {
  logger.debug(`Query: ${e.query}`);
});

prisma.$on('error', (e) => {
  logger.error(`Database error: ${e.message}`);
});

prisma.$on('warn', (e) => {
  logger.warn(`Database warning: ${e.message}`);
});
```

### 3.4 Module Breakdown

#### Module 1: Authentication
- **Files:**
  - Backend: `auth.controller.ts`, `auth.service.ts`, `auth.routes.ts`, `auth.validator.ts`
  - Mobile: `authSlice.ts`, `auth.service.ts`, `LoginScreen.tsx`, `RegisterScreen.tsx`, `ForgotPasswordScreen.tsx`
- **Dependencies:** JWT, bcrypt, Zod
- **Complexity:** Medium
- **Estimated Time:** 3 days

#### Module 2: User Profile
- **Files:**
  - Backend: `user.controller.ts`, `user.service.ts`, `user.routes.ts`, `upload.middleware.ts`
  - Mobile: `userSlice.ts`, `user.service.ts`, `ProfileScreen.tsx`, `EditProfileScreen.tsx`
- **Dependencies:** Multer, AWS SDK
- **Complexity:** Medium
- **Estimated Time:** 2 days

#### Module 3: Push Notifications
- **Files:**
  - Backend: `notification.controller.ts`, `notification.service.ts`, `notification.routes.ts`, `fcm.service.ts`
  - Mobile: `notificationsSlice.ts`, `notification.service.ts`, `NotificationsScreen.tsx`, `notificationHandler.ts`
- **Dependencies:** Firebase Admin SDK, @react-native-firebase
- **Complexity:** High
- **Estimated Time:** 2 days

#### Module 4: Settings
- **Files:**
  - Backend: `settings.controller.ts`, `settings.service.ts`, `settings.routes.ts`
  - Mobile: `settingsSlice.ts`, `SettingsScreen.tsx`
- **Dependencies:** AsyncStorage
- **Complexity:** Low
- **Estimated Time:** 1 day

---

## 4. TESTING REQUIREMENTS

### 4.1 Unit Testing

#### Backend Unit Tests

**Test: Authentication Service**
```typescript
// tests/unit/auth.service.test.ts
import { authService } from '../../src/services/auth.service';
import { prisma } from '../../src/config/database';
import bcrypt from 'bcrypt';

jest.mock('../../src/config/database');
jest.mock('bcrypt');

describe('AuthService', () => {
  describe('register', () => {
    it('should successfully register a new user', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashed_password',
        emailVerifyToken: 'token',
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      (prisma.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.register({
        email: 'test@example.com',
        password: 'Password123',
        name: 'Test User',
      });

      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('userId', '1');
    });

    it('should throw error if email already exists', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: '1' });

      await expect(
        authService.register({
          email: 'test@example.com',
          password: 'Password123',
          name: 'Test User',
        })
      ).rejects.toThrow('Email already exists');
    });
  });

  describe('login', () => {
    it('should successfully log in with valid credentials', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        passwordHash: 'hashed_password',
        emailVerified: true,
        avatarUrl: null,
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'Password123',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result).toHaveProperty('user');
    });

    it('should throw error for invalid credentials', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'Password123',
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });
});
```

**Required Backend Unit Tests:**
1. Authentication Service (register, login, refresh, logout)
2. User Service (getProfile, updateProfile, changePassword, deleteAccount)
3. Notification Service (sendNotification, registerDevice, getNotifications)
4. Settings Service (getSettings, updateSettings)
5. JWT Token generation and validation
6. Password validation
7. Email service

**Coverage Target:** 80% minimum

#### Mobile Unit Tests

**Test: Redux Slice**
```typescript
// __tests__/store/authSlice.test.ts
import authReducer, { login, logout } from '../../src/store/slices/authSlice';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('authSlice', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,
    });
  });

  it('should handle logout', () => {
    const previousState = {
      user: { id: '1', email: 'test@example.com', name: 'Test' },
      accessToken: 'token',
      refreshToken: 'refresh',
      loading: false,
      error: null,
    };

    expect(authReducer(previousState, logout())).toEqual({
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null,
    });
  });

  it('should handle login.pending', () => {
    const action = { type: login.pending.type };
    const state = authReducer(undefined, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle login.fulfilled', () => {
    const payload = {
      user: { id: '1', email: 'test@example.com', name: 'Test' },
      accessToken: 'token',
      refreshToken: 'refresh',
    };
    const action = { type: login.fulfilled.type, payload };
    const state = authReducer(undefined, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(payload.user);
    expect(state.accessToken).toBe('token');
  });
});
```

**Test: Component**
```typescript
// __tests__/screens/LoginScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { LoginScreen } from '../../src/screens/Auth/LoginScreen';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('LoginScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: null,
        loading: false,
        error: null,
      },
    });
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );

    expect(getByText('Welcome Back')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('shows validation errors for invalid inputs', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );

    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });

  it('submits form with valid inputs', async () => {
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0].type).toBe('auth/login/pending');
    });
  });
});
```

**Required Mobile Unit Tests:**
1. Redux slices (auth, user, notifications, settings)
2. API services (auth, user, notifications)
3. Custom hooks
4. Utility functions
5. Screen components (Login, Register, Profile, etc.)
6. Common components (Button, Input, Card, etc.)
7. Form validation logic

**Coverage Target:** 70% minimum

### 4.2 Integration Testing

#### Backend Integration Tests

**Test: Authentication Flow**
```typescript
// tests/integration/auth.test.ts
import request from 'supertest';
import app from '../../src/index';
import { prisma } from '../../src/config/database';

describe('Authentication Integration Tests', () => {
  beforeAll(async () => {
    // Clean database
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'Password123',
          name: 'New User',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('userId');
    });

    it('should not register with duplicate email', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'Password123',
          name: 'User 1',
        });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'Password123',
          name: 'User 2',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email already exists');
    });

    it('should validate password strength', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'weak@example.com',
          password: 'weak',
          name: 'Weak User',
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    beforeAll(async () => {
      // Create verified user
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'login@example.com',
          password: 'Password123',
          name: 'Login User',
        });

      // Manually verify email for testing
      await prisma.user.update({
        where: { email: 'login@example.com' },
        data: { emailVerified: true },
      });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'Password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
      expect(response.body).toHaveProperty('user');
    });

    it('should not login with invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'WrongPassword',
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid credentials');
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshToken: string;

    beforeAll(async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'Password123',
        });

      refreshToken = response.body.refreshToken;
    });

    it('should refresh tokens with valid refresh token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body).toHaveProperty('refreshToken');
    });

    it('should not refresh with invalid token', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: 'invalid_token' });

      expect(response.status).toBe(401);
    });
  });
});
```

**Required Backend Integration Tests:**
1. Complete authentication flow (register → verify → login → refresh → logout)
2. User profile CRUD operations
3. File upload flow
4. Password reset flow
5. Notification creation and retrieval
6. Settings management
7. Authorization checks (accessing protected routes)
8. Rate limiting behavior
9. Error handling scenarios

#### Mobile Integration Tests

**Test: Authentication Flow**
```typescript
// e2e/auth.test.ts
import { device, element, by, expect as detoxExpect } from 'detox';

describe('Authentication Flow', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show login screen', async () => {
    await detoxExpect(element(by.text('Welcome Back'))).toBeVisible();
  });

  it('should register new user and login', async () => {
    // Navigate to register
    await element(by.text("Don't have an account? Register")).tap();

    // Fill registration form
    await element(by.id('name-input')).typeText('Test User');
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('Password123');
    await element(by.id('confirm-password-input')).typeText('Password123');

    // Submit registration
    await element(by.text('Register')).tap();

    // Wait for success message
    await waitFor(element(by.text('Registration successful')))
      .toBeVisible()
      .withTimeout(5000);

    // For testing, manually verify email in database
    // In production, user would click email link

    // Go back to login
    await element(by.text('Back to Login')).tap();

    // Login with new account
    await element(by.id('email-input')).typeText('test@example.com');
    await element(by.id('password-input')).typeText('Password123');
    await element(by.text('Login')).tap();

    // Should navigate to home screen
    await waitFor(element(by.text('Home')))
      .toBeVisible()
      .withTimeout(5000);
  });

  it('should show error for invalid credentials', async () => {
    await element(by.id('email-input')).typeText('wrong@example.com');
    await element(by.id('password-input')).typeText('WrongPassword');
    await element(by.text('Login')).tap();

    await detoxExpect(element(by.text('Invalid credentials'))).toBeVisible();
  });
});
```

**Required Mobile Integration Tests:**
1. Complete authentication flow
2. Profile update flow
3. Image upload flow
4. Push notification handling
5. Navigation between screens
6. Data persistence (AsyncStorage)
7. Network error handling
8. Token refresh flow

### 4.3 E2E Test Cases

#### Test Case 1: Complete User Journey
```
Scenario: New user registers, sets up profile, and receives notification

Given the app is launched
When user taps "Register"
And fills in registration form with valid data
And submits the form
Then user sees success message
And user receives verification email

When user clicks verification link
Then account is verified

When user logs in with credentials
Then user is redirected to home screen
And user sees welcome message

When user navigates to profile
And taps "Edit Profile"
And changes name and uploads avatar
And saves changes
Then profile is updated successfully

When admin sends push notification
Then user receives notification
And tapping notification opens correct screen
```

#### Test Case 2: Password Reset Flow
```
Scenario: User resets forgotten password

Given user is on login screen
When user taps "Forgot Password"
And enters email address
And taps "Send Reset Link"
Then user sees confirmation message
And user receives reset email

When user clicks reset link in email
And enters new password
And confirms new password
And submits form
Then password is reset successfully

When user logs in with new password
Then login is successful
And user is redirected to home screen
```

#### Test Case 3: Offline Functionality
```
Scenario: App handles offline state gracefully

Given user is logged in
And has internet connection
When user views profile
Then profile data is loaded from server

When internet connection is lost
And user navigates to another screen
Then cached data is displayed
And user sees offline indicator

When user tries to update profile
Then user sees "No internet connection" message
And changes are queued locally

When internet connection is restored
Then queued changes are synced to server
And user sees success message
```

#### Test Case 4: Error Recovery
```
Scenario: App handles server errors gracefully

Given user is logged in
When server returns 500 error
Then user sees friendly error message
And option to retry is provided

When user taps retry
And request succeeds
Then normal flow continues

When user logs out during poor connection
Then logout completes locally
And syncs with server when connection improves
```

**Test Execution Schedule:**
- Unit tests: Run on every commit
- Integration tests: Run on PR creation
- E2E tests: Run before release

---

## 5. BUILD & DEPLOYMENT

### 5.1 Environment Variables

#### Backend (.env)
```bash
# Server
NODE_ENV=development
PORT=3000
API_VERSION=v1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@yourapp.com

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Sentry
SENTRY_DSN=your-sentry-dsn

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:3000,https://yourapp.com
```

#### Mobile (.env)
```bash
# API
API_BASE_URL=http://localhost:3000/api
API_TIMEOUT=10000

# Environment
ENVIRONMENT=development

# Firebase
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-app.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=your-app-id
FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry
SENTRY_DSN=your-sentry-dsn

# Analytics
MIXPANEL_TOKEN=your-mixpanel-token

# Feature Flags
ENABLE_DARK_MODE=true
ENABLE_ANALYTICS=true
```

### 5.2 Build Scripts

#### Backend (package.json scripts)
```json
{
  "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:migrate:prod": "prisma migrate deploy",
    "prisma:seed": "ts-node prisma/seed.ts",
    "prisma:studio": "prisma studio"
  }
}
```

#### Mobile (package.json scripts)
```json
{
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "start": "react-native start",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "detox test",
    "test:e2e:build:ios": "detox build --configuration ios.sim.debug",
    "test:e2e:build:android": "detox build --configuration android.emu.debug",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
    "build:android:debug": "cd android && ./gradlew assembleDebug",
    "build:android:release": "cd android && ./gradlew assembleRelease",
    "build:ios:debug": "xcodebuild -workspace ios/YourApp.xcworkspace -scheme YourApp -configuration Debug",
    "build:ios:release": "xcodebuild -workspace ios/YourApp.xcworkspace -scheme YourApp -configuration Release -archivePath ios/build/YourApp.xcarchive archive"
  }
}
```

### 5.3 Deployment Checklist

#### Pre-Deployment
- [ ] All tests passing (unit, integration, E2E)
- [ ] Code review completed
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] API documentation updated
- [ ] Version number incremented
- [ ] Changelog updated
- [ ] Security audit completed
- [ ] Performance testing completed
- [ ] Backup database

#### Backend Deployment
- [ ] Build production bundle: `npm run build`
- [ ] Set NODE_ENV=production
- [ ] Configure production database
- [ ] Run database migrations: `npm run prisma:migrate:prod`
- [ ] Configure SSL/TLS certificates
- [ ] Set up monitoring (Sentry, CloudWatch)
- [ ] Configure auto-scaling (if applicable)
- [ ] Test health endpoint
- [ ] Configure load balancer
- [ ] Set up CDN for static assets

#### Mobile App Deployment

**iOS (App Store)**
- [ ] Update version in Info.plist
- [ ] Update build number
- [ ] Configure code signing
- [ ] Create production build
- [ ] Test on physical devices
- [ ] Prepare app store screenshots (6.5", 5.5")
- [ ] Write app description and keywords
- [ ] Create privacy policy URL
- [ ] Submit to App Store Connect
- [ ] Configure TestFlight for beta testing
- [ ] Submit for review
- [ ] Monitor review status

**Android (Google Play)**
- [ ] Update versionCode in build.gradle
- [ ] Update versionName
- [ ] Configure signing key
- [ ] Generate release APK/AAB: `npm run build:android:release`
- [ ] Test on physical devices
- [ ] Prepare screenshots (phone, 7" tablet, 10" tablet)
- [ ] Write app description and keywords
- [ ] Create privacy policy URL
- [ ] Upload to Google Play Console
- [ ] Configure internal testing track
- [ ] Submit for review
- [ ] Monitor review status

### 5.4 CI/CD Pipeline

#### Backend CI/CD (.github/workflows/backend-ci.yml)
```yaml
name: Backend CI/CD

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'backend/**'
  pull_request:
    branches: [ main, develop ]
    paths:
      - 'backend/**'

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        working-directory: ./backend
        run: npm ci

      - name: Generate Prisma Client
        working-directory: ./backend
        run: npx prisma generate

      - name: Run migrations
        working-directory: ./backend
        run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: Run linter
        working-directory: ./backend
        run: npm run lint

      - name: Run tests
        working-directory: ./backend
        run: npm test -- --coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
          JWT_SECRET: test-secret
          JWT_REFRESH_SECRET: test-refresh-secret

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: ./backend
        run: npm ci

      - name: Build
        working-directory: ./backend
        run: npm run build

      - name: Deploy to production
        # Add your deployment steps here
        run: echo "Deploy to production server"
```

#### Mobile CI/CD (.github/workflows/mobile-ci.yml)
```yaml
name: Mobile CI/CD

on:
  push:
    branches: [ main, develop ]
    paths:
      - 'mobile/**'
  pull_request:
    branches: [ main, develop ]
    paths:
      - 'mobile/**'

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: mobile/package-lock.json

      - name: Install dependencies
        working-directory: ./mobile
        run: npm ci

      - name: Run linter
        working-directory: ./mobile
        run: npm run lint

      - name: Run tests
        working-directory: ./mobile
        run: npm test -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./mobile/coverage/lcov.info

  build-android:
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Install dependencies
        working-directory: ./mobile
        run: npm ci

      - name: Build Android Release
        working-directory: ./mobile/android
        run: ./gradlew assembleRelease

      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-release
          path: mobile/android/app/build/outputs/apk/release/app-release.apk

  build-ios:
    runs-on: macos-latest
    needs: test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: ./mobile
        run: npm ci

      - name: Install CocoaPods
        working-directory: ./mobile/ios
        run: pod install

      - name: Build iOS Release
        working-directory: ./mobile
        run: |
          xcodebuild -workspace ios/YourApp.xcworkspace \
            -scheme YourApp \
            -configuration Release \
            -archivePath ios/build/YourApp.xcarchive \
            archive

      - name: Upload Archive
        uses: actions/upload-artifact@v3
        with:
          name: ios-archive
          path: mobile/ios/build/YourApp.xcarchive
```

### 5.5 Monitoring and Maintenance

#### Monitoring Setup
1. **Backend Monitoring:**
   - Set up Sentry for error tracking
   - Configure CloudWatch for logs and metrics
   - Set up uptime monitoring (UptimeRobot, Pingdom)
   - Configure database performance monitoring
   - Set up API response time tracking

2. **Mobile Monitoring:**
   - Integrate Sentry for crash reporting
   - Set up Firebase Analytics
   - Configure Mixpanel for user analytics
   - Monitor app store ratings and reviews
   - Track API call success rates

#### Maintenance Tasks
1. **Daily:**
   - Monitor error logs
   - Check system health metrics
   - Review user feedback

2. **Weekly:**
   - Review analytics data
   - Check for dependency updates
   - Review app store reviews
   - Performance optimization review

3. **Monthly:**
   - Security audit
   - Database optimization
   - Update dependencies
   - Review and update documentation
   - Backup verification

4. **Quarterly:**
   - Major version updates
   - Architecture review
   - User survey
   - Competitive analysis

---

## APPENDIX

### A. API Endpoint Summary

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-email` - Verify email address

**User Management:**
- `GET /api/users/me` - Get current user profile
- `PATCH /api/users/me` - Update user profile
- `POST /api/users/avatar` - Upload profile picture
- `POST /api/users/change-password` - Change password
- `DELETE /api/users/me` - Delete account

**Notifications:**
- `GET /api/notifications` - Get user notifications
- `POST /api/notifications/register` - Register device token
- `PATCH /api/notifications/:id/read` - Mark notification as read
- `GET /api/notifications/preferences` - Get notification preferences
- `PATCH /api/notifications/preferences` - Update notification preferences

**Settings:**
- `GET /api/settings` - Get user settings
- `PATCH /api/settings` - Update user settings

### B. Glossary

- **MVP:** Minimum Viable Product
- **JWT:** JSON Web Token
- **FCM:** Firebase Cloud Messaging
- **E2E:** End-to-End
- **CI/CD:** Continuous Integration/Continuous Deployment
- **ORM:** Object-Relational Mapping
- **API:** Application Programming Interface
- **UI/UX:** User Interface/User Experience
- **SDK:** Software Development Kit
- **CDN:** Content Delivery Network

### C. Resources

**Documentation:**
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Express.js Docs](https://expressjs.com/)
- [Prisma Docs](https://www.prisma.io/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [React Navigation Docs](https://reactnavigation.org/docs/getting-started)

**Tools:**
- [Postman](https://www.postman.com/) - API testing
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger) - Debugging
- [Flipper](https://fbflipper.com/) - Mobile debugging

**Community:**
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)
- [React Native Community Discord](https://www.reactiflux.com/)
- [GitHub Discussions](https://github.com/facebook/react-native/discussions)

---

**Document Version:** 1.0
**Last Updated:** 2025-11-10
**Author:** Development Team
**Status:** Active
