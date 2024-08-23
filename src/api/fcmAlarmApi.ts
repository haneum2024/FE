import axios from './axios';

export const postFCMTokenApi = ({
  accessToken,
  fcmToken,
}: {
  accessToken: string;
  fcmToken: string;
}) => {
  const postFCMTokenConfig = {
    method: 'post',
    url: '/notifications/fcm-token',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      fcmToken: fcmToken,
    },
  };

  return axios(postFCMTokenConfig);
};

export const postAlarmApi = ({
  accessToken,
  boardId,
}: {
  accessToken: string;
  boardId: string;
}) => {
  const postAlarmConfig = {
    method: 'post',
    url: `/notifications/send/pet-search/${boardId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(postAlarmConfig);
};
