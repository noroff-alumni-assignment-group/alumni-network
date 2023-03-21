import { useParams } from "react-router-dom";
import "./TopicFeed.css";
import { useEffect, useState } from "react";
import Topic from "../../models/Topic";
import topicService from "../../services/topicService";
import Post from "../../components/post/Post";

export default function TopicFeed() {
  let { id } = useParams();
  const [topic, setTopic] = useState({} as Topic);

  useEffect(() => {
    async function getTopic() {
      if (id) {
        setTopic(await topicService.getTopic(parseInt(id)));
      }
    }
    getTopic();
  }, []);

  console.log(topic);

  return (
    <div className="topic-feed">
      <h2>{topic.name ?? ""} Feed</h2>
      {topic.posts ?
      topic.posts.map((post)=><Post post={post}/>):null}
    </div>
  );
}
