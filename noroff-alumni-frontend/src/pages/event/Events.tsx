import React from "react";
import Event from "./Event";
import "./event.css";

function Events() {
  const events = [
    {
      id: 1,
      title: "EVENT 1",
      description: "Test",
      participants: 10,
      location: "Trondheim",
      address: "Trondheimsveien 15",
      colortheme: 1,
    },
    {
      id: 2,
      title: "Lorem ipsum",
      description: "Test",
      participants: 1,
      location: "Trondheim",
      address: "Trondheimsveien 15",
      colortheme: 2,
    },
    {
      id: 3,
      title: "Lorem ipsum",
      description: "Test",
      participants: 0,
      location: "Trondheim",
      address: "Trondheimsveien 15",
      colortheme: 1,
    },
    {
      id: 1,
      title: "EVENT 1",
      description: "Test",
      participants: 10,
      location: "Trondheim",
      address: "Trondheimsveien 15",
      colortheme: 3,
    },
    {
      id: 2,
      title: "Lorem ipsum",
      description: "Test",
      participants: 1,
      location: "Trondheim",
      address: "Trondheimsveien 15",
      colortheme: 3,
    },
    {
      id: 3,
      title: "Lorem ipsum",
      description: "Test",
      participants: 0,
      location: "Trondheim",
      address: "Trondheimsveien 15",
      colortheme: 2,
    },
  ];

  const confirmedEvents = [
    {
      id: 2,
      title: "Lorem ipsum",
      description: "Test",
      participants: 1,
      location: "Trondheim",
      address: "Trondheimsveien 15",
      colortheme: 1,
    },
    {
      id: 1,
      title: "EVENT 1",
      description: "Test",
      participants: 10,
      location: "Trondheim",
      address: "Trondheimsveien 15",
      colortheme: 3,
    },
  ];
  return (
    <div>
      <div className="event-header">
        <h1>All Events</h1>

        <div className="event-action-btn-cnt">
          <button className="activity-btn">NEW EVENT</button>
        </div>
      </div>

      <div className="all-event-cnt">
        {events.map((event, i) => (
          <div>
            <Event event={event} />
          </div>
        ))}
      </div>

      <div className="your-event-cnt">
        <h1>Your Events</h1>
        <div className="your-events">
          {confirmedEvents.map((event, i) => (
            <div>
              <Event event={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
