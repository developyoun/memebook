import '../scss/page/community.scss'
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../components/Header";
import {useDispatch, useSelector} from "react-redux";
import {postDetailData, postListData} from "../util/action/communityAction";

export default function Post() {
  const id = useParams();
  const dispatch = useDispatch();
  const postList = useSelector(state => state.meme.postList);
  const postDetail = useSelector(state => state.meme.postDetail);
  const [postReactionState, setPostReactionState] = useState(false);
  const [textareaActive, setTextareaActive] = useState(false);
  const [loading, setLoading] = useState(true);


  // 포스트 디테일 Api
  useEffect(() => {
    async function postDetailApi() {
      try {
        // await dispatch(postListData());
        await dispatch(postDetailData(id.id));
        console.log(postList);
        console.log(postDetail);
      } catch (error) {
        console.log('오류')
      }
    }
    postDetailApi();
  }, []);

  const postReaction = () => {
    setPostReactionState(!postReactionState)
  }

  const commtentActive = () => {
    setTextareaActive(true);
  }

  const useOutsideClick = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, callback]);
  };

  return (
    <>
      <Header></Header>
      <div className="post_wrap">

        <div className="post_item">
          <Link to={`/community/postDetail/`} className="post_link">
            <div className="post_top">
              <h3 className="tit">{postDetail?.articleTitle}</h3>
              <span className="nickname">{postDetail?.nickname}</span>
            </div>
            <p className="txt">{postDetail?.articleContent}</p>
          </Link>
          <button type="button" className="post_more_btn">더보기</button>

          <div className="post_reaction">
            <button type="button" className={`btn_post_like ${postReactionState ? 'active' : ''}`} onClick={postReaction}>
              <span className="blind">좋아요</span>
            </button>
            <Link to="/community/postDetail" className="comments_count">
              <span className={`${postDetail?.commentCount === 0 ? 'blind' : ''}`}>{postDetail?.commentCount === 0 ? '댓글' : postDetail?.commentCount}</span>
            </Link>
            <Link to="/community/postDetail" className="view_count">
              <span className="blind">조회수</span>
            </Link>
          </div>
        </div>

        <div className="comment_box">
          <ul className="comment_list">
            {
              postDetail?.commentDtoList?.map((item, idx) => {
                return (
                  <li className="list">
                    <div className="comments">
                      <span className="nickname">{item.nickname}</span>
                      <p className="txt">{item.commentContent}</p>
                    </div>
                    {
                      item.commentReplyList.length !== 0 && (
                        <ul className="list">
                          {
                            item.commentReplyList?.map((reply, idx) => {
                              return (
                                <li className="comments">
                                  <span className="nickname_tag">@{item.nickname}</span>
                                  <span className="nickname">{reply.nickname}</span>
                                  <p className="txt">{reply.commentContent}</p>
                                  <button type="button" className="btn_icon like">
                                    <span className="blind">좋아요</span>
                                  </button>
                                </li>
                              )
                            })
                          }
                        </ul>
                      )
                    }
                  </li>
                )
              })
            }

          </ul>
        </div>

        <div className="comment_input_box">
          <textarea type="text" className={`${textareaActive ? 'active' : ''}`} placeholder="댓글 입력" onClick={commtentActive}></textarea>
        </div>
      </div>
    </>
  );
}
