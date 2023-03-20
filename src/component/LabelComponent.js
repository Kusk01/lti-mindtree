import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./LabelComponent.css";

function LabelComponent(props) {
  return (
        <label htmlFor={props.for}>
          {props.isMandatory && <span className="asterisk">*</span>}
            {props.fieldName}
        </label>
  );
}

export default LabelComponent;