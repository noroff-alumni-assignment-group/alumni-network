import { useParams } from "react-router-dom";
import "./TopicFeed.css";
import { useEffect, useState } from "react";
import Topic from "../../models/Topic";
import topicService from "../../services/topicService";
import Post from "../../components/post/Post";
import PostModel from "../../models/PostModel";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

export default function TopicFeed() {
  let { id } = useParams();
  const pageSize = 10;
  const [topic, setTopic] = useState({} as Topic);
  const [posts, setPosts] = useState<Array<PostModel>>([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    async function getTopic() {
      if (id) {
        setTopic(await topicService.getTopic(parseInt(id)));
        setPosts(
          await topicService.getTopicPosts(
            parseInt(id),
            "",
            pageNumber,
            pageSize
          )
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

  return (
    <div className="topic-feed">
      <div>
        <h2>{topic.name ?? ""} Feed</h2>
        <div>
          <h3>Description</h3>
          <p>{topic.description}</p>
        </div>
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
