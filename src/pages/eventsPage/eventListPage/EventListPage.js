import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventList } from "../../../store/event-action";
import { eventActions } from "../../../store/event-slice";

import "./EventListPage.css";

function EventListPage(props) {
    const dispatch = useDispatch();
    const eventList = useSelector(state => state.event.eventList);
    
    useEffect(() => {
        dispatch(getEventList());
    }, []);

    const onEditEvent = function (event) {
        props.onEditEvent(event);
    } 

    const getEventType = function (type) {
        return type === "normal" ? "Normal" : "Premium";
    }

    const onDeleteEvent = function (id) {
        const updatedList = eventList.filter((event) => {
            return event.id !== id
        });

        dispatch(eventActions.setEvents(updatedList));
    }

    return (
        <div style={{marginTop: "10px"}}>
            <div className="col-6 offset-3">
                {
                    eventList.map(event => {
                        return (
                            <div className="box" key={event.id}>
                                <div className="dateMonthBox col-2">
                                <div className="monthBox">{event.monthDate}</div>
                                    <div className="dateBox">{event.monthName}</div>
                                </div>
                                <div className="align-box-content col-7">
                                    <div>
                                        <span className="font-weight">Event Name:   </span>
                                        <span>{event.name}</span>
                                    </div>
                                    <div>
                                        <span className="font-weight">Event description:   </span>
                                        <span>{event.description}</span>
                                    </div>
                                    <div>
                                        <span className="font-weight">Event price:   </span>
                                        <span>{event.bookingPrice}</span>
                                    </div>
                                    <div>
                                        <span className="font-weight">Event type:   </span>
                                        <span>{getEventType(event.bookingType)}</span>
                                    </div>
                                </div>
                                <div className="align-box-content col-7">
                                    <span><button className="edit btn btn-primary" type="button" onClick={() => onEditEvent(event)}>Edit</button></span>
                                    <span><button className="delete btn btn-secondary" type="button" onClick={() => onDeleteEvent(event.id)}>Delete</button></span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default EventListPage;
