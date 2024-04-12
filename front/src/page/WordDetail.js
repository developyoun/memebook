import './../scss/wordDetail.scss'
import Title from "../components/Title";
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import CommentPort from "../components/modal/CommentPort";
import { useParams } from "react-router-dom";
import {memebookApi} from "../util/memebookApi";

export default function WordDetail() {
  let {id} = useParams();
  const [memberIdx, setMemberIdx] = useState(123);
  // 단어 데이터
  const [wordListData, setWordListData] = useState([]);
  // 스크랩
  const [scrapeCheck, setScrapeCheck] = useState(false);
  // 좋아요
  const [likeCheck, setLikeCheck] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  // 싫어요
  const [dislikeCheck, setDislikeCheck] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(0);
  // 수정하기
  const [modifyState, setModifyState] = useState(false);
  const [modifyContent, setModifyContent] = useState('');
  // 신고하기
  const [reportOpen, setReportOpen] = useState(false)

  // 공통
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  // 신고하기 팝업
  const commentReportOpen = ({commentPortClose}) => {
    setReportOpen(!reportOpen);
  }

  // 단어 Api
  async function wordLike () {
    try {
      const wordLikeData = await memebookApi.wordReactionUpdate( {
        "reactionIdx": 0,
        "reactionType": "LIKE",
        "memberIdx": 0,
        "wordIdx": 0,
      });
      alert('등록');
      setLikeCheck(!likeCheck);

      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  useEffect(() => {
    async function wordDetailApi() {
      try {
        const wordDetailData = await memebookApi.wordDetail(id);
        setWordListData(wordDetailData.data);
        setScrapeCheck(wordDetailData.data.scrap);
        console.log(wordDetailData);
      } catch (error) {
        console.log(error)
      }
    }
    wordDetailApi();
  }, [modifyState, scrapeCheck]);

  // 스크랩 버튼
  async function ScrapeBtn() {
    try {
      const scrapeState = await memebookApi.wordScrape( {
        "wordIdx": id,
        "memberIdx": memberIdx,
      });
      alert('등록');
      setScrapeCheck(!scrapeCheck);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  // 수정하기
  const modifyAction = () => {
    setModifyState(true);
  }
  // 수정된 단어
  const contentChange = (event) => {
    setModifyContent(event.target.value);
  }
  // 수정된 내용 put Api
  async function wordModify() {
    try {
      const wordModifyData = await memebookApi.wordModifyApi( {
        "wordIdx": wordListData.wordIdx,
        "wordName": wordListData.wordName,
        "wordContent": modifyContent,
        "wordNation": "ALL",
        "memberIdx": memberIdx
      });
      setModifyState(false);
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  // 설명 삭제
  async function wordDelete(wordContentIdx) {
    try {
      const wordDeleteData = await memebookApi.wordDelete(wordContentIdx);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }
  const contentChange = (event) => {
    setModifyContent(event.target.value);
  }

  return (
    <div className="detail_container">
      {
        reportOpen && (
          <CommentPort commentPortClose={commentReportOpen}></CommentPort>
        )
      }
      <h1 className="word_tit">
        {wordListData.wordName}
      </h1>
      <button type="button" className={`btn_scrape ${scrapeCheck ? 'active' : ''}`} onClick={ScrapeBtn}>
        <span className="blind">스크랩</span>
      </button>
      <div className="desc_add_box">
        <Link to={`/wordAdd/${id}/${wordListData.wordName}`} className="desc_add_btn">설명 추가하기</Link>
      </div>

      <ul className="word_mean_list">
        {
          wordListData.wordContentList?.map((item, idx) => {
            return (
              <li className="list" key={idx}>
                <div className="mean_top">
                  <Link to="" className="name">김누징</Link>
                  <ul className="util_list">
                    {
                      item.memberIdx !== memberIdx && (
                        <>
                          <li>
                            <button type="button" className="btn_like" onClick={wordLike}>
                              <span className="blind">좋아요</span>
                            </button>
                            <span className="count">
                              {likeCount}
                            </span>
                          </li>
                                    <li>
                                      <button type="button" className="btn_dislike">
                                        <span className="blind">싫어요</span>
                                      </button>
                                      <span className="count">
                              {dislikeCount}
                            </span>
                          </li>
                          <li>
                            <button type="button" className="btn_report" onClick={commentReportOpen}>
                              <span className="blind">신고하기</span>
                            </button>
                          </li>
                        </>
                      )
                    }

                    {
                      item.memberIdx === memberIdx && (
                        <>
                          <li>
                            <button type="button" className="btn_modify" onClick={modifyAction}>
                              <span className="blind">수정</span>
                            </button>
                          </li>
                          <li>
                            <button type="button" className="btn_delete" onClick={()=> wordDelete(item.wordContentIdx)}>
                              <span className="blind">삭제</span>
                            </button>
                          </li>
                        </>
                      )
                    }
                  </ul>
                </div>
                <div className="content_box">
                  {
                    !modifyState && (
                      <p className="word_modify_text">
                        {item.content}
                      </p>
                    )
                  }

                  {
                    modifyState && (
                      <>
                      <textarea className="text_input word_modify_area" name="" id="" maxLength={99} onChange={contentChange}>
                         {item.content}
                      </textarea>
                        <button type="button" className="word_modify_btn" onClick={()=> wordModify(item.wordContentIdx)}>
                          수정
                        </button>
                      </>
                    )
                  }

                </div>
              </li>

            )
          })
        }

      </ul>
    </div>
  );
}
