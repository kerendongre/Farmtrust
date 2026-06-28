# FarmTrust - Stage 1: Project Foundation

## Objective
Create the complete project structure, database schema, authentication setup, navigation architecture, and placeholder screens for FarmTrust MVP.

## Project Description

FarmTrust

Build a production-ready mobile application called FarmTrust.

Vision

FarmTrust is a trusted marketplace that connects verified organic farmers directly with customers. Only farmers approved by the FarmTrust Admin can sell products. Every approved product batch must have a secure, tamper-resistant QR code that customers can scan to verify authenticity.

Tech Stack

- Flutter (Android & iOS)
- Node.js + Express
- PostgreSQL
- Firebase Authentication
- Firebase Cloud Messaging
- Firebase Storage
- Docker for deployment

User Roles

Customer
- Register/Login
- Browse products
- Search and filter
- View farmer profiles
- Place orders (offline payment only)
- Track orders
- Scan QR codes
- Chat with farmers
- Rate and review products

Farmer
- Register/Login
- Upload Aadhaar
- Upload PAN
- Upload Organic Certificate
- Upload farm photos
- Farm GPS location
- Add/Edit/Delete products
- Inventory management
- Order management
- Dashboard

FarmTrust Admin
- Secure admin login
- Approve or reject farmers
- Verify organic certificates
- Approve products
- Generate encrypted QR codes
- Revoke QR codes
- Manage users
- Manage orders
- Analytics dashboard

QR Verification

Each product batch receives a unique encrypted QR code.

Scanning the QR code should display:
- FarmTrust Verified status
- Farmer details
- Farm details
- Product details
- Organic certificate
- Harvest date
- Packaging date
- Batch number
- Verification timestamp

If the QR code is invalid or revoked, show a full-screen warning that the product is not authenticated.

UI

Design a premium interface inspired by Airbnb using white, green, and earth tones with smooth animations and responsive layouts.

## Stage 1 Requirements

### 1. Project Structure
Create a clean, scalable folder structure for:
- Flutter Frontend (lib/ structure with proper separation)
- Node.js/Express Backend (routes, controllers, middleware, models)
- Database migrations and seeds
- Shared utilities and constants
- Configuration files
- Docker setup

### 2. Database Schema
Generate PostgreSQL migration files for:
- users table (with role-based access)
- farmers table (with verification status)
- organic_certificates table
- products table
- product_batches table
- qr_codes table (with encryption fields)
- orders table
- order_items table
- notifications table
- chats table
- reviews table

### 3. Authentication Setup
- Firebase Authentication configuration
- JWT token handling (backend)
- Role-based middleware
- Login/Register screens
- Password reset flow

### 4. Navigation & Routing
- Flutter bottom navigation for each user role
- Named routes for all screens
- Route guards based on authentication and role
- Express backend routing structure

### 5. Placeholder Screens
Generate UI templates for:
- Splash screen
- Login/Register screens
- Home screens (for each role)
- Product listing screens
- Farmer profile screens
- Product detail screens
- QR scanner screen
- Admin dashboard skeleton

### 6. Backend API Structure
- Create base API endpoint structure
- Error handling middleware
- Response formatting
- Environment configuration

## Deliverables

1. Complete folder structure (both frontend and backend)
2. All database migration files
3. Authentication setup (Firebase + JWT)
4. Navigation and routing configuration
5. Placeholder screens with proper styling (Airbnb-inspired design)
6. Express backend routes and controllers skeleton
7. Environment configuration files
8. Docker configuration
9. README with setup instructions

## Important Notes

- Do NOT implement business logic yet (farmer verification, order processing, QR code generation)
- Focus on clean architecture and production-ready structure
- All code must be well-commented and follow best practices
- Generate responsive, dark-mode-compatible UI
- Use proper separation of concerns
- Include error handling framework
- Setup logging infrastructure

---

**After generating, you will:**
1. Tell me exactly what was created
2. Report any errors or incomplete sections
3. Request Stage 2 prompt for implementing authentication system

Then we proceed to Stage 2: Complete Authentication System
