import { useState } from "react";
import api from "../../services/api";

export default function EditProfile(props: any) {

  const [userData, setUserData] = useState(props.user);

  // Handle function for the Save button click
  const handleSaveClick = (event: any) => {
    event.preventDefault();
    // Create an object with the updated user data
    const updatedUserData = {
      ...props.user,
      title: userData.title, // Update title
      biography: userData.biography, // Update biography
      funfact: userData.funfact, // Update funfact
    };

    console.log("updated", updatedUserData);

    // Send the updated user data to the API
    api
      .put(
          `/user/${props.user.id}`,
        updatedUserData
      )
      .then((response) => {
        console.log(response);
        // Hide EditProfile component after successful API call
        props.setShowEditProfile(false); 
        window.location.reload();
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
          <div className="edit-title-cnt">
            <p>Title</p>
            <input
              className="input title-input"
              type="text"
              placeholder={userData.title}
              value={userData.title}
              onChange={(event) =>
                setUserData({ ...userData, title: event.target.value })
              }
            />
          </div>
          <div className="edit-bio-cnt">
            <p>Biography</p>
            <textarea
              className="input bio-input"
              placeholder={userData.biography}
              value={userData.biography}
              onChange={(event) =>
                setUserData({ ...userData, biography: event.target.value })
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
            <button
              className="activity-btn"
              onClick={(event) => {
                event.preventDefault();
                props.setShowEditProfile(false);
              }}
            >
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
