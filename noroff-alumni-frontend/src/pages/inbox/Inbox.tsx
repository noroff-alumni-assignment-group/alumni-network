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
import LoadingIndicatorComponent from "../../components/LoadingIndicator/LoadingIndicatorComponent";

const Inbox = () => {

    const [posts, setPosts] = useState<PostDTO[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    // Add state variable for post form popup visibility
    const [showPostForm, setShowPostForm] = useState(false);

    const [showSent, setShowSent] = useState(false);


    useEffect(() => {
        getPostsForTargetUser()
            .then(data => {
                setIsLoading(false);
                setPosts(data);
            })
    }, [])

    useEffect(() => {
        setIsLoading(true);
        if(showSent){
            getPostsToTargetUser()
                .then(data => {
                    setIsLoading(false);
                    setPosts(data);
                })
        } else {
            getPostsForTargetUser()
                .then(data => {
                    setIsLoading(false);
                    setPosts(data);
                })
        }
    }, [showSent])

    function onSearch(searchWord: string){
        setIsLoading(true);
        if(showSent){
            searchPostsToTargetUser(searchWord)
                .then(data => {
                    setIsLoading(false);
                    setPosts(data);
                })
        } else {
            searchPostsForTargetUser(searchWord)
                .then(data => {
                    setIsLoading(false);
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
                    {isLoading && <LoadingIndicatorComponent/>}
                    {!isLoading && <PostFeed posts={posts} text={showSent ? "You have not sent any messages." : "You have not received any messages."}/>}
                </div>
            </div>
        </div>
    );
};

export default Inbox;
