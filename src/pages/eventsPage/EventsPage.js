import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvents, getEventList } from "../../store/event-action";
import EventListPage from "./eventListPage/EventListPage";
import EventPage from "./eventPage/EventPage";

function EventsPage(props) {
    const dispatch = useDispatch();
    const [isAddEvent, setIsEventPage] = useState(false);
    const [isListPage, setIsListPage] = useState(false);
    const [eventData, setEventData] = useState({});
    const eventList = useSelector(state => state.event.eventList);

    useEffect(() => {
        dispatch(getEventList());
    }, []);

    useEffect(() => {
        if (eventList.length > 0) {
            setIsListPage(true);
            setIsEventPage(false);
        } else {
            setIsListPage(false);
            setIsEventPage(true);
        }
    }, [eventList])

    const saveEvent = function (eventData) {
        dispatch(createEvents(eventData));
        dispatch(getEventList());
    }

    const showAddEventPage = function () {
        setEventData({});
        setIsEventPage(true);
        setIsListPage(false);
    }

    const onEditEvent = function (eventDataToEdit) {
        setEventData(eventDataToEdit);
        setIsEventPage(true);
        setIsListPage(false);
    }

    const goToEventListPage = function () {
        setIsEventPage(false);
        setIsListPage(true);
        setEventData({});
    }

    return (
        <div style={{marginTop: "10px"}}>
            {(isListPage && eventList.length > 0 ) &&
                <div className="col-6 offset-3">
                    <button type="button" className="btn btn-primary" onClick={showAddEventPage}>Add New Event</button>
                </div>
            }
            { (isAddEvent ||  eventList.length <= 0 )&&
                (
                <>
                    <div className="col-6 offset-3" style={{textAlign: "center"}}>Whoo, Start creating your events</div>
                    <EventPage saveEvent={saveEvent} eventData={eventData} goToEventListPage={goToEventListPage}></EventPage>
                </>
                )}
            
            { (eventList.length > 0 &&  (isListPage && !isAddEvent)) && <EventListPage onEditEvent={onEditEvent} ></EventListPage> }
        </div>
    )
}

export default EventsPage;
