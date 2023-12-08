import './../scss/library.scss'
import HomeFooter from "../components/HomeFooter";
import WordList from "../components/WordList";
import Title from "../components/Title";

export default function Word() {
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

