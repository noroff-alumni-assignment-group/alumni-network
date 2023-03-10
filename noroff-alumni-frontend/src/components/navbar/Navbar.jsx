import React from "react";
import "./navbar.css";
import people from "../../assets/icons/User.png";
import timeline from "../../assets/icons/Activity Feed.png";
import groups from "../../assets/icons/People.png";
import topics from "../../assets/icons/Speech Bubble.png";
import events from "../../assets/icons/Calendar.png";
import { Link, NavLink, Outlet, Routes } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-profile-cnt">

            <div className="circleprofile">
                AA
            </div>

            <p>Navn Navnesen</p>


      </div>

      <div className="nav-tags">
        <div className="tag-cnt">
          <img src={people} alt="profile" />
          <h1>
            <NavLink to="/profile">Profile</NavLink>
          </h1>
        </div>
        <div className="tag-cnt">
          <img src={timeline} alt="timeline" />
          <h1>
            <NavLink to="/">Timeline</NavLink>
          </h1>
        </div>
        <div className="tag-cnt">
          <img src={groups} alt="groups" />
          <h1>
            <NavLink to="/groups">Groups</NavLink>
          </h1>
        </div>
        <div className="tag-cnt">
          <img src={topics} alt="topics" />
          <h1>
            <NavLink to="/topics">Topics</NavLink>
          </h1>
        </div>
        <div className="tag-cnt">
          <img src={events} alt="events" />
          <h1>
            <NavLink to="/events">Events</NavLink>
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
    </div>
  );
}

export default Navbar;
