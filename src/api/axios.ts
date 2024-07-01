import axios, {AxiosInstance} from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://ec2-3-36-105-128.ap-northeast-2.compute.amazonaws.com:8080',
});

export default instance;
