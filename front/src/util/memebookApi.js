import axios from 'axios';

const request = axios.create({
  baseURL: `https://api.memebook.co.kr/api/`,
})

export const memebookApi = {
  wordAdd : (a) => request.post(`word/create`,a),
  wordList : (country, pageNumber) => request.get(`word/list/${country}?page=${pageNumber}`),
  ninkName : (nickname) => request.post(`member/create/nickname?nickname=${nickname}`)
}