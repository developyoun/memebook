
const initialState = {
  scrapList : [],
  wordList : [],
  myWordList : [],
};

const memeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEND_WORD_LIST":
      return {
        ...state,
        wordList: action.payload,
      };
    case "SEND_WORD_SORT":
      return {
        ...state,
        wordSort: action.payload,
      };
    case "SEND_MY_WORD_LIST":
      return {
        ...state,
        myWordList: action.payload,
      };
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
