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
import { faPaperPlane, faEdit } from "@fortawesome/free-solid-svg-icons";
import Popup from "../popup/Popup";
import PostForm from "../post-form/PostForm";
import {getPost} from "../../services/postService";
import {NavLink} from "react-router-dom";

type Props = {
  post:PostDTO,
  update?: any
}

function Post({post, update}: Props) {
  const [comments, setComments] = useState<ReplyDTO[] | undefined>([]);
  const [showComments, setShowComments] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);

  const maxLength: number = 255;
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
                post.replies?.push(data)
                setNewCommentText("");
              })
        })
  };

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  function editHandler(edited: boolean) {
    if(edited){
      getPost(post.id)
          .then(data => {
            update(edited);
            setShowEditForm(false);
          })
    } else {
      setShowEditForm(false)
    }
  }

  // @ts-ignore
  return (
    <div className="post">
      {showEditForm && <Popup child={<PostForm editing={true} handler={editHandler} postId={post.id}/>}/>}
      <div className="post-cnt">
        <div className="post-head">
          <h2>{post.title}</h2>
          <p>{post.author.id === user.id && <button className="post-edit-button" onClick={() => setShowEditForm(true)}><FontAwesomeIcon icon={faEdit}/></button>}{setTimeSince(new Date(post.last_updated ?? ""))}</p>
        </div>
        <div className="post-body">
          <SnarkdownText text={post.body} />
        </div>
        <div className="post-tags">
          {post.target_topics?.map((topic) => (
              <NavLink className="nav-tag topic" key={topic.name} to={"/topic/" + topic.id}>
                {topic.name}
              </NavLink>
            ))}
            {post.target_group?.map((group) => (
              <NavLink className="nav-tag group" key={group.name} to={"/groups/" + group.id}>
                {group.name}
              </NavLink>
          ))}
        </div>

        <div className="post-footer">
          <div className="post-comments">
            <p onClick={handleToggleComments}>{comments?.length} comments</p>
          </div>
          <div className="post-author">
            <Profilepicture
              profileTheme={user.theme}
              author={post.author ?? { firstName: "", lastName: "" }}
            />
          </div>
        </div>
      </div>

      {showComments && (
        <div>
          <h2 className="all-comments-h2">All comments</h2>
          {(comments != undefined && comments.length) <= 0 && (
            <div className="no-comments-tag">
              <p>Be the first to comment!</p>
            </div>
          )}
          {comments?.map((reply, i) => (
            <div className="post-comments-list" key={i}>
              <PostResponse reply={reply} />
            </div>
          ))}
          <div className="post-response-form">
            <input
              className="post-response-input"
              type="text"
              placeholder="Write your comment..."
              value={newCommentText}
              onChange={(e) => {
                if (e.target.value.length <= maxLength) {
                  setNewCommentText(e.target.value);
                }
              }}
            />
            <button
              type="button"
              onClick={() => handleAddComment()}
              className="post-response-submit activity-btn"
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                className={"post-response-submit-icon"}
              />
            </button>
            <p
              className={
                "post-response-counter " +
                (newCommentText.length >= maxLength ? "text-limit-reached" : "")
              }
            >
              {newCommentText.length + "/" + maxLength}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
