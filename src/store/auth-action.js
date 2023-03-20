
import { authActions } from "./auth-slice";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{8,}$/;

export const createUserAccount = (userData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://lti-assessment-default-rtdb.firebaseio.com/userAccounts.json",
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: userData.email,
                        username: userData.username,
                        password: userData.password,

                    }),
                }
            );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(authActions.showNotification({
        type: "SUCCESS",
        msg: "Account created successfully."
      }));
    } catch (error) {
      dispatch(authActions.showNotification({
        type: "FAILED",
        msg: "Account creation failed."
      }));
    }
  };
};

export const logIn = (userData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://lti-assessment-default-rtdb.firebaseio.com/login.json",
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: userData.email,
                        password: userData.password,
                    }),
                }
            );

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
        const cartData = await fetchData();
        dispatch(authActions.showNotification(true));
      
    } catch (error) {
        dispatch(authActions.showNotification(false));
    }
  };
};



export const getUserAccounts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://lti-assessment-default-rtdb.firebaseio.com/userAccounts.json");

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
        const userAccounts = await fetchData();
        const userAccountList = [];
        for (let key in userAccounts) {
            const user = userAccounts[key];
            const account = {
                id: key,
                email: user.email,
                username: user.username,
                password: user.password
            };
            userAccountList.push(account);
        }
        dispatch(authActions.setUsers( userAccountList ));
      
    } catch (error) {
        console.log("Fail to fetch data");
    }
  };
};


export const validateUser = function (email, password, username, list, isUserExist = true) {
    const validationObj = {
        isEmailValid: !(email === "" || !email.includes("@")),
        isPasswordValid: !(password === "" || !password.match(passwordRegex)),
        isUsernameValid: username !== "",
        isUserExist: isUserExist
    };
    
    if (username !== "" && password !=="" && list.length > 0) {
        list.forEach((user) => {
            if (user.email === email) {
                validationObj.isUserExist = true;
            }
        })
    }

    return validationObj;
}
