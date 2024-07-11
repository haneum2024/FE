import axios, {AxiosInstance} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://happy-maru.net',
});

export default instance;
