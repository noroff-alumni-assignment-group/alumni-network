import React, { useEffect, useState } from "react";
import "./profile.css";
import { postList } from "../../components/post/postList";
import Post from "../../components/post/Post";
import Search from "../../components/search/Search";
import search from "../../assets/icons/Search.png";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useSelector } from "react-redux";
import edit from "../../assets/icons/Ellipsis.png";
import EditProfile from "./EditProfile";
import { setUser } from "../../store/userSlice";

function Profile() {
  const [filteredPosts, setFilteredPosts] = useState(postList);
  const [showSearchField, setShowSearchField] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();

  let name = window.location.pathname.replace("/profile/", "");
  name = name.replace("/profile", "");
  const user = useSelector((state: any) => state.user);
  console.log("user", user);

  const [userProfile, setUserProfile] = useState({
    title: "",
    biography: "",
    funfact: "",
    firstName: "",
    lastName: "",
  });

  // Function to handle search icon click
  const handleSearchIconClick = () => {
    setShowSearchField((prevState) => !prevState);
  };

  // Function to handle search icon click
  const handleEditProfile = () => {
    setShowEditProfile((prevState) => !prevState);
  };

  // In your frontend useEffect function
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/api/v1/user/find/${name}`
        );

       

        const userData = response.data;
        setUserProfile({
          title: userData.title,
          biography: userData.biography,
          funfact: userData.funfact,
          firstName: userData.firstName,
          lastName: userData.lastName,
        });

        console.log("res", response.data);
      } catch (error) {
        navigate("/404");
      }
    };

    fetchUserData();
  }, [name]);

  return (
    <div className="profilepage">
      {showEditProfile ? (
        <EditProfile
          setShowEditProfile={setShowEditProfile}
          user={user}
          username={name}
        />
      ) : null}

      <div className="profiledata-cnt">
        <div className="edit-profile-cnt">
          {user?.username === name && (
            <img
              src={edit}
              alt=""
              className="edit-profile-img"
              onClick={handleEditProfile}
            />
          )}
        </div>
        <div className="profiledata-head-cnt">
          <div className="profiledata-head">
            <div className="profilebubble profilepicture-profile">
              {userProfile?.firstName?.slice(0, 1).toUpperCase()}
              {userProfile?.lastName?.slice(0, 1).toUpperCase()}
            </div>
            <h2 className="profile-name">
              {userProfile?.firstName?.slice(0, 1).toUpperCase()}
              {userProfile?.firstName?.slice(1)}{" "}
              {userProfile?.lastName?.slice(0, 1).toUpperCase()}
              {userProfile?.lastName?.slice(1)}
            </h2>

            <div className="profile-title">
              {userProfile.title ? (
                <p className="bio-text">{userProfile.title}</p>
              ) : (
                <p>There is no title 💀</p>
              )}
            </div>
          </div>
          <div className="profile-data">
            <div className="biography">
              <p className="bio-p">Biography</p>
              {userProfile.biography ? (
                <p className="bio-text">{userProfile.biography}</p>
              ) : (
                <p>There is no bio 💀</p>
              )}
            </div>

            <div className="funfact">
              <p className="funfact-p">Funfact</p>
              {userProfile.funfact ? (
                <p className="funfact-text">{userProfile.funfact}</p>
              ) : (
                <p>There is no funfact 💀</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <h1>Posts</h1>
        {filteredPosts.length === 0 ? (
          <div className="no-post-found-cnt">
            <p>No posts 💀</p>
          </div>
        ) : (
          <div>
            <div className="profile-search">
              {" "}
              <div
                className={`search-cnt ${
                  showSearchField ? "search-cnt-active" : ""
                }`}
              >
              
              </div>
            </div>

            <div className="all-posts">
              {filteredPosts.map((post, i) => (
                <div className="profile-post">
                  
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
