import axios from './axios';

export const addNFTApi = ({
  accessToken,
  file,
}: {
  accessToken: string;
  file: string;
}) => {
  const addNFTConfig = {
    method: 'post',
    url: `/pinata/upload?file=${file}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {},
  };

  return axios(addNFTConfig);
};
