import axios from '../api/axios';

export const loginApi = ({
  provider,
  authorization,
}: {
  provider: string;
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
  const refreshConfig = {
    method: 'post',
    url: '/auth/refresh',
    data: {
      accessToken: accessToken,
      refreshToken: refreshToken,
    },
  };

  return axios(refreshConfig);
};
