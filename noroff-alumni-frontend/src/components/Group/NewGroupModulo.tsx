import { useState } from "react";
import { NewGroup } from "../../models/Group/NewGroup";
import api from "../../services/api";

type NewGroupProps = {
    setHideModulo: Function
}

// Modulo component for creating a new group
const NewGroupModulo = ({setHideModulo}: NewGroupProps) => {
    
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)
    const [isToggled, setToggled] = useState(false)

    async function createGroup(newGroup: NewGroup) {
        await api.post("/group", newGroup);
    }

    async function submitNewGroup() {
        if (name && description) {
            createGroup({name: name, description: description, isPrivate: isPrivate});
            setHideModulo(true)
        }
    }

    const handlePrivateChange = () => {
        setIsPrivate(!isPrivate)
        setToggled(!isToggled)
    }
    
    return (
        <div className="modulo-wrapper">
            <div className="new-group-modulo">
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
                <div className="new-group-actions">
                    <button className="cancel-btn" onClick={() => setHideModulo(false)}>Cancel</button>
                    <button className="activity-btn" onClick={submitNewGroup}>Create</button>
                </div>
            </div>
        </div>
    )
}
export default NewGroupModulo