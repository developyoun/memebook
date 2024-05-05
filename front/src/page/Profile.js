import './../scss/profile.scss'
import HomeFooter from "../components/HomeFooter";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {scrapListData} from "../util/action/scrapAction";
import {myWordListData} from "../util/action/wordAction";
import {memebookApi} from "../util/memebookApi";

export default function Profile() {
  const dispatch = useDispatch();
  const scrapList = useSelector(state => state.meme.scrapList);
  const myWordList = useSelector(state => state.meme.myWordList);
  const [memberIdx, setMemberIdx] = useState('123');
  // 팔로워
  const [followerCount, setFollowerCount] = useState(0);
  const [followerAddState, setFollowerAddState] = useState(false);
  // 링크 복사 상태
  const [copyState , setCopyState] = useState(false);

  useEffect(() => {
    async function scrapeApi() {
      try {
        dispatch(scrapListData(memberIdx));
        dispatch(myWordListData(memberIdx));
      } catch (error) {
        console.log(error)
      }
    }
    scrapeApi();
  }, []);


  async function followerAdd() {
    try {
      let count = 0;
      const followerAddData = await memebookApi.followerAdd({
        "follower": count,
        "followee": 0,
      });
      if (followerAddState === true) {
        setFollowerCount(count--);
      } else {
        setFollowerCount(count++);
      }
      setFollowerAddState(!followerAddState);
      console.log('성공')
    } catch (error) {
      console.error(error);
    }
  }

  const inviteLink = () => {
    window.navigator.clipboard.writeText('http://www.naver.com').then(() => {
      alert('복사되었어요');
      setCopyState(true);
    }) .catch(() => {
      alert('복사에 실패했어요, 다시 시도해주세요')
    })
  }

  return (
    <div className="profile_container">
      <div className="user_info">
        <div className="user_name">
          <h3 className="name">누징</h3>
        </div>

        <div className="user_info_desc">

          <button type="button" className={`btn_followers ${followerAddState ? 'active' : ''}`} onClick={followerAdd}>팔로워</button>

          <ul>
            <li>
              <span className="count">6</span>
              <span className="txt">팔로잉</span>
            </li>
            <li>
              <span className="count">1</span>
              <span className="txt">팔로워</span>
            </li>
          </ul>

        </div>

        <p className="visit_count">🏡 연속 방문 최대 <strong>12</strong>번을 달성했어요!</p>

      </div>

      <div className="daily_box">
        <h3 className="tit">🌻 출석체크</h3>
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

      <div className="user_box">
        <div className="user_tit">
          <h4>
            등록한 단어
            <span className="count">{myWordList.wordContentList?.length}</span>
          </h4>
          <Link to="/profile/my_list" className="item">더보기</Link>
        </div>

        {
          myWordList.wordContentList?.length > 0 && (
            <ul className="list_box">
              {
                myWordList.wordContentList?.slice(0, 5).map((item, idx) => {
                  return (
                    <li className="list_item">
                      <Link to={`/word/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                    </li>
                  )
                })
              }
            </ul>
          )
        }

      </div>

      <div className="user_box">
        <div className="user_tit">
          <h4>
            스크랩한 단어
            <span className="count">{scrapList.content?.length}</span>
          </h4>
          <Link to="/profile/scrape" className="item">더보기</Link>
        </div>
        {
          scrapList.content?.length > 0 && (
            <ul className="list_box">
              {
                scrapList.content?.slice(0, 5).map((item, idx) => {
                  return (
                    <li className="list_item">
                      <Link to={`/word/${item.wordIdx}`} className="link" key={idx}>{item.wordName}</Link>
                    </li>
                  )
                })
              }
            </ul>
          )
        }

      </div>

      <div className="invite_box">
        <p className="invite_txt">&#127881; 친구 초대를 통해 밈북의 세계를 넓혀주세요 &#127881;</p>
        <button type="button" onClick={inviteLink} className="invite_btn">
          {copyState === true ? '복사 완료 ! 친구에게 공유해주세요!' : '링크 복사하기'}
        </button>
      </div>
    </div>
  );
}
