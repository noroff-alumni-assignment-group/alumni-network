import { useEffect, useState } from "react";
import "./topics.css";
import TopicListItemDTO from "../../models/TopicListItemDTO";
import TopicListItem from "../../components/TopicListItem/TopicListItem";
import { AiOutlineSearch } from "react-icons/ai";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import TopicService from "../../services/topicService";
import CreateTopicModulo from "../../components/CreateTopicModulo/CreateTopicModulo";

function Topics() {
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [searchWord, setSearchWord] = useState("");
  const [showNewTopicModulo, setShowNewTopicModulo] = useState(false);
  const [topics, setTopics] = useState<Array<TopicListItemDTO>>(
    [] as Array<TopicListItemDTO>
  );

  useEffect(() => {
    async function getPageOfTopics() {
      await TopicService.getTopics(pageNumber, pageSize).then((data)=>{
        setTopics(data);
      }).catch((error)=>{
        
      });
    }
    getPageOfTopics();
  }, [pageNumber]);

  async function subscribeToTopic(topicId: number) {
    return await TopicService.joinTopic(topicId);
  }

  async function onSearch() {
    setPageNumber(0);
    setTopics(await TopicService.searchTopics(searchWord,0,pageSize));
  }

  function toNextPage() {
    if (topics.length >= 10) setPageNumber(pageNumber + 1);
  }
  function toPreviousPage() {
    if (pageNumber !== 0) setPageNumber(pageNumber - 1);
  }

  return (
    <div className="topics-page">
      {showNewTopicModulo ? (
        <CreateTopicModulo setHideModulo={setShowNewTopicModulo} />
      ) : null}
      <div className="topics-page-header">
        <h1>All Topics</h1>
        <div className="topics-page-header-right">
          <AiOutlineSearch
            className="topics-header-search-icon"
            onClick={onSearch}
          />
          <input
            type="text"
            className={"topics-page-search-field"}
            placeholder="Search topic..."
            onChange={(event) => setSearchWord(event.target.value)}
          />
          <button
            className="activity-btn"
            onClick={() => setShowNewTopicModulo(true)}
          >
            Add new topic
          </button>
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
