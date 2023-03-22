import React, {useState} from "react";
import "./user-search.css";
import {AiOutlineSearch} from "react-icons/ai";
import UserDisplayDTO from "../../models/UserDisplayDTO";
import service from "../../services/UserService";

type UserSearchProps = {
    handler: any
}

function UserSearch (props: UserSearchProps) {

    const [searchWord, setSearchWord] = useState("");
    const [users, setUsers] = useState([]);

    function onSearch(){
        if(searchWord.length <= 0){return;}
        service.getUsers(searchWord)
            .then(data => setUsers(data))
    }

    return (
        <div className="user-search">
            <AiOutlineSearch className="user-search-icon" onClick={onSearch}/>
            <input
                type="text"
                className={"user-search-field"}
                placeholder="Search topic..."
                onChange={(event) => setSearchWord(event.target.value)}
            />
            <ul>
                {users.map((user: UserDisplayDTO, index: number) =>
                    <li className="user-list-item" key={"user-" + index}>{user.firstName + " " + user.lastName}</li>
                )}
            </ul>
        </div>
    )
}

export default UserSearch;