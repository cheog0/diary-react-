import {useParams, useNavigate} from 'react-router-dom';
import Header from '../components/Header_Direc/Header.jsx';
import Button from '../components/Button_Direc/Button.jsx';
import Editor from '../components/Editor_Direc/Editor.jsx';
import {useContext, useEffect, useState} from "react";
import {DiaryDispatchContext, DiaryStateContext} from "../App.jsx";
import useDiary from '../hooks/useDiary.jsx';

const Edit = () => {
    const nav = useNavigate();
    const params = useParams();
    const {onDelete, onUpdate} = useContext(DiaryDispatchContext)

    const curDiaryItem = useDiary(params.id);


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
                    leftChild={<Button text={"< 뒤로가기"} onBtnClick={() => nav('/')}/>}
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