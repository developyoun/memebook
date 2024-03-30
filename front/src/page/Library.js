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
        <h2 className="tit">사전</h2>
        <div className="box_btn">
          <span className="txt">단어를 등록해보세요</span>
          <button type="button" className="word_add_btn">단어 등록하기</button>
        </div>
      </div>
      
      <div className="library_box">
        <div className="box_top">
          <h3 className="tit">💡 좋아요 많은 단어</h3>
          <Link to="/wordAdd" className="word_more_btn">더보기</Link>
        </div>
        <Swiper
          slidesPerView='auto'
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className="word_list"
        >

          {
            libraryData?.map((item, idx) => {
              return (
                <SwiperSlide className="box_item">
                  <Link to={`/word/${item.wordIdx}`} className="item" key={idx}>{item.wordContent}</Link>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </div>

      {/*<button type="button" onClick={pageMore}>더보기</button>*/}
      <HomeFooter></HomeFooter>
    </div>
  );
}

