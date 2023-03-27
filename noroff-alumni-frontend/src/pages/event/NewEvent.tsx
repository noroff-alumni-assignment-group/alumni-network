import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../services/api";

export default function NewEvent(props: any) {
  const user = useSelector((state: any) => state.user);

  const [selectedColorTheme, setSelectedColorTheme] = useState(1);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [description, setDescription] = useState("");


  const handleColorThemeSelect = (theme: any) => {
    setSelectedColorTheme(theme);
  };

  return (
    <div className="new-event">
      <form className="new-event-form" action="">
        <div className="edit">
          <h2>Create a new event</h2>

          <div className="event-data">
            <div className="top-data">
              <div>
                <p className="event-title">Title</p>
                <input
                  className="input titleevent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              <div>
                <p className="event-title">Date</p>
                <input
                  className="input dateevent"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                ></input>
              </div>
              <div>
                <p className="event-title">Location</p>
                <input
                  className="input location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                ></input>
              </div>
              <div>
                <p className="event-title">Starttime</p>
                <input
                  className="input starttime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="button-data">
              <div>
                <p className="event-title">Description</p>
                <textarea
                  className="input description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="event-themes-cnt">
              <p>Choose your banner for the event!</p>
              <div className="options">
                <div
                  className={`option themeoption1 ${
                    selectedColorTheme === 1 ? "active" : "blur"
                  }`}
                  onClick={() => handleColorThemeSelect(1)}
                >
                  <h3>{title || "Title"}</h3>
                  <p>{location || "Location"}</p>
                </div>

                <div
                  className={`option themeoption2 ${
                    selectedColorTheme === 2 ? "active" : "blur"
                  }`}
                  onClick={() => handleColorThemeSelect(2)}
                >
                  <h3>{title || "Title"}</h3>
                  <p>{location || "Location"}</p>
                </div>

                <div
                  className={`option themeoption3 ${
                    selectedColorTheme === 3 ? "active" : "blur"
                  }`}
                  onClick={() => handleColorThemeSelect(3)}
                >
                  <h3>{title || "Title"}</h3>
                  <p>{location || "Location"}</p>
                </div>

                <div
                  className={`option themeoption4 ${
                    selectedColorTheme === 4 ? "active" : "blur"
                  }`}
                  onClick={() => handleColorThemeSelect(4)}
                >
                  <h3>{title || "Title"}</h3>
                  <p>{location || "Location"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="event-group-cnt">
            <p>Specify if the event is for one of your groups</p>
            <div className="group-tag-event">
              <div className="group">Test</div>
              <div className="group">Test</div>
              <div className="group">Test</div>
            </div>
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
            <button className="activity-btn">SAVE</button>
          </div>
        </div>
      </form>

      <div className="backgroundcolor"></div>
    </div>
  );
}
