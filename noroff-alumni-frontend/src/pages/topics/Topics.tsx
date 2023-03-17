import { useEffect, useState } from "react";
import "./topics.css";
import TopicListItemDTO from "../../models/TopicListItemDTO";
import TopicListItem from "../../components/TopicListItem/TopicListItem";
import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import {
  getTopics,
  joinTopic,
  searchTopics,
} from "../../services/topicService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CreateTopicModulo from "../../components/CreateTopicModulo/CreateTopicModulo";

function Topics() {
  const auth = useSelector((state: RootState) => state.auth);
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searchWord, setSearchWord] = useState("");
  const [showNewTopicModulo,setShowNewTopicModulo] = useState(false);
  const [topics, setTopics] = useState<Array<TopicListItemDTO>>(
    [] as Array<TopicListItemDTO>
  );

  useEffect(() => {
    async function getPageOfTopics() {
      setTopics(await getTopics(pageNumber, pageSize, auth.access_token!));
    }
    getPageOfTopics();
  }, [pageNumber]);

  async function subscribeToTopic(topicId: number) {
    return await joinTopic(topicId, auth.access_token!);
  }

  async function onSearch() {
    setPageNumber(0);
    setTopics(await searchTopics(searchWord,0,pageSize,auth.access_token!));
  }

  function toNextPage() {
    if (topics.length >= 10) setPageNumber(pageNumber + 1);
  }
  function toPreviousPage() {
    if (pageNumber !== 0) setPageNumber(pageNumber - 1);
  }

  return (
    <div className="topics-page">
      {showNewTopicModulo ?<CreateTopicModulo setHideModulo={setShowNewTopicModulo}/> : null}
      <div className="topics-page-header">
        <h2>All Topics</h2>
        <div className="topics-page-header-right">
          <AiOutlineSearch className="topics-header-search-icon" onClick={onSearch}/>
          <input
            type="text"
            className={"topics-page-search-field"}
            placeholder="Search topic..."
            onChange={(event) => setSearchWord(event.target.value)}
          />
          <button className="activity-btn" onClick={()=>setShowNewTopicModulo(true)}>Add new topic</button>
        </div>
      </div>
      <div className="topic-list-wrapper">
        {topics.map((topic) => (
          <TopicListItem
            topic={topic}
            key={"Topic-" + topic.name}
            subscribeToTopic={subscribeToTopic}
          />
        ))}
      </div>
        <div className="topic-list-page-nav-wrapper">
        <div className="topic-list-page-nav-item" onClick={toPreviousPage}>
          <FaArrowCircleLeft className="topic-list-page-nav-arrow" />
          <h3>Previous</h3>
        </div>
        <div className="topic-list-page-nav-item" onClick={toNextPage}>
          <h3>Next</h3>
          <FaArrowCircleRight className="topic-list-page-nav-arrow" />
        </div>
      </div>
      
    </div>
  );
}

export default Topics;
