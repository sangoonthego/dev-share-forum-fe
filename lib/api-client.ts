import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

let accessToken: string | null = null;
let csrfToken: string | null = null;
let refreshTokenRequest: Promise<{ access_token: string; csrf_token: string }> | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export function clearAccessToken(): void {
  accessToken = null;
}

export function setCSRFToken(token: string | null): void {
  csrfToken = token;
}

export function getCSRFToken(): string | null {
  return csrfToken;
}

export function clearCSRFToken(): void {
  csrfToken = null;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (csrfToken) {
      const method = config.method?.toUpperCase() ?? "";
      if (["POST", "PUT", "DELETE", "PATCH"].includes(method)) {
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }

    if (typeof window !== "undefined") {
      const traceId = sessionStorage.getItem("trace_id") || "";
      if (traceId) {
        config.headers["X-Trace-ID"] = traceId;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const backendTraceId = response.headers["x-trace-id"];
    if (backendTraceId && typeof window !== "undefined") {
      sessionStorage.setItem("trace_id", backendTraceId);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Explicit manual logout or invalid refresh token forces session clear
    if (error.response?.status === 401 && originalRequest.url?.includes("/auth/refresh")) {
      clearAccessToken();
      clearCSRFToken();
      if (typeof window !== "undefined" && !window.location.pathname.includes('/auth/login')) {
        window.location.href = "/auth/login?error=session_expired";
      }
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/register")
    ) {
      originalRequest._retry = true;

      if (!refreshTokenRequest) {
        // Create the promise lock with retry logic
        refreshTokenRequest = (async () => {
          let retryCount = 0;
          const maxRetries = 2;

          while (retryCount <= maxRetries) {
            try {
              const response = await axios.post<{ access_token: string; csrf_token: string }>(
                `${apiClient.defaults.baseURL}/auth/refresh`,
                {},
                { withCredentials: true }
              );
              return response.data;
            } catch (refreshError: any) {
              if (refreshError.response?.status === 429 && retryCount < maxRetries) {
                // Exponential Backoff
                const backoffDelay = Math.pow(2, retryCount) * 1000;
                await new Promise((resolve) => setTimeout(resolve, backoffDelay));
                retryCount++;
              } else {
                throw refreshError;
              }
            }
          }
          throw new Error('Max retries reached');
        })().finally(() => {
          refreshTokenRequest = null;
        });
      }

      try {
        // Tất cả các request bị kẹt lại sẽ cùng chờ ở đây
        const { access_token, csrf_token: newCsrfToken } = await refreshTokenRequest;

        setAccessToken(access_token);
        if (newCsrfToken) setCSRFToken(newCsrfToken);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (refreshLockError: any) {
        clearAccessToken();
        clearCSRFToken();
        if (typeof window !== "undefined" && !window.location.pathname.includes('/auth/login')) {
          const isRateLimited = refreshLockError?.response?.status === 429;
          window.location.href = `/auth/login?error=${isRateLimited ? 'rate_limited' : 'session_expired'}`;
        }
        return Promise.reject(refreshLockError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;