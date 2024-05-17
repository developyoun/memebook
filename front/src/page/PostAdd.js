import '../scss/page/postAdd.scss'
import Title from '../components/Title'
import {useState} from "react";
import {memebookApi} from "../util/memebookApi";


export default function PostAdd() {
  const [addState, setAddState] = useState(false);
  const [titleNull, setTitleNull] = useState(false);
  const [explainNull, setExplainNull] = useState(false);
  const [titleValue, setTitleValue] = useState(false);
  const [contentValue, setContentValue] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [titleOver, setTitleOver] = useState(false);
  const [explainCount, setExplainCount] = useState(0);
  const [explainOver, setExplainOver] = useState(false);
  const [tipBoxState, setTipBoxState] = useState(false);

  const [memberIdx, setMemberIdx] = useState(321);

  async function postAddData() {
    try {
      const postAddApi = await memebookApi.postAddApi( {
        "articleTitle": titleValue,
        "memberIdx": memberIdx,
        "articleContent": contentValue,
      });
      alert('등록 완료');
      window.location.reload();
      setAddState(addState);
      console.log('등록')
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }
  const titleValueCount = (event) => {
    setTitleValue(event.target.value);

    setTitleCount(event.target.value.length);

    event.target.value.length >= 20 ? setTitleOver(true) : setTitleOver(false);
    setTitleNull(false);
  }

  const contentValueCount = (event) => {
    setContentValue(event.target.value);
    setExplainCount(event.target.value.length);
    event.target.value.length.length >= 99 ? setExplainOver(true) : setExplainOver(false);
    setExplainNull(false);
  }

  return (
    <div className="post_add_wrap">

      <Title title="글쓰기" type="back"></Title>

      <div className="container">

        <div className="input_box">
          <div className="input_top">
            <h4 className="tit">제목</h4>
          </div>
          <input type="text" className="text_input" placeholder="단어를 입력해주세요" maxLength="19" onChange={titleValueCount}/>
          <div className="input_sub">
            <p className="character_count">0/20</p>
          </div>
        </div>

        <div className="input_box">
          <h4 className="tit">내용</h4>
          <textarea className="text_input" name="" id="" cols="30" rows="10" maxLength="99" onChange={contentValueCount}></textarea>
          <div className="input_sub">
            <p className="character_count">0/100</p>
          </div>
        </div>

        <div className="floating_box">
          <button type="button" className="btn_submit" onClick={postAddData}>등록하기</button>
        </div>

      </div>
    </div>

  );
}
