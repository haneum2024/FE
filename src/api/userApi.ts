import axios from './axios';

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

export const addDogProfileApi = ({
  accessToken,
  name,
  gender,
  birthDate,
  breed,
  description,
  neutered,
  base64Image,
}: {
  accessToken: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: string;
  breed: string;
  description: string;
  neutered: boolean;
  base64Image: string;
}) => {
  const addDogProfileConfig = {
    method: 'post',
    url: '/pets',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      name: name,
      gender: gender,
      birthDate: birthDate,
      breed: breed,
      description: description,
      neutered: neutered,
      base64Image: base64Image,
    },
  };

  return axios(addDogProfileConfig);
};

export const addUserProfileApi = ({
  accessToken,
  name,
  location,
  description,
  base64ProfileImage,
}: {
  accessToken: string;
  name: string;
  location: string;
  description: string;
  base64ProfileImage: string | null;
}) => {
  const userProfileConfig = {
    method: 'put',
    url: '/user/profile',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      username: name,
      location: location,
      description: description,
      base64ProfileImage: base64ProfileImage,
    },
  };

  return axios(userProfileConfig);
};

export const getDogsApi = (accessToken: string) => {
  const getDogsConfig = {
    method: 'get',
    url: '/pets',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getDogsConfig);
};

export const getDogApi = ({
  accessToken,
  petId,
}: {
  accessToken: string;
  petId: number;
}) => {
  const getDogConfig = {
    method: 'get',
    url: `/pet/${petId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getDogConfig);
};
