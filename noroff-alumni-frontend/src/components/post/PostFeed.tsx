import React from "react";
import "./post.css";
import PostDTO from "../../models/PostDTO";
import Post from "./Post";

type PostFeedProps = {
    posts: PostDTO[],
    update?: any
}

function PostFeed(props: PostFeedProps) {

    return (
        <div className="post-feed">
            {props.posts?.map((post, i) => (
                <Post key={`post-${i}`} post={post} update={props.update}/>
            ))}
        </div>
    )
}

export default PostFeed;