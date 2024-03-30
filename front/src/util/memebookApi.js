import axios from 'axios';

const request = axios.create({
  baseURL: `https://api.memebook.co.kr/api/`,
})

export const memebookApi = {
  wordAdd : (addList) => request.post(`word/create`, addList),
  wordList : (country, pageNumber) => request.get(`word/list/${country}?page=${pageNumber}`),
  wordReactionUpdate : (update) => request.post(`reaction/update`, update),
  wordReaction : (wordIdx) => request.get(`reaction/count?wordIdx=${wordIdx}`),
  ninkName : (nickname) => request.post(`member/create/nickname?nickname=${nickname}`)
}