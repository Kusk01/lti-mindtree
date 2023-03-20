import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsg from "../../component/ErrorMsg";
import FieldErrorMsg from "../../component/FieldErrorMsg";
import InputComponent from "../../component/InputComponent";
import LabelComponent from "../../component/LabelComponent";
import { createUserAccount, validateUser } from "../../store/auth-action";

import "./SignUpPage.css";


function SignUpPgae(props) {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isUserAlreadyExist, setIsUserAlreadyExist] = useState(false);
    const notication = useSelector(state =>  state.auth.notification);
    
    const dispatch = useDispatch();
    const userList = useSelector(state => state.auth.users);
    
    const onEmailChange = function (event) {
        setEmail(event.target.value);
    }

    const onUserNameChange = function (event) {
        setUserName(event.target.value);
    }

    const onPasswordPage = function (event) {
        setPassword(event.target.value);
    }

    const createUser = async function (event) {
        const userData = validateUser(email, password, username, userList);
        setIsPasswordValid(userData.isPasswordValid);
        setIsEmailValid(userData.isEmailValid);
        setIsUsernameValid(userData.isUsernameValid);
        setIsUserAlreadyExist(userData.isUserExist);

        if (userData.isEmailValid && userData.isPasswordValid && userData.isUsernameValid && !userData.isUserExist) {
            dispatch(createUserAccount({ username, email, password }));
        }
    }

    const showLoginPage = function () {
        props.showLoginPage(true);
    }

  return (
    <div style={{marginTop: "50px"}}>
          <div className="col-6 offset-3" >
            {isUserAlreadyExist &&
                <ErrorMsg msg="User account already exist." style="alert alert-danger"></ErrorMsg>
            }
            { notication.type === "SUCCESS" && 
                <ErrorMsg msg={notication.msg} style="alert alert-success"></ErrorMsg>
            }
            <div className="textAlign">
                Please enter following details to create account.
            </div>
            <form style={{marginTop: "20px"}} >
                <div className="mb-2">
                    <LabelComponent for="email" fieldName="Email" isMandatory={true} value={email}></LabelComponent>
                    <InputComponent type="email" id="email" style="form-control" onChange={onEmailChange} />
                    { !isEmailValid && <FieldErrorMsg msg="Please enter correct email Id."></FieldErrorMsg> }
                </div>
                <div className="mb-2">
                    <LabelComponent for="username" fieldName="Username" isMandatory={true} value={username}></LabelComponent>
                    <InputComponent type="text" id="username" style="form-control" onChange={onUserNameChange} />
                    { !isUsernameValid && <FieldErrorMsg msg="Please enter correct username."></FieldErrorMsg> }
                </div>
                <div className="mb-2">
                    <LabelComponent for="password" fieldName="Password" isMandatory={true} value={password}></LabelComponent>
                    <InputComponent type="password" id="password" style="form-control" onChange={onPasswordPage} />
                    { !isPasswordValid && <FieldErrorMsg msg="Please enter correct password."></FieldErrorMsg> }
                </div>
                <div>
                      <button className="btn btn-primary" type="button" onClick={createUser}>Create Account</button>&nbsp;|&nbsp;
                      <button className="btn btn-primary" type="button" onClick={showLoginPage}>Go to Login Page</button>
                </div>
            </form>
        </div>
    </div>
    

  );
}

export default SignUpPgae;