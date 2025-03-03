import {useParams, useNavigate} from 'react-router-dom';
import Header from '../components/Header_Direc/Header.jsx';
import Button from '../components/Button_Direc/Button.jsx';
import Editor from '../components/Editor_Direc/Editor.jsx';
import {useContext, useEffect, useState} from "react";
import {DiaryDispatchContext, DiaryStateContext} from "../App.jsx";

const Edit = () => {
    const nav = useNavigate();
    const params = useParams();
    const {onDelete, onUpdate} = useContext(DiaryDispatchContext)
    const data = useContext(DiaryStateContext)
    const [curDiaryItem, setCurDiaryItem] = useState();

    useEffect(() => {
        const currentDiaryItem =
            data.find((item) => String(item.id) === String(params.id));

        if (!currentDiaryItem) {
            window.alert("존재하지 않는 일기입니다.");
            nav("/");  // replace를 제거하거나 false로 설정
        }

        setCurDiaryItem(currentDiaryItem);
    }, [params.id]);


    const onClickDelete = () => {
        if (
            window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않습니다!")
        ) {
            onDelete(params.id);
            nav("/", {replace: true});
        }
    };

    const onSubmit = (input) => {
        if (
            window.confirm("일기를 수정하시겠습니까?")
        ) {
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
            nav("/", {replace: true});
        }
    }


    return (
        <div className="Edit">
            <div>
                <Header
                    title={"일기 수정하기"}
                    leftChild={<Button onBtnClick={() => nav(-1)} text={"< 뒤로가기"}/>}
                    rightChild={<Button onBtnClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"}/>}
                />
            </div>
            <div>
                <Editor initData={curDiaryItem} onSubmit={onSubmit}/>
            </div>
        </div>
    );
};

export default Edit;