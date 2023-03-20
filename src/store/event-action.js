
import { eventActions } from "./event-slice";


export const createEvents = (eventData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("https://lti-assessment-default-rtdb.firebaseio.com/eventList.json",
                {
                    method: 'POST',
                    body: JSON.stringify({
                            name: eventData.name,
                            date: eventData.date,
                            description: eventData.description, 
                            bookingType: eventData.bookingType,
                            bookingPrice: eventData.bookingPrice,
                            terms: eventData.terms
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
        await sendRequest();
        dispatch(eventActions.showNotication({
            type: "SUCCESS",
            msg: ""
        }));
      
    } catch (error) {
        dispatch(eventActions.showNotication({
            type: "FAILED",
            msg: "Failed to create event"
        }));
    }
  };
};

export const getEventList = (eventData) => {
  return async (dispatch) => {
    const fetchData = async () => {
        const response = await fetch("https://lti-assessment-default-rtdb.firebaseio.com/eventList.json");

      if (!response.ok) {
        throw new Error('Could not fetch cart data!');
      }

      const data = await response.json();

      return data;
    };

    try {
      const events = await fetchData();
        const eventList = [];
        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                          ];
      
      for (let key in events) {
        const eventData = events[key];
        const d = new Date(eventData.date);
        const monthName = monthNames[d.getMonth()];
        const account = {
          ...eventData,
          id: key,
          monthName: monthName,
          monthDate: d.getDate(),
        };
        eventList.push(account);
      }

      dispatch(eventActions.setEvents(eventList));
      
    } catch (error) {
        console.log("Something went wrong")
    }
  };
};

export const deleteEvent = (eventData, eventList) => {
  return async (dispatch) => {
    // const fetchData = async () => {
    //     const response = await fetch("https://lti-assessment-default-rtdb.firebaseio.com/eventList.json",
    //         { method: "DELETE" });

    //     if (!response.ok) {
    //         throw new Error('Could not fetch cart data!');
    //     }

    //     const data = await response.json();

    //     return data;
    // };

    const finalEventList = eventList.filter((event) => {
      return event.id !== eventData.id;
    })

    const fakingDelete = async () => {
      const response = await fetch("https://lti-assessment-default-rtdb.firebaseio.com/eventList.json",
        {
          method: "PUT",
          body: JSON.stringify(finalEventList)
        }
      );

        if (!response.ok) {
            throw new Error('Could not fetch cart data!');
        }

        const data = await response.json();

        return data;
    };

    try {
        const events = await fakingDelete();
        const eventList = [];
        for (let key in events) {
            const eventData = events[key];
            const account = {
                id: key,
                name: eventData.name,
                date: eventData.date,
                description: eventData.description,
                bookingType: eventData.bookingType,
                bookingPrice: eventData.bookingPrice,
            };
            eventList.push(account);
        }

        dispatch(eventActions.setEvents(eventList));
      
    } catch (error) {
        console.log("Something went wrong")
    }
  };
};