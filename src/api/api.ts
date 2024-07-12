import axios from '../api/axios';

export const loginApi = ({
  provider,
  authorization,
}: {
  provider: 'google' | 'naver';
  authorization: string;
}) => {
  const loginConfig = {
    method: 'post',
    url: `/auth/login/${provider}`,
    headers: {
      Authorization: authorization,
    },
  };

  return axios(loginConfig);
};

export const authRefreshApi = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const authRefreshConfig = {
    method: 'post',
    url: '/auth/refresh',
    data: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  };

  return axios(authRefreshConfig);
};

export const getUserApi = (accessToken: string) => {
  const getUserConfig = {
    method: 'get',
    url: '/user',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getUserConfig);
};

export const userAgreeApi = ({
  accessToken,
  isAgree,
}: {
  accessToken: string;
  isAgree: boolean;
}) => {
  const userAgreeConfig = {
    method: 'patch',
    url: '/user/agree',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      termsOfServiceAgreement: isAgree,
    },
  };

  return axios(userAgreeConfig);
};
