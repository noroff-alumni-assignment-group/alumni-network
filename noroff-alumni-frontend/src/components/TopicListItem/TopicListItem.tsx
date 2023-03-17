import "./TopicListItem.css";
import TopicListItemDTO from "../../models/TopicListItemDTO";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUser } from "../../store/userSlice";
type TopicListProps = {
  topic: TopicListItemDTO,
  subscribeToTopic: Function
};

export default function TopicListItem({ topic , subscribeToTopic }: TopicListProps) {
  const [currentTopic,setCurrentTopic] = useState(topic);
  const user = useSelector((state:RootState)=>state.user);
  const dispatch = useDispatch();
  async function joinTopic(){
    setCurrentTopic(await subscribeToTopic(currentTopic.id));
    let userTopics = [...user.topics!];
    userTopics.push(currentTopic.name);
    dispatch(setUser({...user,topics:userTopics}));
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
        onClick={!user.topics?.includes(currentTopic.name) ? joinTopic : undefined}
          className={
            user.topics?.includes(currentTopic.name)
              ? "topic-list-item-star-subscribed topic-list-item-star"
              : "topic-list-item-star"
          }
        />
      </div>
    </div>
  );
}
