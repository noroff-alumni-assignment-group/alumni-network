import React, {useEffect, useState} from "react";
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
import {getPosts, searchPosts} from "../../services/postService";

const Timeline = () => {

  const [posts, setPosts] = useState<PostDTO[]>([]);

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [activeTopic, setActiveTopic] = useState("");
  const user = useSelector((state: RootState) => state.user);

  // Add state variable for post form popup visibility
  const [showPostForm, setShowPostForm] = useState(false);


  useEffect(() => {
    fetchPosts();
  }, [])

  function fetchPosts(){
    getPosts()
        .then(data => {
          setPosts(data);
        })
  }

  function onSearch(searchWord: string){
    searchPosts(searchWord)
        .then(data => {
          setPosts(data);
        })
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
        <PostFeed posts={posts}/>
      </div>
    </div>
  );
};

export default Timeline;
