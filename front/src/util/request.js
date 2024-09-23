import axios from 'axios';
import { API_URL } from './../config';

const createRequest = (userIdx) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: userIdx
    }
  });
};

export default createRequest;