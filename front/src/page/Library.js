import './../scss/library.scss'
import HomeFooter from "../components/HomeFooter";
import WordList from "../components/WordList";
import Title from "../components/Title";
import {memebookApi} from "../util/memebookApi";

export default function Word() {

  async function libraryList() {
    try {
      const libraryApi = await memebookApi.wordList('KOR');
      console.log(libraryApi);
      console.log('성공');
    } catch (error) {
      console.log(error)
      console.log('에러')
    }
  }

  libraryList();


  return (
    <div className="layer">

      <Title title="사전"></Title>

      <div className="container">
        <ul className="consonant_list">
          <li className="list">
            <a href="" className="link active">ㄱ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㄴ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㄷ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㄹ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅁ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅂ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅅ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅇ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅈ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅊ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅋ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅌ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅍ</a>
          </li>
          <li className="list">
            <a href="" className="link">ㅎ</a>
          </li>
        </ul>
        <WordList></WordList>
      </div>

      <HomeFooter></HomeFooter>
    </div>
  );
}

