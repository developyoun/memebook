import {memebookApi} from "../memebookApi";
import {postListAction} from "../action";

// 포스트 리스트 조회
export const postListData = () => async (dispatch) => {
  try {
    const postListData = await memebookApi.postListApi();
    dispatch(postListAction(postListData));
  } catch (error) {
    console.error(error);
  }
};
