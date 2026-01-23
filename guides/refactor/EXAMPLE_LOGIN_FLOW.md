# Complete Example: Login Flow Refactoring

This document shows the complete transformation from old pattern to Service-Oriented Architecture.

---

## BEFORE: Direct Logic in Component

```typescript
// app/auth/login/page.tsx
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Github, Chrome, Code2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // ❌ PROBLEM: Direct API logic in component
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // ❌ Hardcoded fetch with no types
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      // ❌ No type safety, raw data
      const data = await response.json()

      // ❌ Manual token handling
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_refresh_token', data.refreshToken)

      router.push("/home")
    } catch (error: any) {
      // ❌ Generic error handling
      setError(error?.message || "Invalid credentials")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <div className="p-8 md:p-10">
          {/* ... UI code stays the same ... */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md border border-destructive/20 text-center">
                {error}
              </div>
            )}
            {/* ... form fields ... */}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Sign In"}
            </button>
          </form>
        </div>
      </Card>
    </div>
  )
}
```

### Problems with "Before":

- ❌ No type safety
- ❌ API URL hardcoded
- ❌ Manual token handling
- ❌ No interceptors or error standardization
- ❌ Logic not reusable in other components
- ❌ Difficult to test
- ❌ Mixed concerns (UI + API + state management)

---

## AFTER: Service-Oriented Architecture

### Step 1: Types (types/auth.ts)

```typescript
// Backend contract
export interface BackendLoginResponse {
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role: "user" | "moderator" | "admin";
    isVerified: boolean;
    createdAt: string;
  };
  token: string;
  refreshToken: string;
}

// Frontend model
export interface AuthUser {
  id: string;
  email: string;
  username: string;
  name: string;
  avatar: string;
  role: "user" | "moderator" | "admin";
  isVerified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
```

### Step 2: API Infrastructure (lib/api-client.ts)

```typescript
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  // Request interceptor: Add JWT token
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor: Handle 401, standardize errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("auth_token");
        window.location.href = "/auth/login";
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const apiClient = createApiClient();
```

### Step 3: Mapper (mappers/auth.mapper.ts)

```typescript
import type { BackendAuthResponse, AuthUser } from "@/types";

export const mapBackendAuthToAuthUser = (
  backendAuth: BackendAuthResponse,
): AuthUser => {
  return {
    id: backendAuth.id,
    email: backendAuth.email,
    username: backendAuth.username,
    name: `${backendAuth.firstName} ${backendAuth.lastName}`.trim(),
    avatar: backendAuth.avatar || "/placeholder.svg",
    role: backendAuth.role,
    isVerified: backendAuth.isVerified,
  };
};

export const mapBackendLoginResponse = (
  response: BackendLoginResponse,
): {
  user: AuthUser;
  token: string;
  refreshToken: string;
} => {
  return {
    user: mapBackendAuthToAuthUser(response.user),
    token: response.token,
    refreshToken: response.refreshToken,
  };
};
```

### Step 4: Service (services/auth.service.ts)

```typescript
import { apiClient, getErrorDetails } from "@/lib/api-client";
import type {
  BackendLoginResponse,
  LoginCredentials,
  AuthUser,
  ApiResponse,
} from "@/types";
import { mapBackendLoginResponse } from "@/mappers/auth.mapper";

class AuthService {
  private readonly baseURL = "/auth";

  async login(credentials: LoginCredentials): Promise<{
    user: AuthUser;
    token: string;
    refreshToken: string;
  }> {
    try {
      const response = await apiClient.post<ApiResponse<BackendLoginResponse>>(
        `${this.baseURL}/login`,
        credentials,
      );

      const { user, token, refreshToken } = mapBackendLoginResponse(
        response.data.data,
      );

      // Store tokens
      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("refresh_token", refreshToken);
      }

      return { user, token, refreshToken };
    } catch (error) {
      const { message } = getErrorDetails(error);
      throw new Error(message || "Login failed");
    }
  }
}

export const authService = new AuthService();
```

### Step 5: Hook (hooks/useAuth.ts)

```typescript
"use client";

import { useState, useCallback, useEffect } from "react";
import { authService } from "@/services/auth.service";
import type { AuthState, AuthUser, LoginCredentials } from "@/types";

interface UseAuthReturn {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  // Initialize from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("auth_user");
      if (storedToken && storedUser) {
        setAuthState((prev) => ({
          ...prev,
          user: JSON.parse(storedUser),
          token: storedToken,
          isAuthenticated: true,
        }));
      }
    }
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const { user, token, refreshToken } =
          await authService.login(credentials);

        if (typeof window !== "undefined") {
          localStorage.setItem("auth_user", JSON.stringify(user));
        }

        setAuthState((prev) => ({
          ...prev,
          user,
          token,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Login failed";
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        throw error;
      }
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_user");
      }
      setAuthState({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  }, []);

  const clearError = useCallback(() => {
    setAuthState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    user: authState.user,
    token: authState.token,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
    clearError,
  };
};
```

