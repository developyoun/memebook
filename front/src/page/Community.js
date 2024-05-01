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
      
      <div className="post_box">
        <div className="post_list">
          <ul className="list">
            <li>
              <Link to="/postDetail" className="post_link">
                <h3 className="tit">요즘 잠이 안와요</h3>
                <p className="txt">왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요</p>
              </Link>
              <button type="button" className="post_more_btn">더보기</button>
              <div className="post_reaction">
                <button type="button" className="post_like_btn">
                  <span className="blind">좋아요</span>
                </button>
                <button type="button" className="comments_btn">
                  <span>댓글</span>
                </button>
                <button type="button" className="view_btn">
                  <span>조회수</span>
                </button>
              </div>
            </li>

            <li>
              <Link to="/postDetail" className="post_link">
                <h3 className="tit">요즘 잠이 안와요</h3>
                <p className="txt">왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요</p>
              </Link>
              <button type="button" className="post_more_btn">더보기</button>
              <div className="post_reaction">
                <button type="button" className="post_like_btn">
                  <span className="blind">좋아요</span>
                </button>
                <button type="button" className="comments_btn">
                  <span>댓글</span>
                </button>
                <button type="button" className="view_btn">
                  <span>조회수</span>
                </button>
              </div>
              <Link to="/postDetail" className="post_contents">
                <span className="nickname">변태호</span>
                <p className="comments">수면제를 드세요</p>
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
