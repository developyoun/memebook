import './../scss/profile.scss'
import HomeFooter from "../components/HomeFooter";
import Title from "../components/Title";
import {Link} from "react-router-dom";
import React from "react";

export default function Profile() {
  return (
    <div className="layer">

      <Title title="마이페이지"></Title>

      <div className="container">
        <div className="user_info">
          <h3 className="name">누징</h3>
          <p className="visit_count">🏡 연속 방문 최대 <strong>12</strong>번을 달성했어요!</p>
        </div>
        <div className="user_box">
          <div className="user_tit">
            <h4>
              등록한 단어
              <span className="count">3</span>
            </h4>
            <Link to="/word" className="item">더보기</Link>
          </div>

          <ul className="word_list">
            <li>
              <Link to="/word/1" className="item">개개개</Link>
            </li>
            <li>
              <Link to="" className="item">거거거</Link>
            </li>
          </ul>
        </div>

        <div className="user_box">
          <div className="user_tit">
            <h4>
              스크랩한 단어
              <span className="count">12</span>
            </h4>
            <Link to="/word" className="item">더보기</Link>
          </div>

          <ul className="word_list">
            <li>
              <Link to="/word/1" className="item">개개개</Link>
            </li>
            <li>
              <Link to="" className="item">거거거</Link>
            </li>
          </ul>
        </div>
      </div>

      <HomeFooter></HomeFooter>
    </div>
  );
}
