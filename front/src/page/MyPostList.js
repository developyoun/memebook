import '../scss/page/myAddList.scss'
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {myWordListData, wordDeleteData} from "../util/action/wordAction";
import Title from "../components/Title";
import {postListData} from "../util/action/communityAction";

export default function MyPostList() {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.meme.postList);
  const [deleteState, SetDeleteState] = useState(false);
  const [memberIdx, setMemberIdx] = useState(321);

  useEffect(() => {
    async function wordAddListApi() {
      try {
        dispatch(postListData(memberIdx));
      } catch (error) {
        console.log(error)
      }
    }
    wordAddListApi();
  }, [deleteState]);

  // 설명 삭제
  async function myAddWordDelete(wordContentIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        dispatch(wordDeleteData(wordContentIdx));
        SetDeleteState(!deleteState);
        alert('삭제');
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="my_word_wrap">

      <Title title="작성한 글" type="back"></Title>

      <div className="container">
        
        {
          postList.articleList?.length === 0 && (
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
          postList.articleList?.length > 0 && (
            <ul className="list_box inside">
              {
                postList.articleList?.map((item, idx) => {
                  return (
                    <li className="list_item">
                      <Link to={`/community/postDetail/${item.articleIdx}`} className="link" key={idx}>{item.articleTitle}</Link>
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
