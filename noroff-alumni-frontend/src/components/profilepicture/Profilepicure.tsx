import React from "react";
import "./profilepicture.css";
import UserDisplayDTO from "../../models/UserDisplayDTO";
import { useNavigate } from "react-router-dom";

interface Props {
  author: any;
  showDetails?: boolean;
  profileTheme?: string;
  large?: boolean;
}

function Profilepicture({ author, showDetails = true, profileTheme, large }: Props) {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile/" + author.username);
  };

  const defaultProfileTheme = "3"
  
  return (
    <div
      className={`profilepicture-container color${
        author.profileTheme ?? defaultProfileTheme
      } ${large ? "large-profile" : ""}`}
      onClick={handleClick}
    >
      {/* Conditionally render the profile details based on the "showDetails" prop */}
      {showDetails && (
        <div className="profilepicture-details">
          <p>{author.firstName + " " + author.lastName}</p>
        </div>
      )}
      {author.firstName && author.lastName
        ? (author.firstName[0] + author.lastName[0]).toUpperCase()
        : "OO"}
    </div>
  );
}

export default Profilepicture;

