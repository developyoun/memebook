
// 스크랩 리스트
export const scrapListAction = (data) => {
  return {
    type: "SEND_SCRAP",
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
