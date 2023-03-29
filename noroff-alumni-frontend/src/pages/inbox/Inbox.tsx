import React, {useEffect, useState} from "react";
import "./inbox.css";
import Search from "../../components/search/Search";
import Popup from "../../components/popup/Popup";
import PostDTO from "../../models/PostDTO";
import PostMessageForm from "../../components/post-form/PostMessageForm";
import PostFeed from "../../components/post/PostFeed";
import {
    getPostsForTargetUser, getPostsToTargetUser,
    searchPostsForTargetUser,
    searchPostsToTargetUser
} from "../../services/postService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Inbox = () => {

    const [posts, setPosts] = useState<PostDTO[]>([]);

    // Add state variable for post form popup visibility
    const [showPostForm, setShowPostForm] = useState(false);

    const [showSent, setShowSent] = useState(false);


    useEffect(() => {
        getPostsForTargetUser()
            .then(data => {
                setPosts(data);
            })
    }, [])

    useEffect(() => {
        if(showSent){
            getPostsToTargetUser()
                .then(data => {
                    setPosts(data)
                })
        } else {
            getPostsForTargetUser()
                .then(data => {
                    setPosts(data)
                })
        }
    }, [showSent])

    function onSearch(searchWord: string){
        if(showSent){
            searchPostsToTargetUser(searchWord)
                .then(data => {
                    setPosts(data);
                })
        } else {
            searchPostsForTargetUser(searchWord)
                .then(data => {
                    setPosts(data);
                })
        }
    }

    const formHandler = (success: boolean) => {
        if(success) {
            if(showSent){
                getPostsToTargetUser()
                    .then(data => {
                        setPosts(data);
                    })
            }else {
                getPostsForTargetUser()
                    .then(data => {
                        setPosts(data);
                    })
            }
        }
        setShowPostForm(false)
    }

    return (
        <div className="inbox">

            {showPostForm && <Popup child={<PostMessageForm editing={false} handler={formHandler}/>}/>}

            <div className="inbox-content">
                <h1>Inbox</h1>
                <div className="inbox-head">
                    <div className="inbox-tabs">
                        <button className={"inbox-received-btn " + (showSent ? "cancel-btn" : "activity-btn")}
                                onClick={() => setShowSent(false)}>
                            RECEIVED
                        </button>
                        <button className={"inbox-sent-btn " + (showSent ? "activity-btn" : "cancel-btn")}
                                onClick={() => setShowSent(true)}>
                            SENT
                        </button>
                    </div>
                    <div className="inbox-action-btn-cnt">
                        <Search onSearch={onSearch}/>
                        <button
                            className="activity-btn"
                            onClick={() => setShowPostForm(true)}
                        >
                            NEW&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faComment}/>
                        </button>
                    </div>
                </div>
                <div className="inbox-feed">
                    {posts.length <= 0 && <div className="no-content-tag"><p>No messages...</p></div>}
                    <PostFeed posts={posts}/>
                </div>
            </div>
        </div>
    );
};

export default Inbox;
