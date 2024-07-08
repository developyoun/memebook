import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {postListData} from "./../../util/action/communityAction";
import Title from "./../../components/Title";
import './../../scss/page/profile/myAddList.scss'
import userIdxHigher from "../../components/UserIdxHigher";

const MyPostList = ({ userIdx }) => {
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState([]);

  // 내가 등록한 글 리스트
  const postList = useSelector(state => state.meme.postList);
  // 삭제 상태
  const [deleteState, setDeleteState] = useState(false);

  const selectCheckboxChange = (articleIdx) => {
    setCheckedItems(prevCheckedItems => {
      if (prevCheckedItems.includes(articleIdx)) {
        return prevCheckedItems.filter(idx => idx !== articleIdx);
      } else {
        return [...prevCheckedItems, articleIdx];
      }
    });
  }

  useEffect(() => {
    async function wordAddListApi() {
      try {
        if (userIdx !== undefined) {
          dispatch(postListData(userIdx));
          console.log(postList);
        }
      } catch (error) {
        console.log(error)
      }
    }
    wordAddListApi();
  }, [deleteState, userIdx]);

  // 글 삭제하기
  async function postDeleteData(articleIdx) {
    try {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        await memebookApi.postDeleteApi(articleIdx, userIdx);
        setDeleteState(!deleteState)
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className="layer_wrap my_word_wrap">

      <Title title="작성한 글" type="back"></Title>

      <div className="container">

        <div className="list_top">
          <span className="txt">
            총 {postList.totalCount} 개
          </span>

          <span className="check_box">
            <input type="checkbox" id="allDelete"/>
            <label htmlFor="allDelete">전체 삭제</label>
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
                      <span className="check_box">
                        <input type="checkbox" id={item.articleIdx} onClick={() => selectCheckboxChange(item.articleIdx)}/>
                        <label htmlFor={item.articleIdx}>
                          <span className="blind">선택 삭제</span>
                        </label>
                      </span>
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

export default userIdxHigher(MyPostList);