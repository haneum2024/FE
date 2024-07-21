import {base64ToBlob} from 'base64-blob';

export const convertBase64ToBlob = async (base64: string, fileName: string) => {
  const base64Url = `data:${fileName};base64,` + base64;
  return await base64ToBlob(base64Url);
};
