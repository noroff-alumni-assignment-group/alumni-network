import React from "react";
import UserDisplayDTO from "../../models/UserDisplayDTO";
import Profilepicture from "../profilepicture/Profilepicure";
import ReplyDTO from "../../models/ReplyDTO";
import {setTimeSince} from "../../services/utilService";

interface Props {
  reply: ReplyDTO
}

function PostResponse(props: Props) {
  return (
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
    </div>
  );
}

export default PostResponse;
