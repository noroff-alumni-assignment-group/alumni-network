import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "../../models/User";
import Profilepicture from "../profilepicture/Profilepicure";
import Group from "../tags/Group";
import Topic from "../tags/Topic";
import "./post.css";
import PostResponse from "./PostResponse";
import PostDTO from "../../models/PostDTO";

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

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="post">
      <div className="post-cnt">
        <div onClick={handleToggleComments}>
          <div className="post-head">
            <h2>{post.title}</h2>
            <p>{post.last_updated.getHours()}</p>
          </div>
          <div className="post-body">
            <p>{post.body}</p>
          </div>
          <div className="post-comments">
            <p>{post.comments?.length} comments</p>
          </div>
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
