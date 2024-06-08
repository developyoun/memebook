import {useDispatch, useSelector} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {postListData} from "../../util/action/communityAction";
import './../../scss/page/community/community.scss'

export default function Community() {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.meme.postList);
  const [postReactionState, setPostReactionState] = useState(false);

  // 포스트 Api
  useEffect(() => {
    async function postListApi() {
      try {
        dispatch(postListData)
      } catch (error) {
        // window.history.back();
      }
    }

    postListApi();
  }, []);

  const postReaction = () => {
    setPostReactionState(!postReactionState)
  }

  return (
    <div className="community_wrap">
        <div className="container">

          {/* 타이틀 */}
          <div className="commu_top">
            <h2 className="tit">&#128214; 커뮤니티</h2>
            <div className="commu_box">
              <span className="commu_txt">궁금하거나 모르는게 있나요?<br/>지금 물어보세요 &#128073;</span>
              <Link to={`/community/postAdd`} className="btn_add_post">
                <span>글쓰기</span>
              </Link>
            </div>
          </div>

          {/* 리스트 */}
          <div className="commu_con">
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
              <SwiperSlide className="tab_item">
                <button type="button" className="item">&#128640; 문화 이슈</button>
              </SwiperSlide>
              <SwiperSlide className="tab_item">
                <button type="button" className="item">&#128640; K-POP</button>
              </SwiperSlide>
              <SwiperSlide className="tab_item">
                <button type="button" className="item">&#128640; K-DRAMA</button>
              </SwiperSlide>
              <SwiperSlide className="tab_item">
                <button type="button" className="item">&#128640; MEME</button>
              </SwiperSlide>
            </Swiper>

            <div className="commu_desc">
              총  개
            </div>

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
                          <button type="button" className="btn_post_more">더보기</button>

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
          </div>

        </div>

    </div>
  );
}
