// RESPONSE ENTITIES
export interface User {
  createdAt: Date;
  email: string;
  updatedAt: Date;
  verified: boolean;
  _id: string;
}
export interface Session {
  _id: string;
  createdAt: Date;
  expiresAt: Date;
  userId: string;
  userAgent: string;
  isCurrent?: boolean;
}
export interface MessageResponse {
  message: string;
}
export interface EmailResponse {
  email: string;
}

// RESPONSES
export type LoginResponse = MessageResponse;
export type RegisterResponse = EmailResponse;
export type ForgotPasswordResponse = MessageResponse;
export type VerifyEmailResponse = MessageResponse;
export type ResetPasswordResponse = MessageResponse;
export type LogoutResponse = MessageResponse;
export type GetSessionsResponse = Session[];

// REQUESTS
export interface LoginUserRequest {
  email: string;
  password: string;
}
export interface RegisterUserRequest {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ForgotPasswordRequest {
  email: string;
}
export interface ResetPasswordRequest {
  password: string;
  verificationCode: string;
}
