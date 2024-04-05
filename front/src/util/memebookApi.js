import axios from 'axios';

const request = axios.create({
  baseURL: `https://api.memebook.co.kr/api/`,
})

export const memebookApi = {
  wordAdd : (addList) => request.post(`word/create`, addList),
  wordList : (country, pageNumber) => request.get(`word/list?nation=${country}&page=${pageNumber}`),
  wordDetail : (wordIdx) => request.get(`word/${wordIdx}`),
  wordSort : (country, sort, sortBy) => request.get(`word/list?nation=${country}&sort=${sort}&sortBy=${sortBy}`),
  wordScrape : (wordInfo) => request.post(`scrap/word`, wordInfo),
  wordScrapeUpdate : (memberIdx) => request.get(`scrap/word/list/${memberIdx}`),
  wordReactionUpdate : (update) => request.post(`reaction/update`, update),
  wordReaction : (wordIdx) => request.get(`reaction/count?wordIdx=${wordIdx}`),
  ninkName : (nickname) => request.post(`member/create/nickname?nickname=${nickname}`)
}