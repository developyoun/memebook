import '../scss/page/postAdd.scss'
import Title from '../components/Title'
import {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import {useLocation, useNavigate, useParams} from "react-router-dom";


export default function PostAdd() {
  const id = useParams();
  const navigate = useNavigate();
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

  const location = useLocation();
  const title = location.state?.title;
  const content = location.state?.content;

  useEffect(() => {
    setTitleValue(title);
    setContentValue(content);
  }, []);
  async function postAddData() {
    try {
      const postAddApi = await memebookApi.postAddApi( {
        "articleTitle": titleValue,
        "memberIdx": memberIdx,
        "articleContent": contentValue,
      });
      alert('등록 완료');
      window.history.back();
      setAddState(addState);

    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }
  const titleValueCount = (event) => {
    setTitleValue(event.target.value);
    setTitleCount(event.target.value.length);
    console.log(event.target.value)
    event.target.value.length >= 20 ? setTitleOver(true) : setTitleOver(false);
    setTitleNull(false);
  }

  const contentValueCount = (event) => {
    setContentValue(event.target.value);
    setExplainCount(event.target.value.length);
    event.target.value.length.length >= 99 ? setExplainOver(true) : setExplainOver(false);
    setExplainNull(false);
  }

  async function postModifyData() {
    try {
      const postModifyApi = await memebookApi.postModifyApi(id.id, {
        "articleTitle": titleValue,
        "memberIdx": memberIdx,
        "articleContent": contentValue,
      });
      window.history.back();
      setAddState(addState);
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }
  return (
    <div className="post_add_wrap">

      <Title title="글쓰기" type="back"></Title>

      <div className="container">

        <div className="input_box">
          <div className="input_top">
            <h4 className="tit">제목</h4>
          </div>
          <input type="text" className="text_input" placeholder="단어를 입력해주세요" defaultValue={title ? title : null} maxLength="19" onChange={titleValueCount}/>
          <div className="input_sub">
            <p className="character_count">0/20</p>
          </div>
        </div>

        <div className="input_box">
          <h4 className="tit">내용</h4>
          <textarea className="text_input" name="" id="" cols="30" rows="10" maxLength="99" defaultValue={content ? content : null} onChange={contentValueCount}></textarea>
          <div className="input_sub">
            <p className="character_count">0/100</p>
          </div>
        </div>

        <div className="floating_box">
          <button type="button" className="btn_submit" onClick={title && content ?  postModifyData : postAddData}>등록하기</button>
        </div>

      </div>
    </div>

  );
}
