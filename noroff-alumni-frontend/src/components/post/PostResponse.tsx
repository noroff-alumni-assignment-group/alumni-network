import React from "react";

interface Props {
  author: string;
  text: string;
  initials: string;
}

function PostResponse({ author, text, initials }: Props) {
  return (
    <div className="post-response">
      <div className="post-author-cnt">
        <div className="profilebubble post-profile-pic">{initials}</div>
        <div className="response-author">
          <p className="post-time">1h ago</p>
          <div className="post-response-author">
            <p>{author}</p>
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
