import axios from 'axios';

const request = axios.create({
  baseURL: `https://api.memebook.co.kr/api/`,
})

export const memebookApi = {


  // 전체 단어 리스트 조회
  wordList : (country, pageNumber) => request.get(`word/list?nation=${country}&page=${pageNumber}`),
  // 단어 디테일 조회
  wordDetail : (wordIdx, memberIdx) => request.get(`word/${wordIdx}?memberIdx=${memberIdx}`),
  // 단어 추가
  wordAdd : (addList) => request.post(`word/create`, addList),
  // 설명 수정
  wordModifyApi : (wordInfo) => request.put(`word/update`, wordInfo),
  // 설명 삭제
  wordDelete : (wordContentIdx) => request.delete(`word/delete?wordContentIdx=${wordContentIdx}`),
  // 내가 쓴 단어 조회
  wordAddList : (memberIdx) => request.get(`word/list/${memberIdx}`),



  /* 정렬 */
  wordSort : (country, sort, sortBy) => request.get(`word/list?nation=${country}&sort=${sort}&sortBy=${sortBy}`),
  /* 스크랩 */
  wordScrap : (wordInfo) => request.post(`scrap/word`, wordInfo),
  wordScrapeUpdate : (memberIdx) => request.get(`scrap/word/list/${memberIdx}`),
  wordScrapDelete : (wordIdx) => request.delete(`scrap/word?scrapIdx=${wordIdx}`),

  wordReactionUpdate : (update) => request.post(`reaction/word/update`, update),


  /* 좋아요 */
  wordReactionCount : (wordIdx) => request.get(`reaction/count?wordIdx=${wordIdx}`),

  wordReaction : (wordIdx) => request.get(`reaction/count?wordIdx=${wordIdx}`),
  ninkName : (nickname) => request.post(`member/create/nickname?nickname=${nickname}`)
}