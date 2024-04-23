import {memebookApi} from "../memebookApi";
import {wordListAction, myWordListAction, wordSortAction} from "../action";

// 단어 리스트
export const wordListData = (id, memberIdx) => async (dispatch) => {
  try {
    const wordListData = await memebookApi.wordList(id, memberIdx);
    dispatch(wordListAction(wordListData));
  } catch (error) {
    console.error(error);
  }
};

// 단어 정렬
export const wordSortData = (word) => async (dispatch) => {
  try {
    let wordSortData;
    switch (word) {
      case 'LIKE' :
        wordSortData = await memebookApi.wordSort('ALL', word, 'ASC');
        break;
      case 'DISLIKE' :
        wordSortData = await memebookApi.wordSort('ALL', word, 'ASC');
        break;
      case 'LATEST' :
        wordSortData = await memebookApi.wordSort('ALL', word, 'ASC');
        break;
    }
    dispatch(wordSortAction(wordSortData));
  } catch (error) {
    console.error(error);
  }
};


// 내가 등록한 단어 리스트
export const myWordListData = (memberIdx) => async (dispatch) => {
  try {
    const myWordListData = await memebookApi.myWordList(memberIdx);
    dispatch(myWordListAction(myWordListData));
  } catch (error) {
    console.error(error);
  }
};

