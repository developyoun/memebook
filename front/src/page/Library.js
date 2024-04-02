import './../scss/library.scss'
import HomeFooter from "../components/HomeFooter";
import Title from "../components/Title";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {debounce} from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Word() {
  const [pageNumber, setPageNumber] = useState(1);
  const [libraryData, setLibraryData] = useState();

  useEffect(() => {
    async function libraryList() {
      try {
        const libraryApi = await memebookApi.wordList('ALL', pageNumber);
        setLibraryData(libraryApi.data.data.content);
        console.log(libraryData);
      } catch (error) {
        console.log(error)
      }
    }
    libraryList();
  }, []);


  const pageMore = debounce(() => {
    const nextPage = pageNumber + 1;
    const PageData = async () => {
      try {
        const libraryApi = await memebookApi.wordList('KOR', nextPage);
        setLibraryData((prevLibraryData) => [...prevLibraryData, ...libraryApi.data.data.content]);
      } catch (error) {
        console.log(error)
      }
    };
    setPageNumber(nextPage);
    PageData();
  }, 500);


  return (
    <div className="library_wrap">

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
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className="library_tab"
        >
          <SwiperSlide className="tab_item active">
            <Link to={`/`} className="item">최신순</Link>
          </SwiperSlide>
          <SwiperSlide className="tab_item">
            <Link to={`/`} className="item">좋아요순</Link>
          </SwiperSlide>
          <SwiperSlide className="tab_item">
            <Link to={`/`} className="item">인기순</Link>
          </SwiperSlide>
        </Swiper>

        <ul className="word_list">
          {
            libraryData?.map((item, idx) => {
              return (
                <li className="box_item">
                  <Link to={`/word/${item.wordIdx}`} className="item" key={idx}>{item.wordContent}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>

      {/*<button type="button" onClick={pageMore}>더보기</button>*/}
      <HomeFooter></HomeFooter>
    </div>
  );
}

