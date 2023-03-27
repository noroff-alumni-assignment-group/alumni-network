type Post = {
   title: string;
   date: string;
   body: string;
   topics: string[];
   groups: string[];
   author: string;
   profileInitials: string;
   comments: {
     author: string;
     authorInitials: string;
     response: string;
   }[];
 }

 export default Post;