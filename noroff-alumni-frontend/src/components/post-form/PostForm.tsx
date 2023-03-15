import React, {useEffect, useState} from "react";
import "./post-form.css";
import snarkdown from "snarkdown";

type PostFormTypes = {
    editing: boolean
}

function PostForm (props: PostFormTypes) {

    const groups: string[] = ["group1", "group2",];
    const topics: string[] = ["topic1", "top", "topi2"];

    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    let [group, setGroup] = useState(undefined);
    let [topic, setTopic] = useState(undefined);

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
                <input type="text" className="input" onChange={(e => setTitle(e.target.value))}/>
                <div>
                    <div className="tab-row">
                        <button type="button" className={"tab-button " + (previewing ? "tab-button-inactive" : "tab-button-active")}
                            onClick={() => setPreviewing(false)}>Text</button>
                        <button type="button" className={"tab-button " + (previewing ? "tab-button-active" : "tab-button-inactive")}
                            onClick={() => setPreviewing(true)}>Preview</button>
                    </div>
                    {!previewing
                        ?
                        <textarea className="input text-content" onChange={(e => setText(e.target.value))} value={text}/>
                        :
                        <div className="input text-content scroll-vertical" dangerouslySetInnerHTML={{__html: toGithubMarkdown(text)}}></div>
                    }
                </div>
            </div>
            <div className="post-content">
                <p className="subsubtitle">Post to your group</p>
                <div className="button-row">
                    {groups.map((group, index) => {
                        return <button type="button" className="entity-tag group-tag" key={index}>{group}</button>
                    })}
                </div>
                <p className="subsubtitle">Add topics</p>
                <div className="button-row">
                    {topics.map((topic, index) => {
                        return <button type="button" className="entity-tag topic-tag" key={index}>{topic}</button>
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