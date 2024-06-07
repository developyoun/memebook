import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import {Link} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {wordListData, wordSortData} from "./../../util/action/wordAction";
import {debounce} from 'lodash';
import 'swiper/css';
import './../../scss/page/vocabulary/vocabulary.scss'

export default function Word() {
  const dispatch = useDispatch();
  // 단어 리스트
  const wordList = useSelector(state => state.meme.wordList);
  // 단어 정렬
  const wordSort = useSelector(state => state.meme.wordSort);
  // 단어 페이지
  const [pageNumber, setPageNumber] = useState(1);
  // 단어 리스트
  const [libraryData, setLibraryData] = useState([]);
  // 단어 탭
  const [libraryTab, setLibraryTab] = useState('ALL');
  // 국가
  const [nationName, setNationName] = useState('KOR');
  // 더보기 버튼
  const [moreBtnState, setMoreBtnState] = useState(true);
  // 로딩
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    async function libraryList() {
      try {
        await dispatch(wordListData('KOR', pageNumber));
      } catch (error) {
        console.log(error)
      }
    }
    libraryList();
  }, [dispatch]);

  useEffect(() => {
    if (wordList && wordList.wordList) {
      setLibraryData(wordList.wordList);
      console.log(wordList)
    }
    // 현재 페이지가 마지막 페이지가 아니라면 더보기 미노출
    if (wordList?.nowPage !== wordList?.totalPage) {
      setMoreBtnState(true);
    }
  }, [wordList]);


  // 더보기
  const pageMore = useCallback(debounce(async () => {
    try {
      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);
      // 다른 변수에 담기 위해 새로 가져오기
      const libraryApi = await memebookApi.wordListApi('ALL', nextPage);
      setLibraryData((prevLibraryData) => [...prevLibraryData, ...libraryApi.data.wordList]);
      // 총 리스트의 페이지가 마지막 페이지가 아니라면 더보기 미노출
      if (libraryApi.data.nowPage === libraryApi.data.totalPage) {
        setMoreBtnState(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, 1000), [pageNumber]);

  // 단어 정렬
  async function wordSortBtn(word) {
    try {
      setLibraryTab(word);
      dispatch(wordSortData(nationName, word));
      setLibraryData(wordSort.wordList);
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="voca_wrap">
      <div className="container">

        <div className="voca_top">
          <h2 className="tit">&#128214; 사전</h2>
          <div className="box_btn">
            <span className="txt">사전에 없는 단어가 있나요?<br/>지금 등록해보세요 &#128073;</span>
            <Link to="/vocabulary/wordAdd" className="btn_add_word">
              <span>단어 등록하기</span>
            </Link>
          </div>
        </div>

        <div className="voca_con">
          <Swiper
            slidesPerView='auto'
            className="tab_box"
          >
            <SwiperSlide className={`tab_item ${libraryTab === 'ALL' ? 'active' : ''}`}>
              <button type="button" className="item" onClick={() => wordSortBtn('ALL')}>&#128218; 전체</button>
            </SwiperSlide>
            <SwiperSlide className={`tab_item ${libraryTab === 'LIKE' ? 'active' : ''}`}>
              <button type="button" className="item" onClick={() => wordSortBtn('LIKE')}>&#128077; 좋아요순</button>
            </SwiperSlide>
            <SwiperSlide className={`tab_item ${libraryTab === 'DISLIKE' ? 'active' : ''}`}>
              <button type="button" className="item" onClick={() => wordSortBtn('DISLIKE')}>&#128078; 싫어요순</button>
            </SwiperSlide>
            <SwiperSlide className={`tab_item ${libraryTab === 'LATEST' ? 'active' : ''}`}>
              <button type="button" className="item" onClick={() => wordSortBtn('LATEST')}>&#127775; 최신순</button>
            </SwiperSlide>
          </Swiper>


          <div className="voca_desc">
            총 {wordList?.totalCount} 개
          </div>

          { libraryData === undefined && loadingState && (
            <div>
              로딩중
            </div>
          )
          }


          {
            libraryData !== undefined && (
              <>


                <ul className="list_box">
                  {
                    libraryData?.map((item, idx) => {
                      return (
                        <li className="list_item" key={idx}>
                          <Link to={`/vocabulary/wordInfo/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                          <span className="content_count">
                              {item.wordContentCount}
                          </span>
                        </li>
                      )
                    })
                  }
                </ul>


                {
                  moreBtnState && (
                    <div className="list_btm">
                      <button type="button" className="btn_primary size_s" onClick={pageMore}>더보기</button>
                    </div>
                  )
                }

              </>
            )
          }
        </div>

        {/*{*/}
        {/*  window.scrollY > 20 && (*/}
        {/*    <button type="button" className="btn_top" onClick={commonEvent}>*/}
        {/*      <span className="blind">올리기</span>*/}
        {/*    </button>*/}
        {/*  )*/}
        {/*}*/}
      </div>
    </div>
  );
}

