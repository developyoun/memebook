import {memebookApi} from "../memebookApi";
import {commentListAction, postDetailAction, postListAction} from "../action";

// 포스트 리스트 조회
export const postListData = () => async (dispatch) => {
  try {
    const postListData = await memebookApi().postListApi();
    dispatch(postListAction(postListData));
    console.log()
  } catch (error) {
    console.error(error);
  }
};


// 포스트 상세 조회
export const postDetailData = (articleIdx) => async (dispatch) => {
  try {
    const postDetailData = await memebookApi.postDetailApi(articleIdx);
    dispatch(postDetailAction(postDetailData));
  } catch (error) {
    console.error(error);
  }
};

// 댓글조회
export const postCommentData = (memberIdx) => async (dispatch) => {
  try {
    const postCommentData = await memebookApi.commentListApi(memberIdx);
    dispatch(commentListAction(postCommentData));
  } catch (error) {
    console.error(error);
  }
};
