import './../scss/wordDetail.scss'
import Title from "../components/Title";
import {Link} from 'react-router-dom';
import {useState, useEffect} from "react";
import CommentPort from "../components/modal/CommentPort";
import { useParams } from "react-router-dom";
import {memebookApi} from "../util/memebookApi";

export default function WordDetail() {
  let {id} = useParams();
  const [scrapeCheck, setScrapeCheck] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [likeCheck, setLikeCheck] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCheck, setDislikeCheck] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(0);

  const [wordListData, setWordListData] = useState([]);

  const commentReportOpen = ({commentPortClose}) => {
    setReportOpen(!reportOpen);
  }


  useEffect(() => {
    async function wordDetailApi() {
      try {
        const wordDetailData = await memebookApi.wordDetail(id);
        setWordListData(wordDetailData.data.data);
        console.log(wordDetailData.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    wordDetailApi();
  }, []);

  async function ScrapeBtn() {
    try {
      const scrapeState = await memebookApi.wordScrape( {
        "wordIdx": id,
        "memberIdx": 123
      });
      alert('등록');
      setScrapeCheck(!scrapeCheck);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  async function wordReactionLike() {
    try {
      if (likeCheck === false) {
        const wordReactionApi = await memebookApi.wordReactionUpdate( {
          reactionType: "LIKE",
          memIdx: 13222,
          wordIdx: id,
        });
        setLikeCount(likeCount + 1);
      } else if (likeCheck === true) {
        setLikeCount(likeCount - 1);
      }
      setLikeCheck(!likeCheck);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  async function wordReactionDislike() {
    try {
      if (likeCheck === false) {
        const wordReactionApi = await memebookApi.wordReactionUpdate( {
          reactionType: "DISLIKE",
          memIdx: 13222,
          wordIdx: id,
        });
        setDislikeCount(dislikeCount + 1);
      } else if (likeCheck === true) {
        setDislikeCount(dislikeCount - 1);
      }
      setDislikeCheck(!dislikeCheck);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

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
              <li className="list">
                <div className="mean_top">
                  <Link to="" className="name">김누징</Link>
                  <ul className="util_list">
                    <li>
                      <button type="button" className="btn_like" onClick={wordReactionLike}>
                        <span className="blind">좋아요</span>
                      </button>
                      <span className="count">
                    {likeCount}
                  </span>
                    </li>
                    <li>
                      <button type="button" className="btn_dislike" onClick={wordReactionDislike}>
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
                    <li>
                      <button type="button" className="btn_delete">
                        삭제
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="mean_txt">
                  <p>
                    {item.content}
                  </p>
                </div>
              </li>

            )
          })
        }

      </ul>
    </div>
  );
}
