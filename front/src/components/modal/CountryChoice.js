import '../../scss/modal/countryChoice.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setNativeCountryType, setStudyCountryType, setNativeCountryTxt, setStudyCountryTxt } from './../../util/action';

export default function CountryChoice({ countryChoiceClose, selectType }) {
  const dispatch = useDispatch();
  // 모국어와 배울 언어 계속 저장
  const nativeCountryType = useSelector(state => state.nativeCountryType);
  const nativeCountryTxt = useSelector(state => state.nativeCountryTxt);
  const studyCountryType = useSelector(state => state.studyCountryType);
  const studyCountryTxt = useSelector(state => state.studyCountryTxt);
  
  // 모국어
  const nativeCountryChange = (type, txt) => {
    dispatch(setNativeCountryType(type));
    dispatch(setNativeCountryTxt(txt));
  }
  
  // 선택한 언어
  const studyCountryChange = (type, txt) => {
    dispatch(setStudyCountryType(type));
    dispatch(setStudyCountryTxt(txt));
  }

  // 선택한 언어 밖으로
  const countrySave = () => {
    selectType(studyCountryType);
  }
  
  return (
    <div className="modalBox">
      <div className="inner">
        <h2 className="title">언어를 선택해주세요</h2>
        <div className="country_state">
          <div className="state_box">
            <h5 className="country_txt">모국어</h5>

            {/* 선택된 언어 */}
            <div className={`state ${nativeCountryType}`}>
              <span className="blind">모국어/native language</span>
            </div>

            {/* 언어 이름 */}
            <span  className="txt">{nativeCountryTxt ? nativeCountryTxt : '선택'}</span>

            {/* 언어 리스트 */}
            <ul className="country_list">
              <li>
                <button type="button" className="state korean" onClick={() => nativeCountryChange('korean', '한국')}>
                  <span className="blind">모국어/native language</span>
                </button>

              </li>
              <li>
                <button type="button" className="state english" onClick={() => nativeCountryChange('english', '미국')}>
                  <span className="blind">모국어/native language</span>
                </button>
              </li>
              <li>
                <button type="button" className="state japanese" onClick={() => nativeCountryChange('japanese', '일본')}>
                  <span className="blind">모국어/native language</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="state_box">
            <h5 className="country_txt">학습할 언어</h5>

            {/* 선택된 언어 */}
            <div className={`state ${studyCountryType}`}>
              <span className="blind">학습할 언어/study language</span>
            </div>

            {/* 언어 이름 */}
            <span  className="txt">{studyCountryTxt ? studyCountryTxt : '선택'}</span>

            {/* 언어 리스트 */}
            <ul className="country_list">
              <li>
                <button type="button" className="state korean" onClick={() => studyCountryChange('korean', '한국')}>
                  <span className="blind">모국어/native language</span>
                </button>
              </li>
              <li>
                <button type="button" className="state english" onClick={() => studyCountryChange('english', '미국')}>
                  <span className="blind">모국어/native language</span>
                </button>
              </li>
              <li>
                <button type="button" className="state japanese" onClick={() => studyCountryChange('japanese', '일본')}>
                  <span className="blind">모국어/native language</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <p className="country_notice">학습할 언어를 기반으로<br/>단어 등록 및 사전 세팅이 되어요</p>
        <div className="btn_btm">
          <button type="button" className="country_save" onClick={countrySave}>저장</button>
        </div>
        <button type="button" className="btn_close" onClick={countryChoiceClose}>
          <span className="blind">닫기</span>
        </button>
      </div>
    </div>
  )
}