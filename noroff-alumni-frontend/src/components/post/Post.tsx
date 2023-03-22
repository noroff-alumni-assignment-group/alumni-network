import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../models/User";
import Profilepicture from "../profilepicture/Profilepicure";
import Group from "../tags/Group";
import Topic from "../tags/Topic";
import "./post.css";
import PostResponse from "./PostResponse";
import edit from "../../assets/icons/Ellipsis.png";

interface Props {
  id: string;
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
  id,
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
  const [newCommentText, setNewCommentText] = useState("");

  const user = useSelector((state: any) => state.user);
  const [localComments, setLocalComments] = useState(comments);

  const handleAddComment = (e: any) => {
    e.preventDefault();

    // Send the comment to the API and update the local state
    sendCommentToAPI(id, newCommentText);

    // Reset the newCommentText state
    setNewCommentText("");
  };


  const sendCommentToAPI = async (postId: string, commentText: string) => {
    try {
      const response = await fetch(
        `https://your-api-url.com/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            author: "Your Name", // Replace with the current user's name
            authorInitials: "YN", // Replace with the current user's initials
            response: commentText,
            date: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send comment to the API");
      }

      // You can update the local state with the new comment data received from the API
      const newComment = await response.json();
      setLocalComments((prevState) => [...prevState, newComment]);
    } catch (error) {
      console.error("Error sending comment to the API:", error);
    }
  };



  // Replace the comments prop with the new localComments state variable

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post">
      <div className="post-cnt" onClick={handleToggleComments}>
        <div className="post-head">
          <h2>{title}</h2>
          {author === user.author ? (
            <img className="editimg" alt="edit" src={edit} />
          ) : (
            <p>{date}</p>
          )}
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
              <Topic topic={topic} />
            ))}
            {groups.map((group) => (
              <Group group={group} />
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
          {localComments.map((comment) => (
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
          <form onSubmit={handleAddComment} className="post-response-form">
            <input
              className="post-response-input"
              type="text"
              placeholder="Write your comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            />
            <button type="submit" className="post-response-submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;
