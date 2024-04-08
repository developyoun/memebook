import { myScrapeList } from './action';
import { memebookApi } from "./memebookApi";

export const memeAction = () => async (dispatch) => {
  try {
    const myScrapeListData = await memebookApi.wordScrapeUpdate(123);
    dispatch(myScrapeList(myScrapeListData));
  } catch (error) {
    console.error(error);
  }
};