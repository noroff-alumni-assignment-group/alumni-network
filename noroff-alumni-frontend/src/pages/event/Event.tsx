import React from "react";
import { useNavigate } from "react-router-dom";
import "./event.css";

function Event(props: any) {
  const { title, location, theme, id } = props.event;
  
  let navigate = useNavigate();

  

  const getColorClass = (theme: any) => {
    switch (theme) {
      case 1:
        return "themeoption1";
      case 2:
        return "themeoption2";
      case 3:
        return "themeoption3";
      case 4:
        return "themeoption4";
      default:
        return "";
    }
  };

  const colorClass = getColorClass(theme);

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
