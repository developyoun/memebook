import {useDispatch, useSelector} from "react-redux";
import {Swiper, SwiperSlide} from "swiper/react";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {postListData} from "../../util/action/communityAction";
import './../../scss/page/community.scss'

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

            <div className="post_list">
                <ul className="list">
                    {
                        postList.articleList?.map((item, idx) => {
                            return (
                                <li key={idx}>
                                    <div className="post_item">
                                        <Link to={`/community/postDetail/${item.articleIdx}`} className="post_link">
                                            <div className="post_top">
                                                <h3 className="tit">{item.articleTitle}</h3>
                                                <span className="nickname">{item.memberNickname}</span>
                                            </div>
                                            <p className="txt">{item.articleContent}</p>
                                        </Link>
                                        <button type="button" className="post_more_btn">더보기</button>

                                        <div className="post_reaction">
                                            <button type="button" className={`btn_post_like ${postReactionState ? 'active' : ''}`} onClick={postReaction}>
                                                <span className="blind">좋아요</span>
                                            </button>
                                            <Link to={`/community/postDetail/${item.articleIdx}`} className="comments_count">
                                                <span className={`${item.commentCount === 0 ? 'blind' : ''}`}>{item.commentCount === 0 ? '댓글' : item.commentCount}</span>
                                            </Link>
                                            <Link to={`/community/postDetail/${item.articleIdx}`} className="view_count">
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

            <Link to={`/community/postAdd`} className="desc_add_btn">
                <span className="blind">작성하기</span>
            </Link>
        </div>

    </div>
  );
}