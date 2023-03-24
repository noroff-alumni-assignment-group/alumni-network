import React, { useState } from "react";
import Post from "../../components/post/Post";
import search from "../../assets/icons/Search.png";
import "./timeline.css";
import Search from "../../components/search/Search";
import PostForm from "../../components/post-form/PostForm";
import Popup from "../../components/popup/Popup";
import PostDTO from "../../models/PostDTO";
import PostMessageForm from "../../components/post-form/PostMessageForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PostFeed from "../../components/post/PostFeed";

const Timeline = () => {
  const posts: PostDTO[] = [
    {
      id: 1,
      title: "Lorem Ipsum",
      last_updated: new Date(),
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      target_topics: ["TOPIC 1"],
      target_groups: ["GROUP 1"],
      author: {firstName:"Anders",lastName:"A", id: "", email: "", username: ""},
      comments: [
        {
          author:{firstName:"Marcus",lastName:"B", id: "", email: "", username: ""},
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: {firstName:"Aleksander",lastName:"R", id: "", email: "", username: ""},
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
      author: {firstName:"Anders",lastName:"A", id: "", email: "", username: ""},
      comments: [
        {
          author: {firstName:"Marcus",lastName:"B", id: "", email: "", username: ""},
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: {firstName:"Aleksander",lastName:"R", id: "", email: "", username: ""},
          response: "Yes sui!",
        },
        {
          author: {firstName:"Marcus",lastName:"B", id: "", email: "", username: ""},
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: {firstName:"Aleksander",lastName:"R", id: "", email: "", username: ""},
          response: "Yes sui!",
        },
        {
          author: {firstName:"Marcus",lastName:"B", id: "", email: "", username: ""},
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author:{firstName:"Aleksander",lastName:"R", id: "", email: "", username: ""},
          response: "Yes sui!",
        },
        {
          author: {firstName:"Marcus",lastName:"B", id: "", email: "", username: ""},
          response: "Lorem Ipsum is simply dummy text of the printin",
        },
        {
          author: {firstName:"Aleksander",lastName:"R", id: "", email: "", username: ""},
          response: "Yes sui!",
        },
      ],
    },
  ];

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [activeTopic, setActiveTopic] = useState("");
  const user = useSelector((state: RootState) => state.user);

  // Add state variable for post form popup visibility
  const [showPostForm, setShowPostForm] = useState(false);

  function onSearch(searchWord: string){
    console.log(searchWord);
  }

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

      {showPostForm && <Popup child={<PostForm editing={false} handler={setShowPostForm}/>}/>}

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
            <Search onSearch={onSearch}/>
            <button
              className="activity-btn"
              onClick={() => setShowPostForm(true)}
            >
              NEW POST
            </button>
          </div>
        </div>
        <PostFeed/>
      </div>
    </div>
  );
};

export default Timeline;
