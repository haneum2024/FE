import axios from './axios';

export const postStatusApi = ({
  accessToken,
  date,
  symptoms,
}: {
  accessToken: string;
  date: string;
  symptoms: string[];
}) => {
  const postStatusConfig = {
    method: 'post',
    url: '/status',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      date: date,
      symptoms: symptoms,
    },
  };

  return axios(postStatusConfig);
};

export const getDailyStatusApi = ({
  accessToken,
  date,
}: {
  accessToken: string;
  date: string;
}) => {
  const getDailyStatusConfig = {
    method: 'get',
    url: `/status/${date}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getDailyStatusConfig);
};

export const getWeeklyStatusApi = ({
  accessToken,
  date,
}: {
  accessToken: string;
  date: string;
}) => {
  const getWeeklyStatusConfig = {
    method: 'get',
    url: `/status/weekly/${date}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getWeeklyStatusConfig);
};

export const getMonthlyStatusApi = ({
  accessToken,
  date,
}: {
  accessToken: string;
  date: string;
}) => {
  const getMonthlyStatusConfig = {
    method: 'get',
    url: `/status/monthly/${date}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios(getMonthlyStatusConfig);
};
