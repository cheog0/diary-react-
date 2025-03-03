import {useNavigate} from "react-router-dom";
import Header from "../components/Header_Direc/Header.jsx";
import Button from "../components/Button_Direc/Button.jsx";
import Editor from "../components/Editor_Direc/Editor.jsx";
import {useContext} from "react";
import {DiaryDispatchContext} from "../App.jsx";

const New = () => {
    const nav = useNavigate();
    const {onCreate} = useContext(DiaryDispatchContext);

    const onSubmit = (input) => {
        onCreate(input.createdDate.getTime(),input.emotionId, input.content);
        nav('/', {replace: true});
    };

    return (
        <div>
            <Header
                title={"새 일기 쓰기"}
                leftChild={<Button text={"< 뒤로가기"} onBtnClick={() => nav(-1)}/>}
            />
            <div>
                <Editor onSubmit={onSubmit}/>
            </div>
        </div>);
}

export default New;