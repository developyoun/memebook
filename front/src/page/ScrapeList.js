import './../scss/scrapeList.scss'
import React, {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";

export default function ScrapeList() {
  const [scrapListData, setScrapListData] = useState([]);

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

  return (
    <div className="scrape_container">
      <div className="scrape_top">
        <h2 className="tit">&#128214; 스크랩</h2>
        <div className="box_btn">
          <span className="txt"></span>
        </div>

        <ul className="scrape_list">
          {
            scrapListData?.map((item, idx) => {
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
