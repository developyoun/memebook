import './../App.css';
import { useHistory } from 'react-router-dom';

function Word() {
    const goBack = () => {
        // 브라우저 뒤로가기 실행
        window.history.back();
    };
    return (
        <div className="layer">
            <div className="layer_header">
                <button className="btn_back" onClick={goBack}>
                    <span className="blind">뒤로가기</span>
                </button>
                <h1 className="tit">단어 등록</h1>
            </div>
            <div className="container">
                <div className="input_box">
                    <h4 className="tit">
                        단어
                    </h4>
                    <input type="text" className="text_input" placeholder="단어를 입력해주세요"/>
                </div>
                <div className="input_box">
                    <h4 className="tit">
                        설명
                    </h4>
                    <textarea className="text_input" name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div className="floating_box">
                    <button type="button" className="btn_submit">등록하기</button>
                </div>
            </div>



        </div>
    );
}

export default Word;
