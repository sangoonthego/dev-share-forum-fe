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

export interface LoginResponse {
  access_token: string;
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

export interface User {
  id: number;
  email: string;
  name: string | null; // Maps from full_name
  phone: string | null;
  avatar: string | null; // Maps from profile_avatar
  role: string;
  karma: number;
  createdAt: string;
  updatedAt: string;
}

export function mapUserProfileResponse(data: UserProfileResponse): User {
  return {
    id: data.id,
    email: data.email,
    name: data.full_name,
    phone: data.phone,
    avatar: data.profile_avatar,
    role: data.role,
    karma: data.karma,
    createdAt: convertToISOString(data.created_at),
    updatedAt: convertToISOString(data.updated_at),
  };
}

export function mapOAuthUserResponse(
  data: OAuthUserResponse
): User & { accessToken: string; refreshToken: string } {
  return {
    id: data.id,
    email: data.email,
    name: data.full_name,
    phone: null,
    avatar: data.profile_avatar,
    role: "USER",
    karma: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
}

function convertToISOString(date: Date | string): string {
  if (typeof date === "string") {
    return date;
  }
  if (date instanceof Date) {
    return date.toISOString();
  }
  return new Date().toISOString();
}