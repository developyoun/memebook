import {memebookApi} from "./memebookApi";
import {scrapListAction, scrapDeleteAction} from "./action";
export const scrapListData = (id) => async (dispatch) => {
  try {
    const scrapListData = await memebookApi.wordScrapeUpdate(id);
    dispatch(scrapListAction(scrapListData));

  } catch (error) {
    console.error(error);
  }
};
// 스크랩 삭제 액션
export const deleteScrap = (scrapIdx) => async (dispatch) => {
  try {
    const scrapDeleteData = await memebookApi.wordScrapDelete(scrapIdx);
    dispatch(scrapDeleteAction(scrapDeleteData));
  } catch (error) {
    console.error(error);
  }
};
