import './../scss/word.scss'
import Title from '../components/Title'
import {useState} from "react";

export default function WordAdd() {
  const [textOver, setTextover] = useState(false);
  const [textCount, setTextCount] = useState(0);
  
  const CharacterCount = (event) => {
    let e = event.target.value;
    setTextCount(e.length);
    if ( e.length > 99 || event.keyCode === 8) {
      setTextover(true);
    } else {
      setTextover(false);
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
          <input type="text" className="text_input" placeholder="단어를 입력해주세요"/>
          <p className="invalid_msg">한글자 이상 작성해주세요 &#x270F;</p>
        </div>
        <div className="input_box">
          <h4 className="tit">
            설명
          </h4>
          <textarea className="text_input" name="" id="" cols="30" rows="10" readOnly={textOver} onChange={CharacterCount}></textarea>
          <div className="character_count">
            {textCount}/100
          </div>
          <p className="invalid_msg">한글자 이상 작성해주세요 &#x270F;</p>
          <p className="invalid_msg">금지어를 작성하셨어요! 수정해주세요! &#x1F622;</p>
          {
            textOver && (
              <p className="invalid_msg">1000자 이하로 작성해주세요 !</p>
            )
          }
        </div>
        <div className="floating_box">
          <button type="button" className="btn_submit">등록하기</button>
        </div>
      </div>


    </div>
  );
}
