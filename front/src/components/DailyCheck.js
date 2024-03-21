import './../scss/components/dailyCheck.scss';

export default function DailyCheck() {
  return (
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
  )
}