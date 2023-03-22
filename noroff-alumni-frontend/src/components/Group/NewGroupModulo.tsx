import { useState } from "react";
import { GroupPost } from "../../models/Group/GroupPost";
import api from "../../services/api";

type NewGroupProps = {
    setHideModulo: Function
}

// Modulo component for creating a new group
const NewGroupModulo = ({setHideModulo}: NewGroupProps) => {
    
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)

    async function createGroup(groupPost: GroupPost) {
        await api.post("/group", groupPost);
    }

    async function submitNewGroup() {
        if (name && description && isPrivate) {
            createGroup({name: name, description: description, isPrivate: isPrivate});
            setHideModulo(true)
        }
    }
    
    return (
        <div className="modulo-wrapper">
            <div className="new-group-modulo">
                <h3>Create a new group</h3>
                <input 
                    className="input" 
                    type="text" 
                    placeholder="Group name" 
                    onChange={(event) => setName(event.target.value)}>
                </input>
                <textarea 
                    className="new-group-desc" 
                    placeholder="Who is your group for?" 
                    onChange={(event) => setDescription(event.target.value)}>
                </textarea>
                <div className="new-group-private-check">
                    <p>Do you want your group to be private?</p>
                    <input 
                        className="private-toggle" 
                        type="checkbox" 
                        onChange={(event) => setIsPrivate(true)}>
                    </input>
                </div>
                <div className="new-group-actions">
                    <button className="cancel-btn" onClick={() => setHideModulo(false)}>Cancel</button>
                    <button className="activity-btn" onClick={submitNewGroup}>Create</button>
                </div>
            </div>
        </div>
    )
}
export default NewGroupModulo