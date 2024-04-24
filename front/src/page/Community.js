import './../scss/community.scss'
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";

export default function Community() {

  return (
    <div className="community_container">
      <Swiper slidesPerView='auto' className="community_tab">
        <SwiperSlide className="tab_item active">
          <button type="button" className="item">최신</button>
        </SwiperSlide>
        <SwiperSlide className="tab_item">
          <button type="button" className="item">단어 질문</button>
        </SwiperSlide>
        <SwiperSlide className="tab_item">
          <button type="button" className="item">요즘 유행</button>
        </SwiperSlide>
      </Swiper>
      
      <div className="community_list">
        <ul className="list">
          <li>
            <Link to="" className="content_link">
              <h3 className="tit">요즘 잠이 안와요</h3>
              <p className="txt">왜 안오는지 누가 알려주실래요 괴롭네요</p>
            </Link>
            <div className="community_reaction">
              <button type="button" className="content_like_btn">
                <span className="blind">좋아요</span>
              </button>
              <button type="button" className="comment_btn">
                <span>댓글</span>
              </button>
              <button type="button" className="view_btn">
                <span>조회수</span>
              </button>
            </div>
          </li>
          <li>
            <Link to="" className="content_link">
              <h3 className="tit">요즘 잠이 안와요</h3>
              <p className="txt">왜 안오는지 누가 알려주실래요 괴롭네요</p>
            </Link>
            <div className="community_reaction">
              <button type="button" className="content_like_btn">
                <span className="blind">좋아요</span>
              </button>
              <button type="button" className="comment_btn">
                <span>댓글</span>
              </button>
              <button type="button" className="view_btn">
                <span>조회수</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
