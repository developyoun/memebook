import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {postDetailData} from "./../../util/action/communityAction";
import './../../scss/page/community/postInfo.scss'
import OutsideHook from "../../util/OutsideHook";
import AddComponent from "../../components/AddComponent";

export default function PostInfo() {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postDetail = useSelector(state => state.meme.postDetail);
  // 글 좋아요
  const [postReactionState, setPostReactionState] = useState(false);
  // 댓글 폼 활성화
  // 클릭영역 외
  const [textareaActive, setTextareaActive] = useState(false);
  const textRef = useRef(null);
  OutsideHook(textRef, () => setTextareaActive(false));
  // 댓글
  const [commentIdx, setCommentIdx] = useState();
  const [commentValue, setCommentValue] = useState();
  const [commentLength, setCommentLength] = useState(false);
  const [commentState, setCommentState] = useState(false);
  // 대댓글
  const [replyIdx, setReplyIdx] = useState('');
  const [replyNickname, setReplyNickname] = useState('');
  // 클릭영역 외
  const [isVisible, setIsVisible] = useState(false);
  const sideRef = useRef(null);
  OutsideHook(sideRef, () => setIsVisible(false));

  const [memberIdx, setMemberIdx] = useState(321);


  const [contentValue, setContentValue] = useState(false);
  // 수정하기
  const [addState, setAddState] = useState(false);
  const contentValueCheck = (length) => {
    setContentValue(length);
  }
  const addStateCheck = (state) => {
    setAddState(!addState);
  }

  // 글 상세 Api
  useEffect(() => {
    async function postDetailApi() {
      try {
        await dispatch(postDetailData(id.id));
        console.log(postDetail)
      } catch (error) {
        console.log(error)
      }
    }

    postDetailApi();
  }, [commentState, dispatch, id.id]);

  // 글 삭제하기
  async function postDeleteData(articleIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await memebookApi.postDeleteApi(articleIdx, memberIdx);
        window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 글 좋아요
  const postReaction = () => {
    setPostReactionState(!postReactionState)
  }

  // 댓글 클릭하면 커지기
  const commtentActive = () => {
    setTextareaActive(true);
  }

  // 댓글 삭제하기
  async function commentDeleteData(commentIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await memebookApi.commentDeleteApi(commentIdx, memberIdx);
        setCommentState(!commentState);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 툴팁 열기
  const wordSet = () => {
    setIsVisible(!isVisible);
  }

  // 댓글 개수
  const commentValueCount = (event) => {
    setCommentValue(event.target.value);
  }

  // 제목, 설명 - 글 수정하기 페이지로 데이터 전달
  const postModifyToPage = () => {
    navigate(`/community/postAdd/${id.id}`, {
      state: {
        title: postDetail?.articleTitle,
        content: postDetail?.articleContent
      }
    });
  };

  // 답글 달기 - 닉네임 추가
  const commentReplyData = (nickname, commentIdx, upperIdx) => {
    setReplyNickname(nickname);
    setReplyIdx(upperIdx);
    setCommentIdx(commentIdx);
  }

  // 닉네임 다시 클릭하면 데이터 제거
  const replayNicknameDelete = () => {
    setReplyNickname('');
    setCommentIdx(0);
  };

  // 댓글 달기
  async function commentSubmitData(type) {
    try {
      if (commentValue?.length > 0) {
        await memebookApi.commentAddApi({
          "commentContent": commentValue,
          "articleIdx": id.id,
          "memberIdx": memberIdx,
          "upperIdx": type === 'reply' ? replyIdx : commentIdx,
        });
        setCommentState(!commentState);
        setTextareaActive(false);
        setCommentValue('');
        setReplyNickname('');
        setCommentLength(false);
      } else {
        setCommentLength(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const propsToSend = {
    type: "community",
    length: 100,
    replyNickname : replyNickname,
    replyIdx : replyIdx,
    commentIdx : commentIdx
  };


  return (
    <div className="post_wrap">
      <div className="container">

        {/* 포스트 */}
        <div className="post_item">
          <div className="post_top">
            <h3 className="post_tit">{postDetail?.articleTitle}</h3>
            <span className="post_nickname">{postDetail?.nickname}</span>
            <button type="button" className="btn_set" onClick={wordSet}>
              <span className="blind">유저 셋</span>
            </button>
            {
              isVisible && (
                <>
                  <ul className="set_box" ref={sideRef}>
                    {
                      postDetail?.articleMemberIdx !== memberIdx && (
                        <li>
                          <button type="button" className="">
                            <span>신고하기</span>
                          </button>
                        </li>
                      )
                    }

                    {
                      postDetail?.articleMemberIdx === memberIdx && (
                        <>
                          <li>
                            <button type="button" onClick={postModifyToPage} className="">
                              <span className="">수정</span>
                            </button>
                          </li>
                          <li>
                            <button type="button" className="" onClick={() => postDeleteData(postDetail.articleIdx)}>
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

          <p className="post_con">{postDetail?.articleContent}</p>

          <div className="post_reaction">
            <button type="button" className={`btn_post_like ${postReactionState ? 'active' : ''}`}
                    onClick={postReaction}>
              <span className="blind">좋아요</span>
            </button>
            <Link to="/community/postDetail" className="reaction_link reaction_comment">
              <span
                className={`txt_count ${postDetail?.commentCount === 0 ? 'blind' : ''}`}>{postDetail?.commentCount === 0 ? '댓글' : postDetail?.commentCount}</span>
            </Link>
            <Link to="/community/postDetail" className="reaction_link reaction_view">
              <span className="blind">조회수</span>
            </Link>
          </div>


        </div>

        {/* 코멘트 리스트 */}
        {
          postDetail?.commentDtoList.length > 0 && (
            <ul className={`post_comment ${textareaActive ? 'active' : ''}`} >
              {
                postDetail?.commentDtoList?.map((item, idx) => {
                  return (
                    <li className="list" key={idx}>
                      <div className="comment_box">

                        <div className="comment_top">
                          {/* 작성자가 삭제한 댓글 */}
                          {
                            item?.deleted === true && (
                              <p className="comment_txt none">작성자가 삭제한 댓글입니다</p>
                            )
                          }

                          {
                            item?.deleted === false && (
                             <>
                               <span className="comment_nickname">{item?.nickname}</span>
                               <p className="comment_txt">{item?.commentContent}</p>
                               <div className="comment_btm">
                                 <button type="button" className="btn_reply"
                                         onClick={() => commentReplyData(item?.nickname, item?.commentIdx, item?.upperIdx)}>답글 달기
                                 </button>
                                 <button type="button" className="btn_icon like">
                                   <span className="blind">좋아요</span>
                                 </button>
                                 {
                                   item?.commentMemberIdx === memberIdx && (
                                     <button type="button" className="btn_delete" onClick={() => {
                                       commentDeleteData(item?.commentIdx)
                                     }}>
                                       <span className="blind">댓글 삭제</span>
                                     </button>
                                   )
                                 }
                               </div>
                             </>
                            )
                          }
                        </div>


                      </div>

                      {/* 대댓 */}
                      {
                        item?.commentReplyList.length !== 0 && (
                          <ul className="comment_list">
                            {
                              item?.commentReplyList?.map((reply, idx) => {
                                return (
                                  <li className="list" key={idx}>
                                    <div className="comment_box">
                                      <div className="comment_top">


                                        {/* 작성자가 삭제한 댓글 */}
                                        {
                                          reply?.deleted === true && (
                                            <p className="comment_txt none">작성자가 삭제한 댓글입니다</p>
                                          )
                                        }
                                        {
                                          reply?.deleted === false && (
                                           <>
                                             <span className="comment_nickname">{reply?.nickname}</span>
                                             <p className="comment_txt">
                                               <span className="comment_tag">@{item?.nickname}</span>
                                               {reply?.commentContent}
                                             </p>
                                             <div className="comment_btm">
                                               <button type="button" className="btn_reply"
                                                       onClick={() => commentReplyData(reply?.nickname, reply?.commentIdx)}>답글 달기
                                               </button>
                                               <button type="button" className="btn_icon like">
                                                 <span className="blind">좋아요</span>
                                               </button>
                                               {
                                                 reply?.commentMemberIdx === memberIdx && (
                                                   <button type="button" className="btn_delete" onClick={() => {
                                                     commentDeleteData(reply?.commentIdx)
                                                   }}>
                                                     <span className="blind">댓글 삭제</span>
                                                   </button>
                                                 )
                                               }

                                             </div>
                                           </>
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
          )
        }

        <AddComponent {...propsToSend}
                      addSubmit={addStateCheck}
                      contentValueCheck={contentValueCheck}>
        </AddComponent>


        {/*<div className="comment_input_box">*/}
        {/*  <div className={`input_box ${commentLength ? 'invalid' : ''}`}>*/}
        {/*    {*/}
        {/*      replyNickname && (*/}
        {/*        <span className="reply_nickname" onClick={replayNicknameDelete}>@{replyNickname}</span>*/}
        {/*      )*/}
        {/*    }*/}
        {/*    <textarea placeholder="댓글 입력"*/}
        {/*              className={`${textareaActive ? 'active' : ''}`}*/}
        {/*              ref={textRef}*/}
        {/*              value={commentValue}*/}
        {/*              onClick={commtentActive}*/}
        {/*              onChange={commentValueCount}>*/}
        {/*    </textarea>*/}
        {/*    <button type="button" className="btn_comment_submit"*/}
        {/*            onClick={() => { replyIdx > 0 ?  commentSubmitData('reply') : commentSubmitData('comment')}}*/}
        {/*    >*/}
        {/*      <span>등록</span>*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*</div>*/}

      </div>
    </div>
  );
}
