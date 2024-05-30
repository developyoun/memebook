import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {scrapListData} from "./../../util/action/scrapAction";
import {myWordListData} from "./../../util/action/wordAction";
import {postCommentData, postListData} from "./../../util/action/communityAction";
import './../../scss/page/profile/profile.scss'

export default function Profile() {
  let id = useParams();
  const dispatch = useDispatch();
  // 스크랩 리스트
  const scrapList = useSelector(state => state.meme.scrapList);
  // 내가 참여한 리스트
  const myWordList = useSelector(state => state.meme.myWordList);
  // 내가 작성한 글 리스트
  const postList = useSelector(state => state.meme.postList);
  // 내가 작성한 댓글 리스트
  const myCommentList = useSelector(state => state.meme.myCommentList);
  // 팔로워
  const [followerState, setFollowerState] = useState();
  const [followerCount, setFollowerCount] = useState(0);
  const [followerAddState, setFollowerAddState] = useState(false);
  // 링크 복사 상태
  const [copyState , setCopyState] = useState(false);

  const [memberIdx, setMemberIdx] = useState(123);

  useEffect(() => {
    async function profileApi() {
      try {
        dispatch(scrapListData(memberIdx));
        dispatch(myWordListData(memberIdx));
        dispatch(postListData(memberIdx));
        dispatch(postCommentData(memberIdx));
      } catch (error) {
        console.log(error)
      }
    }
    profileApi();
  }, []);


  async function followerAdd() {
    try {
      let count = 0;
      const followerAddData = await memebookApi.followerAddApi({
        "follower": id,
        "followee": memberIdx,
      });
      setFollowerAddState(!followerAddState);
      console.log('성공')
    } catch (error) {
      console.error(error);
    }
  }

  // 밈북 공유하기
  const inviteLink = () => {
    window.navigator.clipboard.writeText('http://www.naver.com').then(() => {
      alert('복사되었어요');
      setCopyState(true);
    }) .catch(() => {
      alert('복사에 실패했어요, 다시 시도해주세요')
    })
  }

  return (
    <div className="profile_wrap">
        <div className="container">
            <div className="user_info">
                <div className="follower_box">
                    {
                        id !== memberIdx && (
                            <button type="button" className={`btn_followers ${followerState ? 'active' : ''}`} onClick={followerAdd}>
                                <span className="blind">팔로워</span>
                            </button>
                        )
                    }
                </div>
                <div className="user_name">
                    <h3 className="name">누징</h3>
                </div>

                <div className="user_info_desc">

                    <ul>
                        <li>
                            <span className="count">{followerCount ? followerCount : 0}</span>
                            <span className="txt">follower</span>
                        </li>
                        <li>
                            <span className="count">0</span>
                            <span className="txt">following</span>
                        </li>
                    </ul>

                </div>

                <p className="visit_count">🏡 연속 방문 최대 <strong>12</strong>번을 달성했어요!</p>

            </div>

            <div className="daily_box">
                <h3 className="tit">🌻 출석체크</h3>
                <ul className="daily_list">
                    <li>
                        <div className="day check">
                            <span>월</span>
                        </div>
                    </li>
                    <li>
                        <div className="day">
                            <span>화</span>
                        </div>
                    </li>
                    <li>
                        <div className="day">
                            <span>수</span>
                        </div>
                    </li>
                    <li>
                        <div className="day">
                            <span>목</span>
                        </div>
                    </li>
                    <li>
                        <div className="day">
                            <span>금</span>
                        </div>
                    </li>
                    <li>
                        <div className="day">
                            <span>토</span>
                        </div>
                    </li>
                    <li>
                        <div className="day">
                            <span>일</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="user_box">
                <div className="user_tit">
                    <h4>
                        참여한 단어
                        {
                            myWordList.wordContentList?.length !== 0 && (
                                <span className="count">{myWordList.wordContentList?.length}</span>
                            )
                        }
                    </h4>
                    <Link to="/profile/myWordList" className="item">더보기</Link>
                </div>
                {
                    myWordList.wordContentList?.length === 0 && (
                        <div className="content_none">등록한 단어가 없어요 &#128172;</div>
                    )
                }
                {
                    myWordList.wordContentList?.length > 0 && (
                        <ul className="list_box inside">
                            {
                                myWordList.wordContentList?.slice(0, 3).map((item, idx) => {
                                    return (
                                        <li className="list_item" key={idx}>
                                            <Link to={`/vocabulary/wordInfo/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </div>

            <div className="user_box">
                <div className="user_tit">
                    <h4>
                        스크랩한 단어
                        {
                            scrapList.content?.length !== 0 && (
                                <span className="count">{scrapList.content?.length}</span>
                            )
                        }
                    </h4>
                    <Link to="/profile/scrapList" className="item">더보기</Link>
                </div>
                {
                    scrapList.content?.length === 0 && (
                        <div className="content_none">스크랩한 단어가 없어요 &#128172;</div>
                    )
                }
                {
                    scrapList.content?.length > 0 && (
                        <ul className="list_box inside">
                            {
                                scrapList.content?.slice(0, 3).map((item, idx) => {
                                    return (
                                        <li className="list_item" key={idx}>
                                            <Link to={`/vocabulary/wordInfo/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </div>

            <div className="user_box">
                <div className="user_tit">
                    <h4>
                        내가 쓴 글
                        {
                            postList?.totalCount !== 0 && (
                                <span className="count">{postList.totalCount}</span>
                            )
                        }
                    </h4>
                    <Link to="/profile/myPostList" className="item">더보기</Link>
                </div>
                {
                    postList?.totalCount === 0 && (
                        <div className="content_none">작성한 글이 없어요 &#128172;</div>
                    )
                }
                {
                    postList?.totalCount > 0 && (
                        <ul className="list_box inside">
                            {
                                postList?.articleList?.slice(0, 3).map((item, idx) => {
                                    return (
                                        <li className="list_item" key={idx}>
                                            <Link to={`/community/postDetail/${item.articleIdx}`} className="link" key={idx}>{item.articleTitle}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </div>

            <div className="user_box">
                <div className="user_tit">
                    <h4>
                        내가 쓴 댓글
                        {
                            myCommentList?.totalCount !== 0 && (
                                <span className="count">{myCommentList?.totalCount}</span>
                            )
                        }
                    </h4>
                    <Link to="/profile/myCommentList" className="item">더보기</Link>
                </div>
                {
                    myCommentList?.totalCount === 0 && (
                        <div className="content_none">작성한 댓글이 없어요 &#128172;</div>
                    )
                }
                {
                    myCommentList?.totalCount > 0 && (
                        <ul className="list_box inside">
                            {
                                myCommentList.commentList?.slice(0, 3).map((item, idx) => {
                                    return (
                                        <li className="list_item" key={idx}>
                                            <Link to={`/community/postDetail/${item.articleIdx}`} className="link" key={idx}>{item.commentContent}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            </div>

            <div className="invite_box">
                <p className="invite_txt">&#127881; 친구 초대를 통해 밈북의 세계를 넓혀주세요 &#127881;</p>
                <button type="button" onClick={inviteLink} className="btn_primary size_m">
                    {copyState === true ? '복사 완료 ! 친구에게 공유해주세요!' : '링크 복사하기'}
                </button>
            </div>

        </div>
    </div>
  );
}
