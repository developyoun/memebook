import '../scss/addList.scss'
import React, {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";
import BtnBack from "../components/BtnBack";
import {useDispatch, useSelector} from "react-redux";
import {myWordListData} from "../util/action/wordAction";

export default function AddList() {
  const dispatch = useDispatch();
  const myWordList = useSelector(state => state.meme.myWordList);

  const [memberIdx, setMemberIdx] = useState('123');

  useEffect(() => {
    async function wordAddListApi() {
      try {
        dispatch(myWordListData(memberIdx));
      } catch (error) {
        console.log(error)
      }
    }
    wordAddListApi();
  }, []);

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
        myWordList.wordList?.length > 0 && (
          <ul className="list_box">
            {
              myWordList.wordList?.slice(0, 5).map((item, idx) => {
                return (
                  <li className="list_item">
                    <Link to={`/word/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
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
