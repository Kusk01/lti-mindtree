function ErrorMsg(props) {
  return (
      <div className={props.style} role="alert">
          {props.msg}
      </div>
  );
}

export default ErrorMsg;