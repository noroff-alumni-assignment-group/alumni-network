import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function NewEvent(props: any) {
  const user = useSelector((state: any) => state.user);

  const [selectedColorTheme, setSelectedColorTheme] = useState(1);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [description, setDescription] = useState("");

  const handleColorThemeSelect = (theme: number) => {
    setSelectedColorTheme(theme);
  };

  const handleSave = async (event: any) => {
    event.preventDefault();

    const newEventData = {
      createdBy: user.id,
      groupId: "", // set the correct value based on the selected group
      title: title,
      description: description,
      date: date,
      time: startTime,
      location: location,
      name: title,
      theme: selectedColorTheme,
    };

    try {
      const response = await api.post("/event", newEventData);

      // Reset the form
      setTitle("");
      setDate("");
      setLocation("");
      setStartTime("");
      setDescription("");
      setSelectedColorTheme(1);

      props.setRenderNewEvent(false);
  
    } catch (error) {
      console.error(error);
      // Handle any errors here
    }
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
      
           
          </div>
          <div className="editprofile-buttons">
            <button
              className="activity-btn"
              onClick={(event) => {
                event.preventDefault();
                props.setRenderNewEvent(false);
              }}
            >
              CANCEL
            </button>
            <button
              onClick={(event) => {
                handleSave(event);
              }}
              className="activity-btn"
            >
              SAVE
            </button>
          </div>
        </div>
      </form>

      <div
        onClick={(event) => {
          event.preventDefault();
          props.setRenderNewEvent(false);
        }}
        className="backgroundcolor"
      ></div>
    </div>
  );
}
