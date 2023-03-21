import "./TopicListItem.css";
import TopicListItemDTO from "../../models/TopicListItemDTO";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
type TopicListProps = {
  topic: TopicListItemDTO,
  subscribeToTopic: Function
};

export default function TopicListItem({ topic , subscribeToTopic }: TopicListProps) {
  const [currentTopic,setCurrentTopic] = useState(topic);
  const user = useSelector((state:RootState)=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function joinTopic(event:React.MouseEvent<any, MouseEvent>){
    event.stopPropagation();
    setCurrentTopic(await subscribeToTopic(currentTopic.id));
    let userTopics = [...user.topics!];
    userTopics.push(currentTopic.name);
    dispatch(setUser({...user,topics:userTopics}));
  }
  
  function navigateToTopicFeed(){
    navigate("/topics/"+currentTopic.id);
  }

  return (
    <div className="topic-list-item" onClick={navigateToTopicFeed}>
      <div className="topic-list-left">
        <h3>{currentTopic.name}</h3>
        <p>{currentTopic.numberOfPosts} Posts</p>
      </div>
      <div className="topic-list-right">
        <p>{currentTopic.subscribers} Subscribers</p>{" "}
        <AiFillStar
        onClick={!user.topics?.includes(currentTopic.name) ? joinTopic : (event)=>{event.stopPropagation()}}
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
