import apiClient, { setAccessToken, clearAccessToken, setCSRFToken, clearCSRFToken } from "@/lib/api-client";
import { mapUserProfileResponse, mapOAuthUserResponse } from "@/mappers/auth.mapper";
import {
  LoginDto,
  RegisterDto,
  ChangePasswordDto,
  AuthTokenResponse,
  User,
  UserProfileResponse,
  LoginResponse,
  RegisterResponse,
  ChangePasswordResponse,
  OAuthUserResponse,
} from "@/types/auth";

class AuthService {
  private readonly baseURL = "/auth";

  async register(dto: RegisterDto): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>(
        `${this.baseURL}/register`,
        dto
      );

      return response.data;
    } catch (error) {
      throw this.mapError(error, "Registration failed");
    }
  }

  async login(dto: LoginDto): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<AuthTokenResponse>(
        `${this.baseURL}/login`,
        dto
      );

      const { access_token, csrf_token } = response.data;

      // Store tokens in the service layer - handles side effects
      setAccessToken(access_token);
      if (csrf_token) {
        setCSRFToken(csrf_token);
      }

      return { access_token, csrf_token };
    } catch (error) {
      throw this.mapError(error, "Login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(`${this.baseURL}/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAccessToken();
      clearCSRFToken();
    }
  }

  async getMe(): Promise<User> {
    try {
      const response = await apiClient.get<UserProfileResponse>(
        `${this.baseURL}/me`
      );

      return mapUserProfileResponse(response.data);
    } catch (error) {
      throw this.mapError(error, "Failed to fetch user profile");
    }
  }

  async silentRefresh(): Promise<AuthTokenResponse> {
    try {
      const response = await apiClient.post<AuthTokenResponse>(
        `${this.baseURL}/refresh`
      );

      const { access_token, csrf_token } = response.data;
      setAccessToken(access_token);
      if (csrf_token) {
        setCSRFToken(csrf_token);
      }

      return response.data;
    } catch (error) {
      clearAccessToken();
      clearCSRFToken();
      throw this.mapError(error, "Silent refresh failed");
    }
  }

  async changePassword(dto: ChangePasswordDto): Promise<ChangePasswordResponse> {
    try {
      const response = await apiClient.post<ChangePasswordResponse>(
        `${this.baseURL}/change-password`,
        dto
      );

      return response.data;
    } catch (error) {
      throw this.mapError(error, "Password change failed");
    }
  }

  private mapError(error: unknown, defaultMessage: string): never {
    if (error instanceof Error) {
      if ("response" in error && typeof error.response === "object" && error.response !== null) {
        const response = error.response as any;
        const errorCode = response.data?.error_code;
        const userMessage = this.mapErrorCodeToMessage(errorCode) || defaultMessage;
        throw new Error(userMessage);
      }
      throw new Error(error.message || defaultMessage);
    }
    throw new Error(defaultMessage);
  }

  private mapErrorCodeToMessage(code: string | undefined): string | null {
    const errorMap: Record<string, string> = {
      'AUTH_001': 'Invalid email or password. Please try again.',
      'AUTH_002': 'This email is already registered. Use login instead.',
      'AUTH_003': 'Unable to refresh session. Please login again.',
      'AUTH_004': 'Your session has expired. Please login again.',
      'AUTH_005': 'Too many login attempts. Try again in a few minutes.',
      'AUTH_006': 'Security verification failed. Please try again.',
      'AUTH_007': 'Your session was invalidated. Please login again.',
      'AUTH_008': 'Session security issue detected. Please login again.',
      'AUTH_009': 'OAuth login failed. Please try again with another method.',
      'AUTH_010': 'Password does not meet security requirements.',
    };
    return code ? errorMap[code] : null;
  }
}

const authService = new AuthService();

export const register = authService.register.bind(authService);
export const login = authService.login.bind(authService);
export const logout = authService.logout.bind(authService);
export const getMe = authService.getMe.bind(authService);
export const silentRefresh = authService.silentRefresh.bind(authService);
export const changePassword = authService.changePassword.bind(authService);

export default authService;
