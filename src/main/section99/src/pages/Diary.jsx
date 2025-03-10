import { useParams,useNavigate } from "react-router-dom";
import Header from "../components/Header_Direc/Header"
import Button from "../components/Button_Direc/Button"
import Viewer from "../components/Viewer_Direc/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringDate } from "../util/get-stringed-date.js";

const Diary = () => {
    const params = useParams();
    const nav = useNavigate();

    const curDiaryItem = useDiary(params.id);
    if (!curDiaryItem) {
        return <div>데이터로딩중....</div>
    }

    const {createdDate,emotionId,content} = curDiaryItem;
    const title = getStringDate(new Date(createdDate))

    return (
        <div>
            <section><Header title={`${title} 기록`}
            leftChild={<Button text={"< 뒤로가기"} onBtnClick={() => nav(-1)}/>} 
            rightChild={<Button text={"수정하기"} onBtnClick={() => nav(`/edit/${params.id}`)}/>}
            /></section>
            <section><Viewer emotionId={emotionId} content={content}/></section>
        </div>
    );
};

export default Diary;