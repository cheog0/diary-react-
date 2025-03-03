import {useEffect, useRef, createContext} from "react";
import axios from "axios";
import {useReducer} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";

const mockData = [
    {
        id: 1,
        createdDate: new Date().getTime(),
        emotionId: 1,
        content: "1번 일기 내용"
    },
    {
        id: 2,
        createdDate: new Date("2025-02-23").getTime(),
        emotionId: 2,
        content: "2번 일기 내용"
    }
]

function reducer(state, action) {
    switch (action.type) {
        case "CREATE":
            return [action.data, ...state]
        case "UPDATE":
            return state.map((item) => String(item.id) === String(action.data.id) ? action.data : item);
        case "DELETE":
            return state.filter((item) => String(item.id) !== String(action.data.id));
        default:
            return state;
    }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
    const [data, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(3);
    //새로운 일기 추가
    const onCreate = (createdDate, emotionId, content) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                createdDate,
                emotionId,
                content
            },
        });
    };
    // 기존 일기 수정
    const onUpdate = (id, createdDate, emotionId, content) => {
        dispatch({
            type: "UPDATE",
            data: {
                id,
                createdDate,
                emotionId,
                content
            },
        });
    };
    // 기존 일기 삭제
    const onDelete = (id) => {
        dispatch({
            type: "DELETE",
            data: {id}
        });
    };
    return (
        <>
            <DiaryStateContext.Provider value={data}>
                <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/new" element={<New/>}/>
                        <Route path="/diary/:id" element={<Diary/>}/>
                        <Route path="/edit/:id" element={<Edit/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </DiaryDispatchContext.Provider>
            </DiaryStateContext.Provider>
        </>
    )
        ;
}

export default App;


/*function App() {
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios.get('/api/test')
            .then((res) => {
                setHello(res.data);
            })
    }, []);
  return (
    <>
        <div className="App">
            백엔드 데이터 : {hello}
        </div>
    </>
  )
}

export default App;*/
