import {memebookApi} from "../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {postDetailData} from "../util/action/communityAction";
import Header from "../components/Header";
import '../scss/page/community.scss'

export default function PostInfo() {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postDetail = useSelector(state => state.meme.postDetail);
  // 글 좋아요
  const [postReactionState, setPostReactionState] = useState(false);
  // 툴팁
  const [wordSetState, setWordSetState] = useState(false);
  // 댓글 폼 활성화
  const [textareaActive, setTextareaActive] = useState(false);
  // 댓글
  const [commentIdx, setCommentIdx] = useState();
  const [commentValue, setCommentValue] = useState();
  const [commentLength, setCommentLength] = useState(false);
  const [commentState, setCommentState] = useState(false);
  // 대댓글
  const [replyNickname , setReplyNickname] = useState('');

  const [memberIdx, setMemberIdx] = useState(321);

  // 글 상세 Api
  useEffect(() => {
    async function postDetailApi() {
      try {
        await dispatch(postDetailData(id.id));
      } catch (error) {
        console.log(error)
      }
    }
    postDetailApi();
  }, [commentState]);

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
    } catch(error) {
      console.log(error);
    }
  }

  // 툴팁 열기
  const wordSet = () => {
    setWordSetState(!wordSetState);
  }

  // 댓글 개수
  const commentValueCount = (event) => {
    setCommentValue(event.target.value);
  }

  // 제목, 설명 - 글 수정하기 페이지로 데이터 전달
  const postModifyToPage = () => {
    navigate(`/community/postAdd/${id.id}`, { state: { title : postDetail?.articleTitle, content: postDetail?.articleContent} });
  };

  // 답글 달기 - 닉네임 추가
  const commentReplyData = (nickname, commentIdx) => {
    setReplyNickname(nickname);
    setCommentIdx(commentIdx);
  }

  // 닉네임 다시 클릭하면 데이터 제거
  const replayNicknameDelete = () => {
    setReplyNickname('');
    setCommentIdx(0);
  };

  // 댓글 달기
  async function commentSubmitData() {
    try {
      if (commentValue?.length > 0) {
        await memebookApi.commentAddApi( {
          "commentContent": commentValue,
          "articleIdx": id.id,
          "memberIdx": memberIdx,
          "upperIdx": commentIdx,
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
