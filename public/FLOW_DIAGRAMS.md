# Authentication Flow Diagrams

## User Login Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interactions                       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Click Login    │
                    │    Button       │
                    └────────┬────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │  LoginModal Opens    │
                  └──────────┬───────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
    ┌──────────────────────┐  ┌──────────────────────┐
    │ Continue as Guest    │  │  Enter Credentials   │
    │      Button          │  │  Email & Password    │
    └──────────┬───────────┘  └──────────┬───────────┘
               │                         │
               ▼                         ▼
    ┌──────────────────────┐  ┌──────────────────────┐
    │  loginAsGuest()      │  │   handleLogin()      │
    │ (No validation)      │  │  (With validation)   │
    └──────────┬───────────┘  └──────────┬───────────┘
               │                         │
               │         ┌───────────────┤
               │         │               │
               │         ▼               ▼
               │    ┌─────────┐   ┌────────────┐
               │    │ Validate│   │ Validate   │
               │    │ Email   │   │ Password   │
               │    └────┬────┘   └─────┬──────┘
               │         │              │
               │    ┌────┴──────────────┘
               │    │
               │    ▼
               │  Valid?  ─── NO ──→ Show Error
               │    │                 Message
               │   YES
               │    │
               ▼    ▼
    ┌──────────────────────────┐
    │  AuthContext.login()     │
    │  AuthContext.loginGuest()│
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │  Set isLoggedIn = true   │
    │  Set userEmail           │
    │  Save to localStorage    │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │  Close Modal             │
    │  Redirect to /for-you    │
    └──────────┬───────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │  /for-you Page           │
    │  isLoggedIn = true       │
    │  Show Full Content       │
    └──────────────────────────┘
