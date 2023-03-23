import React from "react";
import { useNavigate } from "react-router-dom";
import "./event.css";

function Event(props: any) {
  const { title, location, colortheme, id } = props.event;
  
  let navigate = useNavigate();

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

  const handleClick = () => {
    navigate("/events/" + id)
  };
  return (
    <div className={`event ${colorClass}`} onClick={handleClick}>
      <h3>{title}</h3>
      <p className="desc">{location}</p>
    </div>
  );
}

export default Event;
