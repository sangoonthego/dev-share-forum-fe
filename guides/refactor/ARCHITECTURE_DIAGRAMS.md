# Architecture Diagrams & Visual References

## Complete System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   UI LAYER (Components)                    │ │
│  │  LoginPage  |  PostFeed  |  Profile  |  Leaderboard  etc. │ │
│  │         (No API calls, no business logic)                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             ↑                                    │
│                      useAuth() hook                              │
│                      usePosts() hook                             │
│                      useUsers() hook                             │
│                             ↓                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              STATE/ORCHESTRATION LAYER (Hooks)            │ │
│  │  useAuth()  |  usePosts()  |  useUsers()                  │ │
│  │  - Manages component state                                │ │
│  │  - Calls services                                         │ │
│  │  - Returns: state + methods                               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             ↓                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              BUSINESS LOGIC LAYER (Services)              │ │
│  │  authService  |  postService  |  userService              │ │
│  │  - Make API calls                                         │ │
│  │  - Apply mappers                                          │ │
│  │  - Throw formatted errors                                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             ↓                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │           DATA TRANSFORMATION LAYER (Mappers)             │ │
│  │  authMapper  |  postMapper  |  userMapper                 │ │
│  │  - Transform BackendPost → Post                           │ │
│  │  - Add computed fields (timeAgo, readTime)                │ │
│  │  - Set default values                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             ↓                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         INFRASTRUCTURE LAYER (API Client)                 │ │
│  │  lib/api-client.ts                                        │ │
│  │  - Axios instance                                         │ │
│  │  - Request interceptor (add JWT)                          │ │
│  │  - Response interceptor (handle 401)                      │ │
│  │  - Error standardization                                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             ↓                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         TYPE LAYER (TypeScript Definitions)               │ │
│  │  types/api.ts     types/auth.ts     types/post.ts         │ │
│  │  - Backend types (BackendPost)                            │ │
│  │  - Frontend types (Post)                                  │ │
│  │  - Strict TypeScript, no any                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                             ↓                                    │
└──────────────────────────────────────────────────────────────────┘
                              │ HTTP
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                      BACKEND (NestJS API)                        │
│                   http://localhost:3001/api/                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Login Flow - Complete Sequence

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  User fills form and clicks "Login"                            │
│                                                                 │
│         ↓                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 1: Component (LoginPage)                          │   │
│  │                                                         │   │
│  │ const { login, isLoading } = useAuth()                │   │
│  │ await login({ email: '...', password: '...' })        │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│         ↓                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 2: Hook (useAuth)                                 │   │
│  │                                                         │   │
│  │ • Set loading = true                                   │   │
│  │ • Call authService.login(credentials)                  │   │
│  │ • Store user in state: setUser(user)                   │   │
│  │ • Store token in localStorage                          │   │
│  │ • Return updated state                                 │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│         ↓                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 3: Service (authService)                          │   │
│  │                                                         │   │
│  │ • Call apiClient.post('/auth/login', credentials)      │   │
│  │ • Get response: { user, token, refreshToken }          │   │
│  │ • Call mapBackendLoginResponse(response)               │   │
│  │ • Save tokens to localStorage                          │   │
│  │ • Return { user, token, refreshToken }                 │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│         ↓                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 4: Mapper (authMapper)                            │   │
│  │                                                         │   │
│  │ mapBackendLoginResponse({ user, token, ... }) {        │   │
│  │   user: mapBackendAuthToAuthUser(response.user)        │   │
│  │   token: response.token                                │   │
│  │ }                                                       │   │
│  │                                                         │   │
│  │ mapBackendAuthToAuthUser({ firstName, lastName, ... }) │   │
│  │ {                                                       │   │
│  │   name: firstName + ' ' + lastName                     │   │
│  │   avatar: avatar || '/placeholder.svg'                 │   │
│  │ }                                                       │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│         ↓                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 5: API Client (apiClient)                         │   │
│  │                                                         │   │
│  │ POST http://localhost:3001/api/auth/login              │   │
│  │                                                         │   │
│  │ Request Headers:                                       │   │
│  │   Content-Type: application/json                       │   │
│  │   Authorization: Bearer <existing_token_if_any>        │   │
│  │                                                         │   │
│  │ Response: {                                            │   │
│  │   success: true,                                       │   │
│  │   data: {                                              │   │
│  │     user: { id, email, firstName, lastName, ... },     │   │
│  │     token: 'jwt_token',                                │   │
│  │     refreshToken: 'refresh_token'                      │   │
│  │   }                                                     │   │
│  │ }                                                       │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│         ↓                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 6: Backend (NestJS)                               │   │
│  │                                                         │   │
│  │ POST /api/auth/login {email, password}                 │   │
│  │ • Find user by email                                   │   │
│  │ • Validate password                                    │   │
│  │ • Generate JWT tokens                                  │   │
│  │ • Return user + tokens                                 │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│         ↓                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ USER LOGGED IN! ✅                                      │   │
│  │                                                         │   │
│  │ • Navigate to /home                                    │   │
│  │ • Token stored in localStorage                         │   │
│  │ • User displayed in UI                                 │   │
│  │ • Future requests include token in header              │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Transformation Example

