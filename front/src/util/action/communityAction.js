import {memebookApi} from "../memebookApi";
import {postDetailAction, postListAction} from "../action";

// 포스트 리스트 조회
export const postListData = () => async (dispatch) => {
  try {
    const postListData = await memebookApi.postListApi();
    dispatch(postListAction(postListData));
    console.log(postListData)
  } catch (error) {
    console.error(error);
  }
};


// 포스트 상세 조회
export const postDetailData = (articleIdx) => async (dispatch) => {
  try {
    const postListData = await memebookApi.postDetailApi(articleIdx);
    dispatch(postDetailAction(postListData));
  } catch (error) {
    console.error(error);
  }
};
