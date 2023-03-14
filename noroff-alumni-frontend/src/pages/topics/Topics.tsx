import React, { useEffect, useState } from "react";
import "./Topics.css";
import TopicListItemDTO from "../../models/TopicListItemDTO";
import TopicListItem from "../../components/TopicListItem/TopicListItem";
import {AiOutlineSearch} from "react-icons/ai";

function Topics() {
  const [topics, setTopics] = useState<Array<TopicListItemDTO>>(
    [] as Array<TopicListItemDTO>
  );

 useEffect(()=>{
  setTopics([
    { id:1,name: "Cars", numberOfPosts: 200734, subscribers: 100000 },
    { id:2,name: "Code", numberOfPosts: 52000, subscribers: 14000 },
    { id:3,name: "Food", numberOfPosts: 142, subscribers: 20 },
    { id:4,name: "Summer", numberOfPosts: 3489, subscribers: 946 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
    { id:5,name: "Job", numberOfPosts: 2000, subscribers: 395 },
  ]);
 },[])
  return (
    <div className="topics-page">
      <div className="topics-page-header">
        <h2>All Topics</h2>
        <div className="topics-page-header-right">
          <AiOutlineSearch className="topics-header-search-icon"/>
          <input
            type="text"
            className={"topics-page-search-field"}
            placeholder="Search topic..."
          />
          <button className="activity-btn">Add new topic</button>
        </div>
      </div>
      <div className="topic-list-wrapper">
      {
        topics.map((topic)=><TopicListItem topic={topic} key={"Topic-" + topic.name}/>)
      }
      </div>
    </div>
  );
}

export default Topics;
