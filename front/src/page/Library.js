import './../scss/library.scss'
import {Link} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {debounce} from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {useDispatch, useSelector} from "react-redux";
import {wordListData, wordSortData} from "../util/action/wordAction";
import {commonEvent} from "../js/commonEvent"
import Header from "../components/Header";

export default function Word() {
  const dispatch = useDispatch();
  const wordList = useSelector(state => state.meme.wordList);
  const wordSort = useSelector(state => state.meme.wordSort);
  const [pageNumber, setPageNumber] = useState(1);
  const [libraryData, setLibraryData] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [libraryTab, setLibraryTab] = useState('ALL');

  useEffect(() => {
    async function libraryList() {
      try {
        await dispatch(wordListData('ALL', pageNumber));
        console.log(wordList)
      } catch (error) {
        console.log(error)
      }
    }
    libraryList();
  }, [dispatch]);

  useEffect(() => {
    if (wordList && wordList.wordList) {
      setLibraryData(wordList.wordList);
    }
  }, [wordList]);


  //
  // const pageMore = useCallback(debounce(async () => {
  //   try {
  //     const nextPage = pageNumber + 1;
  //     setPageNumber(nextPage);
  //
  //     if (isBottom) {
  //       const libraryApi = await memebookApi.wordList('ALL', nextPage, '123');
  //       setLibraryData((prevLibraryData) => [...prevLibraryData, ...libraryApi.data.data.content]);
  //       console.log('닿음');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, 1000), [pageNumber]);

  // useEffect(() => {
  //   window.addEventListener('scroll', pageMore);
  //
  //   return () => {
  //     window.removeEventListener('scroll', pageMore);
  //     pageMore.cancel(); // 컴포넌트가 언마운트될 때 debounce 함수를 취소하여 메모리 누수 방지
  //   };
  // }, [pageMore]);

  // 단어 정렬
  async function wordSortBtn(word) {
    try {
      setLibraryTab(word);
      if (word === 'ALL') {
        dispatch(wordListData('ALL', pageNumber));
        setLibraryData(wordList.wordList);
      } else {
        dispatch(wordSortData(word));
        setLibraryData(wordSort.wordList);
      }
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header></Header>

      <div className="library_wrap">
        <div className="container">
          <div className="library_top">
            <h2 className="tit">&#128214; 사전</h2>
            <div className="box_btn">
              <span className="txt">사전에 없는 단어가 있나요?<br/>지금 등록해보세요 &#128073;</span>
              <Link to="/wordAdd" className="word_add_btn">단어 등록하기 </Link>
            </div>
          </div>

          <div className="library_box">


            { libraryData === undefined && loadingState && (
              <div>
                로딩중
              </div>
            )
            }

            {
              libraryData !== undefined && (
                <>
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
                  <ul className="list_box">
                    {
                      libraryData?.map((item, idx) => {
                        return (
                          <li className="list_item">
                            <Link to={`/word/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                            <span className="content_count">
                            3
                          </span>
                          </li>
                        )
                      })
                    }
                  </ul>
                </>
              )
            }
          </div>

          {
            window.scrollY > 20 && (
              <button type="button" className="btn_top" onClick={commonEvent}>
                <span className="blind">올리기</span>
              </button>
            )
          }
        </div>
      </div>
    </>
  );
}

