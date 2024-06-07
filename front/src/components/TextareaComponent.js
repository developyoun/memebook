import '../scss/components/textareaComponent.scss'
import {useState} from "react";

export default function TextareaComponent(props) {
  const [contentValue, setContentValue] = useState(false);
  const [explainCount, setExplainCount] = useState(0);
  const [explainOver, setExplainOver] = useState(false);
  const [explainNull, setExplainNull] = useState(false);

  const contentValueCount = (event) => {
    setContentValue(event.target.value);
    setExplainCount(event.target.value.length);
    event.target.value.length >= props.length - 1 ? setExplainOver(true) : setExplainOver(false);
    setExplainNull(false);
    if (props.contentVelueCheck) {
      props.contentVelueCheck(event.target.value);
    }
  }
  return (
    <>
      <textarea className="textarea_input" name="" id="" cols="30" rows="10" maxLength={props.length} onChange={contentValueCount}></textarea>

      <div className="input_sub">
        {
          explainNull && (
            <p className="invalid_msg">&#128397; 한글자 이상 작성해주세요</p>
          )
        }

        {
          explainOver && (
            <p className="invalid_msg">&#128546; {props.length}자 이하로 작성해주세요 !</p>
          )
        }
        <p className="character_count">
          {explainCount}/{props.length}
        </p>
      </div>
    </>
  )
}
