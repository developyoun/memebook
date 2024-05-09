import './../scss/wordDetail.scss'
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import CommentPort from "../components/modal/CommentPort";
import {useParams} from "react-router-dom";
import {memebookApi} from "../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {scrapAddData, scrapDeleteData} from "../util/action/scrapAction";
import BtnBack from "../components/BtnBack";



export default function WordDetail() {
  let {id} = useParams();
  const dispatch = useDispatch();
  const [memberIdx, setMemberIdx] = useState(123);
  // 단어 데이터
  const [wordData, setWordData] = useState([]);
  const [wordListData, setWordListData] = useState([]);
  // 좋아요, 싫어요
  const [reactionState, setReactionState] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  // 스크랩
  const [scrapData, setScrapData] = useState('');
  const scrapAdd = useSelector(state => state.meme.scrapAdd);
  const scrapDelete = useSelector(state => state.meme.scrapDelete);

  const [wordSetState, setWordSetState] = useState(false);
  // 수정하기
  const [modifyState, setModifyState] = useState(false);
  const [modifyContent, setModifyContent] = useState('');
  // 단어 삭제
  const [deleteState, setDeleteState] = useState(false);
  // 신고하기
  const [reportOpen, setReportOpen] = useState(false);

  // 신고하기 팝업
  const commentReportOpen = ({commentPortClose}) => {
    setReportOpen(!reportOpen);
    setWordSetState(false);
  }

  // 단어 Api
  useEffect(() => {
    async function wordDetailApi() {
      try {
        const wordDetailData = await memebookApi.wordDetail(id, memberIdx);
        setWordData(wordDetailData.data);
        setScrapData(wordDetailData.data.scrapIdx);
        setWordListData(wordDetailData.data.wordContentList);
      } catch (error) {
        // window.history.back();
      }
    }

    wordDetailApi();
  }, [modifyState, setScrapData, deleteState]);

  // 좋아요/싫어요 update Api
  useEffect(() => {
    async function wordReactionApi() {
      try {
        const wordReactionCountData = await memebookApi.wordReactionCount(id);
        setLikeCount(wordReactionCountData.data.likeCount);
        setDislikeCount(wordReactionCountData.data.dislikeCount);
      } catch (error) {
      }
    }

    wordReactionApi();
  }, [reactionState]);

  // 좋아요/싫어요 button Api
  async function wordReaction(type) {
    try {
      setReactionState(false);
      if (type === 'like') {
        const wordLikeData = await memebookApi.wordReactionUpdate({
          "reactionType": "LIKE",
          "memberIdx": memberIdx,
          "wordIdx": id,
        });
      } else if (type === 'dislike') {
        const wordLikeData = await memebookApi.wordReactionUpdate({
          "reactionType": "DISLIKE",
          "memberIdx": memberIdx,
          "wordIdx": id,
        });
      }
      setReactionState(true);
    } catch (error) {
      console.log(error)
    }
  }

  // 스크랩 버튼
  async function ScrapeBtn() {
    try {
      if (!scrapData) {
        dispatch(scrapAddData(id, memberIdx));
      }
      else {
        dispatch(scrapDeleteData(scrapData));
      }
      setScrapData(!scrapData);
    } catch (error) {
      console.log(error)
    }
  }

  // 수정하기
  const wordSet = () => {
    setWordSetState(!wordSetState);
  }

  // 수정하기
  const modifyAction = () => {
    setModifyState(true);
    setWordSetState(false);
  }
  // 수정된 단어
  const contentChange = (event) => {
    setModifyContent(event.target.value);
  }

  // 수정된 내용 put Api
  async function wordModify() {
    try {

      const wordModifyData = await memebookApi.wordModifyApi({
        "wordIdx": wordListData[0].wordIdx,
        "wordName": wordListData[0].content,
        "wordContent": modifyContent,
        "wordNation": "KOR",
        "memberIdx": memberIdx,
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
      setWordSetState(false);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }


  return (
    <div className="detail_container">

      <BtnBack></BtnBack>
      {
        reportOpen && (
          <CommentPort commentPortClose={commentReportOpen}></CommentPort>
        )
      }
      <div className="detail_top">
        <h1 className="word_tit">
          {wordData.wordName}
        </h1>

      </div>

      <div className="desc_add_box">
        <span className="list_count">
          총 {wordListData.length}개
        </span>
        {
          wordListData[0]?.memberIdx !== memberIdx && (
            <button type="button" className={`btn_scrap ${scrapData ? 'active' : ''}`} onClick={ScrapeBtn}>
              <span className="blind">스크랩</span>
            </button>
          )
        }


      </div>

      <ul className="word_mean_list">
        {
          wordListData?.map((item, idx) => {
            return (
              <li className="list" key={idx}>
                <div className="mean_top">
                  <Link to={`/profile/${memberIdx}`} className="name">김누징</Link>
                  <ul className="util_list">
                    <li>
                      <button type="button" className="btn_like" onClick={() => {
                        wordReaction('like')
                      }}>
                        <span className="blind">좋아요</span>
                      </button>
                      <span className="count">
                              {likeCount}
                            </span>
                    </li>
                    <li>
                      <button type="button" className="btn_dislike" onClick={() => {
                        wordReaction('dislike')
                      }}>
                        <span className="blind">싫어요</span>
                      </button>
                      <span className="count">
                              {dislikeCount}
                            </span>
                    </li>


                    {
                      item.memberIdx === memberIdx && (
                        <li>
                          <button type="button" className="btn_set" onClick={wordSet}>
                            <span className="blind">유저 셋</span>
                          </button>
                          {
                            wordSetState && (
                              <>
                                <ul className="set_box">
                                  <li>
                                    <button type="button" className="" onClick={commentReportOpen}>
                                      <span>신고하기</span>
                                    </button>
                                  </li>
                                  {
                                    item.memberIdx === memberIdx && (
                                      <>
                                        <li>
                                          <button type="button" className="" onClick={modifyAction}>
                                            <span className="">수정</span>
                                          </button>
                                        </li>
                                        <li>
                                          <button type="button" className="" onClick={() => {
                                            wordDelete(item.wordContentIdx)
                                          }}>
                                            <span className="">삭제</span>
                                          </button>

                                        </li>
                                      </>
                                    )
                                  }
                                </ul>
                              </>
                            )
                          }
                        </li>
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
                        <button type="button" className="word_modify_btn" onClick={() => wordModify(item.wordContentIdx)}>
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

      <Link to={`/wordAdd/${id}/${wordData.wordName}`} className="desc_add_btn">
        <span className="blind">작성하기</span>
      </Link>
    </div>
  );
}
