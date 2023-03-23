import Post from "./PostModel";

type Topic = {
   id:number,
   name:string,
   description:string,
   subscribers:Array<string>,
   posts:Array<Post>
}

export default Topic;