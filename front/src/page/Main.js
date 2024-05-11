import '../scss/page/main.scss';
import {Link} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import CountryChoice from "../modal/CountryChoice";
import NickName from "../modal/NickName";
import {memebookApi} from "../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {nationCheckData} from "../util/action/nationAction";
import Header from "../components/Header";
import {myWordListData, wordListData} from "../util/action/wordAction";
import {scrapListData} from "../util/action/scrapAction";

export default function Main() {
  const dispatch = useDispatch();
  const wordList = useSelector(state => state.meme.wordList);
  const nationCheck = useSelector(state => state.meme.nationCheck);
  const scrapList = useSelector(state => state.meme.scrapList);
  const myWordList = useSelector(state => state.meme.myWordList);
  const [memberIdx, setMemberIdx] = useState(321);
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [studyCountryType, setStudyCountryType] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameSave, setNicknameSave] = useState('');
  const [libraryData, setLibraryData] = useState([]);
  useEffect(() => {
    dispatch(wordListData('ALL', 1));
    dispatch(nationCheckData(memberIdx));
    dispatch(scrapListData(memberIdx));
    dispatch(myWordListData(memberIdx));
    console.log(wordList);

  }, []);

  useEffect(() => {
    if (wordList && wordList.wordList) {
      setLibraryData(wordList.wordList);
      console.log(wordList.wordList)
    }
  }, [wordList]);

  // 닉네임 설정 모달
  const nickNameClose = ({nickNameClose}) => {
    setNicknameModalOpen(!nicknameModalOpen);
    setNicknameSave(nickname);

    nickNamePost();
  }

  async function nickNamePost() {
    try {
      const nickNameApi = await memebookApi.nickName(nickname);
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


  return (
    <>
      <Header searchState="searchNone"></Header>

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

      <div className="main_wrap">

        <div className="container">
         <div className="main_top">
           <div className="user_country_box">
             {
               studyCountryType === '' && (
                 <span className="country_badge">언어 선택 하셨나요?</span>
               )
             }
             <button type="button" className={`user_country ${studyCountryType}`} onClick={countryChoiceClose}>
               <span className="blind">나라 선택</span>
             </button>
           </div>
           <p>Let's Find Your Words!</p>

           {
             nicknameSave && (
               <>{nicknameSave}님<br/></>
             )
           }
           <div className="search_box">
             <input type="text" className="text_input" placeholder="단어를 검색해보세요"/>
           </div>
         </div>

          <div className="main_con">

            <div className="popular_box">
              <h3 className="tit">💡 오늘 하루 인기 검색어 TOP </h3>

              <ul className="popular_list">
                {
                  libraryData?.map((item, idx) => {
                    return (
                      <li>
                        <Link to={`/vocabulary/wordInfo/${item.wordIdx}`} className="keyword">
                          {item.wordName}
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            <ul className="check_list">
              <li className="list word">

                  {
                    myWordList.wordContentList?.length === 0 && (
                      <Link to="/profile/my_list" className="link">
                        아직 등록한 단어가 없어요
                      </Link>
                    )
                  }
                  {
                    myWordList.wordContentList?.length > 0 && (
                      <Link to="/profile/my_list" className="link">
                        지금까지 <strong>{myWordList.wordContentList?.length}</strong>개의 단어에 참여했어요
                      </Link>
                    )
                  }


              </li>


              <li className="list scrape">
                {
                  scrapList.content?.length === 0 && (
                    <Link to="/profile/scrape" className="link">
                      아직 스크랩한 단어가 없어요 &#128172;
                    </Link>
                  )
                }
                {
                  scrapList.content?.length > 0 && (
                    <Link to="/profile/scrape" className="link">
                      지금까지 <strong>{scrapList.content?.length}</strong>개의 단어를 등록했어요
                    </Link>
                  )
                }
              </li>
              <li className="list visit">
                <p className="link">
                  연속 방문 최대 <strong>12</strong>번을 달성했어요
                </p>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </>
  );
}
