import '../scss/addList.scss'
import React, {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";

export default function AddList() {
  const [addListData, setAddListData] = useState([]);

  useEffect(() => {
    async function MyAddApi() {
      try {
        const wordDetailData = await memebookApi.wordAddList(123);
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
        <h2 className="tit">&#128214; 등록한 단어</h2>
        <div className="box_btn">
          <span className="txt"></span>
        </div>

        <ul className="scrape_list">
          {
            addListData?.map((item, idx) => {
              return (
                <li className="box_item">
                  <Link to={`/word/${item.wordIdx}`} className="item" key={idx}>{item.wordName}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}
