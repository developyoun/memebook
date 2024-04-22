import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {memebookApi} from "../util/memebookApi";
import {useDispatch, useSelector} from 'react-redux';
import BtnBack from "../components/BtnBack";
import {scrapDeleteData, scrapListData} from "../util/action/scrapAction";
import './../scss/scrapeList.scss'


export default function ScrapeList() {
  const dispatch = useDispatch();
  const scrapList = useSelector(state => state.meme.scrapList);

  const [scrapState, setScrapState] = useState(false);
  const [memberIdx, setMemberIdx] = useState(123);


  useEffect(() => {
    async function scrapeApi() {
      try {
        dispatch(scrapListData(memberIdx));
      } catch (error) {
        console.log(error)
      }
    }
    scrapeApi();
  }, [scrapState]);


  // 설명 삭제
  async function scrapDeleteApi(scrapIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        dispatch(scrapDeleteData(scrapIdx));
        setScrapState(!scrapState);
        alert('삭제');
      }
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
        <h2 className="tit">&#128214; 스크랩 {}</h2>
        <div className="box_btn">
          <span className="txt"></span>
        </div>
      </div>

        {
          scrapList.content?.length === 0 && (
            <div>없어용</div>
          )
        }

        {
          scrapList.content?.length > 0 && (
            <ul className="list_box">
              {
                scrapList.content?.map((item, idx) => {
                  return (
                    <li className="list_item">
                      <Link to={`/word/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                      <button type="button" className="scrap_delete_btn" onClick={() => scrapDeleteApi(item.scrapIdx)}>
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
