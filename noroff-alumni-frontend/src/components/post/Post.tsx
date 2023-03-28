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
import {createReply, getReply} from "../../services/replyService";
import {setTimeSince} from "../../services/utilService";
import ReplyDTO from "../../models/ReplyDTO";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface Props {
  post:PostDTO;
}

function Post({post}: Props) {
  const [comments, setComments] = useState<ReplyDTO[] | undefined>([]);
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");

  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    setComments(post.replies);
  }, [post])

  const handleAddComment = () => {
    if(newCommentText.length <= 0){return;}
    createReply({body: newCommentText}, post.id)
        .then(data => {
          getReply(data)
              .then(data => {
                // @ts-ignore
                setComments([...comments, data]);
                setNewCommentText("");
              })
        })
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  // @ts-ignore
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
          <p>{comments?.length} comments</p>
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
          {(comments != undefined && comments.length) <= 0 && (<div className="no-comments-tag"><p>No comments...</p></div>)}
          {comments?.map((reply, i) => (
              <div className="post-comments-list" key={i}>
                <PostResponse reply={reply}/>
              </div>
          ))}
          <div className="post-response-form">
            <input
              className="post-response-input"
              type="text"
              placeholder="Write your comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
            />
            <button type="button" onClick={() => handleAddComment()} className="post-response-submit activity-btn">
              <FontAwesomeIcon icon={faPaperPlane} className={"post-response-submit-icon"}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
