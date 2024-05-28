import {memebookApi} from "../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {debounce} from 'lodash';
import {nationCheckData} from "../util/action/nationAction";
import {myWordListData, wordListData} from "../util/action/wordAction";
import {scrapListData} from "../util/action/scrapAction";
import {wordSearchData} from "../util/action/searchAction";
import Header from "../components/Header";
import CountryChoice from "../modal/CountryChoice";
import NickName from "../modal/NickName";
import '../scss/page/main.scss';
import HomeNav from "../components/HomeNav";

export default function Main() {
  const dispatch = useDispatch();
  // 검색
  const wordSearch = useSelector(state => state.meme.wordSearch);
  const [searchState, setSearchState] = useState(false);
  // 단어 인기 리스트
  const wordList = useSelector(state => state.meme.wordList);
  // 내가 등록한 글 리스트
  const postList = useSelector(state => state.meme.postList);
  // 댓글 리스트
  const myCommentList = useSelector(state => state.meme.myCommentList);
  // 닉네임
  const [nickname, setNickname] = useState('');
  const [nicknameSave, setNicknameSave] = useState('');
  // 나라 선택
  const nationCheck = useSelector(state => state.meme.nationCheck);
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [studyCountryType, setStudyCountryType] = useState('');
  // 스크랩 리스트
  const scrapList = useSelector(state => state.meme.scrapList);
  // 내 단어 리스트
  const myWordList = useSelector(state => state.meme.myWordList);

  const [memberIdx, setMemberIdx] = useState(123);

  useEffect(() => {
    dispatch(wordListData('ALL', 1));
    dispatch(nationCheckData(memberIdx));
    dispatch(scrapListData(memberIdx));
    dispatch(myWordListData(memberIdx));
  }, []);


  // 닉네임 설정 모달
  const nickNameClose = ({nickNameClose}) => {
    setNicknameModalOpen(!nicknameModalOpen);
    setNicknameSave(nickname);
    nickNamePost();
  }

  // 닉네임 입력
  const nickNameValue = (event) => {
    setNickname(event.target.value);
  }

  // 닉네임 설정
  async function nickNamePost() {
    try {
      const nickNameApi = await memebookApi.nickNameAddApi(nickname);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
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

  // 단어 검색
  const wordSearchApi = debounce((event) => {
    if (event.target.value.length > 0) {
      setSearchState(true);
      dispatch(wordSearchData(event.target.value));
    } else {
      setSearchState(false);
    }
  }, 500)

  return (
    <>
      <Header type="searchNone"></Header>

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
             <input type="text" className="text_input" placeholder="단어를 검색해보세요" onChange={wordSearchApi}/>
             {
               searchState && (
                 <ul className="search_list">
                   {
                     wordSearch?.wordList.length === 0 && (
                      <li>
                        <span className="list_none">검색에 맞는 단어가 없어요</span>
                      </li>
                     )
                   }
                   {
                     wordSearch?.wordList.length > 0 && wordSearch?.wordList.map((item, idx) => {
                       return (
                         <li key={idx}>
                           <Link to={`/vocabulary/wordInfo/${item.wordIdx}`}>
                             {item.wordName}
                           </Link>
                         </li>
                       )
                     })
                   }
                 </ul>
               )
             }

           </div>
         </div>

          <div className="main_con">

            <div className="popular_box">
              <h3 className="tit">💡 오늘 하루 인기 검색어 TOP </h3>

              <ul className="popular_list">
                {
                  wordList.wordList?.map((item, idx) => {
                    return (
                      <li key={idx}>
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
                      지금까지 <strong>{scrapList.content?.length}</strong>개의 단어에 참여했어요
                    </Link>
                  )
                }
              </li>

              <li className="list post">
                {
                  postList.articleList?.length === 0 && (
                    <Link to="/profile/myPostList" className="link">
                      아직 작성한 글이 없어요 &#128172;
                    </Link>
                  )
                }
                {
                  postList.articleList?.length > 0 && (
                    <Link to="/profile/myPostList" className="link">
                      지금까지 <strong>{postList.articleList?.length}</strong>개의 글을 작성했어요
                    </Link>
                  )
                }
              </li>

              <li className="list post">
                {
                  myCommentList?.commentList.length === 0 && (
                    <Link to="/profile/myCommentList" className="link">
                      아직 작성한 댓글이 없어요 &#128172;
                    </Link>
                  )
                }
                {
                  myCommentList?.commentList.length > 0 && (
                    <Link to="/profile/myCommentList" className="link">
                      지금까지 <strong>{myCommentList?.commentList.length}</strong>개의 댓글을 작성했어요
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
