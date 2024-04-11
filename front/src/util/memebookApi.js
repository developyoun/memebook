import axios from 'axios';

const request = axios.create({
  baseURL: `https://api.memebook.co.kr/api/`,
})

export const memebookApi = {
  wordAdd : (addList) => request.post(`word/create`, addList),

  wordList : (country, pageNumber) => request.get(`word/list?nation=${country}&page=${pageNumber}`),

  wordDetail : (wordIdx) => request.get(`word/${wordIdx}`),

  wordModifyApi : (wordInfo) => request.put(`word/update`, wordInfo),

  wordAddList : (memberIdx) => request.get(`word/list/${memberIdx}`),

  wordDelete : (wordContentIdx) => request.delete(`word/delete?wordContentIdx=${wordContentIdx}`),

  /* 정렬 */
  wordSort : (country, sort, sortBy, memberIdx) => request.get(`word/list?nation=${country}&sort=${sort}&sortBy=${sortBy}&memberIdx=${memberIdx}`),
  /* 스크랩 */
  wordScrape : (wordInfo) => request.post(`scrap/word`, wordInfo),
  wordScrapeUpdate : (memberIdx) => request.get(`scrap/word/list/${memberIdx}`),

  wordReactionUpdate : (update) => request.post(`reaction/update`, update),

  wordScrapeDelete : (wordIdx, memberIdx) => request.delete(`scrap/delete?scrapIdx=${wordIdx}&memberIdx=${memberIdx}`),

  wordReaction : (wordIdx) => request.get(`reaction/count?wordIdx=${wordIdx}`),
  ninkName : (nickname) => request.post(`member/create/nickname?nickname=${nickname}`)
}