```
BACKEND                        MAPPER                         FRONTEND
─────────────────────────────────────────────────────────────────────

{                              Transform              {
  id: '123',                   ──────────→           id: '123',
  email: 'user@ex.com',                             email: 'user@ex.com',
  firstName: 'John',                                name: 'John Doe',  ← Computed
  lastName: 'Doe',                                  avatar: '/img.png', ← Default
  avatar: '/img.png',                               role: 'user',
  role: 'user',                                     isVerified: true
  isVerified: true,
  createdAt: '2024-01-20...'
}

DownloadedAt: 2024-01-23    Mapper Function         Ready for Component
Raw API format              mapBackendAuthToAuthUser  UI-friendly format
BackendAuthResponse         AuthUser
```

---

## Service Method Pattern

```
┌────────────────────────────────────────────────────┐
│            Service Method Structure                │
├────────────────────────────────────────────────────┤
│                                                    │
│  async methodName(params: ParamType): ReturnType  │
│    try {                                          │
│      ┌──────────────────────────────────────────┐ │
│      │ 1. Make API Call                         │ │
│      │ const response = await apiClient.post()  │ │
│      └──────────────────────────────────────────┘ │
│             ↓                                      │
│      ┌──────────────────────────────────────────┐ │
│      │ 2. Apply Mapper                          │ │
│      │ const mapped = mapBackendTo...()         │ │
│      └──────────────────────────────────────────┘ │
│             ↓                                      │
│      ┌──────────────────────────────────────────┐ │
│      │ 3. Side Effects (if needed)              │ │
│      │ localStorage.setItem('token', token)     │ │
│      └──────────────────────────────────────────┘ │
│             ↓                                      │
│      ┌──────────────────────────────────────────┐ │
│      │ 4. Return Typed Result                   │ │
│      │ return mappedData                        │ │
│      └──────────────────────────────────────────┘ │
│    } catch (error) {                              │
│      throw new Error(formatErrorMessage)          │
│    }                                              │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## Hook State Management Pattern

```
┌─────────────────────────────────────────────────────────┐
│              Hook State Structure                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  const [state, setState] = useState({                  │
│    data: null,         ← The fetched data             │
│    loading: false,     ← Is request in progress?      │
│    error: null,        ← Error message if any         │
│  })                                                     │
│                                                         │
│  useEffect(() => {                                     │
│    initializeFromStorage()  ← Restore from localStorage │
│  }, [])                                                │
│                                                         │
│  const fetchData = useCallback(async (params) => {    │
│    setState(prev => ({ ...prev, loading: true }))     │
│    try {                                              │
│      const result = await service.method(params)      │
│      setState(prev => ({                              │
│        data: result,                                  │
│        loading: false,                                │
│        error: null                                    │
│      }))                                              │
│    } catch (err) {                                    │
│      setState(prev => ({                              │
│        ...prev,                                       │
│        loading: false,                                │
│        error: err.message                             │
│      }))                                              │
│    }                                                  │
│  }, [])                                               │
│                                                         │
│  return { data, loading, error, fetchData }           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Error Handling Flow

