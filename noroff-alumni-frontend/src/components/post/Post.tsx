import React, { useState } from "react";
import "./post.css";
import comment from "../../assets/icons/Comments.png";
import PostResponse from "./PostResponse";
import Profilepicture from "../profilepicture/Profilepicure";

interface Props {
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

function Post({
  title,
  date,
  body,
  topics,
  groups,
  author,
  profileInitials,
  comments,
}: Props) {
  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post" onClick={handleToggleComments}>
      <div className="post-head">
        <h2>{title}</h2>
        <p>{date}</p>
      </div>
      <div className="post-body">
        <p>{body}</p>
      </div>
      <div className="post-comments">
        <img src={comment} alt="comments" />
        <p>{comments.length} comments</p>
      </div>

      <div className="post-footer">
        <div className="post-tags">
          {topics.map((topic) => (
            <div className="topic" key={topic}>
              {topic}
            </div>
          ))}
          {groups.map((group) => (
            <div className="group" key={group}>
              {group}
            </div>
          ))}
        </div>
        <div className="post-author">
          <Profilepicture initials={profileInitials} author={author} />
        </div>
      </div>
      {showComments && (
        <div>
          <h2 className="all-comments-h2">All comments</h2>
          {comments.map((comment) => (
            <PostResponse
              author={comment.author}
              text={comment.response}
              initials={comment.authorInitials}
              key={comment.author + comment.response}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
