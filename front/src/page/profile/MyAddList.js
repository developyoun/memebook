import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {myWordListData, wordDeleteData} from "./../../util/action/wordAction";
import Title from "./../../components/Title";
import './../../scss/page/myAddList.scss'

export default function MyAddList() {
  const dispatch = useDispatch();
  // 단어 리스트
  const myWordList = useSelector(state => state.meme.myWordList);
  // 삭제 상태
  const [deleteState, SetDeleteState] = useState(false);

  const [memberIdx, setMemberIdx] = useState(123);

  // 단어 리스트 Api
  useEffect(() => {
    async function wordAddListApi() {
      try {
        dispatch(myWordListData(memberIdx));
      } catch (error) {
        console.log(error)
      }
    }
    wordAddListApi();
  }, [deleteState]);

  // 설명 삭제
  async function myAddWordDelete(wordContentIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        dispatch(wordDeleteData(wordContentIdx));
        SetDeleteState(!deleteState);
        alert('삭제');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="my_word_wrap">

      <Title title="참여한 단어" type="back"></Title>

      <div className="container">

        <div className="list_top">
          <span className="txt">
            총 {myWordList.totalCount} 개
          </span>
          <span className="check_box">
            <input type="checkbox"/>
            <label htmlFor="">전체 삭제</label>
          </span>
        </div>

        {
          myWordList.wordContentList?.length === 0 && (
            <div className="content_none list">
              <p>
                참여한 단어가 없어요 &#128172;
              </p>
              <Link to="/vocabulary" className="btn_primary_line size_m">
                단어 구경하러 가기
              </Link>
            </div>
          )
        }

        {
          myWordList.wordContentList?.length > 0 && (
            <ul className="list_box inside">
              {
                myWordList.wordContentList?.map((item, idx) => {
                  return (
                    <li className="list_item" key={idx}>
                      <Link to={`/vocabulary/wordInfo/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                      <button type="button" className="btn_delete" onClick={() => myAddWordDelete(item.wordContentIdx)}>
                        <span className="blind">스크랩 삭제</span>
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          )
        }

        <div className="list_btm">
          <button type="button" className="btn_primary size_s">더보기</button>
        </div>

      </div>

    </div>
  );
}
