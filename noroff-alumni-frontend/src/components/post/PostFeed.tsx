import React, {useEffect, useState} from "react";
import "./post.css";
import Topic from "../../models/Topic";
import PostDTO from "../../models/PostDTO";
import Post from "./Post";
import {getPosts} from "../../services/postService";

type PostFeedProps = {
    searchWord?: string,
    topics?: Topic[]
}

function PostFeed(props: PostFeedProps) {

    const [posts, setPosts] = useState<PostDTO[]>([]);

    useEffect(() => {
        fetchPosts();
    }, [])

    function fetchPosts(){
        getPosts()
            .then(data => {
                console.log(data);
                setPosts(data);
            })
    }

    return (
        <div className="post-feed">
            {posts.map((post, i) => (
                <Post key={`post-${i}`} post={post} />
            ))}
        </div>
    )
}

export default PostFeed;