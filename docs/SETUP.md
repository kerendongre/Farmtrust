# FarmTrust Setup Guide

## Prerequisites

- Flutter SDK v3.10.0 or higher
- Node.js v18 or higher
- PostgreSQL v13 or higher
- Docker & Docker Compose (optional)
- Firebase Project setup

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/farmtrust_db
JWT_SECRET=your_jwt_secret_key
FIREBASE_PROJECT_ID=your_firebase_project
FIREBASE_PRIVATE_KEY=your_firebase_key
FIREBASE_CLIENT_EMAIL=your_firebase_email
```

### 3. Database Setup

**Option A: Docker**
```bash
docker-compose up -d postgres
npm run migrate
```

**Option B: Manual PostgreSQL**
```bash
psql -U postgres -c "CREATE DATABASE farmtrust_db;"
psql -U postgres -d farmtrust_db -f database/schema.sql
```

### 4. Start Backend Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Frontend Setup

### 1. Install Flutter Dependencies
```bash
cd frontend
flutter pub get
```

### 2. Firebase Configuration

Update Firebase credentials in `lib/config/firebase_config.dart`:

```dart
static const FirebaseOptions ios = FirebaseOptions(
  apiKey: 'YOUR_IOS_API_KEY',
  appId: 'YOUR_IOS_APP_ID',
  // ... other options
);

static const FirebaseOptions android = FirebaseOptions(
  apiKey: 'YOUR_ANDROID_API_KEY',
  appId: 'YOUR_ANDROID_APP_ID',
  // ... other options
);
```

### 3. Update API Base URL

In `lib/services/api_service.dart` (to be created):
```dart
static const String baseUrl = 'http://localhost:5000/api';
```

### 4. Run the App

**Android:**
```bash
flutter run
```

**iOS:**
```bash
flutter run -d ios
```

## Docker Setup

### All Services
```bash
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- Backend API on port 5000

### Check Services
```bash
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Stop Services
```bash
docker-compose down
```

## Verification

### Backend Health Check
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test API Endpoint
```bash
curl http://localhost:5000/api/auth/login
```

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists: `createdb farmtrust_db`

### Port Already in Use
- Change PORT in .env
- Or kill existing process: `lsof -i :5000` and `kill -9 <PID>`

### Firebase Connection Error
- Verify Firebase credentials
- Check FIREBASE_PROJECT_ID and keys in .env
- Ensure Firebase project is active

### Flutter Build Error
- Clear build: `flutter clean`
- Reinstall dependencies: `flutter pub get`
- Update Flutter: `flutter upgrade`

## Next Steps

1. Complete Stage 1: ✅ Project Structure
2. Stage 2: Implement Authentication System
3. Stage 3: Implement Farmer Verification
4. Stage 4: Product Management
5. Stage 5: QR Code System
6. Stage 6: Order Management
7. Stage 7: Admin Dashboard
8. Stage 8: Notifications & Messaging
