import './../App.css';
import Footer from "../components/Footer";
import WordList from "../components/WordList";

export default function Word() {
    return (
        <div className="layer">
            <div className="layer_header">
                <h1 className="tit">사전</h1>
            </div>
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
                </ul>
                <WordList></WordList>
            </div>

            <Footer></Footer>
        </div>
    );
}

