import './../App.css';

function WordList() {
    return (
        <div className="word_box">
            <ul className="word_box">
                <li className="list">
                    <h3 className="tit">ㄱ</h3>
                    <ul className="word_list">
                        <li>
                            <a href="" className="item">개개개</a>
                        </li>
                        <li>
                            <a href="" className="item">거거거</a>
                        </li>
                    </ul>
                </li>
                <li className="list">
                    <h3 className="tit">ㄴ</h3>
                    <ul className="word_list">
                        <li>
                            <a href="" className="item">내내내</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default WordList;
