import "./TopicListItem.css";
import TopicListItemDTO from "../../models/TopicListItemDTO";
import { AiFillStar } from "react-icons/ai";
type TopicListProps = {
  topic: TopicListItemDTO
};

export default function TopicListItem({ topic }: TopicListProps) {
  
//TODO: add logic for subscribed with reducer
  return (
    <div className="topic-list-item">
      <div className="topic-list-left">
        <h3>{topic.name}</h3>
        <p>{topic.numberOfPosts} Posts</p>
      </div>
      <div className="topic-list-right">
        <p>{topic.subscribers} Subscribers</p>{" "}
        <AiFillStar
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
