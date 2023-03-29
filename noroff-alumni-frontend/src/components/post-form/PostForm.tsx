import React, { useEffect, useState } from "react";
import "./post-form.css";
import snarkdown from "snarkdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {useAlert} from "react-alert";
import {createPost, editPost, getPost} from "../../services/postService";
import TopicService from "../../services/topicService";
import TopicListItem from "../../models/TopicListItemDTO";
import SnarkdownText from "../SnarkdownText/SnarkdownText";
import GroupService from "../../services/groupService";
import GroupListItem from "../../models/Group/GroupListItem";

type PostFormTypes = {
    editing: boolean,
    handler: any,
    postId?: number
}

function PostForm (props: PostFormTypes) {

    const maxLength: number = 1500;

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [topics, setTopics] = useState<string[]>([]);
    const [groups, setGroups] = useState<string[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    const [previewing, setPreviewing] = useState(false);
    const [erroneous, setErroneous] = useState(false);

    const alert = useAlert();

    useEffect(() => {
        fetchSubscriptions();
    }, [])

    useEffect(() => {
        if(props.editing && props.postId){
            getPost(props.postId)
                .then(data => {
                    setTitle(data.title)
                    setText(data.body)
                    let arr: string[] = []
                    data.target_topics?.map(topic => {
                        if(topics.includes(topic.name)){
                            arr.push(topic.name)
                        }
                    })
                    setSelectedTopics(arr);
                })
        }
    }, [topics])

    function fetchSubscriptions(){
        TopicService.getSubscribedTopics()
            .then(data => {
                setTopics(data.map((topic: TopicListItem) => topic.name));
            })
        GroupService.getUserGroups()
            .then(data => {
                setGroups(data.map((group: GroupListItem) => group.name));
            })
    }

    function handleSubmit(){
        if((title === "" || text === "") && !erroneous){
            setErroneous(true)
            setTimeout(() => {
                setErroneous(false)
            }, 1000)
        } else {
            let newPost = {
                title: title,
                body: text,
                target_user: "",
                target_topics: selectedTopics,
                target_groups: selectedGroups
            }
            if(!props.editing) {
                createPost(newPost)
                    .then(result => {
                        alert.success("Published successfully");
                        props.handler(true);
                    })
            } else if (props.postId) {
                editPost({title: newPost.title, body: newPost.body}, props.postId)
                    .then(result => {
                        alert.success("Updated successfully");
                        props.handler(true);
                    })
            }
        }
        return false;
    }

    return (
        <div className="post-form">
            <div className="post-content">
                <h1>{props.editing ? "Edit post" : "Write a new post"}</h1>
                <input type="text" className={"post-form-title input " + (erroneous && title === "" ? "border-blink" : "")}
                       placeholder="Title.." onChange={(e => setTitle(e.target.value))} value={title}/>
                <div className="text-content-container">
                    <button type="button" className={"round-toggle " + (previewing ? "button-active" : "button-inactive")}
                            onClick={() => setPreviewing(!previewing)}><FontAwesomeIcon icon={faEye}/></button>
                    <div className="text-content-meta">
                        <p className={text.length >= maxLength ? "text-limit-reached" : ""}>{text.length + "/" + maxLength}</p>
                    </div>
                    {!previewing
                        ?
                        <textarea className={"input text-content " + (erroneous && text === "" ? "border-blink" : "")}
                                  placeholder="Write something.." onChange={(e => {
                                      if(e.target.value.length <= maxLength){setText(e.target.value)}
                        })} value={text}/>
                        :
                        <div className={"input text-content scroll vertical " + (erroneous && text === "" ? "border-blink" : "")}>
                            <SnarkdownText text={text}/>
                        </div>
                    }
                </div>
            </div>
            <div className="post-content">
                <p className="subsubtitle">Post to your group</p>
                <div className="button-row">
                    {groups.map((group, index) => {
                        return <button type="button" disabled={props.editing} className={"entity-tag " +
                            (selectedGroups.includes(group) ? "group-tag-active" : "group-tag-inactive")} key={index}
                               onClick={() => {
                                   let arr = selectedGroups.includes(group)
                                       ? selectedGroups.filter(e => e !== group) : [...selectedGroups, group];
                                   setSelectedGroups(arr);
                               }}>{group}</button>
                    })}
                </div>
                <p className="subsubtitle">Add topics</p>
                <div className="button-row">
                    {topics.map((topic, index) => {
                        return <button type="button" disabled={props.editing} className={"entity-tag " +
                            (selectedTopics.includes(topic) ? "topic-tag-active" : "topic-tag-inactive")} key={index}
                                       onClick={() => {
                                           let arr = selectedTopics.includes(topic)
                                               ? selectedTopics.filter(e => e !== topic) : [...selectedTopics, topic];
                                           setSelectedTopics(arr);
                                       }}>{topic}</button>
                    })}
                </div>
            </div>
            <div className="submit-row">
                <button type="button" className="cancel-btn" onClick={() => props.handler(false)}>Cancel</button>
                <button type="button" className="activity-btn" onClick={() => handleSubmit()}>Publish</button>
            </div>
        </div>
    )
}

export default PostForm;