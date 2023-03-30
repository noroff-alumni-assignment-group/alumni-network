import React, { useEffect, useState } from "react";
import "./profile.css";
import { postList } from "../../components/post/postList";
import Post from "../../components/post/Post";
import Search from "../../components/search/Search";
import search from "../../assets/icons/Search.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { useSelector } from "react-redux";
import edit from "../../assets/icons/Ellipsis.png";
import EditProfile from "./EditProfile";
import { setUser } from "../../store/userSlice";
import PostFeed from "../../components/post/PostFeed";
import PostDTO from "../../models/PostDTO";
import {
  getPosts,
  getPostsUser,
  searchPosts,
  searchPostsUser,
} from "../../services/postService";
import Profilepicture from "../../components/profilepicture/Profilepicure";
import LoadingIndicatorComponent from "../../components/LoadingIndicator/LoadingIndicatorComponent";

function Profile() {
  const [posts, setPosts] = useState<PostDTO[]>([]);

  const [showSearchField, setShowSearchField] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const navigate = useNavigate();

  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(true);

  let name = window.location.pathname.replace("/profile/", "");
  name = name.replace("/profile", "");
  const user = useSelector((state: any) => state.user);

  const [userProfile, setUserProfile] = useState({
    id: "",
    title: "",
    biography: "",
    funfact: "",
    firstName: "",
    lastName: "",
    profileTheme: "",
  });

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/user/find/${name}`);

        const userData = response.data;
        setUserProfile({
          id: userData.id,
          title: userData.title,
          biography: userData.biography,
          funfact: userData.funfact,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileTheme: userData.profileTheme,
        });
        setIsProfileLoading(false);

        await getPostsUser(userData.id).then((data) => {
          setIsPostsLoading(false);
          setPosts(data);
        });
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
    setIsPostsLoading(true);
    searchPostsUser(userProfile.id, searchWord).then((data) => {
      setIsPostsLoading(false);
      setPosts(data);
    });
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
        {isProfileLoading && <LoadingIndicatorComponent/>}
        {!isProfileLoading &&
          <div className="profiledata-head-cnt">
            <div className="profiledata-head">
              <Profilepicture author={userProfile} large={true} />

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
        }
        </div>

      <div className="profile-posts">
        <div className="profile-posts-header">
          <h1>Posts</h1>
          <Search onSearch={onSearch} />
        </div>
        {isPostsLoading && <LoadingIndicatorComponent/>}
        {!isPostsLoading && <PostFeed posts={posts} text={"You have no posts."} />}
      </div>
    </div>
  );
}

export default Profile;
