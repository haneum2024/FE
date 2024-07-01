import axios from '../api/axios';

export const loginApi = ({
  provider,
  code,
  codeVerifier,
}: {
  provider: string;
  code: string;
  codeVerifier: string;
}) => {
  const loginConfig = {
    method: 'post',
    url: '/auth/social/social/callback',
    data: {
      provider,
      code,
      codeVerifier,
    },
  };

  return axios(loginConfig);
};
