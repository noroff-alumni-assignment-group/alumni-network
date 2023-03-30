import React, {useState} from "react";
import UserDisplayDTO from "../../models/UserDisplayDTO";
import Profilepicture from "../profilepicture/Profilepicure";
import ReplyDTO from "../../models/ReplyDTO";
import {setTimeSince} from "../../services/utilService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReply} from "@fortawesome/free-solid-svg-icons";
import * as repl from "repl";

interface Props {
  reply: ReplyDTO,
    replyHandler: any
}

function PostResponse(props: Props) {

  return (
      <div className="post-response-container">
        <div className="post-response">
          <div className="post-author-cnt">
            <div className="profilebubble post-profile-pic">{
                props.reply.author.firstName && props.reply.author.lastName
                ? (props.reply.author.firstName[0]+props.reply.author.lastName[0]).toUpperCase():"OO"}</div>
            <div className="response-author">
              <p className="post-time">{setTimeSince(new Date(props.reply.last_updated))}</p>
              <div className="post-response-author">
                <p>{props.reply.author.firstName ?? ""} {props.reply.author.lastName ?? ""}</p>
              </div>
            </div>
          </div>

          <div className="post-response-text">
            <p>{props.reply.body}</p>
          </div>
            <button className="reply-button" onClick={() => props.replyHandler(props.reply)}>
                <FontAwesomeIcon icon={faReply}/>
            </button>
        </div>
        {(props.reply.child_replies && props.reply.child_replies.length > 0) &&
            <div className="sub-replies">
              {props.reply.child_replies?.map(reply =>
                  <div className="sub-reply" key={reply.id}>
                      <div className="sub-replies-indicator"></div>
                      <PostResponse reply={reply} replyHandler={props.replyHandler}/>
                  </div>
              )}
          </div>
        }
      </div>
  );
}

export default PostResponse;
