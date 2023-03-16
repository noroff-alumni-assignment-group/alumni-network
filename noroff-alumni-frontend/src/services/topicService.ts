import axios from "axios";
import NewTopic from "../models/NewTopic";


export async function getTopics(pageNum:number,pageSize:number,authToken:string){
   return await axios({
      method:"get",
      headers:{
         "Authorization":"Bearer "+authToken
      },
      url: process.env.REACT_APP_API_URL+"topic",
      params: {
         page: pageNum,
         pageSize: pageSize
      }
   }).then((response)=>{
      return response.data;
   })
}

export async function joinTopic(topicId:number,authToken:string){
   return await axios({
      method:"post",
      headers:{
         "Authorization":"Bearer "+authToken
      },
      url: process.env.REACT_APP_API_URL+"topic/"+topicId+"/join",
      
   }).then((response)=>{
      console.log(response.data);
      return response.data;
   })
}

export async function searchTopics(searchWord:string,pageNum:number,pageSize:number,authToken:string){
   return await axios({
      method:"get",
      headers:{
         "Authorization":"Bearer "+authToken
      },
      url: process.env.REACT_APP_API_URL+"topic",
      params: {
         page: pageNum,
         pageSize: pageSize,
         search:searchWord
      }
   }).then((response)=>{
      return response.data;
   });
}

export async function createTopic(newTopic:NewTopic,authToken:string){
   await axios({
      method:"post",
      headers:{
         "Authorization":"Bearer "+authToken
      },
      url: process.env.REACT_APP_API_URL+"topic",
      data:newTopic
      
   });
}