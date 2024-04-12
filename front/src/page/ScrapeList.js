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
  const [scrapState, setScrapState] = useState(false);


  useEffect(() => {
    async function scrapeApi() {
      try {
        const wordDetailData = await memebookApi.wordScrapeUpdate(123);
        setScrapListData(wordDetailData.data.content);
        console.log(wordDetailData.data.content);
      } catch (error) {
        console.log(error)
      }
    }
    scrapeApi();
  }, [scrapState]);

  async function wordDeleteApi(scrapIdx) {
    try {
      const wordDeleteData = await memebookApi.wordScrapeDelete(scrapIdx);
      setScrapState(!scrapState);
      alert('삭제');
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

        <ul className="scrape_list">
          {
            scrapListData?.map((item, idx) => {
              return (
                <li className="box_item">
                  <Link to={`/word/${item.wordIdx}`} className="item" key={idx}>{item.wordName}</Link>
                  <button type="button" onClick={() => wordDeleteApi(item.scrapIdx)}>스크랩 삭제</button>
                </li>
              )
            })
          }
        </ul>
      </div>
  );
}
