export interface LoginResponse {
  grantType: string;
  accessToken: string;
  accessTokenExpirationTime: number;
  refreshToken: string;
  refreshTokenExpirationTime: number;
  isFirstLogin: boolean;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  provider: 'google' | 'naver';
  role: string;
  jwtRefreshToken: string;
  address: string;
  publicKey: string;
  encryptedPrivateKey: string;
  termsOfServiceAgreement: boolean;
}
