import {memebookApi} from "./../../util/memebookApi";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Title from './../../components/Title'
import './../../scss/page/community/postAdd.scss'
import InputComponent from "../../components/InputComponent";
import TextareaComponent from "../../components/TextareaComponent";

export default function PostAdd() {
  const id = useParams();
  const location = useLocation();
  // 제목
  const [titleNull, setTitleNull] = useState(false);
  const [titleCount, setTitleCount] = useState(0);
  const [titleOver, setTitleOver] = useState(false);
  const [titleValue, setTitleValue] = useState(false);
  // 내용
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
    setTitleCount(title?.length);
    setContentCount(content?.length);
  }, []);

  // 제목 입력
  const titleValueCount = (event) => {
    setTitleValue(event.target.value);
    setTitleCount(event.target.value.length);
    console.log(event.target.value)
    event.target.value.length >= 30 ? setTitleOver(true) : setTitleOver(false);
    event.target.value.length === 0 ? setTitleNull(true) : setTitleNull(false);
  }

  // 내용 입력
  const contentValueCount = (event) => {
    setContentValue(event.target.value);
    setContentCount(event.target.value.length);
    event.target.value.length.length >= 99 ? setContentOver(true) : setContentOver(false);
    event.target.value.length === 0 ? setContentNull(true) : setContentNull(false);
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

  // 글 등록하기
  async function postAddData(type) {
    try {
      if (type === 'add') {
        // 등록
        await memebookApi.postAddApi( {
          "articleTitle": titleValue,
          "memberIdx": memberIdx,
          "articleContent": contentValue,
        });
        window.history.back();
      } else if (type === 'modify') {
        // 수정
        await memebookApi.postModifyApi(id.id, {
          "articleTitle": titleValue,
          "memberIdx": memberIdx,
          "articleContent": contentValue,
        });
        window.history.back();
      }
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
          <InputComponent length={20} word={title} titleValueCheck={titleValueCheck}></InputComponent>
        </div>

        <div className="input_box">
          <div className="input_top">
            <h4 className="tit">내용</h4>
          </div>

          <TextareaComponent length={100} contentVelueCheck={contentVelueCheck}></TextareaComponent>
        </div>
        <div className="btn_box">
          <button type="button" className="btn_submit" disabled={titleNull && contentNull ? true : null}  onClick={title && content ? () => postAddData('modify') : () => postAddData('add')}>등록하기</button>
        </div>

      </div>
    </div>

  );
}
