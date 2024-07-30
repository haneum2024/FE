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
  imageUrl,
}: {
  accessToken: string;
  name: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: string;
  breed: string;
  description: string;
  neutered: boolean;
  imageUrl: string;
}) => {
  const addDogProfileConfig = {
    method: 'post',
    url: '/api/pets',
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
      imageUrl: imageUrl,
    },
  };

  return axios(addDogProfileConfig);
};

export const addUserProfileApi = ({
  accessToken,
  location,
  description,
  profileUrl,
}: {
  accessToken: string;
  location: string;
  description: string;
  profileUrl: string;
}) => {
  const userProfileConfig = {
    method: 'put',
    url: '/user/profile',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      location: location,
      description: description,
      profileUrl: profileUrl,
    },
  };

  return axios(userProfileConfig);
};

export const getDogsApi = (accessToken: string) => {
  const getDogsConfig = {
    method: 'get',
    url: '/api/pets',
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
    url: `/api/pet/${petId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getDogConfig);
};
