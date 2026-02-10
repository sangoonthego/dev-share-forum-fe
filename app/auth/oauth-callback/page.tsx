'use client';

/**
 * OAuth Callback Page
 * 
 * Handles OAuth redirect flow from Google and GitHub
 * 
 * Flow:
 * 1. Backend redirects here: /auth/oauth-callback?access_token=...&provider=google
 * 2. This page extracts the token from URL
 * 3. useAuth.handleOAuthCallback() stores token and initializes session
 * 4. Redirects to home page on success or login page on failure
 */

import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function OAuthCallbackPage() {
  const { handleOAuthCallback, isLoading } = useAuth();

  useEffect(() => {
    handleOAuthCallback();
  }, [handleOAuthCallback]);

  // Show loading state while processing OAuth callback
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
          <p className="text-slate-300 font-medium">Completing authentication...</p>
        </div>
      </div>
    );
  }

  // Should not reach here - handleOAuthCallback redirects on completion
  return null;
}
