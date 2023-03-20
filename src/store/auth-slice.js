import { createSlice } from '@reduxjs/toolkit';

const initialAuthSate = {
    users: [],
    isUserAccountAuthenicated: false,
    emailValid: false,
    passwordValid: false,
    notification: {
        type: "",
        msg: ""
    }
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthSate,
    reducers: {
        login(state) {
            // pending
            state.isUserAccountAuthenicated = true;
        },
        signUp(state, payload) {
            // pending
        },
        logout(state) {
            // pending
            state.isUserAccountAuthenicated = false;
        },
        setUsers(state, action) {
            state.users = action.payload;
        },
        showNotification(state, action) {
            state.notification = {
                type: action.payload.type,
                msg: action.payload.msg
            }
        }
    }
})

export const authActions = authSlice.actions;  
export default authSlice;