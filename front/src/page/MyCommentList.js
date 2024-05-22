import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {postCommentData} from "../util/action/communityAction";
import Title from "../components/Title";
import '../scss/page/myAddList.scss'

export default function MyCommentList() {
  const dispatch = useDispatch();
  // 댓글 리스트
  const myCommentList = useSelector(state => state.meme.myCommentList);

  const [memberIdx, setMemberIdx] = useState(123);

  // 댓글 리스트 Api
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

        <div className="list_top">
          <span className="txt">
            총 {myCommentList.totalCount} 개
          </span>
          <span className="check_box">
            <input type="checkbox"/>
            <label htmlFor="">전체 삭제</label>
          </span>
        </div>

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
                    <li className="list_item" key={idx}>
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
