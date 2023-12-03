import './../App.css';
import Footer from "../components/Footer";

export default function Main() {
    return (
        <div>
            <div className="main">
                <div className="container">
                    <div className="main_top">
                        <button type="button" className="user_country">
                            <span className="blind">나라 선택</span>
                        </button>
                        Let's Find Your<br/>Words!
                    </div>

                    <div className="search_box">
                        <input type="text" className="text_input" placeholder="단어를 검색해보세요"/>
                    </div>

                    <div className="pupular_box">
                        <h3 className="tit">💡 오늘 하루 인기 검색어 TOP  </h3>
                        <ul className="popular_list">
                            <li>
                                <a href="" className="keyword">
                                    인싸
                                </a>
                            </li>
                            <li>
                                <a href="" className="keyword">
                                    인싸
                                </a>
                            </li>
                            <li>
                                <a href="" className="keyword">
                                    인싸
                                </a>
                            </li>
                            <li>
                                <a href="" className="keyword">
                                    인싸
                                </a>
                            </li>
                            <li>
                                <a href="" className="keyword">
                                    인싸
                                </a>
                            </li>
                            <li>
                                <a href="" className="keyword">
                                    인싸
                                </a>
                            </li>
                            <li>
                                <a href="" className="keyword">
                                    인싸
                                </a>
                            </li>
                            <li>
                                <a href="" className="keyword">
                                    인싸
                                </a>
                            </li>
                            <li>
                                <a href="" className="keyword">
                                    인싸
                                </a>
                            </li>
                            <li>
                                <a href="" className="keyword">
                                    인싸
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="daily_box">
                        <h3 className="tit">🌻 출석체크</h3>
                        <ul className="daily_list">
                            <li>
                                <div className="day check">
                                    <span>월</span>
                                </div>
                            </li>
                            <li>
                                <div className="day">
                                    <span>화</span>
                                </div>
                            </li>
                            <li>
                                <div className="day">
                                    <span>수</span>
                                </div>
                            </li>
                            <li>
                                <div className="day">
                                    <span>목</span>
                                </div>
                            </li>
                            <li>
                                <div className="day">
                                    <span>금</span>
                                </div>
                            </li>
                            <li>
                                <div className="day">
                                    <span>토</span>
                                </div>
                            </li>
                            <li>
                                <div className="day">
                                    <span>일</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <ul className="check_list">
                        <li className="list">
                            <a href="" className="link">
                                ✏ 지금까지 <strong>3</strong>개의 단어를 등록했어요
                            </a>
                        </li>
                        <li className="list">
                            <a href="" className="link">
                                🏡 연속 방문 최대 <strong>12</strong>번을 달성했어요
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
