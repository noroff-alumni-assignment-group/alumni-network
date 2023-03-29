import React, { useState, useEffect } from "react";
import Event from "./Event";
import "./event.css";
import NewEvent from "./NewEvent";
import api from "../../services/api";
import { useSelector } from "react-redux";
import User from "../../models/User";
import { RootState } from "../../store/store";

function Events() {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get("/event");
        setEvents(response.data);
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
        {events.map((event, i) => (
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
          {userEvents.length === 0 ? (
            <div className="event-upcoming-cnt">
              You dont have any upcoming events.
            </div>
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
