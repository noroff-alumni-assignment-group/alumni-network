import { useEffect, useState } from "react";
import "./topics.css";
import TopicListItemDTO from "../../models/TopicListItemDTO";
import TopicListItem from "../../components/TopicListItem/TopicListItem";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import TopicService from "../../services/topicService";
import CreateTopicModulo from "../../components/CreateTopicModulo/CreateTopicModulo";
import {useAlert} from "react-alert";
import LoadingIndicatorComponent from "../../components/LoadingIndicator/LoadingIndicatorComponent";
import Search from "../../components/search/Search";

function Topics() {
  const pageSize = 10;
  const alert = useAlert();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [showNewTopicModulo, setShowNewTopicModulo] = useState(false);
  const [topics, setTopics] = useState<Array<TopicListItemDTO>>(
    [] as Array<TopicListItemDTO>
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getPageOfTopics() {
      await TopicService.getTopics(pageNumber, pageSize).then((data)=>{
        setIsLoading(false);
        setTopics(data);
      }).catch((error)=>{
        alert.error("Failed to get topics");
      });
    }
    getPageOfTopics();
  }, [pageNumber]);

  async function subscribeToTopic(topicId: number) {
    return await TopicService.joinTopic(topicId);
  }

  async function onSearch(searchWord: string) {
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
          
          <Search onSearch={onSearch}/>
          <button
            className="activity-btn"
            onClick={() => setShowNewTopicModulo(true)}
          >
            Add new topic
          </button>
        </div>
      </div>
      <div className="topic-list-wrapper">
        {isLoading && <LoadingIndicatorComponent/>}
        {!isLoading && topics.map((topic) => (
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
