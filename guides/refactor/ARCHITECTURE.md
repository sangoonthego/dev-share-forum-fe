# Service-Oriented Architecture (SOA) Pattern

## Overview

This project implements a **Service-Oriented Architecture** with strict separation of concerns:

```
UI Components (JSX/TSX)
        ↓
   Custom Hooks
        ↓
   Services (Business Logic)
        ↓
   Mappers (Data Transformation)
        ↓
   API Client (HTTP Infrastructure)
        ↓
   Backend API (NestJS)
```

---

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (landing)/
│   ├── auth/
│   ├── home/
│   └── ...
├── components/             # Reusable UI components (FINALIZED - NO CHANGES)
│   ├── ui/
│   ├── post/
│   ├── layout/
│   └── ...
├── hooks/                  # Custom React hooks for state & service consumption
│   ├── useAuth.ts         # Auth state management
│   ├── usePosts.ts        # Posts state management
│   ├── useUsers.ts        # (To be created)
│   └── ...
├── lib/                    # Utilities and infrastructure
│   ├── api-client.ts      # Axios instance with interceptors
│   ├── post-utils.ts      # Post-related helpers
│   ├── utils.ts           # General utilities
│   └── ...
├── services/              # Business logic & API calls (NEW)
│   ├── auth.service.ts    # Authentication operations
│   ├── post.service.ts    # Post operations
│   ├── user.service.ts    # User operations
│   └── ...
├── mappers/               # Data transformation (NEW)
│   ├── auth.mapper.ts     # Transform auth responses
│   ├── post.mapper.ts     # Transform post responses
│   ├── user.mapper.ts     # Transform user responses
│   └── ...
├── types/                 # Global TypeScript definitions (NEW)
│   ├── index.ts           # Central export
│   ├── api.ts             # API contracts
│   ├── auth.ts            # Auth types
│   ├── post.ts            # Post types
│   ├── user.ts            # User types
│   └── ...
└── README.md
```

---

## Data Flow Pattern

### Example: User Login

```
┌─────────────────────────────────────────┐
│  1. Component (LoginPage)               │
│  - Renders form UI                      │
│  - Calls useAuth() hook                 │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│  2. Hook (useAuth.ts)                   │
│  - Manages auth state                   │
│  - Calls authService.login()            │
│  - Catches errors, updates UI state     │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│  3. Service (auth.service.ts)           │
│  - Makes API call                       │
│  - Passes response to mapper            │
│  - Stores tokens in localStorage        │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│  4. Mapper (auth.mapper.ts)             │
│  - Transforms BE response to FE model   │
│  - Returns typed AuthUser object        │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│  5. API Client (api-client.ts)          │
│  - Sends HTTP request with JWT token    │
│  - Handles interceptors                 │
│  - Returns raw response                 │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│  6. Backend (NestJS API)                │
│  - Validates credentials                │
│  - Returns: { user, token, ... }        │
└─────────────────────────────────────────┘
```

---

## Key Concepts

### 1. **Types** (`/types`)

Define all TypeScript interfaces used across the app. Split by domain (auth, post, user).

**Key Principle**: Single source of truth for type definitions.

```typescript
// types/auth.ts
export interface BackendLoginResponse {
  user: BackendAuthResponse;
  token: string;
  refreshToken: string;
}

export interface AuthUser {
  id: string;
  name: string;
  // Frontend-specific fields only
}
```

### 2. **Services** (`/services`)

Encapsulate all API calls and business logic. Each service handles one domain.

**Key Principle**: Services are HTTP orchestrators + business logic.

```typescript
// services/auth.service.ts
class AuthService {
  async login(
    credentials: LoginCredentials,
  ): Promise<{ user: AuthUser; token: string }> {
    const response = await apiClient.post("/auth/login", credentials);
    return mapBackendLoginResponse(response.data.data);
  }
}
```

### 3. **Mappers** (`/mappers`)

Transform backend responses to frontend models. Handle field renaming, computed values, defaults.

**Key Principle**: Decouples FE and BE data structures.

```typescript
// mappers/auth.mapper.ts
export const mapBackendAuthToAuthUser = (
  backend: BackendAuthResponse,
): AuthUser => {
  return {
    id: backend.id,
    name: `${backend.firstName} ${backend.lastName}`,
    avatar: backend.avatar || "/placeholder.svg",
  };
};
```

### 4. **Hooks** (`/hooks`)

Custom React hooks that consume services and manage component state.

**Key Principle**: Hooks are the bridge between Services and Components.

```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const { user, token } = await authService.login(credentials);
      setUser(user);
      localStorage.setItem("auth_token", token);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  return { user, login, error };
};
```

### 5. **API Client** (`lib/api-client.ts`)

Centralized Axios instance with interceptors for JWT auth, error handling, and request/response transformation.

**Key Features**:

- ✅ Automatic JWT token injection
- ✅ 401 handling (token refresh or redirect to login)
- ✅ Consistent error response format
- ✅ Request/response logging in dev

---

## Usage Example: Complete Flow

### Step 1: Component Uses Hook

```typescript
// app/auth/login/page.tsx
'use client'

