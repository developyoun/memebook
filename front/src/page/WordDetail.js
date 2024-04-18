import './../scss/wordDetail.scss'
import Title from "../components/Title";
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import CommentPort from "../components/modal/CommentPort";
import ContentDelete from "../components/modal/ContentDelete";
import { useParams } from "react-router-dom";
import {memebookApi} from "../util/memebookApi";

export default function WordDetail() {
  let {id} = useParams();
  const [memberIdx, setMemberIdx] = useState(123);
  // 단어 데이터
  const [wordData, setWordData] = useState([]);
  const [wordListData, setWordListData] = useState([]);
  // 스크랩
  const [scrapData, setScrapData] = useState('');
  const [scrapState, setScrapState] = useState(false);
  // 좋아요, 싫어요
  const [reactionState, setReactionState] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  // 수정하기
  const [modifyState, setModifyState] = useState(false);
  const [modifyContent, setModifyContent] = useState('');
  // 단어 삭제
  const [deleteState, setDeleteState] = useState(false);
  // 신고하기
  const [reportOpen, setReportOpen] = useState(false);


  // 공통
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  // 신고하기 팝업
  const commentReportOpen = ({commentPortClose}) => {
    setReportOpen(!reportOpen);
  }

  // 단어 Api
  useEffect(() => {
    async function wordDetailApi() {
      try {
        const wordDetailData = await memebookApi.wordDetail(id, memberIdx);
        setWordData(wordDetailData.data);
        setScrapData(wordDetailData.data.scrap);
        setWordListData(wordDetailData.data.wordContentList);
        console.log(wordDetailData);
        if (scrapData === true) {
          setScrapState(true)
        } else {
          setScrapState(false)
        }
        if (wordDetailData.data.code === 404) {
          // window.history.back();
        }
      } catch (error) {
          // window.history.back();
      }
    }
    wordDetailApi();
  }, [modifyState, scrapState, deleteState]);

  // 단어 Api
  useEffect(() => {
    async function wordReactionApi() {
      try {
        const wordReactionCountData = await memebookApi.wordReactionCount(id);
        setLikeCount(wordReactionCountData.data.likeCount);
        setDislikeCount(wordReactionCountData.data.dislikeCount);
      } catch (error) {
        // window.history.back();
      }
    }
    wordReactionApi();
  }, [reactionState]);

  // 좋아요 버튼
  async function wordReaction (type) {
    try {
      setReactionState(false);
      if (type === 'like') {
        const wordLikeData = await memebookApi.wordReactionUpdate( {
          "reactionIdx": 0,
          "reactionType": "LIKE",
          "memberIdx": memberIdx,
          "wordIdx": id,
        });
      } else if (type === 'dislike') {
        const wordLikeData = await memebookApi.wordReactionUpdate( {
          "reactionIdx": 0,
          "reactionType": "DISLIKE",
          "memberIdx": memberIdx,
          "wordIdx": id,
        });
      }
      alert('등록');
      setReactionState(true);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  // 스크랩 버튼
  async function ScrapeBtn() {
    try {
      const scrapeState = await memebookApi.wordScrape( {
        "wordIdx": id,
        "memberIdx": memberIdx,
      });
      alert('등록');
      setScrapState(!scrapState);
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
      if (window.confirm("정말 삭제하시겠습니까?")) {
        const wordDeleteData = await memebookApi.wordDelete(wordContentIdx);
        setDeleteState(true);
      }
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  return (
    <div className="detail_container">
      {
        reportOpen && (
          <CommentPort commentPortClose={commentReportOpen}></CommentPort>
        )
      }
      <h1 className="word_tit">
        {wordData.wordName}
      </h1>
      <button type="button" className={`btn_scrape ${scrapData ? 'active' : ''}`} onClick={ScrapeBtn}>
        <span className="blind">스크랩</span>
      </button>
      <div className="desc_add_box">
        <Link to={`/wordAdd/${id}/${wordData.wordName}`} className="desc_add_btn">설명 추가하기</Link>
      </div>

      <ul className="word_mean_list">
        {
          wordListData?.map((item, idx) => {
            return (
              <li className="list" key={idx}>
                <div className="mean_top">
                  <Link to="" className="name">김누징</Link>
                  <ul className="util_list">
                    {
                      item.memberIdx !== memberIdx && (
                        <>
                          <li>
                            <button type="button" className="btn_like" onClick={() => {wordReaction('like')}}>
                              <span className="blind">좋아요</span>
                            </button>
                            <span className="count">
                              {likeCount}
                            </span>
                          </li>
                                    <li>
                                      <button type="button" className="btn_dislike" onClick={() => {wordReaction('dislike')}}>
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
                            <button type="button" className="btn_delete" onClick={() => {wordDelete(item.wordContentIdx)}}>
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
