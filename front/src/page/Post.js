import '../scss/page/post.scss'
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
  const [loading, setLoading] = useState(true);

  // 포스트 디테일 Api
  useEffect(() => {
    async function postDetailApi() {
      try {
        await dispatch(postListData());
        await dispatch(postDetailData(id.id));
        console.log(postList);
        console.log(postDetail);
      } catch (error) {
        console.log('오류')
      }
    }
    postDetailApi();
  }, []);


  return (
    <>
      <Header></Header>
      <div className="post_wrap">
        <div className="post_top">

          <h2 className="post_tit">요즘 잠이 안와요</h2>
          <span className="nickname">김누징</span>
          {/*<span className="post_time">10분전</span>*/}
        </div>
        <div className="post_con">
          <p className="post_txt">
            왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요왜 안오는지 누가 알려주실래요 괴롭네요
          </p>
          <div className="post_reaction">
            <button type="button" className="post_like_btn">
              <span className="blind">좋아요</span>
            </button>
            <button type="button" className="comments_btn">
              <span>댓글</span>
            </button>
            <button type="button" className="view_btn">
              <span>조회수</span>
            </button>
          </div>
        </div>
        <div className="post_comment">
          <ul className="comment_list">
            {
              postDetail.commentDtoList?.map((item, idx) => {
                return (
                  <li className="list">
                    <div className="comments">
                      <span className="nickname">{item.nickname}</span>
                      <p className="txt">{item.commentContent}</p>
                    </div>
                    <ul className="list">
                    </ul>
                    {
                      item.commentReplyList?.map((item, idx) => {
                        return (
                          <li className="comments">
                            <span className="nickname">{item.nickname}</span>
                            <p className="txt">{item.commentContent}</p>
                            <button type="button" className="btn_icon like">
                              <span className="blind">좋아요</span>
                            </button>
                          </li>
                        )
                      })
                    }
                  </li>
                )
              })
            }

          </ul>
        </div>
      </div>
    </>
  );
}
