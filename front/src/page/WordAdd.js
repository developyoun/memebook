import './../scss/word.scss'
import Title from '../components/Title'
import {useEffect, useState} from "react";

export default function WordAdd() {
  const [titleNull, setTitleNull] = useState(false);
  const [explainNull, setExplainNull] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [titleOver, setTitleOver] = useState(0);
  const [explainCount, setExplainCount] = useState(0);
  const [explainOver, setExplainOver] = useState(false);
  
  const CharacterCount = (event, type) => {
    let e = event.target.value;
    if (type === 'title') {
      setTitleCount(e.length);
      e.length > 19 ? setTitleOver(true) : setTitleOver(false);
      setTitleNull(false);
    } else if (type === 'detail') {
      setExplainCount(e.length);
      e.length > 99 ? setExplainOver(true) : setExplainOver(false);
      setExplainNull(false);
    }
  }

  const textCheck = () => {
    if (titleCount === 0) {
      setTitleNull(true);
    }

    if (explainCount === 0) {
      setExplainNull(true);
    }
  }

  return (
    <div className="layer">

      <Title title="단어 등록"></Title>

      <div className="container">

        <div className="input_box">
          <h4 className="tit">
            단어
          </h4>
          <input type="text" className="text_input" placeholder="단어를 입력해주세요" maxLength={19} onChange={event => CharacterCount(event, 'title')}/>
          <div className="character_count">
            {titleCount}/20
          </div>

          {
            titleNull && (
              <p className="invalid_msg">한글자 이상 작성해주세요 &#x270F;</p>
            )
          }


        </div>
        <div className="input_box">
          <h4 className="tit">
            설명
          </h4>
          <textarea className="text_input" name="" id="" cols="30" rows="10" maxLength={99} onChange={event => CharacterCount(event, 'detail')}></textarea>
          <div className="character_count">
            {explainCount}/100
          </div>

          {
            explainNull && (
              <p className="invalid_msg">한글자 이상 작성해주세요 &#x270F;</p>
            )
          }

          {
            explainOver && (
              <p className="invalid_msg">100자 이하로 작성해주세요 !</p>
            )
          }
        </div>
        <div className="floating_box">
          <button type="button" className="btn_submit" onClick={textCheck}>등록하기</button>
        </div>
      </div>


    </div>
  );
}
