import './group-comps.css'
import { useState } from "react"
import UserDisplayDTO from "../../models/UserDisplayDTO"
import service from "../../services/UserService";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AiOutlineSearch } from 'react-icons/ai';
import groupService from '../../services/groupService';
import Group from '../../models/Group/Group';

type InviteProps = {
    setHideInviteModulo: Function
    group: Group
}

const InviteModulo = ({setHideInviteModulo, group}: InviteProps) => {
    
    const [recipient, setRecipient] = useState<UserDisplayDTO>()
    const [users, setUsers] = useState<UserDisplayDTO[]>([]);
    const [searchWord, setSearchWord] = useState("");

 

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

    async function submitInvite() {
        await groupService.inviteToGroup(group.id, recipient?.id)
        setHideInviteModulo(false)
    }
    
    return (
        <div className="modulo-wrapper">
            <div className="modulo-box">
                <h3>Invite a new member</h3>
                    <div className="user-search">
                        {recipient != undefined &&
                            <div className="user-recipient">
                                <div className="profilebubble post-profile-pic">
                                    {(recipient?.firstName ?? "").charAt(0).toUpperCase()+(recipient?.lastName ??"") .charAt(0).toUpperCase()}
                                </div>
                                <p>{recipient?.firstName + " " + recipient?.lastName}</p>
                                <button onClick={() => {
                                    setRecipient(undefined);
                                    setSearchWord("");
                                    setUsers([]);
                                }}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </button>
                            </div>
                        }
                        {recipient === undefined &&
                            <div className="user-search-container">
                                <input
                                    type="text"
                                    className={"user-search-field"}
                                    placeholder="Search users..."
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
                <div className="modulo-actions">
                    <button className="cancel-btn" onClick={() => setHideInviteModulo(false)}>Cancel</button>
                    <button className="activity-btn" onClick={submitInvite}>Invite</button>
                </div>
            </div>
        </div>
    )
}
export default InviteModulo