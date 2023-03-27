import React, { useEffect, useState } from "react";
import "./post-form.css";
import snarkdown from "snarkdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import {useAlert} from "react-alert";
import {createPost, editPost, getPost} from "../../services/postService";
import {AiOutlineSearch} from "react-icons/ai";
import UserDisplayDTO from "../../models/UserDisplayDTO";
import service from "../../services/UserService";

type PostFormTypes = {
    editing: boolean,
    handler: any
}

function PostMessageForm (props: PostFormTypes) {

    let postId: number = 3;

    let [title, setTitle] = useState("");
    let [text, setText] = useState("");
    const [searchWord, setSearchWord] = useState("");
    const [users, setUsers] = useState<UserDisplayDTO[]>([]);
    const [recipient, setRecipient] = useState<UserDisplayDTO | undefined>(undefined);

    let [previewing, setPreviewing] = useState(false);
    let [erroneous, setErroneous] = useState(false);

    let alert = useAlert();

    useEffect(() => {
        if(props.editing){
            fetchPost();
        }
    }, [])

    function fetchPost() {
        getPost(postId)
            .then(data => {
                setTitle(data.title)
                setText(data.body)
            })
    }

    function onSearch(){
        if(searchWord.length <= 0){setUsers([
            {
                id: "string",
                email:"string",
                username: "string",
                firstName:"Emmanuel-derango",
                lastName:"S. Throgdan billeoul",

            }
        ]); return;}
        service.getUsers(searchWord)
            .then(data => setUsers(data))
    }

    function handleSubmit(){
        if(!recipient){
            alert.info("Message must have a recipient")
            return;
        }
        if((title === "" || text === "") && !erroneous){
            setErroneous(true)
            setTimeout(() => {
                setErroneous(false)
            }, 1000)
        } else {
            let newPost = {
                title: title,
                body: text,
                target_user: recipient.id,
                target_topics: [],
                target_groups: []
            }
            if(!props.editing) {
                createPost(newPost)
                    .then(result => {
                        alert.success("Message sent");
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
                <h1>{props.editing ? "Edit message" : "New message"}</h1>
                <p className="recipient-tag">Recipient: </p>
                <div className="user-search">
                    {recipient != undefined &&
                        <div className="user-recipient">
                            <div className="profilebubble post-profile-pic">
                                {(recipient?.firstName ?? "").charAt(0).toUpperCase()+(recipient?.lastName ??"") .charAt(0).toUpperCase()}
                            </div>
                            <p>{recipient?.firstName + " " + recipient?.lastName}</p>
                            <button onClick={() => setRecipient(undefined)}>
                                <FontAwesomeIcon icon={faTimes}/>
                            </button>
                        </div>
                    }
                    {recipient === undefined &&
                        <div className="user-search-container">
                            <input
                                type="text"
                                className={"user-search-field"}
                                placeholder="Search topic..."
                                onChange={(event) => setSearchWord(event.target.value)}
                                value={searchWord}
                            />
                            <AiOutlineSearch className="user-search-icon" onClick={onSearch}/>
                            <ul className="user-list">
                                {users.map((user: UserDisplayDTO, index: number) =>
                                    <li className="user-list-item" key={"user-" + index} onClick={() => setRecipient(user)}>
                                        <div className="profilebubble post-profile-pic">
                                            {(user.firstName ?? "").charAt(0).toUpperCase()+(user.lastName ??"") .charAt(0).toUpperCase()}
                                        </div>
                                        <p>{user.firstName + " " + user.lastName}</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                </div>
                <input type="text" className={"input " + (erroneous && title === "" ? "border-blink" : "")} placeholder="Title.." onChange={(e => setTitle(e.target.value))} value={title}/>
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
            <div className="submit-row">
                <button type="button" className="cancel-btn" onClick={() => props.handler(false)}>Cancel</button>
                <button type="button" className="activity-btn" onClick={() => handleSubmit()}>Send</button>
            </div>
        </div>
    )
}

export default PostMessageForm;