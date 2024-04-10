import './../scss/library.scss'
import HomeFooter from "../components/HomeFooter";
import Title from "../components/Title";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {debounce} from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Word() {
  const [pageNumber, setPageNumber] = useState(1);
  const [libraryData, setLibraryData] = useState();
  const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

  const pageUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    async function libraryList() {
      try {
        const libraryApi = await memebookApi.wordList('ALL', pageNumber);
        setLibraryData(libraryApi.data.wordList);
        console.log(libraryApi)
      } catch (error) {
        console.log(error)
      }
    }
    libraryList();
  }, []);

  const pageMore = useCallback(debounce(async () => {
    try {

      const nextPage = pageNumber + 1;
      setPageNumber(nextPage);

      if (isBottom) {
        const libraryApi = await memebookApi.wordList('ALL', nextPage, '123');
        setLibraryData((prevLibraryData) => [...prevLibraryData, ...libraryApi.data.data.content]);
        console.log('닿음');
      }
    } catch (error) {
      console.log(error);
    }
  }, 1000), [pageNumber]); // pageNumber을 의존성 배열에 추가하여 새로운 debounce 함수가 필요한 경우에만 새로 생성

  useEffect(() => {
    window.addEventListener('scroll', pageMore);

    return () => {
      window.removeEventListener('scroll', pageMore);
      pageMore.cancel(); // 컴포넌트가 언마운트될 때 debounce 함수를 취소하여 메모리 누수 방지
    };
  }, [pageMore]);

  async function wordSort(word) {
    try {
      let wordSortData;
      setLibraryData();
      switch (word) {
        case 'LIKE' :
          wordSortData = await memebookApi.wordSort('ALL', word, 'ASC', '123');
          setLibraryData(wordSortData.data.wordList);
           break;
        case 'DISLIKE' :
          wordSortData = await memebookApi.wordSort('ALL', word, 'ASC', '123');
          setLibraryData(wordSortData.data.wordList);
           break;
        case 'LATEST' :
          wordSortData = await memebookApi.wordSort('ALL', word, 'ASC', '123');
          setLibraryData(wordSortData.data.wordList);
           break;
        case 'CONTENT' :
          wordSortData = await memebookApi.wordSort('ALL', word, 'ASC', '123');
          setLibraryData(wordSortData.data.wordList);
           break;
      }
      console.log(wordSortData)
      console.log('성공')
    } catch(error) {
      console.log(error)
    }
  }

  return (
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
          <Swiper
            slidesPerView='auto'
            className="library_tab"
          >
            <SwiperSlide className="tab_item active">
              <button type="button" className="item" onClick={() => wordSort('LIKE')}>좋아요순</button>
            </SwiperSlide>
            <SwiperSlide className="tab_item">
              <button type="button" className="item" onClick={() => wordSort('DISLIKE')}>싫어요순</button>
            </SwiperSlide>
            <SwiperSlide className="tab_item">
              <button type="button" className="item" onClick={() => wordSort('LATEST')}>최신순</button>
            </SwiperSlide>
            <SwiperSlide className="tab_item">
              <button type="button" className="item" onClick={() => wordSort('CONTENT')}>댓글순</button>
            </SwiperSlide>
          </Swiper>

          <ul className="word_list">
            {
              libraryData?.map((item, idx) => {
                return (
                  <li className="box_item">
                    <Link to={`/word/${item.wordIdx}`} className="item" key={idx}>{item.wordName}</Link>
                  </li>
                )
              })
            }
          </ul>
        </div>

        {
          window.scrollY > 20 && (
            <button type="button" className="btn_top" onClick={pageUp}>
              <span className="blind">올리기</span>
            </button>
          )
        }
      </div>
    </div>
  );
}

