import {memebookApi} from "../util/memebookApi";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Title from '../components/Title'
import '../scss/page/postAdd.scss'

export default function PostAdd() {
  const id = useParams();
  const location = useLocation();
  const [titleNull, setTitleNull] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [titleOver, setTitleOver] = useState(false);
  const [titleValue, setTitleValue] = useState(false);
  const [contentNull, setContentNull] = useState(false);
  const [contentValue, setContentValue] = useState(false);
  const [contentCount, setContentCount] = useState(0);
  const [contentOver, setContentOver] = useState(false);
  // 글 디테일 페이지에서 가져온 제목, 내용
  const title = location.state?.title;
  const content = location.state?.content;

  const [memberIdx, setMemberIdx] = useState(321);

  // 수정할 때 추가로 입력하지 않는 상태 방지
  useEffect(() => {
    setTitleValue(title);
    setContentValue(content);
  }, []);

  // 제목 입력
  const titleValueCount = (event) => {
    setTitleValue(event.target.value);
    setTitleCount(event.target.value.length);
    console.log(event.target.value)
    event.target.value.length >= 20 ? setTitleOver(true) : setTitleOver(false);
    setTitleNull(false);
  }

  // 내용 입력
  const contentValueCount = (event) => {
    setContentValue(event.target.value);
    setContentCount(event.target.value.length);
    event.target.value.length.length >= 99 ? setContentOver(true) : setContentOver(false);
    setContentNull(false);
  }

  // 글 등록하기
  async function postAddData() {
    try {
      await memebookApi.postAddApi( {
        "articleTitle": titleValue,
        "memberIdx": memberIdx,
        "articleContent": contentValue,
      });
      window.history.back();
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  // 글 수정하기
  async function postModifyData() {
    try {
      await memebookApi.postModifyApi(id.id, {
        "articleTitle": titleValue,
        "memberIdx": memberIdx,
        "articleContent": contentValue,
      });
      window.history.back();
    } catch (error) {
      console.log(error)
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
            <p className="character_count">{titleCount}/20</p>
          </div>
        </div>

        <div className="input_box">
          <div className="input_top">
            <h4 className="tit">내용</h4>
          </div>
          <textarea className="text_input" cols="30" rows="10" maxLength="99" defaultValue={content ? content : null} onChange={contentValueCount}></textarea>
          <div className="input_sub">
            {
              contentNull && (
                <p className="invalid_msg">&#128397; 한글자 이상 작성해주세요</p>
              )
            }

            {
              contentOver && (
                <p className="invalid_msg">&#128546; 100자 이하로 작성해주세요 !</p>
              )
            }
            <p className="character_count">{contentCount}/100</p>
          </div>
        </div>

        <div className="btn_box">
          <button type="button" className="btn_submit" onClick={title && content ?  postModifyData : postAddData}>등록하기</button>
        </div>

      </div>
    </div>

  );
}
