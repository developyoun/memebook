import {memebookApi} from "../memebookApi";
import {commentListAction, postDetailAction, postListAction} from "../action";

// 포스트 리스트 조회
export const postListData = (pageNumber) => async (dispatch) => {
  try {
    const postListData = await memebookApi().postListApi(pageNumber);
    dispatch(postListAction(postListData));
  } catch (error) {
    console.error(error);
  }
};

// 포스트 리스트 조회
export const postSortData = (pageNumber, tab) => async (dispatch) => {
  try {
    const postListData = await memebookApi().wordSortApi(pageNumber, tab);
    dispatch(postListAction(postListData));
  } catch (error) {
    console.error(error);
  }
};


// 포스트 상세 조회
export const postDetailData = (articleIdx) => async (dispatch) => {
  try {
    const postDetailData = await memebookApi().postDetailApi(articleIdx);
    dispatch(postDetailAction(postDetailData));
  } catch (error) {
    console.error(error);
  }
};

// 댓글조회
export const postCommentData = (memberIdx) => async (dispatch) => {
  try {
    const postCommentData = await memebookApi().commentListApi(memberIdx);
    dispatch(commentListAction(postCommentData));
  } catch (error) {
    console.error(error);
  }
};
