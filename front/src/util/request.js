import axios from 'axios';
import { API_URL } from './../config';

const createRequest = (userIdx) => {
  console.log(userIdx)
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: userIdx,
      key: "Cross-Origin-Opener-Policy",
      value: "same-origin-allow-popups",
    }
  });
};

export default createRequest;