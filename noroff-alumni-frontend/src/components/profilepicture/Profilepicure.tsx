import React from "react";
import "./profilepicture.css";

function Profilepicture(props: any) {
  return (
    <div className="profilepicture-container">
      <div className="profilepicture-details">
        <p>{props.author}</p>
      </div>
      {props.initials}
    </div>
  );
}

export default Profilepicture;
