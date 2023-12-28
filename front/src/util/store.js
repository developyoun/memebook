import { createStore } from 'redux';

const initialState = {
  nativeCountryType: '',
  nativeCountryTxt: '',
  studyCountryType: '',
  studyCountryTxt: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NATIVE_COUNTRY_TYPE':
      return { ...state, nativeCountryType: action.payload };
    case 'SET_NATIVE_COUNTRY_TXT':
      return { ...state, nativeCountryTxt: action.payload };
    case 'SET_STUDY_COUNTRY_TYPE':
      return { ...state, studyCountryType: action.payload };
    case 'SET_STUDY_COUNTRY_TXT':
      return { ...state, studyCountryTxt: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
