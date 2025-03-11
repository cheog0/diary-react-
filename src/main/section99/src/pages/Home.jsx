import { useState, useContext } from "react";
import { DiaryStateContext } from "../App.jsx";
import Header from "../components/Header_Direc/Header.jsx";
import Button from "../components/Button_Direc/Button.jsx";
import DiaryList from "../components/DiaryList_Direc/DiaryList.jsx";

const getMonthlyData = (data, pivotDate) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  );
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    -1,
    23,
    59,
    59
  );
  return data.filter(
    (item) => beginTime <= item.createdDate && endTime >= item.createdDate
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);

  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(data, pivotDate);

  const onDecreaseButton = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };
  const onIncreaseButton = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onBtnClick={onDecreaseButton} />}
        rightChild={<Button text={">"} onBtnClick={onIncreaseButton} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
