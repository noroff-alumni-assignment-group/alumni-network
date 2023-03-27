import React, { useEffect, useState } from "react";
import "./post-form.css";
import snarkdown from "snarkdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {useAlert} from "react-alert";
import {createPost, editPost, getPost} from "../../services/postService";
import TopicService from "../../services/topicService";
import TopicListItem from "../../models/TopicListItemDTO";

type PostFormTypes = {
    editing: boolean,
    handler: any
}

function PostForm (props: PostFormTypes) {

    let postId: number = 3;

    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    let [topics, setTopics] = useState<string[]>([]);
    let [groups, setGroups] = useState<string[]>([]);
    let [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    let [selectedTopics, setSelectedTopics] = useState<string[]>([]);

    let [previewing, setPreviewing] = useState(false);
    let [erroneous, setErroneous] = useState(false);

    let alert = useAlert();

    useEffect(() => {
        fetchSubscriptions();
    }, [])

    useEffect(() => {
        if(props.editing){
            getPost(postId)
                .then(data => {
                    setTitle(data.title)
                    setText(data.body)
                    let arr: string[] = []
                    data.target_topics?.map(topic => {
                        if(topics.includes(topic)){
                            arr.push(topic)
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
                target_groups: []
            }
            if(!props.editing) {
                createPost(newPost)
                    .then(result => {
                        alert.success("Published successfully");
                        props.handler(false);
                    })
            } else {
                editPost({title: newPost.title, body: newPost.body}, postId)
                    .then(result => {
                        alert.success("Updated successfully");
                        props.handler(false);
                    })
            }
        }
        return false;
    }

    function toGithubMarkdown(text: string){
        return snarkdown(text);
    }

    return (
        <div className="post-form">
            <div className="post-content">
                <h1>{props.editing ? "Edit post" : "Write a new post"}</h1>
                <input type="text" className={"input " + (erroneous && title === "" ? "border-blink" : "")}
                       placeholder="Title.." onChange={(e => setTitle(e.target.value))} value={title}/>
                <div className="text-content-container">
                    <button type="button" className={"round-toggle " + (previewing ? "button-active" : "button-inactive")}
                            onClick={() => setPreviewing(!previewing)}><FontAwesomeIcon icon={faEye}/></button>
                    {!previewing
                        ?
                        <textarea className={"input text-content " + (erroneous && text === "" ? "border-blink" : "")}
                                  placeholder="Write something.." onChange={(e => setText(e.target.value))} value={text}/>
                        :
                        <div className={"input text-content scroll vertical " + (erroneous && text === "" ? "border-blink" : "")}
                             dangerouslySetInnerHTML={{__html: toGithubMarkdown(text)}}></div>
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
                                   let arr = selectedTopics.includes(group)
                                       ? selectedTopics.filter(e => e !== group) : [...selectedTopics, group];
                                   setSelectedTopics(arr);
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
                <input type="text" className="input" placeholder="or create a topic..."/>
            </div>
            <div className="submit-row">
                <button type="button" className="cancel-btn" onClick={() => props.handler(false)}>Cancel</button>
                <button type="button" className="activity-btn" onClick={() => handleSubmit()}>Publish</button>
            </div>
        </div>
    )
}

export default PostForm;