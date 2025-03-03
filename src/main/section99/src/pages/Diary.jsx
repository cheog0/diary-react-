import {useParams} from "react-router-dom";

const Diary = () => {
    const params = useParams();
    console.log(params);
    return <div>diary</div>;
};

export default Diary;