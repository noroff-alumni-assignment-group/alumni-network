import React, { useState } from "react";
import Post from "../../components/post/Post";
import search from "../../assets/icons/Search.png";
import "./timeline.css";
import Search from "../../components/search/Search";
import PostForm from "../../components/post-form/PostForm";
import Popup from "../../components/popup/Popup";
import PostDTO from "../../models/PostDTO";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Timeline = () => {
  const posts: PostDTO[] = [
    {
      id: 1,
      title: "Lorem Ipsum",
      last_updated: new Date(),
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      target_topics: ["TOPIC 1"],
      target_groups: ["GROUP 1"],
      author: { firstName: "Anders", lastName: "A", username: "bugge2" },
      comments: [
        {
          author: { firstName: "Marcus", lastName: "B", username: "bugge2" },
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: {
            firstName: "Aleksander",
            lastName: "R",
            username: "bugge2",
          },
          response: "Yes sui!",
        },
      ],
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      last_updated: new Date(),
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      target_topics: ["TOPIC 2"],
      target_groups: ["GROUP 1"],
      author: { firstName: "Anders", lastName: "A", username: "bugge2" },
      comments: [
        {
          author: { firstName: "Marcus", lastName: "B" },
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: { firstName: "Aleksander", lastName: "R" },
          response: "Yes sui!",
        },
        {
          author: { firstName: "Marcus", lastName: "B" },
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: { firstName: "Aleksander", lastName: "R" },
          response: "Yes sui!",
        },
        {
          author: { firstName: "Marcus", lastName: "B" },
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: { firstName: "Aleksander", lastName: "R" },
          response: "Yes sui!",
        },
        {
          author: { firstName: "Marcus", lastName: "B" },
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: { firstName: "Aleksander", lastName: "R" },
          response: "Yes sui!",
        },
      ],
    },
  ];

  const [filteredPosts, setFilteredPosts] = useState<PostDTO[]>(posts);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [activeTopic, setActiveTopic] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const [showSearchField, setShowSearchField] = useState(false);

  // Add state variable for post form popup visibility
  const [showPostForm, setShowPostForm] = useState(false);

  // Function to handle search icon click
  const handleSearchIconClick = () => {
    setShowSearchField((prevState) => !prevState);
  };

  const postsToRender = filteredPosts.filter((post) => {
    if (selectedTopics.length === 0) {
      return true;
    }
    return (post.target_topics ?? []).some((topic) =>
      selectedTopics.includes(topic)
    );
  });


  const handleTopicClick = (topic: string) => {
    let newSelectedTopics;
    if (selectedTopics.includes(topic)) {
      newSelectedTopics = selectedTopics.filter((t) => t !== topic);
    } else {
      newSelectedTopics = [...selectedTopics, topic];
    }
    setSelectedTopics(newSelectedTopics);

    setActiveTopic(newSelectedTopics[newSelectedTopics.length - 1]);
  };

  return (
    <div className="timeline">
      {showPostForm && (
        <Popup child={<PostForm editing={false} handler={setShowPostForm} />} />
      )}

      <div className="timeline-content">
        <h1>Timeline</h1>

        <div className="timeline-head">
          
          <div className="timeline-tags ">
            {user.topics?.map((topic, i) => (
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

            <button
              className="activity-btn"
              onClick={() => setShowPostForm(true)}
            >
              NEW POST
            </button>
          </div>
        </div>
        <div className="timeline-feed">
          {postsToRender.map((post, i) => (
            <Post key={`post-${i}`} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
