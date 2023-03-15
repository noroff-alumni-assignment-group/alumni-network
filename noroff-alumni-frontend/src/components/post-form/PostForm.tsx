import React, {useEffect, useState} from "react";
import "./post-form.css";

type PostFormTypes = {
    editing: boolean
}

function PostForm (props: PostFormTypes) {

    const groups: string[] = ["Group1", "Gro"];
    const topics: string[] = ["topic1", "tag2", "tag3"];

    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    let [group, setGroup] = useState(undefined);
    let [topic, setTopic] = useState(undefined);

    let [previewing, setPreviewing] = useState(false);

    useEffect(() => {
        if(props.editing){
            getPost();
        }
    }, [])

    function getPost() {
        // fetch post
        console.log("fetched post");
    }

    function handleSubmit(){
        return;
    }

    function toGithubMarkdown(text: string){
        return text;
    }

    return (
        <form className="post-form">
            <div className="post-content">
                <h1>{props.editing ? "Edit post" : "Write a new post"}</h1>
                <p className="subtitle">Title</p>
                <input type="text" className="input" onChange={(e => setTitle(e.target.value))}/>
                <p className="subtitle">Text</p>
                <textarea className="input" onChange={(e => setText(e.target.value))} value={previewing ? toGithubMarkdown(text) : text}/>
            </div>
            <div className="post-content">
                <p className="subtitle">Post to your group</p>
                <div className="button-row">
                    {groups.map((group, index) => {
                        return <button className="activity-btn" key={index}>{group}</button>
                    })}
                </div>
            </div>
            <div className="post-content">
                <p className="subtitle">Add topics</p>
                <div className="button-row">
                    {topics.map((topic, index) => {
                        return <button className="activity-btn" key={index}>{topic}</button>
                    })}
                </div>
                <input type="text" className="input"/>
            </div>
            <div className="submit-row">
                <button type="button" className="cancel-btn">Cancel</button>
                <button type="submit" className="activity-btn">Publish</button>
            </div>
        </form>
    )
}

export default PostForm;