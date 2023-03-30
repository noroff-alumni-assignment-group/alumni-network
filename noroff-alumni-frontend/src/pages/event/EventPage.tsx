import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventDTO from "../../models/EventDTO";
import api from "../../services/api";
import Calender2 from "../../assets/icons/Calendar2.png";
import SquareClock from "../../assets/icons/Square Clock.png";
import Address from "../../assets/icons/Address.png";
import "./event.css";
import { useSelector } from "react-redux";
import UserDisplayDTO from "../../models/UserDisplayDTO";
import Profilepicture from "../../components/profilepicture/Profilepicure";
import LoadingIndicatorComponent from "../../components/LoadingIndicator/LoadingIndicatorComponent";

type RouteParams = {
  id: string;
};

function EventPage() {
  const [event, setEvent] = useState<EventDTO>();
  const [participants, setParticipants] = useState<UserDisplayDTO[]>([]);

  const { id } = useParams<RouteParams>();
  const user = useSelector((state: any) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await api.get(`/event/${id}`);
        setEvent(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (event) {
      fetchParticipants();
    }
  }, [event]);

  if (!event) {
    return <div className="event-page-header"><LoadingIndicatorComponent/></div>;
  }

  const fetchParticipants = async () => {
    try {
      const fetchedParticipants = await Promise.all(
        event.participants.map(async (participantId) => {
          const response = await api.get(`/user/${participantId}`);
          return response.data;
        })
      );
      setParticipants(fetchedParticipants);
    } catch (error) {
      console.error(error);
    }
  };

  const getColorClass = (theme: number) => {
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

  const colorClass = getColorClass(event.theme);

  const handleParticipateClick = async () => {
    try {
      const response = await api.post(`/event/${id}/join`, null, {
        params: {
          userId: user.id,
        },
      });
      console.log("API response:", response);

      // Add the current user to the participants list and update the state
      const updatedParticipants = [...participants, user];
      setParticipants(updatedParticipants);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="event-page">
      <div className="event-page-header">
        {isLoading && <LoadingIndicatorComponent/>}
        {!isLoading && <div className="event-page-data">
          <div className={`event-page-banner ${colorClass}`}>
            <h1>{event.title}</h1>
            <p>{event.location}</p>
          </div>
          <div className="ev-data">
            <div className="event-data-1">
              <div className="event-time-date">
                <h1>{event.title}</h1>
                <div className="event-d">
                  <img src={Calender2} alt="calendar" />
                  <p>{event.date}</p>
                </div>
                <div className="event-d">
                  <img src={SquareClock} alt="clock" />
                  <p>{event.time}</p>
                </div>
                <div className="event-d">
                  <img src={Address} alt="address" />
                  <p>{event.location}</p>
                </div>

                <div className="participants-event">
                  <p>Participants</p>
                  <div className="participants-event-pic">
                    {participants.map((participant, index) => (
                      <div
                        className="profilebubble event-profile-pic"
                        key={participant.id}
                        style={{
                          marginLeft: index === 0 ? 0 : -15,
                          zIndex: participants.length - index,
                        }}
                      >
                        <Profilepicture
                          profileTheme={user.theme}
                          author={participant}
                          showDetails={true}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="event-data-2">
              <div className="ev-da">
                <h3 className="event-desc">Description</h3>
                <p>{event.description}</p>
              </div>

              <div className="event-participate">
                <button
                  className="activity-btn"
                  onClick={handleParticipateClick}
                >
                  Participate
                </button>
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default EventPage;
