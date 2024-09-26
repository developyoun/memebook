import {useSelector} from "react-redux";
import createRequest from "./request";
import axios from "axios";

const getRequest = axios.create({
  baseURL: `https://memebook.co.kr/api/`,
})

export const memebookApi = (userIdx) => {
  const request = createRequest(userIdx);
  return {
    // 회원 생성
    memberAddApi : (memberInfo) => request.post(`member/create`, memberInfo),
    // 회원 국가 조회
    nationCheckApi : (memberIdx) => getRequest.get(`member/nation?memberIdx=${memberIdx}`),
    // 회원 국가 변경
    nationModifyApi : (nationInfo) => request.put(`member/update/nation`, nationInfo),
    // 닉네임 생성
    nickNameAddApi : (nickname) => request.post(`member/create/nickname?nickname=${nickname}`),
    // 닉네임 중복 조회
    nickNameCheckApi : (nickname) => getRequest.get(`member/exist/nickname?nickname=${nickname}`),

    // 게시글 등록
    postAddApi : (postInfo) => request.post(`article/create`, postInfo),
    // 게시글 리스트
    postListApi : () => getRequest.get(`article/list`),
    // 게시글 상세
    postDetailApi : (postIdx) => getRequest.get(`article/detail/${postIdx}`),
    // 게시글 수정
    postModifyApi : (articleIdx, postIdx) => request.put(`article/update/${articleIdx}`, postIdx),
    // 게시글 좋아요
    postReactionApi : (postIdx) => request.post(`article/like`, postIdx),
    // 게시글 삭제
    postDeleteApi : (postIdx) => request.delete(`article/delete?articleIdx=${postIdx}`),
    // 게시글 삭제
    postAllDeleteApi : (memberIdx) => request.delete(`article/delete/all?memberIdx=${memberIdx}`),

    // 댓글 리스트
    commentListApi : (memberIdx) => getRequest.get(`comment/list/${memberIdx}`),
    // 댓글 수정
    commentModifyApi : (commentIdx) => request.put(`comment/update`, commentIdx),
    // 댓글 좋아요
    commentReactionApi : (commentIdx) => request.post(`comment/like`, commentIdx),
    // 댓글 등록
    commentAddApi : (commentInfo) => request.post(`comment/create`, commentInfo),
    // 댓글 삭제
    commentDeleteApi : (commentIdx,) => request.delete(`comment/delete?commentIdx=${commentIdx}`),

    // 전체 단어 리스트 조회
    wordListApi : (pageNumber) => getRequest.get(`word/list?page=${pageNumber}`),
    // 전체 단어 리스트 조회
    wordSearchApi : (searchWord) => getRequest.get(`word/list?search=${searchWord}`),
    // 단어 정렬
    wordSortApi : (country, sort, sortBy) => getRequest.get(`word/list?nation=${country}&sort=${sort}`),
    // 내가 쓴 단어 리스트 조회
    myWordListApi : (memberIdx) => getRequest.get(`word/list/${memberIdx}`),
    // 단어 디테일 조회
    wordDetailApi : (wordIdx, memberIdx) => getRequest.get(`word/${wordIdx}?memberIdx=${memberIdx}`),

    // 단어 추가
    wordAddApi : (addList) => request.post(`word/create`, addList),
    // 설명 수정
    wordModifyApi : (wordInfo) => request.put(`word/update`, wordInfo),
    // 설명 삭제
    wordDeleteApi : (wordContentIdx) => request.delete(`word/delete?wordContentIdx=${wordContentIdx}`),

    // 스크랩 조회
    wordScrapeUpdateApi : (memberIdx) => getRequest.get(`scrap/word/list/${memberIdx}`),
    // 스크랩 등록
    wordScrapAddApi : (wordInfo) => request.post(`scrap/word`, wordInfo),
    // 스크랩 삭제
    wordScrapDeleteApi : (wordIdx) => request.delete(`scrap/word?scrapIdx=${wordIdx}`),

    // 좋아요, 싫어요 조회
    wordReactionUpdateApi : (update) => request.post(`reaction/word/update`, update),
    // 좋아요, 싫어요 횟수
    wordReactionCountApi : (wordIdx) => getRequest.get(`reaction/count?wordIdx=${wordIdx}`),

    // 팔로워 상태
    followerStateApi : (memberIdx, otherMemberIdx) => getRequest.get(`follow/follow?me=${memberIdx}&other=${otherMemberIdx}`),
    // 팔로워 추가
    followerAddApi : (memberIdx) => request.post(`follow/update`, memberIdx),
    // 팔로워 리스트
    followerListApi : (memberIdx) => getRequest.get(`follow/follower/list?memberIdx=${memberIdx}`),
    // 팔로잉 리스트
    followeeListApi : (memberIdx) => getRequest.get(`follow/followee/list?memberIdx=${memberIdx}`),
  }

}