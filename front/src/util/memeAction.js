import {memebookApi} from "./memebookApi";
import {setScrapList} from "./action";
export const memeAction = () => async (dispatch) => {
  try {
    const wordDetailData = await memebookApi.wordScrapeUpdate(123);
    dispatch(setScrapList(wordDetailData))
  } catch (error) {
    console.error(error);
  }
};
