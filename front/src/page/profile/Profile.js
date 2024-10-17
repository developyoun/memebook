import {memebookApi} from "./../../util/memebookApi";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {scrapListData} from "./../../util/action/scrapAction";
import {myWordListData} from "./../../util/action/wordAction";
import {postCommentData, postListData} from "./../../util/action/communityAction";
import './../../scss/page/profile/profile.scss'
import userIdxHigher from "../../components/UserIdxHigher";
import ProfileHistory from "../../components/ProfileHistory";
import GoogleLoginButton from "../main/GoogleLoginButton";
import {userInfoData} from "../../util/action/userAction";

const Profile = ({ userIdx }) => {
  let id = useParams();

  const dispatch = useDispatch();

  const loginToken = localStorage.getItem("memberIdx");
  const userInfo = useSelector(state => state.meme.userInfo);
  // 스크랩 리스트
  const scrapList = useSelector(state => state.meme.scrapList);
  // 내가 참여한 리스트
  const myWordList = useSelector(state => state.meme.myWordList);
  // 내가 작성한 글 리스트
  const postList = useSelector(state => state.meme.postList);
  // 내가 작성한 댓글 리스트
  const myCommentList = useSelector(state => state.meme.myCommentList);
  // 팔로워
  const [followerState, setFollowerState] = useState();
  const [followerCount, setFollowerCount] = useState(0);
  const [followerAddState, setFollowerAddState] = useState(false);
  // 링크 복사 상태
  const [copyState , setCopyState] = useState(false);

  useEffect(() => {
    async function profileApi() {
      try {
        if (loginToken !== undefined) {
          dispatch(scrapListData(loginToken));
          dispatch(myWordListData(loginToken));
          dispatch(postListData(1));
          dispatch(postCommentData(loginToken));
          dispatch(userInfoData(loginToken));
          console.log(userInfo);
        }

      } catch (error) {
        console.log(error)
      }
    }
    profileApi();
  }, [dispatch, loginToken]);

  async function followerAdd() {
    try {
      await memebookApi().followerAddApi({
        "follower": id,
        "followee": userIdx,
      });
      setFollowerAddState(!followerAddState);
    } catch (error) {
      console.error(error);
    }
  }

  // 밈북 공유하기
  const inviteLink = () => {
    window.navigator.clipboard.writeText('https://memebook.co.kr/main').then(() => {
      alert('복사되었어요');
      setCopyState(true);
    }) .catch(() => {
      alert('복사에 실패했어요, 다시 시도해주세요')
    })
  }

  const logoutBtn = () => {
    if(window.confirm("로그아웃 하세유?")) {
      window.location.replace("/")
      localStorage.removeItem("token");
      localStorage.removeItem("memberIdx");
    }
  }

  return (



  <div className="profile_wrap">
    {
      loginToken === null && (
        <div>
          <p>로그인</p>
          <GoogleLoginButton />
        </div>
      )
    }

    {
      loginToken !== null && (
        <div className="container">

          {/* 정보 */}
          <div className="user_info">
            <div className="follower_box">
              {
                id !== userIdx && (
                  <button type="button" className={`btn_followers ${followerState ? 'active' : ''}`} onClick={followerAdd}>
                    <span className="blind">팔로워</span>
                  </button>
                )
              }
            </div>
            <div className="info_name">
              <h3 className="name">{userInfo?.provider}</h3>
            </div>

            <ul className="info_desc">
              <li>
                <span className="count">{followerCount ? followerCount : 0}</span>
                <span className="txt">follower</span>
              </li>
              <li>
                <span className="count">0</span>
                <span className="txt">following</span>
              </li>
            </ul>

            <p className="info_visit">🏡 연속 방문 최대 <strong>12</strong>번을 달성했어요!</p>

          </div>

          {/* 출석체크 */}
          <div className="user_daily">
            <h3 className="daily_tit">🌻 출석체크</h3>
            <ul className="daily_list">
              <li>
                <div className="day check">
                  <span>월</span>
                </div>
              </li>
              <li>
                <div className="day">
                  <span>화</span>
                </div>
              </li>
              <li>
                <div className="day">
                  <span>수</span>
                </div>
              </li>
              <li>
                <div className="day">
                  <span>목</span>
                </div>
              </li>
              <li>
                <div className="day">
                  <span>금</span>
                </div>
              </li>
              <li>
                <div className="day">
                  <span>토</span>
                </div>
              </li>
              <li>
                <div className="day">
                  <span>일</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 히스토리 */}
          <div className="user_history">

            <ProfileHistory historyList={myWordList} type="myWord"></ProfileHistory>
            <ProfileHistory historyList={scrapList} type="myScrap"></ProfileHistory>
            <ProfileHistory historyList={postList} type="myPost"></ProfileHistory>
            <ProfileHistory historyList={myCommentList} type="myComment"></ProfileHistory>
          </div>

          {/* 초대하기 */}
          <div className="invite_box">
            <p className="invite_txt">&#127881; 친구 초대를 통해 밈북의 세계를 넓혀주세요 &#127881;</p>
            <button type="button" onClick={inviteLink} className="btn_link">
              {copyState === true ? '복사 완료 ! 친구에게 공유해주세요!' : '링크 복사하기'}
            </button>
          </div>
          <button type="button" className="btn_logout" onClick={logoutBtn}>로그아웃</button>
        </div>
      )
    }
  </div>
  );
}
export default userIdxHigher(Profile);