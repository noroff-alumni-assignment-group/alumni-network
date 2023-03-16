import { useSelector } from "react-redux";
import "./CreateTopicModulo.css";
import { RootState } from "../../store/store";
import { useState } from "react";
import { createTopic } from "../../services/topicService";

type CreateTopicModuloProps = {
   setHideModulo: Function
}

export default function CreateTopicModulo({setHideModulo}:CreateTopicModuloProps){
   const auth = useSelector((state:RootState)=>state.auth);
   const [name,setName] = useState("");
   const [description,setDescription] = useState("");

   async function submitNewTopic(){
      if(name && description){
         createTopic({name:name,description:description},auth.access_token!);
         setHideModulo(false)
      }
   }

   return (
      <div className="create-topic-modulo-wrapper">
         <div className="create-topic-modulo">
            <h3>Create new topic</h3>
            <input type="text" className="input" placeholder="Topic name" onChange={(event)=>setName(event.target.value)}/>
            <textarea className="create-topic-description" placeholder="Description..." onChange={(event)=>setDescription(event.target.value)}></textarea>
            <button className="activity-btn" onClick={submitNewTopic}>Create</button>
         </div>
      </div>
   );

}