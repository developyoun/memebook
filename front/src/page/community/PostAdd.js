import {memebookApi} from "./../../util/memebookApi";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import Title from './../../components/Title'
import InputComponent from "../../components/InputComponent";
import TextareaComponent from "../../components/TextareaComponent";
import './../../scss/page/community/postAdd.scss'

export default function PostAdd() {
  const id = useParams();
  const location = useLocation();
  const [titleValue, setTitleValue] = useState('');
  const [contentValue, setContentValue] = useState('');
  // 글 디테일 페이지에서 가져온 제목, 내용
  const { title, content } = location.state || {};

  const [memberIdx, setMemberIdx] = useState(321);

  useEffect(() => {
    // 입력하지 않으면 titleValueCheck, contentValue 값이 Null로 나오는 오류 방지
    setTitleValue(title);
    setContentValue(content);
  }, []);

  const titleValueCheck = (length) => {
    setTitleValue(length);
  }

  const contentValueCheck = (length) => {
    setContentValue(length);
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
        console.log('등록성공')
        window.history.back();
      } else if (type === 'modify') {
        // 수정
        await memebookApi.postModifyApi(id.id, {
          "articleTitle": titleValue,
          "memberIdx": memberIdx,
          "articleContent": contentValue,
        });
        window.history.back();
        console.log('수정성공')
      }
    } catch (error) {
      console.log(error);
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

          <TextareaComponent length={1000} content={content} contentValueCheck={contentValueCheck}></TextareaComponent>
        </div>
        <div className="btn_box">
          <button type="button" className="btn_submit" onClick={title && content ? () => postAddData('modify') : () => postAddData('add')}>등록하기</button>
        </div>

      </div>
    </div>

  );
}
