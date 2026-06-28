# FarmTrust - Stage 2: Complete Authentication & User Management

## Objective
Implement production-ready authentication, user registration (with role-based variants), and user management for all three user roles (Customer, Farmer, Admin).

## Implementation Requirements

### 1. Firebase Authentication Setup

**Requirements:**
- Email and Password authentication
- Email verification workflow
- Password reset functionality
- Persistent login across app sessions
- Secure session management

**Backend Implementation:**
- Firebase Admin SDK integration
- Firebase token verification
- JWT token generation and validation
- Refresh token mechanism
- Session management

### 2. User Roles & Access Control

**Three Roles:**
1. **Customer** - Browse and purchase organic products
2. **Farmer** - Sell organic products (requires approval)
3. **Admin** - Manage platform (FarmTrust staff only)

**RBAC Implementation:**
- Middleware to validate user roles
- Route protection based on roles
- Prevent unauthorized access
- Consistent error responses for unauthorized requests

### 3. Customer Registration

**Fields:**
- Full Name (first name + last name)
- Mobile Number (10 digits, India format)
- Email Address (verified)
- Password (minimum 8 characters, strength validation)
- Confirm Password
- Address (Street Address)
- State (dropdown from Indian states)
- District (dropdown based on selected state)
- Terms & Conditions acceptance

**Validation:**
- Email format validation
- Password strength requirements (uppercase, lowercase, number, special char)
- Mobile number format (India: 10 digits)
- Required fields validation
- Email uniqueness check
- Phone uniqueness check

**Database Storage:**
- Create user record in `users` table with role='customer'
- Store address information
- Set `is_verified=false` until email is verified
- Trigger email verification

**Email Verification:**
- Send verification email with Firebase link
- User clicks link to verify email
- Set `is_verified=true` after verification
- Can only login after email verification (for Phase 1)

### 4. Farmer Registration

**Fields:**
- Full Name (first name + last name)
- Mobile Number (10 digits)
- Email Address
- Password
- Aadhaar Number (12 digits)
- PAN Number (10 alphanumeric)
- Farm Name
- Farm Address (complete address)
- Farm GPS Location (latitude, longitude - get from device GPS)
- State (dropdown)
- District (dropdown)
- Address Proof Document (upload - Aadhaar front & back)
- PAN Document (upload - image)
- Organic Certificate (upload - PDF or image)
- Farm Photos (multiple - at least 2, maximum 5)
- Terms & Conditions

**Validation:**
- All customer fields plus:
- Aadhaar format (12 digits, validate checksum if possible)
- PAN format (10 character alphanumeric)
- GPS coordinates validation (valid India coordinates)
- Document uploads (file size < 5MB, valid image/PDF formats)
- Farm photos validation

**Document Upload:**
- Use Firebase Storage for file uploads
- Store file paths in database
- Organize by farmer ID in storage buckets
- Generate thumbnails for farm photos

**Database Storage:**
- Create user record with role='farmer'
- Create farmer record in `farmers` table
- Set status='pending' (requires admin approval)
- Store document URLs from Firebase Storage
- Link organic_certificate record
- Store GPS coordinates

**Farmer Approval Workflow:**
- Admin must approve documents before farmer can list products
- Store farmer documents for admin review
- Create admin notifications when new farmer registers
- Farmer receives notification when approved/rejected

### 5. Admin Login

**Access Control:**
- Only pre-approved admin users can login
- Admin users created manually in database with role='admin'
- Secure login flow with Firebase Auth
- IP-based rate limiting

**Admin Features:**
- Pending farmer requests (pending verification)
- List of verified farmers
- Pending certificate verification
- Dashboard overview (stats)
- Approve/Reject farmers
- View farmer documents
- Reset farmer verification status if needed

### 6. Flutter UI Implementation

**Screens to Create:**

1. **Splash Screen**
   - App logo with loading animation
   - Check authentication status
   - Redirect to appropriate screen based on role

2. **Onboarding Screen**
   - Welcome message
   - FarmTrust value proposition
   - Role selection (Customer or Farmer)
   - Call-to-action buttons

