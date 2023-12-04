import {Link} from 'react-router-dom';
import React from "react";
function WordList() {
  return (
    <ul className="word_wrap">
      <li className="word_box">
        <h3 className="word_tit">ㄱ</h3>
        <ul className="word_list">
          <li>
            <Link to="/word/1" className="item">개개개</Link>
          </li>
          <li>
            <a href="" className="item">거거거</a>
          </li>
        </ul>
      </li>
      <li className="word_box">
        <h3 className="word_tit">ㄴ</h3>
        <ul className="word_list">
          <li>
            <a href="" className="item">내내내</a>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default WordList;
