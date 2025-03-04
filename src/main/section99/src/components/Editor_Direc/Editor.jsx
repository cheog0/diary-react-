import {useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react';
import "./Editor.css";
import EmotionItem from "../EmotionItem_Direc/EmotionItem.jsx";
import Button from "../Button_Direc/Button.jsx";
import {emotionList} from "../../util/constants.js"


const getStringDate = (targetDate) => {
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    if (month < 10) {
        month = "0" + month;
    }
    if (date < 10) {
        date = "0" + date;
    }
    return `${year}-${month}-${date}`;
}

const Editor = ({ initData, onSubmit }) => {
    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 1,
        content: ""
    });

    useEffect(() => {
        if(initData) {
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate)),
            })
        }
    }, [initData]);

    const onChangeInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        if (name === "createdDate") {
            value = new Date(value);
        }

        setInput({
            ...input,
            [name]: value
        })
    }

    const nav = useNavigate();

    const onClickSubmitButton = () => {
        onSubmit(input)
    }

    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input name="createdDate" onChange={onChangeInput} value={getStringDate(input.createdDate)}
                       type="date"/>
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {emotionList.map((emotion) => (
                        <EmotionItem
                            onClick={() => onChangeInput({
                                target: {
                                    name: "emotionId",
                                    value: emotion.emotionId,
                                },
                            })
                            }
                            key={emotion.emotionId}
                            {...emotion}
                            isSelected={emotion.emotionId === input.emotionId}
                        />
                    ))}
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea
                    name="content"
                    value={input.content}
                    onChange={onChangeInput}
                />
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onBtnClick={() => nav(-1)}/>
                <Button text={"작성완료"} type={"POSITIVE"} onBtnClick={onClickSubmitButton}/>
            </section>
        </div>
    );
};

export default Editor;
