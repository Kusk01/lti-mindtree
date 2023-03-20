import "./FieldErrorMsg.css";

function FieldErrorMsg(props) {
  return (
      <div className="error">
        {props.msg}
      </div>
  );
}

export default FieldErrorMsg;