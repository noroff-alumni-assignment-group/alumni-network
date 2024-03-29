import './group-comps.css'
import { useState } from "react";
import GroupService from "../../services/groupService";
import {useAlert} from "react-alert";

type NewGroupProps = {
    handler: any
}

// Modulo component for creating a new group
const NewGroupModulo = (props: NewGroupProps) => {
    
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)
    const [isToggled, setToggled] = useState(false)

    const alert = useAlert();

    async function submitNewGroup() {
        if (name && description) {
            GroupService.createGroup({name: name, description: description, isPrivate: isPrivate})
            .then(result => {
                alert.success("Created successfully");
                props.handler(true);
            })
        }
    }

    const handlePrivateChange = () => {
        setIsPrivate(!isPrivate)
        setToggled(!isToggled)
    }
    
    return (
        <div className="modulo-wrapper">
            <div className="modulo-box">
                <h3>Create a new group</h3>
                <input 
                    className="new-group-name" 
                    type="text" 
                    placeholder="Name your group" 
                    onChange={(event) => setName(event.target.value)}>
                </input>
                <textarea 
                    className="new-group-desc" 
                    placeholder="Write a description for your group" 
                    onChange={(event) => setDescription(event.target.value)}>
                </textarea>
                <div className="new-group-private-check">
                    <p>Make the group private?</p>
                    <label>
                        <input  
                            className="private-input"
                            type="checkbox" 
                            onClick={handlePrivateChange}
                        >
                        </input>
                        <span className="private-input-span"/>
                    </label>
                </div>
                <div className="modulo-actions">
                    <button className="cancel-btn" onClick={() => props.handler(false)}>Cancel</button>
                    <button className="activity-btn" onClick={() => submitNewGroup()}>Create</button>
                </div>
            </div>
        </div>
    )
}
export default NewGroupModulo