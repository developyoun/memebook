import {memebookApi} from "../memebookApi";
import {myWordListAction} from "../action";

// 내가 등록한 단어 리스트
export const myScrapListData = (memberIdx) => async (dispatch) => {
  try {
    const myScrapListData = await memebookApi.myWordList(memberIdx);
    dispatch(myWordListAction(myScrapListData));
    console.log(myScrapListData);
  } catch (error) {
    console.error(error);
  }
};
