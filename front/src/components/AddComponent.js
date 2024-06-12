import '../scss/components/addComponent.scss'
import {memebookApi} from "../util/memebookApi";
import {useState} from "react";

export default function AddComponent(props) {
  // 댓글 폼 활성화
  const [textareaActive, setTextareaActive] = useState(false);
  const [memberIdx, setMemberIdx] = useState(123);
  const [contentValue, setContentValue] = useState(false);

  // 댓글 클릭하면 커지기
  const commtentActive = () => {
    setTextareaActive(true);
  }

  const contentValueCount = (event) => {
    setContentValue(event.target.value);
  }
  async function wordAddPost() {
    try {
      await memebookApi.wordAddApi( {
        wordName : props.wordName,
        wordContent : contentValue,
        wordNation : "KOR",
        memberIdx : memberIdx,
      });
      setTextareaActive(false);
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  const contentVelueCheck = (length) => {
    setContentValue(length);
    console.log(length)
  }

  return (
    <div className="comment_input_box">
      <div className={`input_box`}>
        <textarea placeholder="댓글 입력" className={`${textareaActive ? 'active' : ''}`} name="" id="" cols="30" rows="10" onClick={commtentActive} maxLength={props.length} onChange={contentValueCount}></textarea>
        <button type="button" className="btn_comment_submit" onClick={wordAddPost}>
          <span>등록</span>
        </button>
      </div>
    </div>
  );
}