```

## Logout Flow

```
┌──────────────────────────────────────────────────┐
│     User Clicks Logout Button                    │
│  (Searchbar or Navbar)                           │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ AuthContext.logout() │
        └──────────┬───────────┘
                   │
                   ├─→ setIsLoggedIn = false
                   ├─→ setUserEmail = null
                   └─→ Clear localStorage
                        (userEmail, isLoggedIn)
                   │
                   ▼
        ┌──────────────────────┐
        │ UI Updates:          │
        │ - Hide user email    │
        │ - Show Login button  │
        │ - Update Navbar      │
        └──────────┬───────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ Can now access:      │
        │ - Home page          │
        │ - Library (Coming...) │
        │                      │
        │ Cannot access:       │
        │ - /for-you           │
        │   (See "Access       │
        │    Required")        │
        └──────────────────────┘
```

## Protected Page Access Flow

```
┌──────────────────────────────────┐
│  User tries to access /for-you   │
└──────────┬──────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│  Page checks: isLoggedIn?        │
└──────────┬──────────────────────┘
           │
   ┌───────┴───────┐
   │               │
   ▼               ▼
 YES              NO
   │               │
   │               ▼
   │        ┌─────────────────┐
   │        │ "Access         │
   │        │  Required"      │
   │        │ Message         │
   │        │ + Login Button  │
   │        └─────┬───────────┘
   │              │
   │              └─→ Click Login
   │                  │
   │                  ▼
   │              LoginModal
   │
   ▼
┌──────────────────────────┐
│ /for-you Content:        │
│ - Featured Book (Top)    │
│ - Recommended Books      │
│ - Suggested Books        │
│ - Full App Access        │
└──────────────────────────┘
```

## Data Storage Flow

```
┌──────────────────────────────────────────────┐
│         AuthContext (React State)            │
├──────────────────────────────────────────────┤
│ isLoggedIn: boolean                          │
│ userEmail: string | null                     │
└──────────────┬───────────────────────────────┘
               │
               │ (persist to)
               ▼
┌──────────────────────────────────────────────┐
│      Browser localStorage                    │
├──────────────────────────────────────────────┤
│ Key: "userEmail"    Value: "guest@..."       │
│ Key: "isLoggedIn"   Value: "true" | "false" │
└──────────────┬───────────────────────────────┘
               │
               │ (load on mount)
               ▼
┌──────────────────────────────────────────────┐
│  AuthProvider useEffect()                    │
│  (Restores session on page load)             │
└──────────────────────────────────────────────┘
```

## Error Message Flow

```
┌──────────────────────────────────────┐
│   User Enters Email & Password       │
└──────────┬──────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│   Validation Logic                   │
└──────────┬──────────────────────────┘
           │
      ┌────┴────────────┬──────────────┬────────────┐
      │                 │              │            │
      ▼                 ▼              ▼            ▼
  Email Check    Password Check   User Check   Password Match
      │                 │              │            │
  Valid?            6+ chars?       Exists?     Correct?
      │                 │              │            │
   ✗─┤─→ "Invalid    ✗─┤─→ "Short     ✗─┤─→ "User  ✗─┤─→ "Invalid
     │     email"       │     password"    │    not found" │    password"
     │                  │                  │               │
     ✓                  ✓                  ✓               ✓
     │                  │                  │               │
     └──────────────────┴──────────────────┴───────────────┘
                        │
                        ▼
                  ┌─────────────────┐
                  │  Success!       │
                  │  Login user     │
                  │  Redirect       │
                  └─────────────────┘

Error Display in LoginModal:
┌────────────────────────────────────┐
│  {error && (                       │
│    <div className="error-message"> │
│      {error}                       │
│    </div>                          │
│  )}                                │
└────────────────────────────────────┘
```

## Component Hierarchy

```
RootLayout
│
├── <AuthProvider>
│   │
│   ├── Navbar
│   │   ├── Logo
│   │   └── <LoginModal />
│   │       ├── Email Input
│   │       ├── Password Input
│   │       ├── Continue as Guest Button
│   │       ├── Sign In Button
│   │       └── Error Message Display
│   │
│   ├── Searchbar
│   │   ├── Search Input
│   │   ├── Login Button (if !isLoggedIn)
│   │   ├── Logout Button (if isLoggedIn)
│   │   ├── User Email Display (if isLoggedIn)
│   │   └── <LoginModal />
│   │
│   ├── [Page Components]
│   │   ├── /for-you
│   │   │   ├── Access Check
│   │   │   ├── Protected Content
│   │   │   └── "Access Required" (if !isLoggedIn)
│   │   │
│   │   └── /library
│   │       └── Coming Soon
│   │
│   └── Sidebar
│       ├── Navigation Links
│       └── Settings
│
└── </AuthProvider>
```

## State Machine

```
┌─────────────────────────────────────────┐
│     LOGIN STATE MACHINE                 │
└─────────────────────────────────────────┘

           ┌──────────────┐
           │ Not Logged In│
           │ (initial)    │
           └──────┬───────┘
                  │
        ┌─────────┼─────────┐
        │         │         │
        │    (guest login)  │
        │         │         │
     (login)  (no validation)(with validation)
        │         │         │
        ▼         ▼         ▼
      ┌─────────────────────────────┐
      │   Login Validation Check    │
      │   (email, password)         │
      └─────────┬────────┬──────────┘
                │        │
          PASS │        │ FAIL
                │        │
                │        ▼
                │     ┌─────────────────┐
                │     │ Show Error      │
                │     │ Stay Not Logged │
                │     └────────┬────────┘
                │              │
                │              └──────┐
                │                     │
                ▼                     │
           ┌─────────────────┐        │
           │  Logged In      │        │
           │  (isLoggedIn =  │        │
           │   true)         │        │
           └────────┬────────┘        │
                    │                 │
             (logout)                 │
                    │                 │
                    ▼                 │
           ┌─────────────────┐        │
           │ Not Logged In   │◄───────┘
           │ (start again)   │
           └─────────────────┘
```
