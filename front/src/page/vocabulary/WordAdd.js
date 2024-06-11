import {memebookApi} from "./../../util/memebookApi";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Title from './../../components/Title'
import './../../scss/page/vocabulary/wordAdd.scss'
import InputComponent from "../../components/InputComponent";
import TextareaComponent from "../../components/TextareaComponent";


export default function WordAdd() {
  let {id, word} = useParams();
  const [addState, setAddState] = useState(false);
  const [titleNull, setTitleNull] = useState(false);
  const [titleValue, setTitleValue] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [titleOver, setTitleOver] = useState(false);
  const [explainNull, setExplainNull] = useState(false);
  const [explainCount, setExplainCount] = useState(0);
  const [explainOver, setExplainOver] = useState(false);
  const [contentValue, setContentValue] = useState(false);
  const [tipBoxState, setTipBoxState] = useState(false);

  const [memberIdx, setMemberIdx] = useState('123');

  async function wordAddPost() {
    try {
      await memebookApi.wordAddApi( {
        wordName : titleValue,
        wordContent : contentValue,
        wordNation : "KOR",
        memberIdx : memberIdx,
      });
      window.history.back();
      alert('등록 완료');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  // 인풋 컴포넌트에서 내용 받아서 보내기
  const titleValueCheck = (length) => {
    setTitleValue(length);
    console.log(length)
  }

  const contentVelueCheck = (length) => {
    setContentValue(length);
    console.log(length)
  }

  const tipEvent = () => {
    setTipBoxState(!tipBoxState)
  }
  const textCheck = () => {
    if (titleCount === 0) {
      setTitleNull(true);
    }
    if (explainCount === 0) {
      setExplainNull(true);
    }
    wordAddPost();
  }


  return (
    <div className="word_add_wrap">

      <Title title="단어 등록" type="back"></Title>

      <div className="container">

        <div className="input_box">
          <div className="input_top">
            <h4 className="tit">
              단어
            </h4>
            <div  className={`word_add_tip ${tipBoxState ? 'active' : ''}`}>
              <button type="button" onClick={tipEvent} >
                <span className="blind">툴팁</span>
              </button>
              <div className="tip_box">
                $일본$에 관한 밈을 등록해주세요.<br/>일본어를 배우고 싶은 밈밍이들이 좋아할 거에요&#128218;
              </div>
            </div>
          </div>

          <InputComponent length={20} word={word} titleValueCheck={titleValueCheck}></InputComponent>

        </div>


        <div className="input_box">
          <div className="input_top">
            <h4 className="tit">
              설명
            </h4>
          </div>

          <TextareaComponent length={100} contentVelueCheck={contentVelueCheck}></TextareaComponent>

        </div>
        <div className="floating_box">
          <button type="button" className="btn_submit" onClick={textCheck}>등록하기</button>
        </div>
      </div>
    </div>

  );
}
