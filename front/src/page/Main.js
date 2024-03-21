import './../scss/main.scss';
import {Link} from 'react-router-dom';
import {useEffect, useState} from "react";
import HomeFooter from "../components/HomeFooter";
import CountryChoice from "../components/modal/CountryChoice";
import NickName from "../components/modal/NickName";
import {memebookApi} from "../util/memebookApi";

export default function Main() {
  const [nicknameModalOpen, setNicknameModalOpen] = useState(true);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [studyCountryType, setStudyCountryType] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameSave, setNicknameSave] = useState('');

  // 닉네임 설정 모달
  const nickNameClose = ({nickNameClose}) => {
    setNicknameModalOpen(!nicknameModalOpen);
    setNicknameSave(nickname);
    console.log(nickname);
    nickNamePost();
  }

  async function nickNamePost() {
    try {
      const nickNameApi = await memebookApi.ninkName(nickname);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  const nickNameValue = (event) => {
    setNickname(event.target.value);
  }

  // 모달 열고 닫히기
  const countryChoiceClose = ({}) => {
    setCountryModalOpen(!countryModalOpen);
  }

  // 선택한 언어 저장
  const studyCountrySave = (selectType) => {
    setStudyCountryType(selectType);
    setCountryModalOpen(!countryModalOpen);
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <>
      {
        countryModalOpen && (
          <CountryChoice countryChoiceClose={countryChoiceClose} selectType={studyCountrySave}></CountryChoice>
        )
      }

      {
        nicknameModalOpen && (
          <NickName nickNameAdd={nickNameClose} nickNameInput={nickNameValue}></NickName>
        )
      }

      <div className="main">

        <div className="container">
          <div className="main_top">
            {
              studyCountryType === '' && (
                <span className="country_badge">언어 선택 하셨나요?</span>
              )
            }
            <button type="button" className={`user_country ${studyCountryType}`} onClick={countryChoiceClose}>
              <span className="blind">나라 선택</span>
            </button>
            {
              nicknameSave && (
               <>{nicknameSave}님<br/></>
              )
            }
            Let's Find Your<br/>Words!
          </div>

          <div className="search_box">
            <input type="text" className="text_input" placeholder="단어를 검색해보세요"/>
          </div>

          <div className="popular_box">
            <h3 className="tit">💡 오늘 하루 인기 검색어 TOP </h3>
            <ul className="popular_list">
              <li>
                <a href="" className="keyword">
                  인싸
                </a>
              </li>
            </ul>
          </div>

          <ul className="check_list">
            <li className="list">
              <Link to="" className="link">
                &#128394; 지금까지 <strong>3</strong>개의 단어를 등록했어요
              </Link>
            </li>
            <li className="list">
              <Link to="" className="link">
                &#127775; 아직 스크랩한 단어가 없어요
              </Link>
            </li>
            <li className="list visit">
              <p className="link">
                &#127969; 연속 방문 최대 <strong>12</strong>번을 달성했어요
              </p>
            </li>
          </ul>
        </div>
      </div>

      <HomeFooter></HomeFooter>

    </>
  );
}
