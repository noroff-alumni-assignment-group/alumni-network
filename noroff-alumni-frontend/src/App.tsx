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
import GroupPage from "./pages/groups/GroupPage";
import NotfoundPage from "./pages/404/NotfoundPage";
import EventPage from "./pages/event/EventPage";
import Events from "./pages/event/Events";

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

  console.log(process.env.REACT_APP_API_URL);

  return (
    <div className="App">
      <BrowserRouter>
        {!user.username && !tokenService.getLocalAccessToken() ? (
          <Login />
        ) : (
          <div>
            <Navbar />
            <div className="page-container">
              <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/*" element={<Profile />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventPage />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/groups/:groupId" element={<GroupPage />} />
                <Route path="/topics" element={<Topics />} />
                <Route path="/topic/:id" element={<TopicFeed />} />
                <Route path="/" element={<Timeline />} />
                <Route path="/404" element={<NotfoundPage />} />
              </Routes>
            </div>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
