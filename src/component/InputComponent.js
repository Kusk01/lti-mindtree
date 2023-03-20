import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


function InputComponent(props) {
  return (
    <>
      <input type={props.type} id={props.id} className={props.style} onChange={props.onChange} value={props.value} />
    </>
  );
}

export default InputComponent;