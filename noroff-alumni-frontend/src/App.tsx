import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Event from "./pages/event/Event";
import Groups from "./pages/groups/Groups";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Timeline from "./pages/timeline/Timeline";
import Topics from "./pages/topics/Topics";
import { RootState } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import tokenService from "./services/tokenService";
import { setUser } from "./store/userSlice";
import UserService from "./services/UserService";
import TopicFeed from "./pages/TopicFeed/TopicFeed";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkLogin() {
      if (tokenService.getLocalAccessToken() && !user.username) {
        dispatch(setUser((await UserService.getUser()).data));
      }
    }

    checkLogin();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
      {
        !user.username && !tokenService.getLocalAccessToken() ?
        <Login />
        :
        <>
        <Navbar />
        <div className="page-container">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/events" element={<Event />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/topics/:id" element={<TopicFeed />} />
            <Route path="/" element={<Timeline />}/>
          </Routes>
        </div>
        </>
      }
        
      </BrowserRouter>
    </div>
  );
}

export default App;
