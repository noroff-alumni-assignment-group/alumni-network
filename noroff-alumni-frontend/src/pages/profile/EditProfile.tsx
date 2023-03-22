import React, { useState } from "react";
import axios from "axios";

function EditProfile(props: any) {
  const [userData, setUserData] = useState(props.user);

  // Handle function for the Save button click
  const handleSaveClick = (event: any) => {
    event.preventDefault();
    // Create an object with the updated user data
    const updatedUserData = {
      ...props.user,
      workstatus: userData.workstatus,
      bio: userData.bio,
      funfact: userData.funfact,
    };

    console.log(updatedUserData);
    
    // Send the updated user data to the API
    axios
      .put("http://localhost:8080/api/v1/user", updatedUserData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // BYTT UT
        },
      })
      .then((response) => {
        console.log(response);
        // Close the EditProfile component
        props.setShowEditProfile(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="editprofile-cnt">
      <form className="editform" action="">
        <div className="edit">
          <h1>Edit profile</h1>

          <div className="p-pic-cnt">
            <p>Profile picture</p>
            <div className="themes">
              <div className="profile-theme option1">AA</div>
              <div className="profile-theme option2">AA</div>
              <div className="profile-theme option3">AA</div>
              <div className="profile-theme option4">AA</div>
              <div className="profile-theme option5">AA</div>
              <div className="profile-theme option5">AA</div>
            </div>
          </div>
          <div className="edit-work-status-cnt">
            <p>Work status</p>
            <textarea
              className="input work-input"
              placeholder={userData.workstatus}
              value={userData.workstatus}
              onChange={(event) =>
                setUserData({ ...userData, workstatus: event.target.value })
              }
            />
          </div>
          <div className="edit-bio-cnt">
            <p>Biography</p>
            <textarea
              className="input bio-input"
              placeholder={userData.bio}
              value={userData.bio}
              onChange={(event) =>
                setUserData({ ...userData, bio: event.target.value })
              }
            />
          </div>
          <div className="edit-funfact-cnt">
            <p>Funfact</p>
            <textarea
              className="input funfact-input"
              placeholder={userData.funfact}
              value={userData.funfact}
              onChange={(event) =>
                setUserData({ ...userData, funfact: event.target.value })
              }
            />
          </div>
          <div className="editprofile-buttons">
            <button className="activity-btn" onClick={props.setShowEditProfile}>
              CANCEL
            </button>
            <button className="activity-btn" onClick={handleSaveClick}>
              SAVE
            </button>
          </div>
        </div>
      </form>

      <div className="backgroundcolor"></div>
    </div>
  );
}

export default EditProfile;
