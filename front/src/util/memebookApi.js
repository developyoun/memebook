import axios from 'axios';

const request = axios.create({
  baseURL: `https://api.memebook.co.kr/api/`,
})

export const memebookApi = {
  // 회원 생성
  memberAddApi : (memberInfo) => request.post(`member/create`, memberInfo),
  // 회원 국가 조회
  nationCheckApi : (memberIdx) => request.get(`member/nation?memberIdx=${memberIdx}`),
  // 회원 국가 변경
  nationModifyApi : (nationInfo) => request.put(`member/update/nation`, nationInfo),
  // 닉네임 생성
  nickNameAddApi : (nickname) => request.post(`member/create/nickname?nickname=${nickname}`),
  // 닉네임 중복 조회
  nickNameCheckApi : (nickname) => request.get(`member/exist/nickname?nickname=${nickname}`),

  // 게시글 등록
  postAddApi : (postInfo) => request.post(`article/create`, postInfo),
  // 게시글 리스트
  postListApi : (memberIdx) => request.get(`article/list?${memberIdx}`),
  // 게시글 상세
  postDetailApi : (postIdx) => request.get(`article/detail/${postIdx}`),
  // 게시글 수정
  postModifyApi : (articleIdx, postIdx) => request.put(`article/update/${articleIdx}`, postIdx),
  // 게시글 좋아요
  postReactionApi : (postIdx) => request.post(`article/like`, postIdx),
  // 게시글 삭제
  postDeleteApi : (postIdx, memberIdx) => request.delete(`article/delete/${postIdx}?reqMemIdx=${memberIdx}`),

  // 댓글 리스트
  commentListApi : (memberIdx) => request.get(`comment/list/${memberIdx}`),
  // 댓글 수정
  commentModifyApi : (commentIdx) => request.put(`comment/update`, commentIdx),
  // 댓글 좋아요
  commentReactionApi : (commentIdx) => request.post(`comment/like`, commentIdx),
  // 댓글 등록
  commentAddApi : (commentInfo) => request.post(`comment/create`, commentInfo),
  // 댓글 삭제
  commentDeleteApi : (commentIdx, memberIdx) => request.delete(`comment/delete/${commentIdx}?reqMemIdx=${memberIdx}`),

  // 전체 단어 리스트 조회
  wordListApi : (country, pageNumber) => request.get(`word/list?page=${pageNumber}`),
  // 전체 단어 리스트 조회
  wordSearchApi : (searchWord) => request.get(`word/list?search=${searchWord}`),
  // 단어 정렬
  wordSortApi : (country, sort, sortBy) => request.get(`word/list?nation=${country}&sort=${sort}&sortBy=${sortBy}`),
  // 내가 쓴 단어 리스트 조회
  myWordListApi : (memberIdx) => request.get(`word/list/${memberIdx}`),
  // 단어 디테일 조회
  wordDetailApi : (wordIdx, memberIdx) => request.get(`word/${wordIdx}?memberIdx=${memberIdx}`),

  // 단어 추가
  wordAddApi : (addList) => request.post(`word/create`, addList),
  // 설명 수정
  wordModifyApi : (wordInfo) => request.put(`word/update`, wordInfo),
  // 설명 삭제
  wordDeleteApi : (wordContentIdx) => request.delete(`word/delete?wordContentIdx=${wordContentIdx}`),

  // 스크랩 조회
  wordScrapeUpdateApi : (memberIdx) => request.get(`scrap/word/list/${memberIdx}`),
  // 스크랩 등록
  wordScrapAddApi : (wordInfo) => request.post(`scrap/word`, wordInfo),
  // 스크랩 삭제
  wordScrapDeleteApi : (wordIdx) => request.delete(`scrap/word?scrapIdx=${wordIdx}`),

  // 좋아요, 싫어요 조회
  wordReactionUpdateApi : (update) => request.post(`reaction/word/update`, update),
  // 좋아요, 싫어요 횟수
  wordReactionCountApi : (wordIdx) => request.get(`reaction/count?wordIdx=${wordIdx}`),

  // 팔로워 상태
  followerStateApi : (memberIdx, otherMemberIdx) => request.get(`follow/follow?me=${memberIdx}&other=${otherMemberIdx}`),
  // 팔로워 추가
  followerAddApi : (memberIdx) => request.post(`follow/update`, memberIdx),
  // 팔로워 리스트
  followerListApi : (memberIdx) => request.get(`follow/follower/list?memberIdx=${memberIdx}`),
  // 팔로잉 리스트
  followeeListApi : (memberIdx) => request.get(`follow/followee/list?memberIdx=${memberIdx}`),
}