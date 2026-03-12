import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

let accessToken: string | null = null;
let csrfToken: string | null = null;

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

let isRefreshing: boolean = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
}> = [];

function processQueue(error: AxiosError | null, token: string | null = null): void {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.config.headers.Authorization = `Bearer ${token}`;
      prom.resolve(apiClient(prom.config));
    }
  });
  failedQueue = [];
}

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

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/register") &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await apiClient.post<{
          access_token: string;
          csrf_token: string;
        }>("/auth/refresh");
        const { access_token, csrf_token: newCsrfToken } = response.data;

        setAccessToken(access_token);
        if (newCsrfToken) {
          setCSRFToken(newCsrfToken);
        }

        processQueue(null, access_token);

        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        clearAccessToken();
        clearCSRFToken();

        if (typeof window !== "undefined") {
          window.location.href = "/auth/login?error=session_expired";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
