import { useState, useEffect, useCallback, useRef } from "react";
import * as authService from "@/services/auth.service";
import { setAccessToken, getAccessToken, clearAccessToken } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { mapOAuthUserResponse, mapUserProfileResponse, User } from "@/mappers/auth.mapper";

interface UseAuthResult {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Operations
  login: (dto: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (dto: { email: string; password: string; full_name?: string; phone?: string }) => Promise<void>;
  changePassword: (dto: { current_password: string; new_password: string; new_password_confirm: string }) => Promise<void>;

  // OAuth
  handleOAuthCallback: () => Promise<void>;

  // Utilities
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // SSR check
    if (typeof window === "undefined") return;

    // Prevent double initialization
    if (initializeRef.current) return;
    initializeRef.current = true;

    const token = getAccessToken();
    if (token) {
      // Token exists, fetch user profile
      fetchMe();
    } else {
      // No token, skip to ready state
      setLoading(false);
    }
  }, [fetchMe]);

  const login = async (dto: { email: string; password: string }): Promise<void> => {
    setLoading(true);
    try {
      // Login returns access_token
      const token = await authService.login(dto);

      // Token stored in memory via api-client
      setAccessToken(token);

      // Fetch and set user
      await fetchMe();
    } catch (error) {
      setUser(null);
      clearAccessToken();
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
      // User registered, redirect to login for authentication
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
    const provider = url.searchParams.get("provider");
    const error = url.searchParams.get("error");

    // Check for OAuth error
    if (error) {
      console.error(`OAuth ${provider} error:`, error);
      clearAccessToken();
      setUser(null);
      router.replace("/auth/login?error=oauth_failed");
      return;
    }

    // Validate we have access token
    if (!accessToken) {
      console.error("OAuth callback missing access_token");
      clearAccessToken();
      setUser(null);
      router.replace("/auth/login?error=oauth_invalid");
      return;
    }

    try {
      // Store access token in memory
      setAccessToken(accessToken);

      // Fetch user profile with new token
      await fetchMe();

      // Clear URL params and redirect to home
      router.replace("/");
    } catch (error) {
      console.error("OAuth callback failed:", error);
      clearAccessToken();
      setUser(null);
      router.replace("/auth/login?error=oauth_failed");
    }
  }, [fetchMe, router]);

  const refetch = fetchMe;

  return {
    // State
    user,
    isAuthenticated: !!user,
    isLoading,

    // Operations
    login,
    logout,
    register,
    changePassword,

    // OAuth
    handleOAuthCallback,

    // Utilities
    refetch,
  };
}