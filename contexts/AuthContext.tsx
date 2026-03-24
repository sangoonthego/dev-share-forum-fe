"use client";

import React, { createContext, useState, useEffect, useCallback, useRef } from "react";
import * as authService from "@/services/auth.service";
import { getAccessToken, clearAccessToken, setAccessToken, setCSRFToken, clearCSRFToken } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { User } from "@/types/auth";

export interface AuthContextType {
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

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
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

        const initializeAuth = async () => {
            try {
                let token = getAccessToken();

                if (!token) {
                    try {
                        await authService.silentRefresh();
                        token = getAccessToken();
                    } catch (error) {
                        // Normal if no valid refresh token exists - remain logged out
                    }
                }

                if (token) {
                    try {
                        await fetchMe();
                    } catch (fetchError) {
                        console.error("Failed to fetch user after setup/refresh", fetchError);
                    }
                }
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, [fetchMe]);

    const login = async (dto: { email: string; password: string }): Promise<void> => {
        setLoading(true);
        try {
            await authService.login(dto);
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

    const register = async (dto: { email: string; password: string; full_name?: string; phone?: string }): Promise<void> => {
        setLoading(true);
        try {
            await authService.register(dto);
            router.push("/auth/login?registered=true");
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const changePassword = async (dto: { current_password: string; new_password: string; new_password_confirm: string }): Promise<void> => {
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
        const authCode = url.searchParams.get("code");
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

        if (!authCode) {
            console.error("OAuth callback missing authorization code");
            clearAccessToken();
            clearCSRFToken();
            setUser(null);
            router.replace("/auth/login?error=oauth_invalid");
            return;
        }

        try {
            window.history.replaceState({}, document.title, window.location.pathname);

            const exchangeResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/exchange-oauth-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ code: authCode }),
            });

            if (!exchangeResponse.ok) {
                const errorData = await exchangeResponse.json().catch(() => ({}));
                console.error("OAuth code exchange failed:", errorData);
                clearAccessToken();
                clearCSRFToken();
                setUser(null);
                router.replace("/auth/login?error=oauth_expired");
                return;
            }

            const tokenData = await exchangeResponse.json();

            setAccessToken(tokenData.access_token);
            if (tokenData.csrf_token) {
                setCSRFToken(tokenData.csrf_token);
            }

            await fetchMe();
            router.replace("/");
        } catch (error) {
            console.error("OAuth callback exchange failed:", error);
            clearAccessToken();
            clearCSRFToken();
            setUser(null);
            router.replace("/auth/login?error=oauth_failed");
        }
    }, [fetchMe, router]);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        changePassword,
        handleOAuthCallback,
        refetch: fetchMe,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}