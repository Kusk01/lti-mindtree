import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import EventsPage from "./pages/eventsPage/EventsPage";
import HeaderPage from "./pages/headerPage/HeaderPage";
import LoginPage from "./pages/loginPage/LoginPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import { getUserAccounts } from "./store/auth-action";
import { getEventList } from "./store/event-action";

function App() {
  const dispatch = useDispatch();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isSignUpPage, setIsSignUpPage] = useState(false);
  const [isEventPage, setIsEventPage] = useState(false)

  useEffect(() => {
    setIsLoginPage(true);
    dispatch(getUserAccounts());
    dispatch(getEventList());
  }, []);


  const showSignUpPage = function (value) {
    setIsLoginPage(false);
    setIsSignUpPage(true);
    setIsEventPage(false);
  }

  const showLoginPage = function (value) {
    setIsLoginPage(true);
    setIsSignUpPage(false);
    setIsEventPage(false);
  }

  const showEventsPage = function (value) {
    setIsLoginPage(false);
    setIsSignUpPage(false);
    setIsEventPage(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <HeaderPage></HeaderPage>
        {isLoginPage && !isSignUpPage && !isEventPage &&
          <LoginPage showSignUpPage={showSignUpPage} showEventsPage={showEventsPage}></LoginPage>}
        {!isLoginPage && isSignUpPage && !isEventPage &&
          <SignUpPage showLoginPage={showLoginPage}></SignUpPage>}
        {isEventPage && !isLoginPage && !isSignUpPage &&
          <EventsPage></EventsPage>}
        
      </header>
    </div>
  );
}

export default App;
