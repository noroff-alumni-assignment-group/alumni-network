import React, {useEffect, useState} from "react";
import "./navbar.css";
import people from "../../assets/icons/User.png";
import timeline from "../../assets/icons/Activity Feed.png";
import groups from "../../assets/icons/People.png";
import topics from "../../assets/icons/Speech Bubble.png";
import events from "../../assets/icons/Calendar.png";
import { NavLink } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import {useWindowSize} from "../../hooks/useWindowSize";
import {useSelector} from "react-redux";
import { RootState } from "../../store/store";
import User from "../../models/User";
import UserService from "../../services/UserService";

function Navbar() {

  const user:User = useSelector((state:RootState)=>state.user);

    const [collapsed, setCollapsed] = useState(window.innerWidth < 1100);
    const windowSize = useWindowSize();

    useEffect(() => {
      if(window.innerWidth > 1100){
          setCollapsed(false)
      } else if (window.innerWidth <= 1100) {
          setCollapsed(true)
      }
    }, [windowSize])


    function handleClick() {
        if(window.innerWidth <= 1100) {
            setCollapsed(true);
        }
    }

    function handleLogout(){
      UserService.logout();
    }


  return (
      <div className="navbar-container">
          <button className="navbar-toggle-btn" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <FontAwesomeIcon icon={faBars}/> : <FontAwesomeIcon icon={faArrowLeft}/>}
          </button>
        <div className={"navbar " + (collapsed ? "navbar-collapsed" : "")}>
          <div className="nav-profile-cnt">

                <div className="circleprofile">
                    {user.firstName?.charAt(0).toUpperCase()+user.lastName!.charAt(0).toUpperCase()}
                </div>

                <p>{user.firstName} {user.lastName}</p>


          </div>

          <div className="nav-tags">
            <div className="tag-cnt">
              <img src={people} alt="profile" />
              <h1>
                <NavLink to="/profile" onClick={() => handleClick()}>Profile</NavLink>
              </h1>
            </div>
            <div className="tag-cnt">
              <img src={timeline} alt="timeline" />
              <h1>
                <NavLink to="/" onClick={() => handleClick()}>Timeline</NavLink>
              </h1>
            </div>
            <div className="tag-cnt">
              <img src={groups} alt="groups" />
              <h1>
                <NavLink to="/groups" onClick={() => handleClick()}>Groups</NavLink>
              </h1>
            </div>
            <div className="tag-cnt">
              <img src={topics} alt="topics" />
              <h1>
                <NavLink to="/topics" onClick={() => handleClick()}>Topics</NavLink>
              </h1>
            </div>
            <div className="tag-cnt">
              <img src={events} alt="events" />
              <h1>
                <NavLink to="/events" onClick={() => handleClick()}>Events</NavLink>
              </h1>
            </div>
          </div>

          <div className="nav-events">
            <h1 className="subtitle">Your upcoming events</h1>

            <p>Event 1 - Trondheim</p>
            <p>Event 2 - Oslo</p>
          </div>

          <div className="nav-groups">
            <h1 className="subtitle">Your groups</h1>

            <p>Group Lorem</p>
            <p>Group Ipsum </p>
          </div>

            <div className="tag-cnt logout-btn">
                <FontAwesomeIcon icon={faSignOutAlt} className={"nav-icon"}/>
                <h1>
                    <NavLink to="/" onClick={handleLogout}>Sign out</NavLink>
                </h1>
            </div>
        </div>
      </div>
  );
}

export default Navbar;
