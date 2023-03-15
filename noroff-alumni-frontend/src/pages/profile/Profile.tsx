import React, { useState } from 'react'
import './profile.css'
import { postList } from "../../components/post/postList";
import Post from '../../components/post/Post';
import Search from '../../components/search/Search';
import search from "../../assets/icons/Search.png";

function Profile() {
  const [filteredPosts, setFilteredPosts] = useState(postList);
  const [showSearchField, setShowSearchField] = useState(false);

  // Function to handle search icon click
  const handleSearchIconClick = () => {
    setShowSearchField((prevState) => !prevState);
  };

  return (
    <div className="profilepage">
      <div className="profiledata-cnt">
        <div className="profiledata-head">
          <div className="profilebubble profilepicture-profile">AA</div>
          <h2 className="profile-name">Navn Navnesen</h2>
          <div className="profile-title">Fullstack Java Developer</div>
        </div>
        <div className="profile-data">
          <div className="biography">
            <p className="bio-p">Biography</p>
            <p className="bio-text">Lorem ipsum this is funfact haha!</p>
          </div>

          <div className="funfact">
            <p className="funfact-p">Funfact</p>
            <p className="funfact-text">
              Lorem ipsum this is funfact haha! Lorem ipsum this is funfact
              haha!
            </p>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <h1>My posts</h1>
        <div className="profile-search">
          {" "}
          <div
            className={`search-cnt ${
              showSearchField ? "search-cnt-active" : ""
            }`}
          >
            {showSearchField && (
              <Search posts={postList} updateFilteredPosts={setFilteredPosts} />
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
            <Post
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile