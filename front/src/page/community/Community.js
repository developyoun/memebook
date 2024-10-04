import {useDispatch, useSelector} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {postListData} from "../../util/action/communityAction";
import './../../scss/page/community/community.scss'
import userIdxHigher from "../../components/UserIdxHigher";

const Community = ({ userIdx }) => {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.meme.postList);
  const [postReactionState, setPostReactionState] = useState(false);
  // 글 리스트
  const [postData, setPostData] = useState([]);
  // 로딩
  const [loadingState, setLoadingState] = useState(true);

  // 포스트 Api
  useEffect(() => {
    async function postListApi() {
      try {
        await dispatch(postListData());
        console.log(postList)
      } catch (error) {
        console.log(error);
      }
    }
    postListApi();
  }, [dispatch]);

  useEffect(() => {
    if (postList && postList.articleList) {
      setPostData(postList.articleList)
      setLoadingState(false);
    }
  }, [postList]);

  const postReaction = () => {
    setPostReactionState(!postReactionState)
  }

  return (
    <div className="community_wrap">
        <div className="container">

          {/* 타이틀 */}
          <div className="commu_top">
            <h2 className="commu_tit">&#128214;&nbsp;&nbsp;커뮤니티</h2>
            <div className="commu_box">
              <Link to={`/community/postAdd`} className="btn_add_post">
                <span>글쓰기</span>
              </Link>
            </div>
          </div>

          {/* 리스트 */}
          <div className="commu_con">
            <Swiper slidesPerView='auto' className="tab_box">
              <SwiperSlide className="tab_item active">
                <button type="button" className="item">&#127775;&nbsp;&nbsp;최신</button>
              </SwiperSlide>
              <SwiperSlide className="tab_item">
                <button type="button" className="item">&#128400;&nbsp;&nbsp;단어 질문</button>
              </SwiperSlide>
              <SwiperSlide className="tab_item">
                <button type="button" className="item">&#128640;&nbsp;&nbsp;요즘 유행</button>
              </SwiperSlide>
              <SwiperSlide className="tab_item">
                <button type="button" className="item">&#128640;&nbsp;&nbsp;문화 이슈</button>
              </SwiperSlide>
              <SwiperSlide className="tab_item">
                <button type="button" className="item">&#128640;&nbsp;&nbsp;K-POP</button>
              </SwiperSlide>
              <SwiperSlide className="tab_item">
                <button type="button" className="item">&#128640; K-DRAMA</button>
              </SwiperSlide>
              <SwiperSlide className="tab_item">
                <button type="button" className="item">&#128640; MEME</button>
              </SwiperSlide>
            </Swiper>

            <div className="commu_desc">
              총 {postList.totalCount ?? 0} 개
            </div>

            { postData === undefined && loadingState && (
              <div className="loading_box">
                로딩중
              </div>
              )
            }

            { postData.length === 0 && (
                <div className="none_box">
                  작성된 글이 없어요
                </div>
              )
            }

            {
              !loadingState && postList && postData.length !== 0 && (
                <div className="commu_list">
                  <ul className="list">
                    {/* 포스트 */}
                    {
                      postList.articleList?.map((item, idx) => {
                        return (
                          <li key={idx}>
                            <div className="post_item">
                              <Link to={`/community/postDetail/${item.articleIdx}`} className="post_link">
                                <div className="post_top">
                                  <h3 className="post_tit">{item.articleTitle}</h3>
                                  <span className="post_nickname">{item.memberNickname}</span>
                                </div>

                                <p className="post_con">{item.articleContent}</p>

                              </Link>


                              <div className="post_reaction">
                                <button type="button" className={`btn_post_like ${postReactionState ? 'active' : ''}`} onClick={postReaction}>
                                  <span className="blind">좋아요</span>
                                </button>
                                <Link to={`/community/postDetail/${item.articleIdx}`} className="reaction_link reaction_comment">
                                  <span className={`txt_count ${item.commentCount === 0 ? 'blind' : ''}`}>{item.commentCount === 0 ? '댓글' : item.commentCount}</span>
                                </Link>
                                <Link to={`/community/postDetail/${item.articleIdx}`} className="reaction_link reaction_view">
                                  <span className="blind">조회수</span>
                                </Link>
                              </div>
                            </div>

                          </li>
                        )
                      })
                    }

                  </ul>
                </div>
              )
            }


          </div>


        </div>

    </div>
  );
}

export default userIdxHigher(Community);