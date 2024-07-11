export interface LoginResponse {
  grantType: string;
  accessToken: string;
  accessTokenExpirationTime: number;
  refreshToken: string;
  refreshTokenExpirationTime: number;
}
