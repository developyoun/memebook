
const initialState = {
  scrapList: []
};

const memeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_SCRAP":
      return {
        ...state,
        scrapList: action.payload,
      };
    default:
      return state;
  }
};


export default memeReducer;
