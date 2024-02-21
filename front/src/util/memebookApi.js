import axios from 'axios';

const request = axios.create({
  // baseURL: `https://api.memebook.co.kr/`,
})

export const memebookApi = {
  wordList : (country) => request.get(`api/word/list/${country}`)
}