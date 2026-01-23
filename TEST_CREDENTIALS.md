# Quick Test Reference

## Test Credentials

| Email | Password | Purpose |
|-------|----------|---------|
| guest@gmail.com | guest123 | Guest access (no email verification) |
| user@example.com | password123 | Standard user account |

## Test Scenarios

### ✅ Successful Login
```
Email: guest@gmail.com
Password: guest123
Result: Redirects to /for-you with full access
```

### ✅ Guest Login
```
Click "Continue as Guest" button
Result: Logs in as guest@gmail.com immediately
```

### ❌ Invalid Email Format
```
Email: invalidemail
Password: guest123
Result: Error: "Invalid email"
```

### ❌ Password Too Short
```
Email: guest@gmail.com
Password: short
Result: Error: "Short password"
```

### ❌ User Not Found
```
Email: unknown@example.com
Password: password123
Result: Error: "User not found"
```

### ❌ Wrong Password
```
Email: user@example.com
Password: wrongpassword
Result: Error: "Invalid password"
```

## User Flow

1. **Homepage**: Click "Login" button → Opens LoginModal
2. **LoginModal**: 
   - Click "Continue as Guest" OR
   - Enter credentials and click "Sign In"
3. **After Login**: Redirected to `/for-you` page
4. **Logout**: Click logout button in Searchbar or Navbar
5. **After Logout**: Access to `/for-you` restricted, shows login prompt

## Feature Checklist

- [x] Login Modal with email/password
- [x] Guest login ("Continue as Guest")
- [x] Email validation
- [x] Password validation (min 6 chars)
- [x] User existence checking
- [x] Error message display
- [x] Redirect to /for-you on success
- [x] Logout functionality
- [x] Session persistence (localStorage)
- [x] Access control on /for-you page
- [x] User display in Searchbar
- [x] Login/Logout in Navbar
- [x] Global auth context

## Files Summary

### Core Auth
- `app/context/AuthContext.tsx` - Global auth state & logic
- `app/components/LoginModal.tsx` - Login UI & handler
- `app/layout.tsx` - AuthProvider wrapper

### Components Updated
- `app/components/Navbar.tsx` - Login/Logout button
- `app/components/searchbar.tsx` - Auth display & quick logout

### Pages Updated
- `app/for-you/page.tsx` - Auth protection & access control

### Documentation
- `AUTH_SYSTEM.md` - Full documentation
- `SETUP.md` - Setup guide
- `TEST_CREDENTIALS.md` - This file

## Browser DevTools Tips

### Check Auth State
```javascript
// In browser console
localStorage.getItem('userEmail')
localStorage.getItem('isLoggedIn')
```

### Clear Session
```javascript
localStorage.removeItem('userEmail')
localStorage.removeItem('isLoggedIn')
location.reload()
```

### Check Component State
- Open React DevTools
- Find `AuthProvider` component
- View context value to see isLoggedIn, userEmail, etc.
