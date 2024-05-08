import axios from 'axios';

const request = axios.create({
  baseURL: `https://api.memebook.co.kr/api/`,
})

export const memebookApi = {
  // 닉네임 생성
  nickName : (nickname) => request.post(`member/create/nickname?nickname=${nickname}`),
  // 닉네임 중복 조회
  nickNameCheck : (nickname) => request.get(`member/exist/nickname?nickname=${nickname}`),

  // 회원 국가 조회
  nationCheck : (memberIdx) => request.get(`member/nation?memberIdx=${memberIdx}`),
  // 회원 국가 변경
  nationChange : (nationInfo) => request.put(`member/update/nation`, nationInfo),

  // 전체 단어 리스트 조회
  wordList : (country, pageNumber) => request.get(`word/list?nation=${country}&page=${pageNumber}`),
  // 단어 정렬
  wordSort : (country, sort, sortBy) => request.get(`word/list?nation=${country}&sort=${sort}&sortBy=${sortBy}`),
  // 내가 쓴 단어 리스트 조회
  myWordList : (memberIdx) => request.get(`word/list/${memberIdx}`),
  // 단어 디테일 조회
  wordDetail : (wordIdx, memberIdx) => request.get(`word/${wordIdx}?memberIdx=${memberIdx}`),

  // 단어 추가
  wordAdd : (addList) => request.post(`word/create`, addList),
  // 설명 수정
  wordModifyApi : (wordInfo) => request.put(`word/update`, wordInfo),
  // 설명 삭제
  wordDelete : (wordContentIdx) => request.delete(`word/delete?wordContentIdx=${wordContentIdx}`),

  // 스크랩 조회
  wordScrapeUpdate : (memberIdx) => request.get(`scrap/word/list/${memberIdx}`),
  // 스크랩 등록
  wordScrap : (wordInfo) => request.post(`scrap/word`, wordInfo),
  // 스크랩 삭제
  wordScrapDelete : (wordIdx) => request.delete(`scrap/word?scrapIdx=${wordIdx}`),

  // 좋아요, 싫어요 조회
  wordReactionUpdate : (update) => request.post(`reaction/word/update`, update),
  // 좋아요, 싫어요 횟수
  wordReactionCount : (wordIdx) => request.get(`reaction/count?wordIdx=${wordIdx}`),

  // 팔로워 추가
  followerAdd : (memberIdx) => request.post(`follow/update`, memberIdx),
  // 팔로워 리스트
  followerStateApi : (memberIdx) => request.get(`follow/list?memberIdx=${memberIdx}`),
}