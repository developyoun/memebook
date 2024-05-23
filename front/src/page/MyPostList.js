import {memebookApi} from "../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {postListData} from "../util/action/communityAction";
import Title from "../components/Title";
import '../scss/page/myAddList.scss'

export default function MyPostList() {
  const dispatch = useDispatch();
  // 내가 등록한 글 리스트
  const postList = useSelector(state => state.meme.postList);
  // 삭제 상태
  const [deleteState, setDeleteState] = useState(false);

  const [memberIdx, setMemberIdx] = useState(123);

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

  // 글 삭제하기
  async function postDeleteData(articleIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await memebookApi.postDeleteApi(articleIdx, memberIdx);
        setDeleteState(!deleteState)
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="my_word_wrap">

      <Title title="작성한 글" type="back"></Title>

      <div className="container">

        <div className="list_top">
          <span className="txt">
            총 {postList.totalCount} 개
          </span>
          <span className="check_box">
            <input type="checkbox"/>
            <label htmlFor="">전체 삭제</label>
          </span>
        </div>
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
                    <li className="list_item" key={idx}>
                      <Link to={`/community/postDetail/${item.articleIdx}`} className="link" key={idx}>{item.articleTitle}</Link>
                      <button type="button" className="btn_delete" onClick={() => {postDeleteData(item.articleIdx)}}>
                        <span className="blind">글 삭제</span>
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          )
        }

        <div className="list_btm">
          <button type="button" className="btn_primary size_s">더보기</button>
        </div>

      </div>

    </div>
  );
}
