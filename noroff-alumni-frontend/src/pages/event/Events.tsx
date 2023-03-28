import React, { useState, useEffect } from "react";
import Event from "./Event";
import "./event.css";
import NewEvent from "./NewEvent";
import api from "../../services/api";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await api.get("/event");
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvents();
  }, []);

  const confirmedEvents = [
    {
      id: 2,
      title: "Lorem ipsum",
      description: "Test",
      participants: 1,
      location: "Trondheim",
      address: "Trondheimsveien 15",
      theme: 1,
    },
    {
      id: 1,
      title: "EVENT 1",
      description: "Test",
      participants: 10,
      location: "Trondheim",
      address: "Trondheimsveien 15",
      theme: 3,
    },
  ];

  const [renderNewEvent, setRenderNewEvent] = useState(false);
  
  const handleEventClick = () => {
    setRenderNewEvent(!renderNewEvent);
  };

 

  return (
    <div>
      {renderNewEvent ? <NewEvent setRenderNewEvent={setRenderNewEvent} /> : ""}

      <div className="event-header">
        <h1>All Events</h1>

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
        <h1>Your Events</h1>
        <div className="your-events">
          {confirmedEvents.length === 0 ? (
            <div className="event-upcoming-cnt">You dont have any upcoming events.</div>
          ) : (
            confirmedEvents.map((event, i) => (
              <div key={event.id}>
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
