# Authentication System Documentation

## Overview
The authentication system is built using a Context API pattern with local storage for persistence. It provides login functionality with email/password validation and guest login support.

## Test Credentials

### Guest Account (Recommended for Testing)
- **Email**: `guest@gmail.com`
- **Password**: `guest123`

### Additional Test Accounts
- **Email**: `user@example.com`
- **Password**: `password123`

## Features

### 1. Login Validation
The system validates user input with the following rules:

#### Email Validation
- Must be a valid email format (contains @ and .)
- Example error: "Invalid email"

#### Password Validation
- Minimum 6 characters required
- Example error: "Short password"

#### User Existence
- User must exist in the database
- Example error: "User not found"

### 2. Guest Login
- Allows users to experience the full app as premium users without creating an account
- Uses hardcoded guest credentials: `guest@gmail.com` / `guest123`

### 3. Session Management
- User sessions are persisted in localStorage
- Sessions persist across page refreshes
- Logout clears the session and removes stored data

## Usage

### In Components

```tsx
import { useAuth } from "../context/AuthContext";

export default function MyComponent() {
  const { isLoggedIn, userEmail, login, logout } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <>
          <p>Welcome, {userEmail}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => setShowAuthModal(true)}>Login</button>
      )}
    </div>
  );
}
```

### Auth Context Methods

#### `login(email: string, password: string): Promise<void>`
Attempts to log in a user with email and password validation.

Throws errors:
- "Invalid email" - If email format is invalid
- "Short password" - If password is less than 6 characters
- "User not found" - If email doesn't exist in the database
- "Invalid password" - If password doesn't match

```tsx
try {
  await login("user@example.com", "password123");
  // Redirect to /for-you
} catch (error) {
  console.error(error.message);
}
```

#### `loginAsGuest(): Promise<void>`
Logs in the user as a guest with premium features enabled.

```tsx
await loginAsGuest();
```

#### `logout(): void`
Logs out the current user and clears the session.

```tsx
logout();
```

## Components

### AuthContext (`app/context/AuthContext.tsx`)
Provides global authentication state and methods.

**Provider Usage**:
```tsx
// In layout.tsx
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### LoginModal (`app/components/LoginModal.tsx`)
- Email and password input fields
- Error message display
- Guest login button
- Google login button (placeholder)
- Automatic redirect to /for-you on successful login

### Searchbar (`app/components/searchbar.tsx`)
- Displays login button when not logged in
- Shows user email and logout button when logged in

### Navbar (`app/components/Navbar.tsx`)
- Shows login/logout button
- Displays user status

## Error Handling

The system displays user-friendly error messages:

| Error | Cause | Solution |
|-------|-------|----------|
| "Invalid email" | Incorrect email format | Use format: user@domain.com |
| "Short password" | Password less than 6 characters | Use at least 6 characters |
| "User not found" | Email not registered | Use: guest@gmail.com or user@example.com |
| "Invalid password" | Wrong password | Check password spelling |

## Page Access Control

### For-You Page (`/for-you`)
- Requires login
- Shows "Access Required" message when not logged in
- Displays content when user is logged in

### Library Page (`/library`)
- Accessible without login
- Shows "Coming Soon" message

## Adding New Users

To add new test users, edit `app/context/AuthContext.tsx`:

```tsx
const USERS_DATABASE: Record<string, string> = {
  "guest@gmail.com": "guest123",
  "user@example.com": "password123",
  "newuser@example.com": "newpassword123", // Add new user here
};
```

## Future Enhancements

- [ ] Firebase authentication integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social login (Google, GitHub)
- [ ] Two-factor authentication
- [ ] User profile management
