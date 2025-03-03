import "./Button.css"
const Button = ({text,type,onBtnClick}) => {
    return <button onClick={onBtnClick} className={`Button Button_${type}`}>{text}</button>;
};
export default Button;