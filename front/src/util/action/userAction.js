import {memebookApi} from "../memebookApi";
import {userIdxAction} from "../action";
import {useSelector} from "react-redux";

export const userIdxData = () => async (dispatch) => {
  try {
    const userIdx = useSelector((state) => state.meme.userIdx);
    dispatch(userIdxAction(userIdx));
  } catch (error) {
    console.error(error);
  }
};