3. **Login Screen**
   - Email input field
   - Password input field
   - Remember me checkbox
   - Forgot password link
   - Login button
   - Sign up link
   - Error message display
   - Loading indicator during login
   - Social login placeholder (optional)

4. **Customer Registration Screen**
   - Multi-step form (Name, Contact, Address)
   - Field validation in real-time
   - Password strength indicator
   - Confirm password validation
   - State/District dropdowns (dynamic)
   - Submit button
   - Navigation to login

5. **Farmer Registration Screen**
   - Multi-step form (Personal, Farm Info, Documents, Photos)
   - All customer fields plus farmer-specific fields
   - GPS location picker (integrated map)
   - Document upload with preview
   - Photo gallery uploader
   - Progress indicator for multi-step form
   - Submit button
   - After submission: "Pending Approval" message

6. **Forgot Password Screen**
   - Email input
   - Send reset link button
   - Confirmation message
   - Link to login

7. **Email Verification Screen**
   - Verification code input or link confirmation
   - Resend code button
   - Success message on verification
   - Auto-redirect to login after verification

8. **Profile Setup Screen** (after first login)
   - Display captured information
   - Allow profile photo upload
   - Bio/description (optional)
   - Continue button

**UI Design Requirements:**
- Airbnb-inspired design
- Color scheme: Green (#2D5F3F, #4CAF50), White, Earth tones (#8B7355)
- Rounded corners (12-16px)
- Smooth animations
- Loading skeletons
- Error toast notifications
- Success messages
- Responsive layouts (mobile-first)
- Dark mode support
- Accessibility features (labels, contrast ratios)

### 7. Backend Implementation

**Technology:**
- Node.js + Express
- Firebase Admin SDK
- jsonwebtoken (JWT)
- bcryptjs (password hashing)
- PostgreSQL
- Input validation (express-validator)
- Error handling middleware

**Authentication Endpoints:**

#### POST /api/auth/register/customer
Request:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "SecurePass@123",
  "address": "123 Main Street",
  "state": "Maharashtra",
  "district": "Mumbai"
}
```

Response (201):
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "email": "john@example.com",
    "role": "customer",
    "verificationEmailSent": true
  },
  "message": "Registration successful. Please verify your email."
}
```

#### POST /api/auth/register/farmer
Request:
```json
{
  "firstName": "Raj",
  "lastName": "Kumar",
  "email": "farmer@example.com",
  "phone": "9876543210",
  "password": "SecurePass@123",
  "aadhaarNumber": "123456789012",
  "panNumber": "ABCDE1234F",
  "farmName": "Green Valley Farms",
  "farmAddress": "Village ABC, District XYZ",
  "state": "Maharashtra",
  "district": "Nashik",
  "latitude": 19.997,
  "longitude": 73.7997,
  "certificateUrl": "firebase-storage-url",
  "aadhaarUrl": "firebase-storage-url",
  "panUrl": "firebase-storage-url",
  "farmPhotos": ["url1", "url2", "url3"]
}
```

Response (201):
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "farmerId": "uuid",
    "email": "farmer@example.com",
    "role": "farmer",
    "status": "pending",
    "message": "Registration successful. Awaiting admin approval."
  }
}
```

#### POST /api/auth/login
Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "email": "user@example.com",
    "role": "customer",
    "firstName": "John",
    "lastLogin": "2024-01-01T12:00:00Z",
    "accessToken": "jwt_token_here",
    "refreshToken": "refresh_token_here",
    "expiresIn": 3600
  },
  "message": "Login successful"
}
```

#### POST /api/auth/logout
Request: (with auth token)
Response (200):
```json
{
  "success": true,
  "message": "Logout successful"
}
```

#### POST /api/auth/forgot-password
Request:
```json
{
  "email": "user@example.com"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Password reset link sent to email"
}
```

#### POST /api/auth/reset-password
Request:
```json
{
  "token": "reset_token_from_email",
  "newPassword": "NewSecurePass@123"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

#### GET /api/auth/profile
Authentication: Required
Response (200):
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer",
    "phone": "9876543210",
    "address": "123 Main St",
    "state": "Maharashtra",
    "district": "Mumbai",
    "profilePhotoUrl": "url",
    "isVerified": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### PUT /api/auth/profile
Authentication: Required
Request:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9876543210",
  "address": "456 New Street",
  "state": "Maharashtra",
  "district": "Pune"
}
```

