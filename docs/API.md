# FarmTrust API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format
```json
{
  "success": true,
  "data": { },
  "message": "Success message",
  "errors": []
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user
- **Access**: Public
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "secure_password",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer"
  }
  ```

#### POST /auth/login
Login user
- **Access**: Public
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```

#### POST /auth/refresh
Refresh JWT token
- **Access**: Public

#### POST /auth/logout
Logout user
- **Access**: Private
- **Headers**: Bearer token required

### Farmers

#### GET /farmers
Get all verified farmers
- **Access**: Public
- **Query Parameters**:
  - `page` (optional): Page number
  - `limit` (optional): Items per page
  - `search` (optional): Search by farm name

#### GET /farmers/:id
Get farmer details
- **Access**: Public
- **Params**: Farmer ID

#### PUT /farmers/:id
Update farmer profile
- **Access**: Private - Farmer
- **Params**: Farmer ID

#### POST /farmers/:id/documents
Upload farmer documents
- **Access**: Private - Farmer
- **Params**: Farmer ID
- **Body**: FormData with files

### Products

#### GET /products
Get all approved products
- **Access**: Public
- **Query Parameters**:
  - `page`, `limit`, `category`, `search`

#### GET /products/:id
Get product details
- **Access**: Public
- **Params**: Product ID

#### POST /products
Create new product
- **Access**: Private - Farmer
- **Body**:
  ```json
  {
    "name": "Organic Tomatoes",
    "description": "Fresh organic tomatoes",
    "category": "Vegetables",
    "price": 50,
    "unit": "kg"
  }
  ```

#### PUT /products/:id
Update product
- **Access**: Private - Farmer
- **Params**: Product ID

#### DELETE /products/:id
Delete product
- **Access**: Private - Farmer
- **Params**: Product ID

### QR Codes

#### POST /qr-codes/generate
Generate QR code for batch
- **Access**: Private - Admin
- **Body**:
  ```json
  {
    "batchId": "uuid"
  }
  ```

#### GET /qr-codes/verify/:code
Verify QR code
- **Access**: Public
- **Params**: QR code string

#### POST /qr-codes/:id/revoke
Revoke QR code
- **Access**: Private - Admin
- **Params**: QR code ID
- **Body**:
  ```json
  {
    "reason": "Tampered package"
  }
  ```

### Orders

#### GET /orders
Get user orders
- **Access**: Private
- **Query Parameters**: `page`, `limit`, `status`

#### POST /orders
Create new order
- **Access**: Private - Customer
- **Body**:
  ```json
  {
    "farmerId": "uuid",
    "items": [
      {
        "productId": "uuid",
        "quantity": 2
      }
    ],
    "deliveryAddress": "123 Main St",
    "deliveryDate": "2024-01-15"
  }
  ```

#### GET /orders/:id
Get order details
- **Access**: Private
- **Params**: Order ID

#### PUT /orders/:id/status
Update order status
- **Access**: Private - Farmer/Admin
- **Params**: Order ID
- **Body**:
  ```json
  {
    "status": "processing"
  }
  ```

### Admin

#### GET /admin/dashboard
Get dashboard metrics
- **Access**: Private - Admin

#### GET /admin/farmers
Get all farmers (with pending)
- **Access**: Private - Admin
- **Query Parameters**: `page`, `limit`, `status`

#### POST /admin/farmers/:id/approve
Approve farmer
- **Access**: Private - Admin
- **Params**: Farmer ID

#### POST /admin/farmers/:id/reject
Reject farmer
- **Access**: Private - Admin
- **Params**: Farmer ID
- **Body**:
  ```json
  {
    "reason": "Documents not verified"
  }
  ```

#### POST /admin/products/:id/approve
Approve product
- **Access**: Private - Admin
- **Params**: Product ID

### Notifications

#### GET /notifications
Get user notifications
- **Access**: Private
- **Query Parameters**: `page`, `limit`, `unread`

#### PUT /notifications/:id/read
Mark notification as read
- **Access**: Private
- **Params**: Notification ID

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

API rate limits:
- 100 requests per minute for public endpoints
- 200 requests per minute for authenticated endpoints

## CORS

CORS is enabled for configured origins. Update `CORS_ORIGIN` in `.env`.
