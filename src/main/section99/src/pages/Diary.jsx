import { useParams,useNavigate } from "react-router-dom";
import Header from "../components/Header_Direc/Header"
import Button from "../components/Button_Direc/Button"
import Viewer from "../components/Viewer_Direc/Viewer";

const Diary = () => {
    const params = useParams();
    const nav = useNavigate();

    return (
        <div>
            <section><Header title={"yyyy-mm-dd"}
            leftChild={<Button text={"< 뒤로가기"} onBtnClick={() => nav(-1)}/>} 
            rightChild={<Button text={"수정하기"} onBtnClick={() => nav(`/edit/${params.id}`)}/>}
            /></section>
            <section><Viewer /></section>
        </div>
    );
};

export default Diary;