import {memebookApi} from "../memebookApi";
import {userIdxAction} from "../action";

export const userIdxData = () => async (dispatch) => {
  try {
    const userIdxData = 123;
    dispatch(userIdxAction(userIdxData));
  } catch (error) {
    console.error(error);
  }
};