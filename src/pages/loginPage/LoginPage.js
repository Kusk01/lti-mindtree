import userEvent from "@testing-library/user-event";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMsg from "../../component/ErrorMsg";
import FieldErrorMsg from "../../component/FieldErrorMsg";
import InputComponent from "../../component/InputComponent";
import LabelComponent from "../../component/LabelComponent";
import { getUserAccounts, validateUser } from "../../store/auth-action";

import "./LoginPage.css";

function LoginPage(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isUserExist, setIsUserExist] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const userList = useSelector(state => state.auth.users);

    useEffect(() => {
        dispatch(getUserAccounts());
    }, []);
    
    const onEmailChange = function (event) {
        setEmail(event.target.value);
    }

    const onPasswordChange = function (event) {
        setPassword(event.target.value);
    }

    const onLogin = function () {
        const user = validateUser(email, password, "", userList);
        setIsEmailValid(user.isEmailValid);
        setIsPasswordValid(user.isPasswordValid);
        setIsUserExist(user.isUserExist);
        if (user.isEmailValid && user.isPasswordValid && user.isUserExist) {
            props.showEventsPage();
        }

    }

    const gotoSignUpPage = function () {
        props.showSignUpPage(true);
    }

  return (
    <div style={{marginTop: "50px"}}>
          <div className="col-6 offset-3" >
            {!isUserExist &&
                <ErrorMsg msg="User Account doen not exist." class="alert alert-danger"></ErrorMsg>
            }
            <div className="loginText">
                <span>Enter username and password to login.</span>
            </div>
            <div style={{textAlign: "center"}}>
            </div>
            <form style={{marginTop: "20px"}}>
                <div className="mb-2">
                    <LabelComponent for="email" fieldName="Emaid" onChange={onEmailChange} isMandatory={true}></LabelComponent>
                    <InputComponent type="email" id="email" style="form-control" onChange={onEmailChange} />
                    { !isEmailValid && <FieldErrorMsg msg="Please enter correct email Id."></FieldErrorMsg> }
                </div>
                <div className="mb-2">
                    <LabelComponent for="password" fieldName="Password" onChange={onPasswordChange}></LabelComponent>
                      <InputComponent type="password" id="password" style="form-control" onChange={onPasswordChange} />
                      { !isPasswordValid && <FieldErrorMsg msg="Please enter correct password."></FieldErrorMsg> }
                </div>
                <div>
                    <button className="btn btn-primary" type="button" onClick={onLogin}>Login</button>
                    &nbsp;| &nbsp;
                    <button className="btn btn-primary" onClick={gotoSignUpPage} type="button">Sign Up</button>
                </div>
            </form>
        </div>
    </div>
    

  );
}

export default LoginPage;