
// 스크랩
export const setScrapList = (data) => {
  return {
    type: "SEND_SCRAP",
    payload: data.data
  };
};
