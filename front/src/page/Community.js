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
  const [memberIdx, setMemberIdx] = useState(321);
  // 단어 데이터
  const [wordListData, setWordListData] = useState([]);
  // 스크랩
  const [scrapData, setScrapData] = useState('');
  const [scrapState, setScrapState] = useState(false);
  // 좋아요
  const [likeCheck, setLikeCheck] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  // 싫어요
  const [dislikeCheck, setDislikeCheck] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(0);
  // 수정하기
  const [modifyState, setModifyState] = useState(false);
  const [modifyContent, setModifyContent] = useState('');
  // 단어 삭제
  const [deleteOpen, setDeleteOpen] = useState(false);
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
        setWordListData(wordDetailData.data);
        console.log(wordDetailData);
        setScrapData(wordDetailData.data.scrap)
        if (scrapData === true) {
          setScrapState(true)
        } else {
          setScrapState(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    wordDetailApi();
  }, [modifyState, scrapState]);

  // 좋아요 버튼
  async function wordLike () {
    try {
      if (scrapState === false) {
        const wordLikeData = await memebookApi.wordReactionUpdate( {
          "reactionIdx": 0,
          "reactionType": "LIKE",
          "memberIdx": memberIdx,
          "wordIdx": id,
        });
      } else {
        // const wordDeleteData = await memebookApi.wordScrapeDelete(wordIdx);
      }
      alert('등록');

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
      const wordDeleteData = await memebookApi.wordDelete(wordContentIdx);
      window.history.back();
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  const contentDeleteOpen = ({contentDeleteClose, contentDeleteSubmit}) => {
    setDeleteOpen(!deleteOpen);
  }

  const handleClose = () => {

  }

  return (
    <div className="detail_container">
      {
        reportOpen && (
          <CommentPort commentPortClose={commentReportOpen}></CommentPort>
        )
      }
      {
        deleteOpen && (
          <ContentDelete contentDeleteClose={contentDeleteOpen} contentDeleteSubmit={contentDeleteOpen}></ContentDelete>
        )
      }
      <h1 className="word_tit">
        {wordListData.wordName}
      </h1>
      <button type="button" className={`btn_scrape ${scrapData ? 'active' : ''}`} onClick={ScrapeBtn}>
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
                            <button type="button" className="btn_delete" onClick={() => { contentDeleteOpen({ contentDeleteClose: handleClose, contentDeleteSubmit: wordDelete(item.wordContentIdx) }) }}>
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
import '../scss/page/community.scss'
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import Header from "../components/Header";

export default function Community() {
  const [postReactionState, setPostReactionState] = useState(false);

  const postReaction = () => {
    setPostReactionState(!postReactionState)
  }

  return (
    <>
      <Header></Header>
      <div className="community_wrap">

        <Swiper slidesPerView='auto' className="tab_box">
          <SwiperSlide className="tab_item active">
            <button type="button" className="item">&#127775; 최신</button>
          </SwiperSlide>
          <SwiperSlide className="tab_item">
            <button type="button" className="item">&#128400; 단어 질문</button>
          </SwiperSlide>
          <SwiperSlide className="tab_item">
            <button type="button" className="item">&#128640; 요즘 유행</button>
          </SwiperSlide>
        </Swiper>

        <div className="post_box">
          <div className="post_list">
            <ul className="list">
              <li>
                <Link to="/postDetail" className="post_link">
                  <div className="post_top">
                    <h3 className="tit">요즘 잠이 안와요</h3>
                    <span className="nickname">김누징</span>
                  </div>

                  <p className="txt">왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요</p>
                </Link>
                <button type="button" className="post_more_btn">더보기</button>

                <div className="post_reaction">
                  <button type="button" className={`btn_post_like ${postReactionState ? 'active' : ''}`} onClick={postReaction}>
                    <span className="blind">좋아요</span>
                  </button>
                  <Link to="/postDetail" className="comments_count">
                    <span className="blind">댓글</span>
                  </Link>
                  <Link to="/postDetail" className="view_count">
                    <span className="blind">조회수</span>
                  </Link>
                </div>
              </li>

              <li>
                <Link to="/postDetail" className="post_link">
                  <h3 className="tit">요즘 잠이 안와요</h3>
                  <p className="txt">왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요</p>
                </Link>
                <button type="button" className="post_more_btn">더보기</button>
                <div className="post_reaction">
                  <button type="button" className="post_like_btn">
                    <span className="blind">좋아요</span>
                  </button>
                  <button type="button" className="comments_btn">
                    <span className="blind">댓글</span>
                  </button>
                  <button type="button" className="view_btn">
                    <span className="blind">조회수</span>
                  </button>
                </div>
                <Link to="/postDetail" className="post_contents">
                  <span className="nickname">변태호</span>
                  <p className="comments">수면제를 드세요</p>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}
