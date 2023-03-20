import { createSlice } from '@reduxjs/toolkit';

const initialAuthSate = {
    eventList: [],
    notification: {
        type: "",
        msg: ""
    }

};

const eventSlice = createSlice({
    name: 'eventPage',
    initialState: initialAuthSate,
    reducers: {
        setEvents(state, action){
            state.eventList = action.payload;
        },
        addEvent(state, action) {
            state.eventList.push(action.payload);
        },
        showNotication(state, action) {
            state.notification = {
                type: action.payload.type,
                msg: action.payload.msg
            }
        }
    }
})

export const eventActions = eventSlice.actions;  
export default eventSlice;