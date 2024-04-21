
const initialState = {
  scrapList: []
};

const memeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_SCRAP_LIST":
      return {
        ...state,
        scrapList: action.payload,
      };
    case "SEND_SCRAP_ADD":
      return {
        ...state,
        scrapList: action.payload,
      };
    case "SEND_SCRAP_DELETE":
      return {
        ...state,
        scrapList: action.payload,
      };
    default:
      return state;
  }
};


export default memeReducer;
