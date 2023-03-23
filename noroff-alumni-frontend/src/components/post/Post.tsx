import React, { useState } from "react";
import "./post.css";
// import comment from "../../assets/icons/Comments.png";
import PostResponse from "./PostResponse";
import Profilepicture from "../profilepicture/Profilepicure";
import PostDTO from "../../models/PostDTO";

interface Props {
  post:PostDTO;
}

function Post({post}: Props) {
  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post">
      <div className="post-cnt" onClick={handleToggleComments}>
        <div className="post-head">
          <h2>{post.title}</h2>
          <p>{post.last_updated?.getHours()}</p>
        </div>
        <div className="post-body">
          <p>{post.body}</p>
        </div>
        <div className="post-comments">
          <p>{post.comments?.length} comments</p>
        </div>

        <div className="post-footer">
          <div className="post-tags">
            {post.target_topics?.map((topic) => (
              <div className="topic" key={topic}>
                {topic}
              </div>
            ))}
            {post.target_groups?.map((group) => (
              <div className="group" key={group}>
                {group}
              </div>
            ))}
          </div>
          <div className="post-author">
            <Profilepicture author={post.author ?? {firstName:"",lastName:""}} />
          </div>
        </div>
      </div>

      {showComments && (
        <div>
          <h2 className="all-comments-h2">All comments</h2>
          {post.comments?.map((comment) => (
            <PostResponse
              author={comment.author}
              text={comment.response}
              key={comment.author + comment.response}
            />
          ))}
          <input
            className="post-response-input"
            type="text"
            placeholder="Write your comment..."
          />
        </div>
      )}
    </div>
  );
}

export default Post;
