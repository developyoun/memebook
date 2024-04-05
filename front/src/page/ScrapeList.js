import './../scss/scrapeList.scss'
import React, {useEffect} from "react";
import {memebookApi} from "../util/memebookApi";

export default function ScrapeList() {


  useEffect(() => {
    async function scrapeApi() {
      try {
        const wordDetailData = await memebookApi.wordScrapeUpdate('123');
        console.log(wordDetailData)
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
      </div>
    </div>
  );
}
