import React from "react";
import "./post.css";
import PostDTO from "../../models/PostDTO";
import Post from "./Post";
import Placeholder from "../placeholder/Placeholder";

type PostFeedProps = {
  posts: PostDTO[];
  update?: any;
  text?: any;
};

function PostFeed(props: PostFeedProps) {
  return (
    <div className="post-feed">
      {props.posts?.length === 0 ? (
        <Placeholder text={props.text}/>
      ) : (
        props.posts?.map((post, i) => (
          <Post key={`post-${i}`} post={post} update={props.update} />
        ))
      )}
    </div>
  );
}

export default PostFeed;
