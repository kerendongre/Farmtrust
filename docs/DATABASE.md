# FarmTrust Database Schema

## Tables Overview

### Users
Core user table with role-based access.

**Columns:**
- id (UUID) - Primary key
- role (enum: customer, farmer, admin)
- email (VARCHAR) - Unique email
- phone (VARCHAR) - Optional phone
- firebase_uid (VARCHAR) - Firebase authentication ID
- first_name, last_name (VARCHAR)
- profile_photo_url (TEXT)
- is_verified (BOOLEAN)
- created_at, updated_at (TIMESTAMP)

### Farmers
Farmer-specific information with verification status.

**Columns:**
- id (UUID) - Primary key
- user_id (UUID) - Foreign key to users
- farm_name (VARCHAR)
- farm_description (TEXT)
- farm_latitude, farm_longitude (DECIMAL)
- address, city, state, postal_code (VARCHAR)
- status (enum: pending, approved, rejected, suspended)
- aadhaar_number, pan_number (VARCHAR)
- rating (DECIMAL)
- created_at, updated_at (TIMESTAMP)

### Organic Certificates
Certification documents for farmers.

**Columns:**
- id (UUID) - Primary key
- farmer_id (UUID) - Foreign key
- certificate_number (VARCHAR) - Unique
- issued_by, issue_date, expiry_date
- certificate_url (TEXT)
- verification_status (VARCHAR)
- verified_by, verified_at (TIMESTAMP)

### Products
Product listings.

**Columns:**
- id (UUID) - Primary key
- farmer_id (UUID) - Foreign key
- name, description (VARCHAR/TEXT)
- category (VARCHAR)
- price (DECIMAL)
- currency (VARCHAR)
- unit (VARCHAR)
- quantity_in_stock (INT)
- status (enum: draft, pending_approval, approved, rejected, discontinued)
- is_organic (BOOLEAN)
- organic_cert_id (UUID) - Reference to certification
- image_url (TEXT)

### Product Batches
Batch management for QR code generation.

**Columns:**
- id (UUID) - Primary key
- product_id (UUID) - Foreign key
- batch_number (VARCHAR) - Unique
- harvest_date, packaging_date, expiry_date (DATE)
- quantity_produced, quantity_sold (INT)

### QR Codes
Encrypted QR codes for product verification.

**Columns:**
- id (UUID) - Primary key
- batch_id (UUID) - Foreign key
- qr_code (VARCHAR) - Unique code
- encrypted_data (TEXT) - Encrypted batch info
- encryption_key (VARCHAR)
- status (enum: active, revoked, expired)
- scans_count (INT)
- last_scanned_at (TIMESTAMP)
- revoked_by, revoked_at (TIMESTAMP)

### Orders
Customer orders.

**Columns:**
- id (UUID) - Primary key
- customer_id, farmer_id (UUID) - Foreign keys
- order_number (VARCHAR) - Unique
- status (enum: pending, confirmed, processing, ready, completed, cancelled)
- total_amount (DECIMAL)
- delivery_address (TEXT)
- delivery_date (DATE)

### Order Items
Individual items in an order.

**Columns:**
- id (UUID) - Primary key
- order_id, product_id (UUID) - Foreign keys
- qr_code_id (UUID) - Reference to QR code
- quantity, unit_price, total_price (DECIMAL)

### Notifications
Push notifications and in-app messages.

**Columns:**
- id (UUID) - Primary key
- user_id (UUID) - Foreign key
- title, message (VARCHAR/TEXT)
- notification_type (VARCHAR)
- is_read (BOOLEAN)
- fcm_token (VARCHAR) - Firebase Cloud Messaging token

### Chats & Chat Messages
Farmer-customer communication.

**Columns:**
- id (UUID) - Primary key
- customer_id, farmer_id (UUID) - Foreign keys
- message (TEXT)
- is_read (BOOLEAN)
- created_at (TIMESTAMP)

### Reviews
Product and farmer ratings.

**Columns:**
- id (UUID) - Primary key
- customer_id, farmer_id, product_id (UUID) - Foreign keys
- rating (INT) - 1-5
- review_text (TEXT)
- created_at (TIMESTAMP)

## Relationships

- Users → Farmers (1:1)
- Farmers → Organic Certificates (1:N)
- Farmers → Products (1:N)
- Products → Product Batches (1:N)
- Product Batches → QR Codes (1:N)
- Customers → Orders (1:N)
- Orders → Order Items (1:N)
- Users → Notifications (1:N)
- Users → Chats (1:N)
- Users → Reviews (1:N)

## Indexes

Key indexes for performance:
- users(role)
- farmers(user_id, status)
- products(farmer_id, status, category)
- orders(customer_id, farmer_id, status)
- qr_codes(batch_id, status)
- notifications(user_id, is_read)
- audit_logs(user_id, created_at)
