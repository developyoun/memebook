import './../scss/wordDetail.scss'
import Title from "../components/Title";

export default function WordDetail() {

  return (
    <div className="layer">
      <Title></Title>
      <div className="container word_detail">
        <h1 className="word_tit">무야호</h1>
        <ul className="word_mean_list">
          <li className="list">
            <div className="mean_top">
              <span className="name">김누징</span>
              <ul className="util_list">
                <li>
                  <button type="button" className="btn_scrape">
                    <span className="blind">스크랩</span>
                  </button>
                </li>
                <li>
                  <button type="button" className="btn_like">
                    <span className="blind">좋아요</span>
                  </button>
                  <span className="count">1</span>
                </li>
                <li>
                  <button type="button" className="btn_dislike">
                    <span className="blind">싫어요</span>
                  </button>
                  <span className="count">1</span>
                </li>
                <li>
                  <button type="button" className="btn_report">
                    <span className="blind">신고하기</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="mean_txt">
              <p>
                무야호는 2021년 3~5월부터 대한민국에서 유행하기 시작한 인터넷 밈이다. MBC 무한도전의 2011년 방영분에서 연출된 미국 알래스카 교민 할아버지의 함성에서 유래하였다.
              </p>
            </div>
          </li>
          <li className="list">
            <div className="mean_top">
              <span className="name">김누징</span>
              <ul className="util_list">
                <li>
                  <button type="button" className="btn_scrape">
                    <span className="blind">스크랩</span>
                  </button>
                </li>
                <li>
                  <button type="button" className="btn_like">
                    <span className="blind">좋아요</span>
                  </button>
                  <span className="count">1</span>
                </li>
                <li>
                  <button type="button" className="btn_dislike">
                    <span className="blind">싫어요</span>
                  </button>
                  <span className="count">1</span>
                </li>
                <li>
                  <button type="button" className="btn_report">
                    <span className="blind">신고하기</span>
                  </button>
                </li>
              </ul>
            </div>
            <div className="mean_txt">
              <p>
                최규재 할아버지의 유쾌한 반응과 신나는 얼굴, 오프닝 멘트가 나와야 할 상황에서 뜬금없는 정체불명의 '무야호' 멘트, 말 자체의 쾌활한 어감, 수습을 위한 정형돈의 "그만큼 신나시는 거지~"라는 멘트가 오히려 궁색해 보이는 점 등 재치 있는 부분이 많다. 불과 30초도 되지 않는 장면임에도 웃음 포인트가 고루 갖추어진 부분.
                <br/>
                온갖 기상천외한 특집이 난무하는 무한도전 가운데서도 오마이텐트 특집은 상황이 독특한 편인데, '존재 여부조차 알 수 없는 교포 김상덕 씨를 찾으러 떠난다'는 특이한 콘셉트.[8] 그에 비해 무야호 장면은 방영 당시엔 지나가는 재미있는 파트로만 인식되었을 뿐 '무야호'라는 단어 자체가 폭발적인 인기를 끌지는 않았으나, 2018년 무한도전 인스타그램 팬페이지인 이토뭐에 업로드(보러가기)되며 본격적으로 회자되기 시작했다.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