Response (200):
```json
{
  "success": true,
  "data": { ... },
  "message": "Profile updated successfully"
}
```

#### POST /api/auth/refresh-token
Request:
```json
{
  "refreshToken": "refresh_token_here"
}
```

Response (200):
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token",
    "expiresIn": 3600
  }
}
```

#### POST /api/auth/verify-email
Request:
```json
{
  "token": "verification_token_from_email"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### 8. Admin Endpoints

#### GET /api/admin/farmers/pending
Authentication: Admin required
Response (200):
```json
{
  "success": true,
  "data": [
    {
      "farmerId": "uuid",
      "userId": "uuid",
      "firstName": "Raj",
      "lastName": "Kumar",
      "email": "farmer@example.com",
      "farmName": "Green Valley",
      "status": "pending",
      "documents": {
        "aadhaar": "url",
        "pan": "url",
        "certificate": "url",
        "photos": ["url1", "url2"]
      },
      "registeredAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### POST /api/admin/farmers/:farmerId/approve
Authentication: Admin required
Request:
```json
{
  "approvedBy": "admin_user_id",
  "notes": "Documents verified"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Farmer approved successfully",
  "data": { ... }
}
```

#### POST /api/admin/farmers/:farmerId/reject
Authentication: Admin required
Request:
```json
{
  "rejectionReason": "Incomplete documents"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Farmer rejected"
}
```

### 9. Database Schema Updates

**Additional fields to add:**

Users table additions:
- `email_verified` (BOOLEAN, DEFAULT false)
- `email_verified_at` (TIMESTAMP)
- `last_login` (TIMESTAMP)
- `password_hash` (VARCHAR) - Store hashed password
- `refresh_token_hash` (VARCHAR)
- `device_info` (JSONB) - Store device info for security

Farmers table additions:
- `approved_by` (UUID) - Admin who approved
- `approved_at` (TIMESTAMP)
- `rejection_reason` (TEXT)
- `document_verification_notes` (TEXT)

Create new tables:
- `password_resets` - Store password reset tokens
- `email_verification_tokens` - Store email verification tokens
- `audit_logs` - Log all authentication events

### 10. Security Implementation

**Password Security:**
- Hash passwords using bcryptjs (12 salt rounds)
- Never store plain text passwords
- Validate password strength (minimum 8 chars, uppercase, lowercase, number, special char)
- Implement password reset token expiration (1 hour)

**Input Validation:**
- Sanitize all inputs
- Validate email format
- Validate phone format (India)
- Validate Aadhaar format (12 digits)
- Validate PAN format
- SQL injection prevention (use parameterized queries)
- XSS prevention (sanitize output)

**Rate Limiting:**
- 5 login attempts per 15 minutes per IP
- 3 password reset requests per hour per email
- 100 API requests per minute per user

**JWT Security:**
- Use HS256 algorithm
- Access token expiry: 1 hour
- Refresh token expiry: 7 days
- Store refresh tokens in database (with hash)
- Validate token signature on every request
- Include user ID and role in token

**HTTPS/TLS:**
- All API endpoints must use HTTPS
- Secure cookies for session management
- CORS configuration

### 11. Testing

**Backend Tests:**
- Unit tests for authentication functions
- Integration tests for API endpoints
- Test registration validation
- Test login flow
- Test JWT generation and validation
- Test role-based access control
- Test email verification
- Test password reset
- Test rate limiting

**Frontend Tests:**
- Widget tests for UI screens
- Test form validation
- Test navigation between screens
- Test error handling
- Test dark mode support
- Test async operations (API calls)

**Test Coverage:**
- Minimum 80% code coverage for auth module
- Test all error scenarios
- Test edge cases

### 12. Error Handling

**HTTP Status Codes:**
- 200 - Success
- 201 - Created
- 400 - Bad Request (validation error)
- 401 - Unauthorized (invalid credentials)
- 403 - Forbidden (insufficient permissions)
- 404 - Not Found
- 409 - Conflict (email/phone already exists)
- 429 - Too Many Requests (rate limited)
- 500 - Internal Server Error

**Error Response Format:**
```json
{
  "success": false,
  "status": 400,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**Error Messages:**
- User-friendly error messages
- Specific validation errors
- Security: Don't reveal too much info (e.g., "User not found" vs "Invalid credentials")

### 13. Deliverables

**Backend Files:**
- Update `backend/src/app.js` with new middleware
- Update `backend/src/config/database.js` with new tables
- Create `backend/src/controllers/authController.js` - Complete auth logic
- Create `backend/src/controllers/adminController.js` - Admin endpoints
- Create `backend/src/services/authService.js` - Business logic
- Create `backend/src/services/firebaseService.js` - Firebase integration
- Create `backend/src/services/emailService.js` - Email notifications
- Create `backend/src/utils/validators.js` - Input validation
- Create `backend/src/utils/jwt.js` - JWT utilities
- Create `backend/src/utils/passwordUtil.js` - Password hashing
- Update `backend/src/routes/authRoutes.js` - Complete implementation
- Create `backend/src/routes/adminRoutes.js` - Admin routes
- Create `backend/migrations/002_auth_tables.sql` - Auth schema
- Create `backend/.env.example` - Add auth variables
- Create `backend/tests/auth.test.js` - Authentication tests

**Frontend Files:**
- Create `frontend/lib/models/user_model.dart` - User data model
- Create `frontend/lib/models/farmer_model.dart` - Farmer data model
- Create `frontend/lib/providers/auth_provider.dart` - Auth state management
- Create `frontend/lib/providers/user_provider.dart` - User state
- Create `frontend/lib/services/auth_service.dart` - API calls
- Create `frontend/lib/services/firebase_auth_service.dart` - Firebase integration
- Create `frontend/lib/utils/validators.dart` - Form validation
- Create `frontend/lib/utils/state_dropdowns.dart` - State/District data
- Create `frontend/lib/screens/auth/splash_screen.dart`
- Create `frontend/lib/screens/auth/onboarding_screen.dart`
- Create `frontend/lib/screens/auth/login_screen.dart`
- Create `frontend/lib/screens/auth/customer_registration_screen.dart`
- Create `frontend/lib/screens/auth/farmer_registration_screen.dart`
- Create `frontend/lib/screens/auth/forgot_password_screen.dart`
- Create `frontend/lib/screens/auth/email_verification_screen.dart`
- Create `frontend/lib/screens/auth/profile_setup_screen.dart`
- Create `frontend/lib/screens/customer/customer_home_screen.dart`
- Create `frontend/lib/screens/farmer/farmer_home_screen.dart`
- Create `frontend/lib/screens/admin/admin_home_screen.dart`
- Create `frontend/lib/widgets/custom_text_field.dart` - Reusable input
- Create `frontend/lib/widgets/custom_button.dart` - Reusable button
- Create `frontend/lib/widgets/loading_indicator.dart`
- Create `frontend/lib/widgets/error_dialog.dart`
- Create `frontend/lib/widgets/success_dialog.dart`
- Update `frontend/lib/config/routes/app_routes.dart` - All routes
- Update `frontend/lib/main.dart` - Auth provider setup
- Update `frontend/pubspec.yaml` - Any new dependencies
- Create `frontend/test/auth_test.dart` - Auth tests

**Documentation:**
- Update `docs/AUTHENTICATION.md` - Complete auth flow
- Update `docs/API.md` - All endpoints with examples
- Update `docs/SETUP.md` - Firebase setup instructions
- Create `docs/SECURITY.md` - Security practices

## Important Notes

- Do NOT create placeholder code or "TODO" comments
- Implement COMPLETE, working functionality
- All endpoints must be fully functional
- All validations must work
- All error cases must be handled
- Include proper logging
- Include input sanitization
- Include rate limiting
- Include CORS setup
- Firebase must be properly configured
- Database migrations must be created
- All screens must be fully styled
- Dark mode must be implemented
- Accessibility must be considered
- Tests must cover all critical paths

## After Generation

You will provide:
1. List of files created/modified
2. Any errors or warnings
3. Screenshots if anything fails
4. Confirmation that the project builds successfully

Then proceed to Stage 3: Farmer Verification & Product Management
