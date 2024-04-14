import '../scss/addList.scss'
import React, {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";
import BtnBack from "../components/BtnBack";

export default function AddList() {
  const [addListData, setAddListData] = useState([]);

  const [memberIdx, setMemberIdx] = useState('123');

  useEffect(() => {
    async function MyAddApi() {
      try {
        const wordDetailData = await memebookApi.wordAddList(memberIdx);
        setAddListData(wordDetailData.data.wordContentList);
      } catch (error) {
        console.log(error)
      }
    }
    MyAddApi();
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
      <ul className="list_box">
        {
          addListData?.map((item, idx) => {
            return (
              <li className="list_item">
                <Link to={`/word/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}
