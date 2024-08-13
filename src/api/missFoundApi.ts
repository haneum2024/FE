import axios from './axios';

export const getBoardApi = ({
  accessToken,
  postType,
  page,
  size,
}: {
  accessToken: string;
  postType: string;
  page: number;
  size: number;
}) => {
  const boardConfig = {
    method: 'get',
    url: `/board?postType=${postType}&page=${page}&size=${size}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(boardConfig);
};

export const getBoardInfoApi = ({
  accessToken,
  postType,
  boardId,
}: {
  accessToken: string;
  postType: string;
  boardId: string;
}) => {
  const boardInfoConfig = {
    method: 'get',
    url: `/board?&postType=${postType}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      boardId: boardId,
    },
  };

  return axios(boardInfoConfig);
};

export const deleteMissApi = ({
  accessToken,
  boardId,
}: {
  accessToken: string;
  boardId: string;
}) => {
  const deleteMissConfig = {
    method: 'delete',
    url: '/board/pet-lost',
    headers: {
      Authorization: accessToken,
      boardId: boardId,
    },
  };

  return axios(deleteMissConfig);
};

export const deleteFoundApi = ({
  accessToken,
  boardId,
}: {
  accessToken: string;
  boardId: number;
}) => {
  const deleteFoundConfig = {
    method: 'delete',
    url: '/board/owner-found',
    headers: {
      Authorization: accessToken,
      boardId: boardId,
    },
  };

  return axios(deleteFoundConfig);
};
