import apiClient, { setAccessToken, clearAccessToken } from "@/lib/api-client";
import {
  mapUserProfileResponse,
  User,
  UserProfileResponse,
  LoginResponse,
  RegisterResponse,
  ChangePasswordResponse,
} from "@/mappers/auth.mapper";

/**
 * Request DTOs (matching backend contracts)
 */
interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto {
  email: string;
  password: string;
  full_name?: string;
  phone?: string;
}

interface ChangePasswordDto {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

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
      throw this.handleError(error, "Registration failed");
    }
  }

  async login(dto: LoginDto): Promise<string> {
    try {
      const response = await apiClient.post<LoginResponse>(
        `${this.baseURL}/login`,
        dto
      );

      const { access_token } = response.data;

      // Store access token in memory (via api-client)
      setAccessToken(access_token);

      return access_token;
    } catch (error) {
      throw this.handleError(error, "Login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(`${this.baseURL}/logout`);
    } catch (error) {
      console.error("Logout error:", error);
      // Continue clearing local state even if API call fails
    } finally {
      clearAccessToken();
    }
  }

  async getMe(): Promise<User> {
    try {
      const response = await apiClient.get<UserProfileResponse>(
        `${this.baseURL}/me`
      );

      return mapUserProfileResponse(response.data);
    } catch (error) {
      // If 401, session expired - api-client interceptor handles refresh
      throw this.handleError(error, "Failed to fetch user profile");
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
      throw this.handleError(error, "Password change failed");
    }
  }

  private handleError(error: unknown, defaultMessage: string): never {
    if (error instanceof Error) {
      // Axios error
      if ("response" in error && typeof error.response === "object" && error.response !== null) {
        const response = error.response as any;
        const message = response.data?.message || response.data?.error || defaultMessage;
        throw new Error(message);
      }
      // Generic error
      throw new Error(error.message || defaultMessage);
    }
    // Unknown error
    throw new Error(defaultMessage);
  }
}

const authService = new AuthService();

export const register = authService.register.bind(authService);
export const login = authService.login.bind(authService);
export const logout = authService.logout.bind(authService);
export const getMe = authService.getMe.bind(authService);
export const changePassword = authService.changePassword.bind(authService);

export default authService;
