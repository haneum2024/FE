import axios from './axios';

export const getMissDogsApi = ({
  accessToken,
  page,
  size,
}: {
  accessToken: string;
  page: number;
  size: number;
}) => {
  const getMissDogsConfig = {
    method: 'get',
    url: `/board/pet-search?page=${page}&size=${size}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getMissDogsConfig);
};

export const postMissDogApi = ({
  accessToken,
  title,
  base64ImageList,
  name,
  contact,
  specificLocation,
  lostDateTime,
  situation,
  petGender,
  isNeutered,
  petBreed,
  birthDate,
  petDescription,
  content,
}: {
  accessToken: string;
  title: string;
  base64ImageList: string[];
  name: string;
  contact: string;
  specificLocation: string;
  lostDateTime: string;
  situation: string;
  petGender: string;
  isNeutered: boolean;
  petBreed: string;
  birthDate: string;
  petDescription: string;
  content: string;
}) => {
  const postMissDogConfig = {
    method: 'post',
    url: '/board/pet-search',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      title: title,
      base64ImageList: base64ImageList,
      name: name,
      contact: contact,
      specificLocation: specificLocation,
      lostDateTime: lostDateTime,
      situation: situation,
      petGender: petGender,
      isNeutered: isNeutered,
      petBreed: petBreed,
      birthDate: birthDate,
      petDescription: petDescription,
      content: content,
    },
  };

  return axios(postMissDogConfig);
};

export const getDetailMissApi = ({
  accessToken,
  petSearchBoardId,
}: {
  accessToken: string;
  petSearchBoardId: number;
}) => {
  const getDetailMissConfig = {
    method: 'get',
    url: '/board/pet-search',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      petSearchBoardId: petSearchBoardId,
    },
  };

  return axios(getDetailMissConfig);
};

export const deleteMissApi = ({
  accessToken,
  petSearchBoardId,
}: {
  accessToken: string;
  petSearchBoardId: string;
}) => {
  const deleteMissConfig = {
    method: 'delete',
    url: '/board/pet-search',
    headers: {
      Authorization: accessToken,
      petSearchBoardId: petSearchBoardId,
    },
  };

  return axios(deleteMissConfig);
};

export const getUserMissApi = ({accessToken}: {accessToken: string}) => {
  const getUserMissConfig = {
    method: 'get',
    url: '/board/pet-search/user',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getUserMissConfig);
};

export const getOtherMissApi = ({
  accessToken,
  page,
  size,
}: {
  accessToken: string;
  page: number;
  size: number;
}) => {
  const getOtherMissConfig = {
    method: 'get',
    url: `/board/pet-search/user/except?page=${page}&size=${size}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getOtherMissConfig);
};