### Step 6: Refactored Component (app/auth/login/page.tsx)

```typescript
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Github, Chrome, Code2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  // ✅ All state management is in the hook
  const { login, isLoading, error, clearError } = useAuth()

  // ✅ Simple, clean handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    try {
      // ✅ Delegated to service via hook
      await login({ email, password })
      // ✅ Navigate on success
      router.push("/home")
    } catch (err) {
      // ✅ Error already in state
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <div className="p-8 md:p-10">
          {/* ... UI is identical, no Tailwind changes ... */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md border border-destructive/20 text-center">
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
```

---

## Key Differences Summary

| Aspect                 | Before              | After                        |
| ---------------------- | ------------------- | ---------------------------- |
| **State Logic**        | In component        | In custom hook               |
| **API Calls**          | Direct fetch()      | Service layer                |
| **Type Safety**        | `any` types         | Strict TypeScript            |
| **Error Handling**     | Manual try/catch    | Standardized via API client  |
| **Token Management**   | Manual localStorage | Service + API interceptor    |
| **Testability**        | Difficult           | Easy (mock services)         |
| **Reusability**        | Not reusable        | Hooks can be used everywhere |
| **UI Changes**         | Potential issues    | Zero changes (UI finalized)  |
| **Lines in Component** | ~80                 | ~45 (logic removed)          |

---

## Data Flow Diagram

```
┌──────────────────────────┐
│   LOGIN COMPONENT        │
│  - Renders form          │
│  - Calls useAuth()       │
│  - Handles navigation    │
└───────────┬──────────────┘
            │ login({email, password})
            ↓
┌──────────────────────────────┐
│   useAuth HOOK               │
│  - Manages auth state        │
│  - Calls authService.login() │
│  - Updates state             │
│  - Handles localStorage       │
└───────────┬──────────────────┘
            │ await authService.login(credentials)
            ↓
┌──────────────────────────────────────┐
│   AUTH SERVICE                       │
│  - Makes API call                    │
│  - Calls mapper                      │
│  - Returns {user, token, ...}        │
└───────────┬──────────────────────────┘
            │ response.data.data (BackendLoginResponse)
            ↓
┌──────────────────────────────────┐
│   AUTH MAPPER                    │
│  - Transforms BackendAuth → Auth │
│  - Returns typed AuthUser        │
└───────────┬────────────────────┘
            │ {user, token, refreshToken}
            ↓
┌──────────────────────────────────────┐
│   API CLIENT                         │
│  - Sends POST /auth/login            │
│  - Adds JWT to headers               │
│  - Handles 401 errors                │
│  - Returns AxiosResponse             │
└───────────┬──────────────────────────┘
            │ POST to http://localhost:3001/api/auth/login
            ↓
┌──────────────────────────────────┐
│   NESTJS BACKEND                 │
│  - Validates credentials          │
│  - Generates JWT                  │
│  - Returns BackendLoginResponse   │
└──────────────────────────────────┘
```

---

## Benefits Achieved

✅ **Type Safety**: Every layer has strict types
✅ **Separation of Concerns**: Clear responsibility boundaries
✅ **Reusability**: useAuth() can be used in Signup, Profile, etc.
✅ **Testability**: Easy to mock services and test hooks
✅ **Maintainability**: Changes in API contract only affect mappers
✅ **Scalability**: Easy to add new features (just create service + hook)
✅ **Error Handling**: Standardized across all API calls
✅ **UI Preservation**: Zero changes to components' JSX or styling

---

## Ready for Implementation

This pattern is now ready to apply to:

- [x] Authentication (Login, Signup, Password Reset)
- [x] Posts (Fetch, Create, Update, Delete, Like, Search)
- [x] Users (Profile, Leaderboard, Expert Matching)
- [ ] Comments (Create, Read, Delete) - Follow same pattern
- [ ] Search (Posts + Users) - Already in services
- [ ] Notifications - (To be created following pattern)
- [ ] Messages - (To be created following pattern)

For each new feature, follow the same 6-step pattern:

1. Define types
2. Create/extend API client
3. Create mapper functions
4. Create service class
5. Create custom hook
6. Integrate into component

🚀 **Happy refactoring!**
