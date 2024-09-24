import '../scss/components/layerHeader.scss'
import {Link} from "react-router-dom";
import {useState} from "react";

const ProfileHistory = ({ historyList, type }) => {
  const [list, setList] = useState(historyList);
  const [listLength, setListLength] = useState(0);

  let title;
  let noneText;
  let moreLink;
  let listLink;
  let listText;

  switch (type) {
    case "myWord" :
      title = '참여한 단어';
      noneText = '등록한 단어가 없어요 &#128172;';
      moreLink = '/profile/myWordList';
      listLink = '/vocabulary/wordInfo/${item.wordIdx}';
      listText = 'item.wordName';
      setList(historyList.wordContentList);
      setListLength(historyList.wordContentList);
      break;
    case "myScrap" :
      title = '스크랩한 단어';
      noneText = '스크랩한 단어가 없어요 &#128172;';
      moreLink = '/profile/scrapList';
      listLink = '/vocabulary/wordInfo/${item.wordIdx}';
      listText = 'item.wordName';
      setList(historyList.content);
      setListLength(historyList.content);
      break;
    case "myPost" :
      title = '내가 쓴 글';
      noneText = '작성한 글이 없어요 &#128172;';
      moreLink = '/profile/myPostList';
      listLink = '/community/postDetail/${item.articleIdx}';
      listText = 'item.articleTitle';
      setList(historyList.articleList);
      setListLength(historyList.articleList);
      break;
    case "myComment" :
      title = '내가 쓴 댓글';
      noneText = '작성한 댓글이 없어요 &#128172;';
      moreLink = '/profile/myCommentList'
      listLink = '/community/postDetail/${item.articleIdx}';
      listText = 'item.commentContent';
      setList(historyList.commentList);
      setListLength(historyList.commentList);
      break;
  }

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
              list?.slice(0, 3).map((item, idx) => {
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