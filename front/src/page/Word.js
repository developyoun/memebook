import './../App.css';
import LayerHeader from "../components/LayerHeader";

function Word() {
    return (
        <div className="layer">
            <LayerHeader></LayerHeader>
            <div className="input_box">
                <h4 className="tit">
                    단어
                </h4>
                <input type="text" placeholder="단어를 입력해주세요"/>
            </div>
            <div className="input_box">
                <h4 className="tit">
                    설명
                </h4>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
        </div>
    );
}

export default Word;
