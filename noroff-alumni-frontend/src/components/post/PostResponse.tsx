import React from "react";
import UserDisplayDTO from "../../models/UserDisplayDTO";
import Profilepicture from "../profilepicture/Profilepicure";

interface Props {
  author: UserDisplayDTO;
  text: string;
}

function PostResponse({ author, text }: Props) {
  
  return (
    <div className="post-response">
      <div className="post-author-cnt">
        <Profilepicture author={author}/>
        <div className="response-author">
          <p className="post-time">7</p>
          <div className="post-response-author">
            <p>{author.firstName ?? ""} {author.lastName ?? ""}</p>
          </div>
        </div>
      </div>

      <div className="vertical-stroke"></div>
      <div className="post-response-text">
        <p>{text}</p>
      </div>
      <div className="post-response-initals"></div>
    </div>
  );
}

export default PostResponse;
