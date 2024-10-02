import {userIdxAction} from "../action";
import {memebookApi} from "../memebookApi";

export const userIdxData = (userIdx) => async (dispatch) => {
  try {
    await memebookApi().loginApi({
      "code": userIdx
    });
  } catch (error) {
    console.error(error);
  }
};