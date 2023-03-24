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
import PostFeed from "../../components/post/PostFeed";
import PostDTO from "../../models/PostDTO";
import {getPosts, getPostsUser, searchPosts, searchPostsUser} from "../../services/postService";

function Profile() {

  const [posts, setPosts] = useState<PostDTO[]>([]);

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

  useEffect(() => {
    getPostsUser(user.id)
        .then(data => {
          setPosts(data);
        })
  }, [])

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

  // Function to handle search icon click
  const handleEditProfile = () => {
    setShowEditProfile((prevState) => !prevState);
  };

  function onSearch(searchWord: string) {
      searchPostsUser(user.id, searchWord)
          .then(data => {
            console.log(data)
            setPosts(data);
          })
  }


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
        <div className="profile-posts-header">
          <h1>Posts</h1>
          <Search onSearch={onSearch}/>
        </div>
        <PostFeed posts={posts}/>
      </div>
    </div>
  );
}

export default Profile;
