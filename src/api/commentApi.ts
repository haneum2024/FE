import axios from './axios';

export const postCommentApi = ({
  accessToken,
  date,
  comment,
}: {
  accessToken: string;
  date: string;
  comment: string;
}) => {
  const postCommentConfig = {
    method: 'post',
    url: '/comment',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      date: date,
      comment: comment,
    },
  };

  return axios(postCommentConfig);
};

export const getCommentApi = ({
  accessToken,
  date,
}: {
  accessToken: string;
  date: string;
}) => {
  const getCommentConfig = {
    method: 'get',
    url: `/comment/${date}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getCommentConfig);
};
