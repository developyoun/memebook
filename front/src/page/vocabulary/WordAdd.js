import {memebookApi} from "./../../util/memebookApi";
import {useRef, useState} from "react";
import {useParams} from "react-router-dom";
import Title from './../../components/Title'
import './../../scss/page/vocabulary/wordAdd.scss'
import InputComponent from "../../components/InputComponent";
import TextareaComponent from "../../components/TextareaComponent";
import OutsideHook from "../../util/OutsideHook";


export default function WordAdd() {
  let {word} = useParams();
  const [titleValue, setTitleValue] = useState(false);
  const [contentValue, setContentValue] = useState(false);
  // 툴팁
  const [tipBoxState, setTipBoxState] = useState(false);
  const tipRef = useRef(null);
  OutsideHook(tipRef, () => setTipBoxState(false));

  const [memberIdx, setMemberIdx] = useState(321);

  async function wordAddPost() {
    try {
      await memebookApi.wordAddApi( {
        wordName : titleValue,
        wordContent : contentValue,
        wordNation : "KOR",
        memberIdx : memberIdx,
      });
      window.history.back();
    } catch (error) {
      console.log(error);
    }
  }

  // 타이틀 받아오기
  const titleValueCheck = (length) => {
    setTitleValue(length);
  }

  // 내용 받아오기
  const contentVelueCheck = (length) => {
    setContentValue(length);
    console.log(length)
  }

  // 툴팁
  const tipEvent = () => {
    setTipBoxState(!tipBoxState);
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
            <div className={`word_add_tip ${tipBoxState ? 'active' : ''}`} ref={tipRef}>
              <button type="button" onClick={tipEvent} >
                <span className="blind">툴팁</span>
              </button>
              <div className="tip_box">
                $일본$에 관한 밈을 등록해주세요.<br/>일본어를 배우고 싶은 밈밍이들이 좋아할 거에요&#128218;
              </div>
            </div>
          </div>
          <InputComponent length={20} titleValueCheck={titleValueCheck}></InputComponent>
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
          <button type="button" className="btn_submit" onClick={wordAddPost}>등록하기</button>
        </div>
      </div>
    </div>

  );
}