import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const { login, isLoading, error } = useAuth()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login({ email, password })
      // Redirect handled by hook or useEffect
    } catch (err) {
      // Error already in state
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      {/* Input fields... */}
      <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>
    </form>
  )
}
```

### Step 2: Hook Calls Service

```typescript
// hooks/useAuth.ts
const login = useCallback(async (credentials: LoginCredentials) => {
  setIsLoading(true);
  try {
    const { user, token } = await authService.login(credentials);
    setUser(user);
    localStorage.setItem("auth_token", token);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
}, []);
```

### Step 3: Service Calls API & Maps Response

```typescript
// services/auth.service.ts
async login(credentials: LoginCredentials) {
  const response = await apiClient.post<ApiResponse<BackendLoginResponse>>(
    '/auth/login',
    credentials
  )

  const mapped = mapBackendLoginResponse(response.data.data)
  // Returns: { user: AuthUser, token: string, refreshToken: string }
  return mapped
}
```

### Step 4: Mapper Transforms Data

```typescript
// mappers/auth.mapper.ts
export const mapBackendLoginResponse = (response: BackendLoginResponse) => {
  return {
    user: mapBackendAuthToAuthUser(response.user), // Transforms BE → FE
    token: response.token,
    refreshToken: response.refreshToken,
  };
};
```

---

## Best Practices

### ✅ DO

- **Services**: Only make API calls, delegate transformation to mappers
- **Mappers**: Only transform data, no API calls or business logic
- **Hooks**: Manage component state, call services, catch errors
- **Components**: Render UI, call hooks, no direct API calls
- **Types**: Keep together by domain (auth.ts, post.ts, etc.)
- **Error Handling**: Each layer catches and transforms errors for the next layer

### ❌ DON'T

- Direct `fetch()` or `axios()` calls in components
- API logic in custom hooks (use services)
- Data transformation in services (use mappers)
- Mixed concerns (service doing both API + transformation)
- Global state for every piece of data (use hooks)
- `any` types (use strict TypeScript)

---

## Adding a New Feature (e.g., Comments)

### 1. Create Types

```typescript
// types/comment.ts
export interface BackendComment { ... }
export interface Comment { ... }
export interface CreateCommentRequest { ... }
```

### 2. Create Mapper

```typescript
// mappers/comment.mapper.ts
export const mapBackendCommentToComment = (backend: BackendComment): Comment => { ... }
```

### 3. Create Service

```typescript
// services/comment.service.ts
class CommentService {
  async createComment(data: CreateCommentRequest): Promise<Comment> { ... }
  async getComments(postId: string): Promise<Comment[]> { ... }
}
```

### 4. Create Hook

```typescript
// hooks/useComments.ts
export const useComments = () => { ... }
```

### 5. Use in Component

```typescript
// components/post/comment-section.tsx
export function CommentSection({ postId }: Props) {
  const { comments, createComment } = useComments();
  // Use comments and createComment function
}
```

---

## Type Safety Standards

### All functions must be strictly typed:

```typescript
// ❌ BAD - Implicit any
async function fetchData(url) {
  const response = await apiClient.get(url);
  return response.data;
}

// ✅ GOOD - Explicit types
async function fetchData(url: string): Promise<ApiResponse<unknown>> {
  const response = await apiClient.get<ApiResponse<unknown>>(url);
  return response.data;
}

// ✅ BETTER - Typed generics
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await apiClient.get<ApiResponse<T>>(url);
  return response.data;
}
```

---

## File Organization Summary

| Layer         | Location              | Responsibility                         |
| ------------- | --------------------- | -------------------------------------- |
| **UI**        | `components/`, `app/` | Render JSX, no logic                   |
| **State**     | `hooks/`              | Component state, service orchestration |
| **Logic**     | `services/`           | API calls, business logic              |
| **Transform** | `mappers/`            | BE → FE data mapping                   |
| **HTTP**      | `lib/api-client.ts`   | HTTP requests, interceptors            |
| **Types**     | `types/`              | All TypeScript definitions             |

---

## Environment Configuration

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

The API client automatically uses this base URL.

---

## Testing Strategy

### Unit Tests

- **Mappers**: Test transformation logic
- **Services**: Mock apiClient, test API call orchestration

### Integration Tests

- **Hooks**: Mock services, test state management
- **Components**: Mock hooks, test UI rendering

### E2E Tests

- **Full flows**: Login → Create Post → Like

---

## Migration from Old Pattern

### Old (Direct API in Components):

```typescript
// ❌ OLD
const [posts, setPosts] = useState([]);
useEffect(() => {
  fetch("/api/posts")
    .then((r) => r.json())
    .then((data) => setPosts(data));
}, []);
```

### New (Service-Oriented):

```typescript
// ✅ NEW
const { posts, fetchPosts } = usePosts();
useEffect(() => {
  fetchPosts();
}, [fetchPosts]);
```

---

## Troubleshooting

### Issue: Types not imported correctly

**Solution**: Always import from `@/types`, use the central `types/index.ts`

### Issue: Mapper functions not transforming correctly

**Solution**: Check Backend vs Frontend type definitions match field names

### Issue: Service returns raw backend data

**Solution**: Ensure mapper is called in service before returning

### Issue: API calls failing with 401

**Solution**: Check JWT token in localStorage, verify interceptor is adding auth header

---

## References

- Backend API: `http://localhost:3001` (default)
- Type Safety: No `any` types allowed
- Error Handling: Each layer should have try/catch blocks
- Naming Convention: `map[Source]To[Target]` for mappers
