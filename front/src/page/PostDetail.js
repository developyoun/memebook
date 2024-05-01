import './../scss/postDetail.scss'
import React from "react";
import {Link} from "react-router-dom";

export default function PostDetail() {

  return (
    <div className="post_container">
      <div className="post_top">
        <h2 className="post_tit">요즘 잠이 안와요</h2>
        <span className="time">10분전</span>
      </div>
      <div className="post_con">
        <p className="post_txt">
          왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요
        </p>
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
      </div>
      <div className="post_comment">
        <ul>
          <li className="comments">
            <span className="nickname">변태호</span>
            <p className="txt">수면제를 드세요</p>
            <button type="button" className="btn_icon like">
              <span className="blind">좋아요</span>
            </button>
          </li>
          <li className="comments">
            <span className="nickname">김태호</span>
            <p className="txt">맞아요 수면에 드링킹하세요</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
