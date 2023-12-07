import './../../scss/nickName.scss'
export default function NickName({nickNameClose}) {

  return (
    <div className="modalBox">
      <div className="inner">
        <h2 className="nickname_tit">프로필에 사용할<br/>닉네임을 입력해주세요</h2>
        <p className="nickname_txt">닉네임 변경할 수 없어요<br/>신중하게 결정해주세요</p>
        <div className="btn_btm">
          <button type="button" className="country_save">확인</button>
        </div>
        <button type="button" className="btn_close" onClick={nickNameClose}>
          <span className="blind">닫기</span>
        </button>
      </div>
    </div>
  )
}