
const initialState = {
  scrapeList: []
};

const memeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_SCRAP":
      return {
        ...state,
        scrapeList: [action.payload],
      };
    default:
      return state;
  }
};


export default memeReducer;
