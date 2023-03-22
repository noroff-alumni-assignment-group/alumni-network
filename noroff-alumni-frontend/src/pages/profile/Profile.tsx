import React, { useEffect, useState } from "react";
import "./profile.css";
import { postList } from "../../components/post/postList";
import Post from "../../components/post/Post";
import Search from "../../components/search/Search";
import search from "../../assets/icons/Search.png";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { useSelector } from "react-redux";
import edit from "../../assets/icons/Ellipsis.png";
import EditProfile from "./EditProfile";

function Profile() {
  const [filteredPosts, setFilteredPosts] = useState(postList);
  const [showSearchField, setShowSearchField] = useState(false);
  let name = window.location.pathname.replace("/profile/", "");
  name = name.replace("/profile", "");
  const [userProfile, setUserProfile] = useState("");
  const user = useSelector((state: any) => state.user);

  console.log(user);

  useEffect(() => {
    api
      .get("localhost:8080/api/v1/posts")
      .then((response) => {
        setFilteredPosts(response.data);
        console.log("test");
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [name]);

  // Function to handle search icon click
  const handleSearchIconClick = () => {
    setShowSearchField((prevState) => !prevState);
  };

  const [showEditProfile, setShowEditProfile] = useState(false);
  // Function to handle search icon click
  const handleEditProfile = () => {
    setShowEditProfile((prevState) => !prevState);
  };

  return (
    <div className="profilepage">
      {showEditProfile ? (
        <EditProfile setShowEditProfile={setShowEditProfile} user={user}/>
      ) : null}

      <div className="profiledata-cnt">
        <div className="edit-profile-cnt">
          <img
            src={edit}
            alt=""
            className="edit-profile-img"
            onClick={handleEditProfile}
          />
        </div>
        <div className="profiledata-head-cnt">
          <div className="profiledata-head">
            <div className="profilebubble profilepicture-profile">
              {user.initials}
            </div>
            <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
            <div className="profile-title">{user.title}</div>
          </div>
          <div className="profile-data">
            <div className="biography">
              <p className="bio-p">Biography</p>

              {user.biography !== null ? (
                <p>You dont have a bio 💀</p>
              ) : (
                <p className="bio-text">{user.biography}</p>
              )}
            </div>

            <div className="funfact">
              <p className="funfact-p">Funfact</p>
              {user.funfact !== null ? (
                <p>You dont have a funfact 💀</p>
              ) : (
                <p className="funfact-text">{user.funfact}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <h1>Posts</h1>
        {filteredPosts.length !== 0 ? (
          <div className="no-post-found-cnt">
            <p>You dont have any posts 💀</p>
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
                {showSearchField && (
                  <Search
                    posts={postList}
                    updateFilteredPosts={setFilteredPosts}
                  />
                )}
                <img
                  src={search}
                  alt="search"
                  className="searchimg"
                  onClick={handleSearchIconClick}
                />
              </div>
            </div>

            <div className="all-posts">
              {filteredPosts.map((post, i) => (
                <div className="profile-post">
                  <Post
                    id={post.id}
                    key={`post-${i}`}
                    title={post.title}
                    date={post.date}
                    body={post.body}
                    topics={post.topics}
                    groups={post.groups}
                    author={post.author}
                    profileInitials={post.profileInitials}
                    comments={post.comments}
                  />
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
