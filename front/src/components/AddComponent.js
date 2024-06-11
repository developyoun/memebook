import '../scss/components/layerHeader.scss'
import {memebookApi} from "../util/memebookApi";
import {useState} from "react";

export default function AddComponent(props) {
  const [memberIdx, setMemberIdx] = useState(123);
  const [contentValue, setContentValue] = useState(false);
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
      alert('등록 완료');
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
        <textarea className="textarea_input" placeholder="댓글 입력" name="" id="" cols="30" rows="10" maxLength={props.length} onChange={contentValueCount}></textarea>
        <button type="button" className="btn_comment_submit" onClick={wordAddPost}>
          <span>등록</span>
        </button>
      </div>
    </div>
  );
}

