import { useParams } from "react-router-dom";
import "./TopicFeed.css";
import { useEffect, useState } from "react";
import Topic from "../../models/Topic";
import topicService from "../../services/topicService";
import Post from "../../components/post/Post";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import PostDTO from "../../models/PostDTO";
import { RootState } from "../../store/store";
import {useSelector,useDispatch} from "react-redux";
import { setUser } from "../../store/userSlice";

export default function TopicFeed() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state:RootState)=> state.user);
  const pageSize = 10;
  const [topic, setTopic] = useState({} as Topic);
  const [posts, setPosts] = useState<Array<PostDTO>>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const isSubscribed = user.topics?.includes(topic.name);

  useEffect(() => {
    async function getTopic() {
      if (id) {
        setTopic(await topicService.getTopic(parseInt(id)));
        setPosts(
          await topicService.getTopicPosts(parseInt(id), pageNumber, pageSize)
        );
      }
    }
    getTopic();
  }, []);

  function toNextPage() {
    if (posts.length >= 10) setPageNumber(pageNumber + 1);
  }
  function toPreviousPage() {
    if (pageNumber !== 0) setPageNumber(pageNumber - 1);
  }

  async function joinTopic(event:React.MouseEvent<any,MouseEvent>){
    await topicService.joinTopic(topic.id);
    let userTopics = [...user.topics!];
    userTopics.push(topic.name);
    dispatch(setUser({...user,topics:userTopics}));
  }

  async function leaveTopic(){
    await topicService.leaveTopic(topic.id);
    let userTopics = [...user.topics!];
    userTopics = userTopics.filter((t)=>t !== topic.name);
  }

  return (
    <div className="topic-feed">
      <h2>{topic.name ?? ""} Feed</h2>
      <div className="topic-description-button-wrapper">
        <div>
          <h4>Description</h4>
          <p>{topic.description}</p>
        </div>
        <button onClick={user.topics?.includes(topic.name) ? leaveTopic:joinTopic} className="activity-btn">{user.topics?.includes(topic.name) ? "Stop subscription" : "Subscribe"}</button>
      </div>
      {posts ? posts.map((post) => <Post post={post} />) : null}

      <div className="topic-feed-page-nav-wrapper">
        <div className="topic-feed-page-nav-item" onClick={toPreviousPage}>
          <FaArrowCircleLeft className="topic-feed-page-nav-arrow" />
          <h3>Previous</h3>
        </div>
        <div className="topic-feed-page-nav-item" onClick={toNextPage}>
          <h3>Next</h3>
          <FaArrowCircleRight className="topic-feed-page-nav-arrow" />
        </div>
      </div>
    </div>
  );
}
