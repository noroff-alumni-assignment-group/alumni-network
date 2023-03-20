import React, { useState } from "react";
import Profilepicture from "../profilepicture/Profilepicure";
import "./post.css";
import PostResponse from "./PostResponse";

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
    date: string;
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
  // Inside the Post component
  const [newCommentText, setNewCommentText] = useState("");
  

  const handleAddComment = (e: any) => {
    e.preventDefault();

    // Add new comment to the comments state
    const newComment = {
      author: "Your Name", // Replace with the current user's name
      authorInitials: "YN", // Replace with the current user's initials
      response: newCommentText,
      date: new Date().toISOString(),
    };

    // Reset the newCommentText state
    setNewCommentText("");
  };


  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post">
      <div className="post-cnt" onClick={handleToggleComments}>
        <div className="post-head">
          <h2>{title}</h2>
          <p>{date}</p>
        </div>
        <div className="post-body">
          <p>{body}</p>
        </div>
        <div className="post-comments">
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
      </div>

      {showComments && (
        <div>
          <h2 className="all-comments-h2">All comments</h2>
          {comments.map((comment) => (
            <div className="post-elem-profile">
              <PostResponse
                author={comment.author}
                text={comment.response}
                initials={comment.authorInitials}
                key={comment.author + comment.response}
                date={date}
              />
            </div>
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
