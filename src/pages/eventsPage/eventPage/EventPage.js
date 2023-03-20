import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";

import ErrorMsg from "../../../component/ErrorMsg";
import FieldErrorMsg from "../../../component/FieldErrorMsg";
import InputComponent from "../../../component/InputComponent";
import LabelComponent from "../../../component/LabelComponent";

import "./EventPage.css";


const reducerFn = function(state, action) {

  if (action.type === "EVENT_NAME") {
    return {
      ...state,
      name: action.value
    }
  }

  if (action.type === "EVENT_DATE") {
    
    return {
      ...state,
      date: action.value,
    }
  }

  if (action.type === "EVENT_DESC") {
    return {
      ...state,
      description: action.value
    }
  }

  if (action.type === "EVENT_TYPE") {
    return {
      ...state,
      bookingType: action.value,
      isEnteredNormalPriceCorrect: (action.value === 'normal' && (state.bookingPrice >= "300" && state.bookingPrice <= "500")) ? true : false,
      isEnteredPremiumPriceCorrect: (action.value === 'premium' && (state.bookingPrice >= "500")) ? true : false
    }
  }

  if (action.type === "EVENT_PRICE") {
      return {
        ...state,
        bookingPrice: action.value,
        isEnteredNormalPriceCorrect: (state.bookingType === 'normal' && (action.value >= "300" && action.value <= "500")) ? true : false,
        isEnteredPremiumPriceCorrect: (state.bookingType === 'premium' && (action.value >= "500")) ? true : false
    }
    
  }

  if (action.type === "EVENT_TERMS") {
      return {
        ...state,
        terms: action.value
    }
    
  }

  return state;

}

let initialState = {
  name: "",
  date: "",
  description: "",
  bookingType: "normal",
  bookingPrice: 300,
  terms: false,
  isEnteredNormalPriceCorrect: true,
  isEnteredPremiumPriceCorrect: true
}

function EventPage(props) {
  
  if (props.eventData) {
    initialState = {
      ...props.eventData,
      isEnteredNormalPriceCorrect: true,
      isEnteredPremiumPriceCorrect: true
    }
  }

  const notification = useSelector(state => state.event.notification);

  const [state, dispatch] = useReducer(reducerFn, initialState);
  const [error, setError] = useState(false);
 
  useEffect(() => {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById("eventDate").setAttribute('min', today);
  }, []);
  

  const setEventName = function (event) {
    dispatch({type: 'EVENT_NAME', value: event.target.value})
  }

  const setEventDate = function (event) {
    
    dispatch({type: 'EVENT_DATE', value: event.target.value})
  }

  const setEventDescription = function (event) {
    dispatch({type: 'EVENT_DESC', value: event.target.value})
  }

  const setEventBookingPrice = function (event) {
    dispatch({type: 'EVENT_PRICE', value: event.target.value})
  }

  const setEventBookingType = function (event) {
    dispatch({type: 'EVENT_TYPE', value: event.target.value})
  }

  const setTermsAndConditionChecked = function (event) {
    dispatch({type: 'EVENT_TERMS', value: event.target.checked})
  }

  const onAddEvent = function () {
    setError("");
    if (state.name && state.date && state.description && state.bookingPrice && state.terms) {
      props.saveEvent({
        name: state.name,
        date: state.date,
        description: state.description, 
        bookingType: state.bookingType,
        bookingPrice: state.bookingPrice,
        terms: state.terms
      })
    } else {
      setError("Please fill all mandatory fields marked with *");
    }
  }

  const cancelAddingEvent = function () {
    props.goToEventListPage({
      showList: true,
      showEvent: false
    });
  }

  return (
    <div style={{marginTop: "30px"}}>
      <div className="col-6 offset-3" >
          {error && <ErrorMsg msg={error} style="alert aler-danger"></ErrorMsg>}
          {notification.type === "SUCCESS" && <ErrorMsg msg={notification.msg} style="alert aler-danger"></ErrorMsg> }
          <form style={{marginTop: "20px"}} >
          <div className="mb-2">
            <LabelComponent htmlFor="eventName" fieldName="Event Name" isMandatory={true}></LabelComponent>
            <InputComponent type="text" id="eventName" style="form-control" value={state.name} onChange={setEventName} />
          </div>
          <div className="mb-2">
            <LabelComponent htmlFor="eventDate" fieldName="Event Date" isMandatory={true}></LabelComponent>
            <InputComponent type="date" id="eventDate" style="form-control" value={state.date} onChange={setEventDate}/>
          </div>
          <div className="mb-2">
            <LabelComponent htmlFor="eventDescription" fieldName="Description" isMandatory={true}></LabelComponent>
            <InputComponent type="text" id="eventDescription" style="form-control" value={state.description} onChange={setEventDescription}/>
          </div>
          <div className="mb-2">
            <LabelComponent htmlFor="eventPrice" fieldName="Price" isMandatory={true}></LabelComponent>
            <InputComponent type="text" id="eventPrice" style="form-control" value={state.bookingPrice} onChange={setEventBookingPrice} />
            {!state.isEnteredNormalPriceCorrect && state.bookingType === 'normal' &&
              <FieldErrorMsg msg="Normal event booking price must geater than Rs.300 and less than equal to Rs.500" ></FieldErrorMsg>}
            {!state.isEnteredPremiumPriceCorrect && state.bookingType === 'premium' &&
              <FieldErrorMsg msg="Premium event booking price must geater than Rs.500"  ></FieldErrorMsg>}
          </div>
          <div>
            <LabelComponent htmlFor="eventBookingType" fieldName="Booking Type"></LabelComponent>
            <div>
              <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="premiumBookingType" id="premiumBookingType"
                value="premium" onChange={setEventBookingType}
                checked={state.bookingType === 'premium'} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Premium
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="normaEventBooking" id="normaEventBooking"
                  value="normal" onChange={setEventBookingType}
                  checked={state.bookingType === 'normal'} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Normal
                </label>
              </div>
            </div>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="checkboxNoLabel" checked={state.terms}  value={state.terms} onChange={setTermsAndConditionChecked} />
            <label className="form-check-label">I agree to the <a className="link" href="">terms and conditions</a></label>
          </div>
          <hr />
          <div className="alignButtons">
            <button type="button" className="btn btn-primary" onClick={onAddEvent}>Save</button> &nbsp;| &nbsp;
            <button type="button" className="btn btn-secondary" onClick={cancelAddingEvent}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventPage;