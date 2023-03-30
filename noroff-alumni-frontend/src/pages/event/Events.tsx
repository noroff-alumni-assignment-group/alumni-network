import React, { useState, useEffect } from "react";
import Event from "./Event";
import "./event.css";
import NewEvent from "./NewEvent";
import api from "../../services/api";
import { useSelector } from "react-redux";
import User from "../../models/User";
import { RootState } from "../../store/store";
import Placeholder from "../../components/placeholder/Placeholder";
import LoadingIndicatorComponent from "../../components/LoadingIndicator/LoadingIndicatorComponent";

function Events() {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const user = useSelector((state: any) => state.user);

  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [isUserEventsLoading, setIsUserEventsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get("/event");
        setEvents(response.data);
        setIsEventsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    if (user.id) {

      fetchUserEvents();
    }

    fetchEvents();
  }, [user.id]); 

  async function fetchUserEvents() {
    try {
      const response = await api.get(`/event/user/${user.id}`);
      setUserEvents(response.data);
      setIsUserEventsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  const confirmedEvents = [{}];

  const [renderNewEvent, setRenderNewEvent] = useState(false);

  const handleEventClick = () => {
    setRenderNewEvent(!renderNewEvent);
  };

  return (
    <div className="event-wrapper">
      {renderNewEvent ? <NewEvent setRenderNewEvent={setRenderNewEvent} /> : ""}
      <h1>All Events</h1>
      <div className="event-header">
        <div className="event-action-btn-cnt">
          <button onClick={handleEventClick} className="activity-btn">
            NEW EVENT
          </button>
        </div>
      </div>

      <div className="all-event-cnt">
        {isEventsLoading && <LoadingIndicatorComponent/>}
        {!isEventsLoading && events.map((event, i) => (
          <div key={i}>
            <Event event={event} />
          </div>
        ))}
      </div>

      <div className="your-event-cnt">
        <div className="event-header-your">
          <h2>Your upcoming events</h2>
        </div>

        <div className="your-events">
          {isUserEventsLoading && <LoadingIndicatorComponent/>}
          {!isUserEventsLoading && userEvents.length === 0 ? (
            <Placeholder text={"You dont have any upcoming events."}/>
          ) : (
            userEvents.map((event, i) => (
              <div key={i}>
                <Event event={event} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Events;
