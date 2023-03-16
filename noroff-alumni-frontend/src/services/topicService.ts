import axios from "axios";


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
      console.log(response.data);
      return response.data;
   })
}