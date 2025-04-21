## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will run on port 5000 by default, or the port specified in the PORT environment variable.

## Testing

```bash
npm test
npm run test:coverage
```

## Dependencies

- Express.js
- CORS

# Backend Authentication System Documentation

## User Management

| Command | Description | Example |
|---------|-------------|---------|
| `GET /api/auth/users` | List all registered users | `curl http://localhost:5000/api/auth/users` |
| `GET /api/auth/check-user/:username` | Check if a specific user exists | `curl http://localhost:5000/api/auth/check-user/testuser` |

## Authentication Endpoints

| Endpoint | Method | Purpose | Example |
|---------|---------|---------|---------|
| `/api/auth/register` | POST | Create new user account | `curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"newuser", "email":"user@example.com", "password":"pass123", "confirmPass":"pass123"}'` |
| `/api/auth/login` | POST | Authenticate user | `curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"username":"testuser", "password":"password123"}'` |
| `/api/auth/password-reset-request` | POST | Request password reset | `curl -X POST http://localhost:5000/api/auth/password-reset-request -H "Content-Type: application/json" -d '{"email":"test@example.com", "confirmEmail":"test@example.com"}'` |
| `/api/auth/password-reset-confirmation` | POST | Complete password reset | `curl -X POST http://localhost:5000/api/auth/password-reset-confirmation -H "Content-Type: application/json" -d '{"token":"TOKEN_VALUE", "newPassword":"newpass123", "confirmNewPassword":"newpass123"}'` |

## Testing Authentication

| Test | Expected Result |
|------|-----------------|
| Login with incorrect password | `{"message":"Invalid password"}` |
| Login with non-existent user | `{"message":"Invalid username"}` |
| Registration with existing username | `{"message":"User already exists"}` |
| Password reset with invalid token | `{"message":"Invalid or expired token"}` |

## Notes
- All endpoints require properly formatted JSON data
- The system uses bcryptjs for secure password hashing
- Token-based password reset is implemented with secure random tokens
- User model requires: username, email, and password