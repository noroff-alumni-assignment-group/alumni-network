// Timeline.tsx
import React, { useState } from "react";
import Post from "../../components/post/Post";
import search from "../../assets/icons/Search.png";
import "./timeline.css";
import Search from "../../components/search/Search";
import PostForm from "../../components/post-form/PostForm";
import Popup from "../../components/popup/Popup";
import UserSearch from "../../components/userSearch/UserSearch";

interface PostData {
  title: string;
  date: string;
  body: string;
  topics: string[];
  groups: string[];
  author: string;
  profileInitials: string;
  comments: {
    author: string;
    authorInitials: string;
    response: string;
  }[];
}

const Timeline = () => {
  const posts: PostData[] = [
    {
      title: "Lorem Ipsum",
      date: "2h ago",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      topics: ["TOPIC 1"],
      groups: ["GROUP 1"],
      author: "Anders A.",
      profileInitials: "AA",
      comments: [
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
      ],
    },
    {
      title: "Lorem Ipsum",
      date: "2h ago",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      topics: ["TOPIC 2"],
      groups: ["GROUP 1"],
      author: "Anders A.",
      profileInitials: "AA",
      comments: [
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
        {
          author: "Marcus B",
          authorInitials: "MB",
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: "Aleksander R",
          authorInitials: "AR",
          response: "Yes sui!",
        },
      ],
    },
  ];

  const [filteredPosts, setFilteredPosts] = useState<PostData[]>(posts);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const myGroups = ["GROUP 1", "GROUP 2"];
  const myTopics = ["TOPIC 1", "TOPIC 2", "TOPICTOPIC 2"];
  const [activeTopic, setActiveTopic] = useState("");

  // Add state variable for search field visibility
  const [showSearchField, setShowSearchField] = useState(false);

  // Add state variable for post form popup visibility
  const [showPostForm, setShowPostForm] = useState(false);

  // Function to handle search icon click
  const handleSearchIconClick = () => {
    setShowSearchField((prevState) => !prevState);
  };

  const postsToRender = filteredPosts.filter((post) => {
    if (selectedTopics.length === 0) {
      return true; // if no topics are selected, show all posts
    }
    return post.topics.some((topic) => selectedTopics.includes(topic));
  });

  const handleTopicClick = (topic: string) => {
    let newSelectedTopics;
    if (selectedTopics.includes(topic)) {
      newSelectedTopics = selectedTopics.filter((t) => t !== topic);
    } else {
      newSelectedTopics = [...selectedTopics, topic];
    }
    setSelectedTopics(newSelectedTopics);

    // Set the active topic to the last selected topic
    setActiveTopic(newSelectedTopics[newSelectedTopics.length - 1]);
  };

  return (
    <div className="timeline">

      {/*showPostForm && <Popup child={<PostForm editing={false} handler={setShowPostForm}/>}/>*/}
      {showPostForm && <Popup child={<UserSearch handler={null}/>}/>}

      <div className="timeline-content">
        <h1>Timeline</h1>

        <div className="timeline-head">
            <div className="timeline-tags">
              {myTopics.map((topic, i) => (
                <div
                  key={`topic-${i}`}
                  className={`timeline-sort-tag ${
                    selectedTopics.includes(topic) ? "active" : ""
                  }`}
                  onClick={() => handleTopicClick(topic)}
                >
                  {topic}
                </div>
              ))}
            </div>
          <div className="timeline-action-btn-cnt">
            <div
              className={`search-cnt ${
                showSearchField ? "search-cnt-active" : ""
              }`}
            >
              {showSearchField && (
                <Search posts={posts} updateFilteredPosts={setFilteredPosts} />
              )}
              <img
                src={search}
                alt="search"
                className="searchimg"
                onClick={handleSearchIconClick}
              />
            </div>

            <button className="activity-btn" onClick={() => setShowPostForm(true)}>NEW POST</button>
          </div>
        </div>
        <div className="timeline-feed">
          {postsToRender.map((post, i) => (
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
};

export default Timeline;
