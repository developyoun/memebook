

const memeReducer = (state, action) => {
  switch (action.type) {
    case "SEND_SCRAPE":
      return {
        ...state,
        scrapeData: action.payload,
      };
    default:
      return state;
  }
};
export default memeReducer;