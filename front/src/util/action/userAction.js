import {userIdxAction} from "../action";

export const userIdxData = (userIdx) => async (dispatch) => {
  try {
    dispatch(userIdxAction(userIdx));
  } catch (error) {
    console.error(error);
  }
};