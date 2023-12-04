import {useEffect, useState} from "react";
import './../../scss/countryChoice.scss'

export default function CountryChoice({countryChoiceClose, selectedCountryType }) {
  const [nativeCountryType, setNativeCountryType] = useState('');
  const [studyCountryType, setStudyCountryType] = useState('');

  // 모국어
  const nativeCountryChange = (state) => {
    setNativeCountryType(state);
  }

  // 배울언어
  const studyCountryChange = (state) => {
    setStudyCountryType(state);
  }
  const handleSave = () => {
    countryChoiceClose({ selectedCountryType });
  }

  return (
    <div className="modalBox">
      <div className="inner">
        <div className="con">
          <h2 className="title">언어를 선택해주세요</h2>
          <div className="country_state">
            <div className="state_box">
              <h5 className="country_txt">모국어</h5>
              <div className={`state ${nativeCountryType}`}>
                <span className="blind">모국어/native language</span>
              </div>
              <span  className="txt">대한민국</span>
              <ul className="country_list">
                <li>
                  <button type="button" className="state korean" onClick={() => nativeCountryChange('korean')}>
                    <span className="blind">모국어/native language</span>
                  </button>

                </li>
                <li>
                  <button type="button" className="state english" onClick={() => nativeCountryChange('english')}>
                    <span className="blind">모국어/native language</span>
                  </button>
                </li>
                <li>
                  <button type="button" className="state japanese" onClick={() => nativeCountryChange('japanese')}>
                    <span className="blind">모국어/native language</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="state_box">
              <h5 className="country_txt">배울 언어</h5>
              <div className={`state ${studyCountryType}`}>
                <span className="blind">배울 언어/study language</span>
              </div>
              <span  className="txt">일본</span>
              <ul className="country_list">
                <li>
                  <button type="button" className="state korean" onClick={() => studyCountryChange('korean')}>
                    <span className="blind">모국어/native language</span>
                  </button>
                </li>
                <li>
                  <button type="button" className="state english" onClick={() => studyCountryChange('english')}>
                    <span className="blind">모국어/native language</span>
                  </button>
                </li>
                <li>
                  <button type="button" className="state japanese" onClick={() => studyCountryChange('japanese')}>
                    <span className="blind">모국어/native language</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="btn_btm">
            <button type="button" className="country_save" onClick={handleSave}>저장</button>
          </div>
          <button type="button" className="btn_close" onClick={countryChoiceClose}>
            <span className="blind">닫기</span>
          </button>
        </div>
      </div>
    </div>
  )
}