```
┌──────────────────────────────────┐
│  Try to Fetch Data               │
│  await service.method()          │
└──────────────────────────────────┘
         ↓ (if error)
┌──────────────────────────────────┐
│  API Client Catches Error        │
│  getErrorDetails(error)          │
│  Returns: { code, message }      │
└──────────────────────────────────┘
         ↓
┌──────────────────────────────────┐
│  Service Catches Error           │
│  throw new Error(message)        │
│  User-friendly message           │
└──────────────────────────────────┘
         ↓
┌──────────────────────────────────┐
│  Hook Catches Error              │
│  setState(error: err.message)    │
│  error state updated             │
└──────────────────────────────────┘
         ↓
┌──────────────────────────────────┐
│  Component Uses Error            │
│  {error && <ErrorBanner />}      │
│  Show to user                    │
└──────────────────────────────────┘
```

---

## Type Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│  BACKEND API Response                                   │
│  {                                                      │
│    user: {                                              │
│      id, email, firstName, lastName, avatar, role, ... │
│    },                                                   │
│    token, refreshToken                                 │
│  }                                                      │
│  Type: BackendLoginResponse                            │
└─────────────────────────────────────────────────────────┘
            ↓ (service receives)
┌─────────────────────────────────────────────────────────┐
│  MAPPER transforms types                                │
│  mapBackendLoginResponse()                              │
│  - BackendAuthResponse → AuthUser                       │
│  - firstName + lastName → name                          │
│  - Add defaults for optional fields                     │
└─────────────────────────────────────────────────────────┘
            ↓ (service returns)
┌─────────────────────────────────────────────────────────┐
│  HOOK receives typed data                               │
│  const { user, token } = await authService.login()     │
│  Type: { user: AuthUser, token: string }               │
└─────────────────────────────────────────────────────────┘
            ↓ (hook updates state)
┌─────────────────────────────────────────────────────────┐
│  COMPONENT receives typed props from hook               │
│  const { user } = useAuth()                            │
│  Type: AuthUser | null                                  │
│                                                         │
│  <div>{user.name}</div> ← Autocomplete ✅              │
│  <div>{user.unknown}</div> ← Error! ✅                 │
└─────────────────────────────────────────────────────────┘
```

---

## Request/Response Lifecycle

```
1. COMPONENT initiates action
   └─→ calls hook method

2. HOOK processes action
   └─→ sets loading = true
   └─→ calls service method

3. SERVICE makes request
   └─→ calls apiClient.post()

4. API CLIENT sends request
   └─→ adds JWT token header
   └─→ sends HTTP request
   └─→ handles response/error

5. BACKEND processes request
   └─→ validates input
   └─→ performs business logic
   └─→ returns response

6. SERVICE processes response
   └─→ calls mapper
   └─→ returns mapped data
   └─→ (or throws error)

7. HOOK updates state
   └─→ sets data = result
   └─→ sets loading = false
   └─→ sets error = null

8. COMPONENT re-renders
   └─→ displays new data
   └─→ shows error if any
```

---

## API Interceptor Flow

```
REQUEST INTERCEPTOR
────────────────────
apiClient.post('/auth/login', data)
    ↓
Get JWT from localStorage
localStorage.getItem('auth_token')
    ↓
Inject into headers
headers.Authorization = 'Bearer ' + token
    ↓
Send request with token
POST /api/auth/login
    Header: Authorization: Bearer eyJhbGc...


RESPONSE INTERCEPTOR
────────────────────
Receive response
    ↓
