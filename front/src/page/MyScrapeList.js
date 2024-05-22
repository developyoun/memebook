import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {scrapDeleteData, scrapListData} from "../util/action/scrapAction";
import Title from "../components/Title";
import '../scss/page/scrapeList.scss'

export default function MyScrapeList() {
  const dispatch = useDispatch();
  // 스크랩 리스트
  const scrapList = useSelector(state => state.meme.scrapList);
  // 스크랩 상태
  const [scrapState, setScrapState] = useState(false);

  const [memberIdx, setMemberIdx] = useState(123);

  // 스크랩 리스트 Api
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
    <div className="scrap_list_wrap">

      <Title title="스크랩한 단어" type="back"></Title>

      <div className="container">
        {
          scrapList.content?.length === 0 && (
            <div className="content_none list">
              <p>
                스크랩한 단어가 없어요 &#128172;
              </p>
              <Link to="/vocabulary" className="btn_primary_line size_m">
                단어 구경하러 가기
              </Link>
            </div>
          )
        }

        {
          scrapList.content?.length > 0 && (
            <ul className="list_box inside">
              {
                scrapList.content?.map((item, idx) => {
                  return (
                    <li className="list_item" key={idx}>
                      <Link to={`/vocabulary/wordInfo/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                      <button type="button" className="btn_delete" onClick={() => scrapDeleteApi(item.scrapIdx)}>
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

    </div>
  );
}
