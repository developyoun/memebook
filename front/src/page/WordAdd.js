import './../scss/word.scss'
import Title from '../components/Title'
import {useEffect, useState} from "react";
import {memebookApi} from "../util/memebookApi";
import {useNavigate, useParams} from "react-router-dom";


export default function WordAdd() {
  let {id, word} = useParams();
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

  useEffect(() => {
    setTitleValue(word);
    console.log(word);
  }, []);
  async function wordAddPost() {
    try {
      const wordAddApi = await memebookApi.wordAdd( {
        wordName : titleValue,
        wordContent : contentValue,
        wordNation : "KOR",
        memberIdx : 123,
      });
      if (word !== undefined) {
        navigate(`/word/${id}`);
      } else {
        navigate(`/library`);
      }

      setAddState(addState);
      alert('등록 완료');
      window.location.reload();
      console.log('성공');
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
    <div className="layer">

      <Title title="단어 등록" type="back"></Title>

      <div className="word_add_container">

        <div className="word_add_tip">
          $일본$에 관한 밈을 등록해주세요.<br/>일본어를 배우고 싶은 밈밍이들이 좋아할 거에요&#128218;
        </div>

        <div className="input_box">
          <div className="tit_box">
            <h4 className="tit">일본어</h4>
          </div>

          <input type="text" className="text_input" placeholder="단어를 입력해주세요" value={word ? word : null} readOnly={word !== undefined}  maxLength={19} onChange={titleValueCount}/>

          <div className="input_sub">
            {
              titleNull && (
                <p className="invalid_msg">&#128397; 한글자 이상 작성해주세요</p>
              )
            }
            {
              titleOver && (
                <p className="invalid_msg">&#128546; 20자 이하로 작성해주세요</p>
              )
            }
            <p className="character_count">
              {titleCount}/20
            </p>
          </div>
        </div>


        <div className="input_box">
          <h4 className="tit">
            설명
          </h4>
          <textarea className="text_input" name="" id="" cols="30" rows="10" maxLength={99} onChange={contentValueCount}></textarea>

          <div className="input_sub">
            {
              explainNull && (
                <p className="invalid_msg">&#128397; 한글자 이상 작성해주세요</p>
              )
            }

            {
              explainOver && (
                <p className="invalid_msg">&#128546; 100자 이하로 작성해주세요 !</p>
              )
            }
            <p className="character_count">
              {explainCount}/100
            </p>
          </div>

        </div>
        <div className="floating_box">
          <button type="button" className="btn_submit" onClick={textCheck}>등록하기</button>
        </div>
      </div>


    </div>
  );
}
