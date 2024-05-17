import '../scss/page/community.scss'
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Header from "../components/Header";
import {useDispatch, useSelector} from "react-redux";
import {postDetailData, postListData} from "../util/action/communityAction";
import {memebookApi} from "../util/memebookApi";
import {wordDeleteData} from "../util/action/wordAction";

export default function Post() {
  const id = useParams();
  const dispatch = useDispatch();
  const postList = useSelector(state => state.meme.postList);
  const postDetail = useSelector(state => state.meme.postDetail);
  const [postReactionState, setPostReactionState] = useState(false);
  const [textareaActive, setTextareaActive] = useState(false);
  const [loading, setLoading] = useState(true);

  const [memberIdx, setMemberIdx] = useState(321);

  const [wordSetState, setWordSetState] = useState(false)

  const [commentValue, setCommentValue] = useState();
  const [commentLength, setCommentLength] = useState(false);
  const [commentState, setCommentState] = useState(false);
  const [commentIdx, setCommentIdx] = useState();
  const [replyNickname , setReplyNickname] = useState('');


  // 포스트 디테일 Api
  useEffect(() => {
    async function postDetailApi() {
      try {
        await dispatch(postDetailData(id.id));
        console.log(id.id);
        console.log(postList);
        console.log(postList);
        console.log(postDetail);
      } catch (error) {
        console.log('오류')
      }
    }
    postDetailApi();
  }, [commentState]);

  const postReaction = () => {
    setPostReactionState(!postReactionState)
  }

  const commtentActive = () => {
    setTextareaActive(true);
  }

  async function commentDeleteData(commentIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        const commentDeleteApi = await memebookApi.commentDeleteApi(commentIdx, memberIdx);
        setCommentState(!commentState);
        alert('삭제');

      }
    } catch(error) {
      console.log(error);
    }
  }

  const commentReplyData = (nickname, commentIdx) => {
    setReplyNickname(nickname);
    setCommentIdx(commentIdx);
  }
  const commentValueCount = (event) => {
    setCommentValue(event.target.value);
  }
  const replayNicknameDelete = () => {
    setReplyNickname('');
    setCommentIdx(0);
  };

  async function commentSubmitData() {
    try {
      if (commentValue?.length > 0) {
        const postAddApi = await memebookApi.commentAddApi( {
          "commentContent": commentValue,
          "articleIdx": id.id,
          "memberIdx": memberIdx,
          "upperIdx": commentIdx,
        });
        setCommentState(!commentState);
        setTextareaActive(false);
        setCommentValue('');
        setReplyNickname('');
      } else {
        setCommentLength(true);
      }

    console.log(commentLength)
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  const wordSet = () => {
    setWordSetState(!wordSetState);
  }

  return (
    <>
      <Header></Header>
      <div className="post_wrap">

        <div className="post_item">
          <div className="post_top">
            <h3 className="tit">{postDetail?.articleTitle}</h3>
            <span className="nickname">{postDetail?.nickname}</span>
            <button type="button" className="btn_set" onClick={wordSet}>
              <span className="blind">유저 셋</span>
            </button>
            {
              wordSetState && (
                <>
                  <ul className="set_box">
                    <li>
                      <button type="button" className="">
                        <span>신고하기</span>
                      </button>
                    </li>
                    {
                      postDetail?.articleMemberIdx === memberIdx && (
                        <>
                          <li>
                            <button type="button" className="">
                              <span className="">수정</span>
                            </button>
                          </li>
                          <li>
                            <button type="button" className="">
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
          </div>
          <p className="txt">{postDetail?.articleContent}</p>
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

        <ul className="comment_list">
          {
            postDetail?.commentDtoList?.map((item, idx) => {
              return (
                <li className="list">
                  <div className="comments_box">
                    <div className="comments_top">
                      <span className="nickname">{item?.nickname}</span>
                      <p className="txt">{item?.commentContent}</p>
                    </div>

                    <div className="comments_btm">
                      <button type="button" className="btn_reply" onClick={() => commentReplyData(item?.nickname, item?.commentIdx)}>답글 달기</button>
                      <button type="button" className="btn_icon like">
                        <span className="blind">좋아요</span>
                      </button>
                      {
                        item?.commentMemberIdx === memberIdx && (
                          <button type="button" className="btn_delete" onClick={() => {commentDeleteData(item?.commentIdx)}}>
                            <span className="blind">댓글 삭제</span>
                          </button>
                        )
                      }

                    </div>
                  </div>
                  {
                    item?.commentReplyList.length !== 0 && (
                      <ul className="comment_list">
                        {
                          item?.commentReplyList?.map((reply, idx) => {
                            return (
                              <li className="list">
                                <div className="comments_box">
                                  <div className="comments_top">
                                    <span className="nickname">{reply?.nickname}</span>
                                    <p className="txt">
                                      <span className="nickname_tag">@{item?.nickname}</span>
                                      {reply?.commentContent}
                                    </p>

                                  </div>
                                  <div className="comments_btm">
                                    <button type="button" className="btn_reply" onClick={() => commentReplyData(item?.nickname, item?.commentIdx)}>답글 달기</button>
                                    <button type="button" className="btn_icon like">
                                      <span className="blind">좋아요</span>
                                    </button>
                                    {
                                      item?.commentMemberIdx === memberIdx && (
                                        <button type="button" className="btn_delete" onClick={() => {commentDeleteData(item?.commentIdx)}}>
                                          <span className="blind">댓글 삭제</span>
                                        </button>
                                      )
                                    }

                                  </div>
                                </div>
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

        <div className="comment_input_btm">

          <div className={`comment_input_box ${commentLength ? 'invalid' : ''}`} >
            {
              replyNickname && (
                <span className="reply_nickname" onClick={replayNicknameDelete}>@{replyNickname}</span>
              )
            }
            <textarea type="text" className={`${textareaActive ? 'active' : ''}`} value={commentValue} placeholder="댓글 입력" onClick={commtentActive}  onChange={commentValueCount}></textarea>
            <button type="button" className="btn_comment_submit" onClick={() => {commentSubmitData(replyNickname)}}>
              <span>등록</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
