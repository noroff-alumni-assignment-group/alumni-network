import { useParams } from "react-router-dom";
import "./TopicFeed.css";

export default function TopicFeed(){
   let {id} = useParams();



   return (
      <div className="topic-feed">
         {id}
      </div>
   )
}