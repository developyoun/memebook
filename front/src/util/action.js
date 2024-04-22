// 전체 단어 리스트
export const wordListAction = (data) => {
  return {
    type: "SEND_WORD_LIST",
    payload: data.data
  };
};
// 전체 단어 리스트
export const wordSortAction = (data) => {
  return {
    type: "SEND_WORD_SORT",
    payload: data.data
  };
};

// 내가 쓴 단어 리스트
export const myWordListAction = (data) => {
  return {
    type: "SEND_MY_WORD_LIST",
    payload: data.data
  };
};

// 스크랩 리스트
export const scrapListAction = (data) => {
  return {
    type: "SEND_SCRAP_LIST",
    payload: data.data
  };
};


// 스크랩 삭제
export const scrapAddAction = (data) => {
  return {
    type: "SEND_SCRAP_ADD",
    payload: data.data
  };
};

// 스크랩 삭제
export const scrapDeleteAction = (data) => {
  return {
    type: "SEND_SCRAP_DELETE",
    payload: data.data
  };
};

