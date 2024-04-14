import './../scss/scrapeList.scss'
import React, {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {myScrapeList} from "../util/action";
import BtnBack from "../components/BtnBack";


export default function ScrapeList() {


  const dispatch = useDispatch();

  const [scrapListData, setScrapListData] = useState([]);


  const handleClick = () => {
    const txt = "Some text"; // 전달할 텍스트
    dispatch(myScrapeList(txt)); // 액션 디스패치
  };


  useEffect(() => {
    async function scrapeApi() {
      try {
        const wordDetailData = await memebookApi.wordScrapeUpdate(123);
        setScrapListData(wordDetailData.data.content);
        console.log(scrapListData);
      } catch (error) {
        console.log(error)
      }
    }
    scrapeApi();
  }, []);

  async function wordDeleteApi() {
    try {
      const wordDeleteData = await memebookApi.wordScrapeDelete(112, 123);
      alert('등록 완료');
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }


  return (
    <div className="scrape_container">
      <div className="scrape_top">
        <BtnBack></BtnBack>
        <h2 className="tit">&#128214; 스크랩</h2>
        <div className="box_btn">
          <span className="txt"></span>
        </div>
      </div>

      <div className="scrap_none">

      </div>

      <ul className="list_box">
        {
          scrapListData?.map((item, idx) => {
            return (
              <li className="list_item">
                <Link to={`/word/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                <button type="button" className="btn_delete" onClick={wordDeleteApi}>
                  <span className="blind">스크랩 삭제</span>
                </button>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}
