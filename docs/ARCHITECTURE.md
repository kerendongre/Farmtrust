# FarmTrust Architecture

## Overview
FarmTrust follows a clean architecture pattern with clear separation of concerns across frontend, backend, and database layers.

## Backend Architecture

### Layers
1. **Routes** - Express route definitions
2. **Controllers** - Request handling and response formatting
3. **Services** - Business logic
4. **Models** - Database models and queries
5. **Middlewares** - Authentication, validation, error handling
6. **Utils** - Helper functions and utilities

### Directory Structure
```
backend/src/
├── routes/        # Route definitions
├── controllers/   # Request handlers
├── services/      # Business logic
├── models/        # Database models
├── middlewares/   # Custom middlewares
├── utils/         # Utilities
└── config/        # Configuration
```

## Frontend Architecture

### Layers
1. **Screens** - UI pages for each user role
2. **Widgets** - Reusable UI components
3. **Providers** - State management
4. **Services** - API communication
5. **Models** - Data models
6. **Utils** - Helper functions

### Directory Structure
```
frontend/lib/
├── screens/       # UI screens
├── widgets/       # Reusable widgets
├── providers/     # State management
├── services/      # API & Firebase
├── models/        # Data models
├── config/        # Configuration
└── utils/         # Utilities
```

## Database Architecture

### Design Principles
- Normalized schema with proper relationships
- Role-based access control
- Audit logging for all changes
- Soft deletes for data integrity

## API Design

### Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "errors": []
}
```

### Error Handling
- Centralized error handler
- Consistent error response format
- Proper HTTP status codes

## Authentication Flow

1. User registers/logs in with Firebase
2. Firebase returns ID token
3. Frontend sends token to backend
4. Backend verifies token and creates JWT
5. JWT used for subsequent API calls

## State Management

- **Provider** pattern for Flutter
- Minimal state for better performance
- Clear separation of concerns

## Data Flow

```
UI -> Provider -> API Service -> Backend API -> Database
↓
Provider updates UI
```
