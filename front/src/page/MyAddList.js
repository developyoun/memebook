import '../scss/addList.scss'
import React, {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";
import BtnBack from "../components/BtnBack";
import {useDispatch, useSelector} from "react-redux";
import {myWordListData, wordDeleteData} from "../util/action/wordAction";
import {scrapDeleteData} from "../util/action/scrapAction";

export default function MyAddList() {
  const dispatch = useDispatch();
  const myWordList = useSelector(state => state.meme.myWordList);

  const [memberIdx, setMemberIdx] = useState('321');
  const [deleteState, SetDeleteState] = useState(false);

  useEffect(() => {
    async function wordAddListApi() {
      try {
        dispatch(myWordListData(memberIdx));
        console.log(myWordList)
        // dispatch(scrapDeleteData());
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
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  return (
    <div className="add_container">
      <div className="add_top">
        <BtnBack></BtnBack>
        <h2 className="tit">&#128214; 등록한 단어</h2>
        <div className="box_btn">
          <span className="txt"></span>
        </div>
      </div>
      {
        myWordList.wordContentList?.length > 0 && (
          <ul className="list_box">
            {
              myWordList.wordContentList?.map((item, idx) => {
                return (
                  <li className="list_item">
                    <Link to={`/word/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                    <button type="button" className="scrap_delete_btn" onClick={() => myAddWordDelete(item.wordContentIdx)}>
                      <span className="blind">스크랩 삭제</span>
                    </button>
                  </li>
                )
              })
            }
          </ul>
        )
      }
    </div>
  );
}
