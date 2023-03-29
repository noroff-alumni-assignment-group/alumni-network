import React, { useEffect, useState } from "react";
import "./navbar.css";
import people from "../../assets/icons/User.png";
import timeline from "../../assets/icons/Activity Feed.png";
import groups from "../../assets/icons/People.png";
import topics from "../../assets/icons/Speech Bubble.png";
import events from "../../assets/icons/Calendar.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowLeft,
  faSignOutAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import User from "../../models/User";
import UserService from "../../services/UserService";
import api from "../../services/api";
import EventDTO from "../../models/EventDTO";
import Profilepicture from "../profilepicture/Profilepicure";

function Navbar() {
  const user = useSelector((state: any) => state.user);
  const [userEvents, setUserEvents] = useState<EventDTO[]>([]);

  const [collapsed, setCollapsed] = useState(window.innerWidth < 1100);
  const windowSize = useWindowSize();
  let navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth > 1100) {
      setCollapsed(false);
    } else if (window.innerWidth <= 1100) {
      setCollapsed(true);
    }
  }, [windowSize]);

  function handleClick() {
    if (window.innerWidth <= 1100) {
      setCollapsed(true);
    }
  }

  function handleLogout() {
    UserService.logout();
  }

useEffect(() => {
  if (user && user.id) {
    fetchUserEvents();
  }
}, [user]);


  function handleIconClick() {
    navigate("/profile/" + user.username);
  }

  async function fetchUserEvents() {
    if (user) {
      try {
        const response = await api.get(`/event/user/${user.id}`);
        setUserEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleClickEvent = (id: any) => {
    navigate("/events/" + id)
  }

  return (
    <div className="navbar-container">
      <button
        className="navbar-toggle-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faArrowLeft} />
        )}
      </button>
      <div className={"navbar " + (collapsed ? "navbar-collapsed" : "")}>
        <div className="nav-profile-cnt">
          <Profilepicture author={user} large={true} />

          <p>
            {(user.firstName ?? "").charAt(0).toUpperCase() +
              (user.firstName ?? "").slice(1)}{" "}
            {(user.lastName ?? "").charAt(0).toUpperCase() +
              (user.lastName ?? "").slice(1)}
          </p>
        </div>

        <div className="nav-tags">
          <div className="tag-cnt">
            <img src={people} alt="profile" />
            <h1>
              <NavLink
                to={`/profile/${user.username}`}
                onClick={() => handleClick()}
              >
                Profile
              </NavLink>
            </h1>
          </div>
          <div className="tag-cnt">
            <img src={timeline} alt="timeline" />
            <h1>
              <NavLink to="/" onClick={() => handleClick()}>
                Timeline
              </NavLink>
            </h1>
          </div>
          <div className="tag-cnt">
            <img src={groups} alt="groups" />
            <h1>
              <NavLink to="/groups" onClick={() => handleClick()}>
                Groups
              </NavLink>
            </h1>
          </div>
          <div className="tag-cnt">
            <img src={topics} alt="topics" />
            <h1>
              <NavLink to="/topics" onClick={() => handleClick()}>
                Topics
              </NavLink>
            </h1>
          </div>
          <div className="tag-cnt">
            <img src={events} alt="events" />
            <h1>
              <NavLink to="/events" onClick={() => handleClick()}>
                Events
              </NavLink>
            </h1>
          </div>
          <div className="tag-cnt">
            <FontAwesomeIcon icon={faEnvelope} className="nav-icon" />
            <h1>
              <NavLink to="/inbox" onClick={() => handleClick()}>
                Inbox
              </NavLink>
            </h1>
          </div>

          <div className="nav-events">
            <h1 className="subtitle">Your upcoming events</h1>
            {userEvents.map((event, index) => (
              <p onClick={() => handleClickEvent(event.id)}>
               {event.name}
              </p>
            ))}
          </div>

          {/*<div className="nav-groups">
          <h1 className="subtitle">Your groups</h1>
          <p>Group Lorem</p>
          <p>Group Ipsum </p>
      </div>*/}
        </div>
        <div className="tag-cnt logout-btn">
          <FontAwesomeIcon icon={faSignOutAlt} className={"nav-icon"} />
          <h1>
            <NavLink to="/" onClick={handleLogout}>
              Sign out
            </NavLink>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
