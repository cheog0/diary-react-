import {getEmotionImage} from "../../util/get-emotion-image.js";
import Button from "../../components/Button_Direc/Button";
import "./DiaryItem.css"
import {useNavigate} from "react-router-dom";

const DiaryItem = ({id, emotionId, createdDate, content}) => {
    const nav = useNavigate();


    return (
        <div className="DiaryItem">
            <div
                onClick={() => nav(`/diary/${id}`)}
                className={`img_section img_section_${emotionId}`}>
                <img src={getEmotionImage(emotionId)}/>
            </div>
            <div
                onClick={() => nav(`/diary/${id}`)}
                className="info_section">
                <div className="created_date">
                    {new Date(createdDate).toLocaleDateString()}
                </div>
                <div className="content">{content}</div>
            </div>
            <div
                onClick={() => {
                    nav(`/edit/${id}`)
                }}
                className="button_section"><Button text={"수정하기"} onBtnClick={() => {
                nav(`edit/${id}`)
            }}/></div>
        </div>
    );
};

export default DiaryItem;