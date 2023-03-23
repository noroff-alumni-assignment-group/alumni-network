import "./CreateTopicModulo.css";
import { useState } from "react";
import TopicService from "../../services/topicService";

type CreateTopicModuloProps = {
   setHideModulo: Function
}

export default function CreateTopicModulo({setHideModulo}:CreateTopicModuloProps){
   const [name,setName] = useState("");
   const [description,setDescription] = useState("");

   async function submitNewTopic(){
      if(name && description){
         TopicService.createTopic({name:name,description:description});
         setHideModulo(false)
      }
   }

   return (
      <div className="create-topic-modulo-wrapper">
         <div className="create-topic-modulo">
            <h3>Create new topic</h3>
            <input type="text" className="input" placeholder="Topic name" onChange={(event)=>setName(event.target.value)}/>
            <textarea className="create-topic-description" placeholder="Description..." onChange={(event)=>setDescription(event.target.value)}></textarea>
            <div className="create-topic-button-wrapper">
            <button className="cancel-btn" onClick={()=>setHideModulo(false)}>cancel</button>
            <button className="activity-btn" onClick={submitNewTopic}>Create</button>
            </div>
         </div>
      </div>
   );

}