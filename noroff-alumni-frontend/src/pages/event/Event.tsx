import React from "react";
import "./event.css";

function Event(props: any) {
  const { title, location, colortheme } = props.event;

  const getColorClass = (theme: any) => {
    switch (theme) {
      case 1:
        return "event-color-1";
      case 2:
        return "event-color-2";
      case 3:
        return "event-color-3";
      case 4:
        return "event-color-4";
      default:
        return "";
    }
  };

  const colorClass = getColorClass(colortheme);

  return (
    <div className={`event ${colorClass}`}>
      <h3>{title}</h3>
      <p className="desc">{location}</p>
    </div>
  );
}

export default Event;
