import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../models/User";
import Profilepicture from "../profilepicture/Profilepicure";
import Group from "../tags/Group";
import Topic from "../tags/Topic";
import "./post.css";
import PostResponse from "./PostResponse";
import PostDTO from "../../models/PostDTO";
import SnarkdownText from "../SnarkdownText/SnarkdownText";

interface Props {
  post:PostDTO;
}

function Post({post}: Props) {
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  const user = useSelector((state: any) => state.user);


  const handleAddComment = (e: any) => {
    e.preventDefault();


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
    
    } catch (error) {
      console.error("Error sending comment to the API:", error);
    }
  };

  function setTimeSince(date: Date) {
    let minutes = date.getMinutes();
    return date.getDate() + " " + date.toLocaleString('default', { month: 'short' })
        + " - " + date.getHours() + ":" + (minutes > 9 ? minutes: "0" + minutes);
  }

  // Replace the comments prop with the new localComments state variable

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post">
      <div className="post-cnt" onClick={handleToggleComments}>
        <div className="post-head">
          <h2>{post.title}</h2>
          <p>{setTimeSince(new Date(post.last_updated ?? ""))}</p>
        </div>
        <div className="post-body">
          <SnarkdownText text={post.body}/>
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
          <form onSubmit={handleAddComment} className="post-response-form">
            <input
              className="post-response-input"
              type="text"
              placeholder="Write your comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            />
            <button type="submit" className="post-response-submit activity-btn">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;
