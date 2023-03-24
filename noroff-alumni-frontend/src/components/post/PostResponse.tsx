import React from "react";
import UserDisplayDTO from "../../models/UserDisplayDTO";

interface Props {
  author: UserDisplayDTO;
  text: string;
}

function PostResponse({ author, text }: Props) {
  return (
    <div className="post-response">
      <div className="post-author-cnt">
        <div className="profilebubble post-profile-pic">{author.firstName && author.lastName ? (author.firstName[0]+author.lastName[0]).toUpperCase():"OO"}</div>
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
