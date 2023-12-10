import './../../scss/modal/commentPort.scss'

export default function CommentPort({commentPortClose}) {

  return (
    <div className="modalBox report">
      <div className="inner">
        <h2 className="report_tit">신고하기</h2>
        <ul className="report_list">
          <li>
            부적절한 홍보
          </li>
          <li>
            개인정보 노출
          </li>
          <li>
            단어와 맞지 않는 설명
          </li>
        </ul>
        <div className="btn_btm">
          <button type="button" className="report_close">저장</button>
        </div>
        <button type="button" className="btn_close" onClick={commentPortClose}>
          <span className="blind">닫기</span>
        </button>
      </div>
    </div>
  )
}