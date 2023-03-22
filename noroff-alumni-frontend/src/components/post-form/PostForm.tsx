import React, { useEffect, useState } from "react";
import "./post-form.css";
import snarkdown from "snarkdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {useAlert} from "react-alert";
import { createPost } from "../../services/postService";

type PostFormTypes = {
    editing: boolean,
    handler: any
}

function PostForm (props: PostFormTypes) {

    const groups: string[] = ["group1", "group2",];
    const topics: string[] = ["topic1", "top", "topi2"];

    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    let [selectedGroup, setSelectedGroup] = useState(-1);
    let [selectedTopic, setSelectedTopic] = useState(-1);

    let [previewing, setPreviewing] = useState(false);
    let [erroneous, setErroneous] = useState(false);

    let alert = useAlert();

    useEffect(() => {
        if(props.editing){
            getPost();
        }
    }, [props.editing])

    useEffect(() => {
        console.log(previewing);
    }, [previewing])

    function getPost() {
        // fetch post
        console.log("fetched post");
    }

    function handleSubmit(){
        if((title === "" || text === "") && !erroneous){
            setErroneous(true)
            setTimeout(() => {
                setErroneous(false)
            }, 1000)
        } else {
            createPost({
                title: title,
                body: text,
                target_topic: "Summer",
                target_group: ""
            });
            alert.success("Published successfully");
            props.handler(false);
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
                <input type="text" className={"input " + (erroneous && title === "" ? "border-blink" : "")} placeholder="Title.." onChange={(e => setTitle(e.target.value))}/>
                <div className="text-content-container">
                    <button type="button" className={"round-toggle " + (previewing ? "button-active" : "button-inactive")}
                            onClick={() => setPreviewing(!previewing)}><FontAwesomeIcon icon={faEye}/></button>
                    {!previewing
                        ?
                        <textarea className={"input text-content " + (erroneous && text === "" ? "border-blink" : "")} placeholder="Write something.." onChange={(e => setText(e.target.value))} value={text}/>
                        :
                        <div className={"input text-content scroll vertical " + (erroneous && text === "" ? "border-blink" : "")} dangerouslySetInnerHTML={{__html: toGithubMarkdown(text)}}></div>
                    }
                </div>
            </div>
            <div className="post-content">
                <p className="subsubtitle">Post to your group</p>
                <div className="button-row">
                    {groups.map((group, index) => {
                        return <button type="button" className={"entity-tag " +
                            (selectedGroup === index ? "group-tag-active" : "group-tag-inactive")} key={index}
                               onClick={() => setSelectedGroup(index)}>{group}</button>
                    })}
                </div>
                <p className="subsubtitle">Add topics</p>
                <div className="button-row">
                    {topics.map((topic, index) => {
                        return <button type="button" className={"entity-tag " +
                            (selectedTopic === index ? "topic-tag-active" : "topic-tag-inactive")} key={index}
                                       onClick={() => setSelectedTopic(index)}>{topic}</button>
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