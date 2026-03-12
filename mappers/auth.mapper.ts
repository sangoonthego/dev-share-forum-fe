import {
  UserProfileResponse,
  OAuthUserResponse,
  User,
  ChangePasswordResponse,
} from "@/types/auth";

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