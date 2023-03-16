import React from "react";
import {
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Event from "./pages/event/Event";
import Groups from "./pages/groups/Groups";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Timeline from "./pages/timeline/Timeline";
import Topics from "./pages/topics/Topics";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Event />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/" element={<Timeline />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
