export interface UserProfileResponse {
  id: number;
  email: string;
  full_name: string | null;
  phone: string | null;
  profile_avatar: string | null;
  role: string;
  karma: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface OAuthUserResponse {
  id: number;
  email: string;
  full_name: string | null;
  profile_avatar: string | null;
  access_token: string;
  refresh_token: string;
}

export interface AuthTokenResponse {
  access_token: string;
  csrf_token?: string;
}

export interface User {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
  avatar: string | null;
  role: string;
  karma: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  full_name?: string;
  phone?: string;
}

export interface ChangePasswordDto {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface LoginResponse {
  access_token: string;
  csrf_token?: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
  full_name: string | null;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}
