import '../scss/page/myAddList.scss'
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postCommentData} from "../util/action/communityAction";
import Title from "../components/Title";
import {Link} from "react-router-dom";
export default function MyCommentList() {
  const dispatch = useDispatch();
  const myCommentList = useSelector(state => state.meme.myCommentList);
  const [memberIdx, setMemberIdx] = useState(123);

  useEffect(() => {
    async function myCommentListApi() {
      try {
        dispatch(postCommentData(memberIdx));
        console.log(myCommentList)
      } catch (error) {
        console.log(error)
      }
    }
    myCommentListApi();
  }, []);

  return (
    <div className="my_word_wrap">

      <Title title="작성한 댓글" type="back"></Title>

      <div className="container">
        {
          myCommentList?.commentList.length === 0 && (
            <div className="content_none list">
              <p>
                작성한 글이 없어요 &#128172;
              </p>
              <Link to="/community" className="btn_primary_line size_m">
                커뮤니티 구경하러 가기
              </Link>
            </div>
          )
        }

        {
          myCommentList?.commentList.length > 0 && (
            <ul className="list_box inside">
              {
                myCommentList?.commentList.map((item, idx) => {
                  return (
                    <li className="list_item">
                      <Link to={`/community/postDetail/${item.commentIdx}`} className="link" key={idx}>{item.commentContent}</Link>
                      <button type="button" className="btn_delete">
                        <span className="blind">글 삭제</span>
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      </div>

    </div>
  );
}
