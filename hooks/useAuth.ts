import { useState, useEffect, useCallback, useRef } from "react";
import * as authService from "@/services/auth.service";
import { getAccessToken, clearAccessToken, setAccessToken, setCSRFToken, clearCSRFToken } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";

interface UseAuthResult {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (dto: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (dto: { email: string; password: string; full_name?: string; phone?: string }) => Promise<void>;
  changePassword: (dto: { current_password: string; new_password: string; new_password_confirm: string }) => Promise<void>;

  handleOAuthCallback: () => Promise<void>;

  refetch: () => Promise<void>;
}

export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const initializeRef = useRef(false);

  const fetchMe = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const me = await authService.getMe();
      setUser(me);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUser(null);
      clearAccessToken();
      clearCSRFToken();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (initializeRef.current) return;
    initializeRef.current = true;

    const token = getAccessToken();
    if (token) {
      fetchMe();
    } else {
      setLoading(false);
    }
  }, [fetchMe]);

  const login = async (dto: { email: string; password: string }): Promise<void> => {
    setLoading(true);
    try {
      // AuthService handles token storage (side effects)
      await authService.login(dto);
      // Fetch user profile with stored tokens
      await fetchMe();
    } catch (error) {
      setUser(null);
      clearAccessToken();
      clearCSRFToken();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await authService.logout();
    } finally {
      clearAccessToken();
      clearCSRFToken();
      setUser(null);
      setLoading(false);
      router.push("/auth/login");
    }
  };

  const register = async (dto: {
    email: string;
    password: string;
    full_name?: string;
    phone?: string;
  }): Promise<void> => {
    setLoading(true);
    try {
      await authService.register(dto);
      router.push("/auth/login?registered=true");
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const changePassword = async (dto: {
    current_password: string;
    new_password: string;
    new_password_confirm: string;
  }): Promise<void> => {
    setLoading(true);
    try {
      await authService.changePassword(dto);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthCallback = useCallback(async (): Promise<void> => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get("access_token");
    const csrfToken = url.searchParams.get("csrf_token");
    const provider = url.searchParams.get("provider");
    const error = url.searchParams.get("error");

    const validProviders = ["google", "github"];
    if (provider && !validProviders.includes(provider)) {
      console.error("Invalid OAuth provider:", provider);
      clearAccessToken();
      clearCSRFToken();
      setUser(null);
      router.replace("/auth/login?error=oauth_invalid");
      return;
    }

    if (error) {
      console.error(`OAuth ${provider} error:`, error);
      clearAccessToken();
      clearCSRFToken();
      setUser(null);
      router.replace("/auth/login?error=oauth_failed");
      return;
    }

    if (!accessToken) {
      console.error("OAuth callback missing access_token");
      clearAccessToken();
      clearCSRFToken();
      setUser(null);
      router.replace("/auth/login?error=oauth_invalid");
      return;
    }

    try {
      // Store tokens via the api-client layer (centralized token management)
      setAccessToken(accessToken);
      if (csrfToken) {
        setCSRFToken(csrfToken);
      }

      // Fetch user profile with new token
      await fetchMe();

      // Clean URL params and redirect to home
      router.replace("/");
    } catch (error) {
      console.error("OAuth callback failed:", error);
      clearAccessToken();
      clearCSRFToken();
      setUser(null);
      router.replace("/auth/login?error=oauth_failed");
    }
  }, [fetchMe, router]);

  const refetch = fetchMe;

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    changePassword,
    handleOAuthCallback,
    refetch,
  };
}