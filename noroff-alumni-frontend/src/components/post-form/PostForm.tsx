import React, { useEffect, useState } from "react";
import "./post-form.css";
import snarkdown from "snarkdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

type PostFormTypes = {
    editing: boolean
}

function PostForm (props: PostFormTypes) {

    const groups: string[] = ["group1", "group2",];
    const topics: string[] = ["topic1", "top", "topi2"];

    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    let [selectedGroup, setSelectedGroup] = useState(-1);
    let [selectedTopic, setSelectedTopic] = useState(-1);

    let [previewing, setPreviewing] = useState(false);

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
        return;
    }

    function toGithubMarkdown(text: string){
        return snarkdown(text);
    }

    return (
        <form className="post-form">
            <div className="post-content">
                <h1>{props.editing ? "Edit post" : "Write a new post"}</h1>
                <input type="text" className="input" placeholder="Title.." onChange={(e => setTitle(e.target.value))}/>
                <div className="text-content-container">
                    {/*<div className="tab-row">
                        <button type="button" className={"tab-button " + (previewing ? "tab-button-inactive" : "tab-button-active")}
                            onClick={() => setPreviewing(false)}>Text</button>
                        <button type="button" className={"tab-button " + (previewing ? "tab-button-active" : "tab-button-inactive")}
                            onClick={() => setPreviewing(true)}>Preview</button>
                    </div>*/}
                    <button type="button" className={"round-toggle " + (previewing ? "button-active" : "button-inactive")}
                            onClick={() => setPreviewing(!previewing)}><FontAwesomeIcon icon={faEye}/></button>
                    {!previewing
                        ?
                        <textarea className="input text-content" placeholder="Write something.." onChange={(e => setText(e.target.value))} value={text}/>
                        :
                        <div className="input text-content scroll-vertical" dangerouslySetInnerHTML={{__html: toGithubMarkdown(text)}}></div>
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
                <button type="button" className="cancel-btn">Cancel</button>
                <button type="submit" className="activity-btn">Publish</button>
            </div>
        </form>
    )
}

export default PostForm;