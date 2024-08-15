import axios from './axios';

export const getFoundDogsApi = ({
  accessToken,
  page,
  size,
}: {
  accessToken: string;
  page: number;
  size: number;
}) => {
  const getFoundDogsConfig = {
    method: 'get',
    url: `/board/owner-search?page=${page}&size=${size}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getFoundDogsConfig);
};

export const postFoundDogApi = ({
  accessToken,
  title,
  base64ImageList,
  name,
  reporterContact,
  specificLocation,
  latitude,
  longitude,
  foundDateTime,
  situation,
  petGender,
  petBreed,
  petDescription,
  content,
}: {
  accessToken: string;
  title: string;
  base64ImageList: string[];
  name: string;
  reporterContact: string;
  specificLocation: string;
  latitude: number;
  longitude: number;
  foundDateTime: string;
  situation: string;
  petGender: string;
  petBreed: string;
  petDescription: string;
  content: string;
}) => {
  const postFoundDogConfig = {
    method: 'post',
    url: '/board/owner-search',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      title: title,
      base64ImageList: base64ImageList,
      name: name,
      reporterContact: reporterContact,
      specificLocation: specificLocation,
      latitude: latitude,
      longitude: longitude,
      foundDateTime: foundDateTime,
      situation: situation,
      petGender: petGender,
      petBreed: petBreed,
      petDescription: petDescription,
      content: content,
    },
  };

  return axios(postFoundDogConfig);
};

export const getDetailFoundApi = ({
  accessToken,
  ownerSearchBoardId,
}: {
  accessToken: string;
  ownerSearchBoardId: string;
}) => {
  const getDetailFoundConfig = {
    method: 'get',
    url: `/board/owner-search/${ownerSearchBoardId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getDetailFoundConfig);
};

export const deleteFoundApi = ({
  accessToken,
  ownerSearchBoardId,
}: {
  accessToken: string;
  ownerSearchBoardId: string;
}) => {
  const deleteFoundConfig = {
    method: 'delete',
    url: `/board/owner-search/${ownerSearchBoardId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(deleteFoundConfig);
};

export const getUserFoundApi = ({accessToken}: {accessToken: string}) => {
  const getUserFoundConfig = {
    method: 'get',
    url: '/board/owner-search/user',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getUserFoundConfig);
};

export const getOtherFoundApi = ({
  accessToken,
  page,
  size,
}: {
  accessToken: string;
  page: number;
  size: number;
}) => {
  const getOtherFoundConfig = {
    method: 'get',
    url: `/board/owner-search/user/except?page=${page}&size=${size}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getOtherFoundConfig);
};
