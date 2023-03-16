import { useEffect, useState } from "react";
import "./topics.css";
import TopicListItemDTO from "../../models/TopicListItemDTO";
import TopicListItem from "../../components/TopicListItem/TopicListItem";
import {AiOutlineSearch} from "react-icons/ai";
import { getTopics } from "../../services/topicService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function Topics() {
  const auth = useSelector((state:RootState) => state.auth);
  const [topics, setTopics] = useState<Array<TopicListItemDTO>>(
    [] as Array<TopicListItemDTO>
  );
  const [pageNumber,setPageNumber] = useState<number>(0);

 useEffect(()=>{
  async function getPageOfTopics(){
    setTopics(await getTopics(pageNumber,10,auth.access_token!));
  }
  getPageOfTopics();
 },[pageNumber])
  return (
    <div className="topics-page">
      <div className="topics-page-header">
        <h2>All Topics</h2>
        <div className="topics-page-header-right">
          <AiOutlineSearch className="topics-header-search-icon"/>
          <input
            type="text"
            className={"topics-page-search-field"}
            placeholder="Search topic..."
          />
          <button className="activity-btn">Add new topic</button>
        </div>
      </div>
      <div className="topic-list-wrapper">
      {
        topics.map((topic)=><TopicListItem topic={topic} key={"Topic-" + topic.name}/>)
      }
      </div>
    </div>
  );
}

export default Topics;
