import React from "react";
import "./profilepicture.css";
import UserDisplayDTO from "../../models/UserDisplayDTO";

interface Props {
  author:UserDisplayDTO
}

function Profilepicture({author}:Props) {
  return (
    <div className="profilepicture-container">
      <div className="profilepicture-details">
        <p>{author.firstName + " " + author.lastName}</p>
      </div>
      { author.firstName && author.lastName ? (author.firstName[0]+author.lastName[0]).toUpperCase():"OO"}
    </div>
  );
}

export default Profilepicture;
