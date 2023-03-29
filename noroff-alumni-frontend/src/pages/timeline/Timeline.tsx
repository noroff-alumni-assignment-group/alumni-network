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
  const user = useSelector((state: RootState) => state.user);

  // Add state variable for post form popup visibility
  const [showPostForm, setShowPostForm] = useState(false);


  useEffect(() => {
    getPosts()
        .then(data => {
          setPosts(data);
        })
  }, [])

  useEffect(() => {
    filterOnTopics();
  }, [selectedTopics])

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
  };

  // Returns filtered posts based on topics, used as input to feed instead of state-posts
  // if topic is selected to ensure that state-posts are not modified
  function filterOnTopics(){
    let filteredPosts: PostDTO[] = [];
    posts.forEach(post => {
      if(post.target_topics?.some(topic => selectedTopics.includes(topic.name))){
        filteredPosts.push(post);
      }
    })
    return filteredPosts;
  }

  const formHandler = (success: boolean) => {
    if(success){
      getPosts()
          .then(data => {
            setPosts(data);
            setShowPostForm(false);
          })
    } else {
      setShowPostForm(false);
    }
  }

  return (
    <div className="timeline">

      {showPostForm && <Popup child={<PostForm editing={false} handler={formHandler}/>}/>}

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
        <PostFeed posts={selectedTopics.length > 0 ? filterOnTopics() : posts} update={formHandler}/>
      </div>
    </div>
  );
};

export default Timeline;
