import '../scss/components/addComponent.scss'
import {memebookApi} from "../util/memebookApi";
import {useState} from "react";

export default function AddComponent(props) {
  // 댓글
  const [commentIdx, setCommentIdx] = useState();
  const [replyIdx, setReplyIdx] = useState('');
  const [replyNickname, setReplyNickname] = useState('');

  // 댓글 폼 활성화
  const [textareaActive, setTextareaActive] = useState(false);
  const [memberIdx, setMemberIdx] = useState(321);
  const [contentValue, setContentValue] = useState();

  // 댓글 클릭하면 커지기
  const commtentActive = () => {
    setTextareaActive(true);
  }

  // 닉네임 다시 클릭하면 데이터 제거
  const replayNicknameDelete = () => {
    setReplyNickname('');
    setCommentIdx(0);
  };


  const contentValueCount = (event) => {
    setContentValue(event.target.value);
    props.contentVelueCheck(event.target.value);
  }
  async function wordAddPost() {
    try {
      if (props.type === 'word') {
        await memebookApi.wordAddApi( {
          wordName : props.wordName,
          wordContent : contentValue,
          wordNation : "KOR",
          memberIdx : memberIdx,
        });
        console.log('단어 추가 성공');
      } else if (props.type === 'comminity') {
        await memebookApi.commentAddApi({
          "commentContent": contentValue,
          "articleIdx": '',
          "memberIdx": memberIdx,
        });
        console.log('코멘트 추가 성공');
      }
      props.addSubmit(true);
      setContentValue('');
      setTextareaActive(false);
    } catch (error) {
      console.log(error);
      console.log('에러');
    }
  }

  return (
    <div className="comment_input_box">
      <div className={`input_box`}>
        {
          props.type === 'community' && props.replyNickname && (
            <span className="reply_nickname" onClick={replayNicknameDelete}>
              @{props.replyNickname}
            </span>
          )
        }
        <textarea placeholder="댓글 입력"
                  className={`${textareaActive ? 'active' : ''}`}
                  value={contentValue} name="" id="" cols="30" rows="10"
                  maxLength={props.length}
                  onClick={commtentActive}
                  onChange={contentValueCount}>
        </textarea>
        <button type="button" className="btn_comment_submit" onClick={wordAddPost}>
          <span>등록</span>
        </button>
      </div>
    </div>
  );
}

