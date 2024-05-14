import '../scss/page/community.scss'
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import Header from "../components/Header";
import {useDispatch, useSelector} from "react-redux";
import {postDetailData, postListData} from "../util/action/communityAction";

export default function Community() {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.meme.postList);
  const postDetail = useSelector(state => state.meme.postDetail);
  const [postReactionState, setPostReactionState] = useState(false);

  // 포스트 Api
  useEffect(() => {
    async function postListApi() {
      try {
        dispatch(postListData());
        dispatch(postDetailData(5));
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
                          <span className="nickname">김누징</span>
                        </div>

                        <p className="txt">왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요</p>
                      </Link>
                      <button type="button" className="post_more_btn">더보기</button>

                      <div className="post_reaction">
                        <button type="button" className={`btn_post_like ${postReactionState ? 'active' : ''}`} onClick={postReaction}>
                          <span className="blind">좋아요</span>
                        </button>
                        <Link to="/community/postDetail" className="comments_count">
                          <span className="blind">댓글</span>
                        </Link>
                        <Link to="/community/postDetail" className="view_count">
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
    </>
  );
}
