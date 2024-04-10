import './../scss/scrapeList.scss'
import React, {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {myScrapeList} from "../util/action";


export default function ScrapeList() {
  const dispatch = useDispatch();

  const [memberIdx, setMemberIdx] = useState(321);
  const [scrapListData, setScrapListData] = useState([]);

  useEffect(() => {
    async function scrapeApi() {
      try {
        const wordDetailData = await memebookApi.wordScrapeUpdate(memberIdx);
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
      const wordDeleteData = await memebookApi.wordScrapeDelete(112, memberIdx);
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
                  <button type="button" onClick={wordDeleteApi}>스크랩 삭제</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}
