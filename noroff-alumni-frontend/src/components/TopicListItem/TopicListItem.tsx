import "./TopicListItem.css";
import TopicListItemDTO from "../../models/TopicListItemDTO";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
type TopicListProps = {
  topic: TopicListItemDTO,
  subscribeToTopic: Function
};

export default function TopicListItem({ topic , subscribeToTopic }: TopicListProps) {
  const [currentTopic,setCurrentTopic] = useState(topic);

  async function joinTopic(){
    setCurrentTopic(await subscribeToTopic(currentTopic.id));
  }
  
//TODO: add logic for subscribed with reducer and check if already subscribed
  return (
    <div className="topic-list-item">
      <div className="topic-list-left">
        <h3>{currentTopic.name}</h3>
        <p>{currentTopic.numberOfPosts} Posts</p>
      </div>
      <div className="topic-list-right">
        <p>{currentTopic.subscribers} Subscribers</p>{" "}
        <AiFillStar
        onClick={joinTopic}
          className={
            false
              ? "topic-list-item-star-subscribed topic-list-item-star"
              : "topic-list-item-star"
          }
        />
      </div>
    </div>
  );
}
