import {memebookApi} from "./memebookApi";
import {setScrapList} from "./action";
export const memeAction = (id) => async (dispatch) => {
  try {
    const wordDetailData = await memebookApi.wordScrapeUpdate(id);
    dispatch(setScrapList(wordDetailData))
  } catch (error) {
    console.error(error);
  }
};