Is status 401 (Unauthorized)?
    ↓ YES
  Clear tokens
  localStorage.removeItem('auth_token')
    ↓
  Redirect to login
  window.location.href = '/auth/login'
    ↓
  Reject promise
    │
    └─→ NO: Return response normally
```

---

## File Dependency Graph

```
components/LoginPage.tsx
        ↓
  hooks/useAuth.ts
        ↓
  services/auth.service.ts
        ↓
  mappers/auth.mapper.ts
        ↓
  lib/api-client.ts
        ↓
  types/auth.ts
        ↓
    TypeScript
    (types/api.ts)

────────────────────────────

components/PostFeed.tsx
        ↓
  hooks/usePosts.ts
        ↓
  services/post.service.ts
        ↓
  mappers/post.mapper.ts
        ↓
  lib/api-client.ts
        ↓
  types/post.ts
        ↓
    TypeScript
    (types/api.ts)
```

---

## State Management Lifecycle

```
┌─────────────────────────────────────────────┐
│  Component Mounts                           │
└─────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────┐
│  Hook: useEffect initializes                │
│  - Read localStorage                        │
│  - Restore user/token if exists             │
│  - Set isAuthenticated = true               │
└─────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────┐
│  Component renders with initial state       │
│  - user: null or restored user              │
│  - token: null or restored token            │
│  - isAuthenticated: boolean                 │
│  - isLoading: false                         │
│  - error: null                              │
└─────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────┐
│  User interacts (e.g., clicks login)        │
│  - Calls hook method: login(credentials)    │
└─────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────┐
│  Hook updates state                         │
│  - isLoading = true                         │
│  - error = null                             │
│  - Component re-renders showing spinner     │
└─────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────┐
│  Service makes API call                     │
│  - Wait for backend response                │
└─────────────────────────────────────────────┘
            ↓
┌─────────────────────────────────────────────┐
│  Success or Error?                          │
│  ├─→ Success:                               │
│  │   ├─ Mapper transforms data              │
│  │   ├─ Save token to localStorage          │
│  │   ├─ Hook sets: user, token, auth=true   │
│  │   ├─ Hook sets: isLoading = false        │
│  │   └─ Component re-renders with new user  │
│  │                                          │
│  └─→ Error:                                 │
│      ├─ Hook sets: error = message          │
│      ├─ Hook sets: isLoading = false        │
│      └─ Component re-renders with error msg │
└─────────────────────────────────────────────┘
```

---

## Summary Diagram

```
       ┌─────────────────────────────────┐
       │    USER INTERFACE LAYER         │
       │  (Components - JSX Only)        │
       └──────────────┬──────────────────┘
                      │ uses
                      ↓
       ┌─────────────────────────────────┐
       │    HOOKS LAYER                  │
       │  (State Management)             │
       │  useAuth, usePosts, etc.        │
       └──────────────┬──────────────────┘
                      │ calls
                      ↓
       ┌─────────────────────────────────┐
       │    SERVICES LAYER               │
       │  (Business Logic)               │
       │  authService, postService, etc. │
       └──────────────┬──────────────────┘
                      │ uses
                      ↓
       ┌─────────────────────────────────┐
       │    MAPPERS LAYER                │
       │  (Data Transformation)          │
       │  BE Response → FE Model         │
       └──────────────┬──────────────────┘
                      │ uses
                      ↓
       ┌─────────────────────────────────┐
       │    API CLIENT LAYER             │
       │  (HTTP Infrastructure)          │
       │  Axios + Interceptors           │
       └──────────────┬──────────────────┘
                      │ sends HTTP
                      ↓
       ┌─────────────────────────────────┐
       │    BACKEND (NestJS API)         │
       │  http://localhost:3001/api/     │
       └─────────────────────────────────┘
```

---

These diagrams provide visual understanding of the SOA architecture.
Use them alongside the documentation for better comprehension.

**Next Step**: Read ARCHITECTURE.md for detailed explanation!
