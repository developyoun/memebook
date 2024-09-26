import '../scss/components/layerHeader.scss'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {scrapListData} from "../util/action/scrapAction";
import {myWordListData} from "../util/action/wordAction";
import {postCommentData, postListData} from "../util/action/communityAction";

const ProfileHistory = ({ historyList, type }) => {
  const [listDetail, setListDetail] = useState(historyList);
  const [listLength, setListLength] = useState(0);
  const [title, setTitle] = useState('');
  const [noneText, setNoneText] = useState('');
  const [moreLink, setMoreLink] = useState('');
  const [listLink, setListLink] = useState('');
  const [listText, setListText] = useState('');

  useEffect(() => {
    console.log(historyList.wordContentList)

    if (historyList.length !== 0) {
      switch (type) {
        case "myWord" :
          setTitle('참여한 단어');
          setNoneText('등록한 단어가 없어요 &#128172;');
          setMoreLink('/profile/myWordList');
          setListLink('/vocabulary/wordInfo/${item.wordIdx}');
          setListText('item.wordName');
          setListDetail(historyList?.wordContentList);
          setListLength(historyList.wordContentList?.totalCount);
          break;
        case "myScrap" :
          setTitle('스크랩한 단어');
          setNoneText('스크랩한 단어가 없어요 &#128172;');
          setMoreLink('/profile/scrapList');
          setListLink('/vocabulary/wordInfo/${item.wordIdx}');
          setListText('item.wordName');
          // setList(historyList.content);
          // setListLength(historyList.content);
          break;
        case "myPost" :
          setTitle('내가 쓴 글');
          setNoneText('작성한 글이 없어요 &#128172;');
          setMoreLink('/profile/myPostList');
          setListLink('/community/postDetail/${item.articleIdx}');
          setListText('item.articleTitle');
          // setList(historyList.articleList);
          // setListLength(historyList.articleList);
          break;
        case "myComment" :
          setTitle('내가 쓴 댓글');
          setNoneText('작성한 댓글이 없어요 &#128172;');
          setMoreLink('/profile/myCommentList)');
          setListLink('/community/postDetail/${item.articleIdx}');
          setListText('item.commentContent');
          // setList(historyList.commentList);
          // setListLength(historyList.commentList);
          break;
      }
    }
    console.log(listDetail)
    console.log(listLength)
  }, [historyList, historyList.length]);

  return (
    <div className="history_box">
      <div className="history_tit">
        <h4>
          {title}
          {
            listLength !== 0 && (
              <span className="count">{listLength}</span>
            )
          }
        </h4>
        {
          listLength > 5 && (
            <Link to={moreLink} className="item">더보기</Link>
          )
        }
      </div>
      {
        listLength === 0 && (
          <div className="content_none">{noneText}</div>
        )
      }
      {
        listLength > 0 && (
          <ul className="list_box inside">
            {
              listDetail?.slice(0, 3).map((item, idx) => {
                return (
                  <li className="list_item" key={idx}>
                    <Link to={listLink} className="link" key={idx}>{listText}</Link>
                  </li>
                )
              })
            }
          </ul>
        )
      }
    </div>
  )
}

export default ProfileHistory;